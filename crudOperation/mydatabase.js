const fs = require('fs');
const path = require('path');

/**
 * Function to check if a directory exists
 * @param {String} dirPath - The path of the directory to check.
 * @return {Boolean} - Returns true if the directory exists, false otherwise.
 */
function checkDirectoryExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
}

/**
 * Function to check if a file exists
 * @param {String} filePath - The path of the file to check.
 * @returns {Boolean} - Returns true if the file exists, false otherwise.
 */
function checkFileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

/**
 * Function to create a directory
 * @param {String} dirPath - The path of the directory to create.
 * @returns {void}
 */
function createNewDirectory(dirPath) {
  if (checkDirectoryExists(dirPath)) {
    console.log(`Directory '${dirPath}' already exists.`);
  } else {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
      } else {
        console.log(`Directory '${dirPath}' created successfully.`);
      }
    });
  }
}

/**
 * Function to create an empty file inside a directory
 * @param {String} dirPath - The path of the directory where the file will be created.
 * @param {String} fileName - The name of the file to create.
 * @returns {void}
 */
function createNewFile(dirPath, fileName) {
  const filePath = path.join(dirPath, fileName);
  if (checkFileExists(filePath)) {
    console.log(`File '${fileName}' already exists in directory '${dirPath}'.`);
  } else {
    fs.open(filePath, 'w', (err, fd) => {
      if (err) {
        console.error(`Error creating file: ${err}`);
      } else {
        fs.close(fd, (err) => {
          if (err) {
            console.error(`Error closing file: ${err}`);
          } else {
            console.log(`Empty file '${fileName}' created successfully in directory '${dirPath}'.`);
          }
        });
      }
    });
  }
}

/**
 * Function to write content to a file
 * @param {String} dirPath - The path of the directory containing the file.
 * @param {String} fileName - The name of the file to write content to.
 * @param {String} fileContent - The content to write to the file.
 * @returns {void}
 */
function writeContentToFile(dirPath, fileName, fileContent) {
  const filePath = path.join(dirPath, fileName);
  if (checkFileExists(filePath)) {
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error(`Error writing content to file: ${err}`);
      } else {
        console.log(`Content updated in file '${fileName}' successfully in directory '${dirPath}'.`);
      }
    });
  } else {
    console.log(`File '${fileName}' does not exist in directory '${dirPath}'.`);
  }
}

/**
 * Function to rename a file in the specified directory
 * @param {String} dirPath - The path of the directory containing the file.
 * @param {String} oldFileName - The current name of the file.
 * @param {String} newFileName - The new name for the file.
 */
function renameFile(dirPath, oldFileName, newFileName) {
  const oldFilePath = path.join(dirPath, oldFileName);
  const newFilePath = path.join(dirPath, newFileName);
  if (oldFileName !== newFileName) {
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error(`Error renaming file: ${err}`);
      } else {
        console.log(`File '${oldFileName}' renamed to '${newFileName}' successfully in directory '${dirPath}'.`);
      }
    });
  }
}

/**
 * Function to delete a file from the specified directory
 * @param {String} dirPath - The path of the directory containing the file.
 * @param {String} fileName - The name of the file to delete.
 * @returns {void}
 */
function deleteExistingFile(dirPath, fileName) {
  const filePath = path.join(dirPath, fileName);
  if (checkFileExists(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`File '${fileName}' deleted successfully from directory '${dirPath}'.`);
      }
    });
  } else {
    console.log(`File '${fileName}' does not exist in directory '${dirPath}'.`);
  }
}

////////////////////////////////////////////////////////////////////////
// Main
const targetDirectoryPath = '/Users/UseR/Desktop/testDir/';
const oldFilename = 'mudit.txt';
const oldFileContent = 'Hey, this is old file!';
const newFilename = 'newfile.txt';

// Operation to perform
const operation = 'createNewDirectory';

switch (operation) {
  case 'createNewDirectory':
    if (!checkDirectoryExists(targetDirectoryPath)) {
      createNewDirectory(targetDirectoryPath);
    }
    break;

  case 'createNewFile':
    const oldFilePath = path.join(targetDirectoryPath, oldFilename);
    if (!checkFileExists(oldFilePath)) {
      createNewFile(targetDirectoryPath, oldFilename);
    }
    break;

  case 'writeContentToFile':
    writeContentToFile(targetDirectoryPath, oldFilename, oldFileContent);
    break;

  case 'renameFile':
    renameFile(targetDirectoryPath, oldFilename, newFilename);
    break;

  case 'deleteExistingFile':
    deleteExistingFile(targetDirectoryPath, newFilename);
    break;

  default:
    console.log('Invalid operation.');
}
