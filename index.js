const prompt = require('prompt-sync')({sigint: true});
const fs = require('fs');
const file = process.argv[2];
const data = fs.readFileSync(file, 'utf8');
const { TodoTxt } = require('jstodotxt');

function loop(todos) {
  const parsedTodos = TodoTxt.parse(todos);
  while (true) {
    const [command, ...args] = prompt('What to do? ').split(' ');
    switch (command) {
      case 'quit':
      return;
      case 'list':
      console.log(todos);
      break;
      case 'priority':
      parsedTodos.sort(function (a, b) {
        return (a.priority || 'Z').localeCompare(b.priority);
      });
      console.log(TodoTxt.render(parsedTodos));
      break;
      case 'context':
      if (args.length >= 1) {
        const context = args[0];
        const filteredTodos = parsedTodos.filter(function (t) {
          return (t.contexts || []).includes(context);
        });
        console.log(TodoTxt.render(filteredTodos));
      } else {
        console.log('Give a context.');
      }
    }
  }
}

loop(data);
