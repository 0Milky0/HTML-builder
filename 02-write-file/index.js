const fs = require('fs');
const path = require('node:path');
const rl = require('readline');

const readline = rl.createInterface(process.stdin, process.stdout);
const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

readline.question('Hi! Write something... \n', (input) => {
  if (input.trim() === 'exit') {
    readline.close();
  } else {
    readline.setPrompt('Write something... \n');
    readline.prompt();
    stream.write(input + '\n');
    readline.on('line', (line) => {
      if (line.trim() === 'exit') {
        readline.close();
      } else {
        readline.setPrompt('Write something... \n');
        readline.prompt();
        stream.write(line + '\n');
      }
    });
  }
});

readline.on('close', () => console.log('That`s it! Bye!'));
