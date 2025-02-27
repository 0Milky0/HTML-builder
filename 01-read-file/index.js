const fs = require('fs');
const path = require('node:path');

const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

stream.on('readable', function () {
  let data = stream.read();
  if (data !== null) console.log(data);
});

stream.on('error', function (err) {
  console.error(err);
});
