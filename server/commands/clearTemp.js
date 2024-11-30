const { clearTemp } = require('../services/fileService');

const init = async () => {
  console.log('Clearing temp');
  await clearTemp();
  console.log('Temp cleared');
  process.exit();
};

init();
