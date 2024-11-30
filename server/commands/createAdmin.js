const inquirer = require('inquirer');
const { create, findOne } = require('../services/userService');

const init = async () => {
  const answers = await inquirer.default.prompt([
    {
      name: 'username',
      message: 'What is your username?',
      validate: (value) => {
        if (!value) return 'username is required';
        return true;
      },
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter new password?',
      mask: '*',
      validate: (value) => {
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Required minimum 8 characters';
        return true;
      },
    },
  ]);

  await inquirer.default.prompt([
    {
      type: 'password',
      name: 'confirmPassword',
      message: 'Retype the password?',
      mask: '*',
      validate: (value) => {
        if (!value) return 'Please type your password again';
        if (value !== answers.password) return "Passwords don't match";
        return true;
      },
    },
    {
      name: 'contactWhatsapp',
      message: 'What is your whatsapp number?',
      validate: (value) => {
        if (!value) return 'Whatsapp number is required';
        return true;
      },
    },
  ]);

  const alreadyExists = await findOne({
    username: answers.username,
  });

  console.log('\nCreating...\n');

  if (alreadyExists) {
    console.error('Username already taken');
    process.exit();
  }

  const created = await create(answers);
  delete created.dataValues.password;

  console.log('Admin is successfully created with following details:');
  console.log(created.dataValues);
  process.exit();
};

init();
