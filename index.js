const { readInput } = require('./helpers/inquirer');

const main = async () => {
  const option = await readInput();

  console.log(option);
};

main();
