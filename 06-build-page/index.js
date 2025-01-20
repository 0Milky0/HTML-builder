const fs = require('fs');
const path = require('node:path');

const stream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'index.html'),
);

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets'),
  { recursive: true },
  (err) => {
    if (err) throw err;
  },
);

fs.readdir(
  path.join(__dirname, 'assets'),
  { withFileTypes: true },
  (err, files) => {
    for (const file of files) {
      if (file.isDirectory()) {
        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets', file.name),
          { recursive: true },
          (err) => {
            if (err) throw err;
          },
        );
        fs.readdir(path.join(__dirname, 'assets', file.name), (err, items) => {
          for (const item of items) {
            fs.copyFile(
              path.join(__dirname, 'assets', file.name, item),
              path.join(__dirname, 'project-dist', 'assets', file.name, item),
              callback,
            );
          }
        });
      }
    }
  },
);

function callback(err) {
  if (err) throw err;
}

const streamWrite = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'style.css'),
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  for (const file of files) {
    fs.stat(path.join(__dirname, 'styles', file), (err, stat) => {
      if (stat.isFile() && path.extname(file) === '.css') {
        const streamRead = new fs.createReadStream(
          path.join(__dirname, 'styles', file),
          {
            encoding: 'utf-8',
          },
        );
        streamRead.on('readable', function () {
          let data = streamRead.read();
          if (data !== null) {
            streamWrite.write(data + '\n');
          }
        });
        streamRead.on('error', function (err) {
          console.error(err);
        });
      }
    });
  }
});

fs.readFile(
  path.join(__dirname, 'template.html'),
  { encoding: 'utf8' },
  (err, data) => {
    insertTemplate(data);
  },
);

function insertTemplate(data) {
  if (data.includes('{')) {
    let start = data.indexOf('{');
    let end = data.indexOf('}') + 2;
    let reg = data.slice(start, end);
    let name = reg.match(/[A-Z]/gi).join('') + '.html';
    fs.readdir(path.join(__dirname, 'components'), (err, files) => {
      if (files.includes(name)) {
        fs.readFile(
          path.join(__dirname, 'components', name),
          { encoding: 'utf8' },
          (err, cont) => {
            data = data.replace(reg, '\n' + cont);
            if (data.includes('{')) {
              insertTemplate(data);
            } else {
              stream.write(data);
            }
          },
        );
      }
    });
  }
}
