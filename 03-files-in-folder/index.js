const fs = require('fs');
const path = require('node:path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  for (const file of files) {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stat) => {
      if (stat.isFile()) {
        let ext = path.extname(file);
        let name = path.basename(file, ext);
        let size = stat.size / 1024;
        console.log(`${name} - ${ext} - ${size}Kb`);
      }
      if (err !== null) {
        console.log(err);
      }
    });
  }
  if (err !== null) {
    console.log(err);
  }
});
