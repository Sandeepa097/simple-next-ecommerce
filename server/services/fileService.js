const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime-types');

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      if (error) reject(error);
      resolve(true);
    });
  });
};

const moveFilePromise = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (error) => {
      if (error) reject(error);
      resolve(true);
    });
  });
};

const makeDirectoryPromise = (path, options = { recursive: false }) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      resolve(false);
    } else {
      fs.mkdir(path, options, (error) => {
        if (error) reject(error);
        resolve(true);
      });
    }
  });
};

const unlinkFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (error) => {
      if (error) reject(error);
      resolve(true);
    });
  });
};

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
};

const readDirectoryPromise = (directory) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (error, files) => {
      if (error) reject(error);
      resolve(files);
    });
  });
};

const uploadTemp = async (file) => {
  const directoryPath = path.join(process.cwd(), 'storage/temp');
  const fileName = `${crypto.randomUUID()}.${mime.extension(file.type)}`;
  const filePath = path.join(directoryPath, fileName);

  try {
    await makeDirectoryPromise(directoryPath, { recursive: true });
    await writeFilePromise(filePath, Buffer.from(await file.arrayBuffer()));
    return fileName;
  } catch (error) {
    return null;
  }
};

const moveTemp = async (tempId, destination) => {
  const newDirectoryPath = path.join(process.cwd(), destination);
  const oldPath = path.join(process.cwd(), 'storage/temp', tempId);
  const newPath = path.join(newDirectoryPath, tempId);

  try {
    await makeDirectoryPromise(newDirectoryPath, { recursive: true });
    await moveFilePromise(oldPath, newPath);
    return tempId;
  } catch (error) {
    return null;
  }
};

const clearTemp = async () => {
  const directory = path.join(process.cwd(), 'storage/temp');
  const files = await readDirectoryPromise(directory);

  for (const file of files) {
    await unlinkFilePromise(path.join(directory, file));
  }

  return true;
};

const viewTemp = async (tempId) => {
  const filePath = path.join(process.cwd(), 'storage/temp', tempId);
  const contentType = mime.lookup(tempId);

  if (!contentType || !fs.existsSync(filePath)) return false;

  return {
    content: await readFilePromise(filePath),
    contentType,
  };
};

const viewCollectionImage = async (productFileId) => {
  const filePath = path.join(
    process.cwd(),
    'storage/collections',
    productFileId
  );
  const contentType = mime.lookup(productFileId);

  if (!contentType || !fs.existsSync(filePath)) return false;

  return {
    content: await readFilePromise(filePath),
    contentType,
  };
};

const viewProductImage = async (productFileId) => {
  const filePath = path.join(process.cwd(), 'storage/products', productFileId);
  const contentType = mime.lookup(productFileId);

  if (!contentType || !fs.existsSync(filePath)) return false;

  return {
    content: await readFilePromise(filePath),
    contentType,
  };
};

module.exports = {
  uploadTemp,
  moveTemp,
  clearTemp,
  viewTemp,
  viewCollectionImage,
  viewProductImage,
};
