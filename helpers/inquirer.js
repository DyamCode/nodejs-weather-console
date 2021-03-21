const inquirer = require('inquirer');
require('colors');

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'Que deseas hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar un lugar`,
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`,
      },
      {
        value: 0,
        name: `${'3.'.green} Salir\n`,
      },
    ],
  },
];

const inquireMenu = async () => {
  console.clear();

  console.log('==========================='.green);
  console.log('   Seleccione una opcion   '.white);
  console.log('===========================\n'.green);

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
        if (value.length === 0) return 'Ingresa un texto valido.';

        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listPlaces = async (places = []) => {
  const choices = places.map(({ id, name }, index) => {
    return {
      value: id,
      name: `${((++index).toString() + '.').green} ${name}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${'0.'.green} Cancelar`,
  });

  const menuOptions = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione un lugar'.cyan,
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
  listPlaces,
  confirmMenu,
  showChecklist,
};
