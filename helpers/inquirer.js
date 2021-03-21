const inquirer = require('inquirer');
require('colors');

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Create new task`,
      },
      {
        value: '2',
        name: `${'2.'.green} Show tasks`,
      },
      {
        value: '3',
        name: `${'3.'.green} Show completed tasks`,
      },
      {
        value: '4',
        name: `${'4.'.green} Show pending tasks`,
      },
      {
        value: '5',
        name: `${'5.'.green} Complete task(s)`,
      },
      {
        value: '6',
        name: `${'6.'.green} Delete task`,
      },
      {
        value: '0',
        name: `${'7.'.green} Exit\n`,
      },
    ],
  },
];

const inquireMenu = async () => {
  console.clear();

  console.log('===================='.green);
  console.log('   Pick an option   '.white);
  console.log('====================\n'.green);

  const { option } = await inquirer.prompt(menuOptions);

  return option;
};

const pause = async () => {
  const { option } = await inquirer.prompt([
    {
      type: 'input',
      name: 'option',
      message: `\nPress ${'ENTER'.green} to continue\n`,
    },
  ]);

  console.log('\n');

  return option;
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) return 'Please enter a value.';

        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const customList = async (data = []) => {
  const choices = data.map(({ id, description }, index) => {
    return {
      value: id,
      name: `${((++index).toString() + '.').green} ${description}`,
    };
  });

  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancel`,
  });

  const menuOptions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select a task to delete :('.red,
      choices,
    },
  ];

  const { id } = await inquirer.prompt(menuOptions);

  return id;
};

const showChecklist = async (data = []) => {
  const choices = data.map(({ id, description, completed_at }, index) => {
    return {
      value: id,
      name: `${((++index).toString() + '.').green} ${description}`,
      checked: completed_at ? true : false,
    };
  });

  const menuOptions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select completed tasks'.cyan,
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(menuOptions);

  return ids;
};

const confirmMenu = async (message) => {
  const options = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(options);

  return ok;
};

module.exports = {
  inquireMenu,
  pause,
  readInput,
  customList,
  confirmMenu,
  showChecklist,
};
