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
});

function callback(err) {
  if (err) throw err;
  console.log('file was copied to files-copy dir');
}
