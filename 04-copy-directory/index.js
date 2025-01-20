const fs = require('fs');
const path = require('node:path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  for (const file of files) {
    fs.copyFile(
      path.join(__dirname, 'files', file),
      path.join(__dirname, 'files-copy', file),
      callback,
    );
  }

  fs.readdir(path.join(__dirname, 'files-copy'), (err, copyFiles) => {
    for (const file of copyFiles) {
      if (!files.includes(file))
        fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
          if (err) throw err;
          console.log('file was deleted from files-copy dir');
        });
    }
  });
});

function callback(err) {
  if (err) throw err;
  console.log('file was copied to files-copy dir');
}
