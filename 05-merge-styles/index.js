const fs = require('fs');
const path = require('node:path');

const streamWrite = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
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
