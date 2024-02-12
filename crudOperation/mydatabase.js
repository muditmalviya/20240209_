// Description: File I/O operations using Node.js
const fs = require('fs');
const path = require('path');

/**
 * Function to check if a directory exists
 * @param {String} directoryPath
 * @return {Boolean}
*/
function directoryExists(directoryPath) {
  try {
    return fs.statSync(directoryPath).isDirectory();
  } catch (err) {
    return false;
  }
}

/**
 * Function to check if file exists
 * @param {String} filePath 
 * @returns {Boolean}
 */
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

/**
 * Function to create a directory
 * @param {String} directoryPath 
 * @returns {void}
 */
function createDirectory(directoryPath) {
  if (directoryExists(directoryPath)) {
    console.log(`Directory '${directoryPath}' already exists.`);
  } else {
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
      } else {
        console.log(`Directory '${directoryPath}' created successfully.`);
      }
    });
  }
}

/**
 * Function to create an empty file inside a directory
 * @param {String} directoryPath 
 * @param {String} fileName 
 * @returns {void}
 */
function createFile(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);
  if (fileExists(filePath)) {
    console.log(`File '${fileName}' already exists in directory '${directoryPath}'.`);
  } else {
    fs.open(filePath, 'w', (err, fd) => {
      if (err) {
        console.error(`Error creating file: ${err}`);
      } else {
        fs.close(fd, (err) => {
          if (err) {
            console.error(`Error closing file: ${err}`);
          } else {
            console.log(`Empty file '${fileName}' created successfully in directory '${directoryPath}`);
          }
        });
      }
    });
  }
}

/**
 * Function to write content to a file
 * @param {String} directoryPath 
 * @param {String} fileName 
 * @param {String} fileContent 
 * @returns {void}
 */
function writeFileContent(directoryPath, fileName, fileContent) {
  const filePath = path.join(directoryPath, fileName);
  if (fileExists(filePath)) {
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error(`Error writing content to file: ${err}`);
      } else {
        console.log(`Content updated in file '${fileName}' successfully in directory '${directoryPath}`);
      }
    });
  } else {
    console.log(`File '${fileName}' does not exist in directory '${directoryPath}'`);
  }
}



/**
 * Renames a file in the specified directory
 * @param {String} directoryPath 
 */
function UpdateFile(directoryPath, oldFileName, newFileName) {
  if (oldFileName !== newFileName) {
    const newFilePath = path.join(directoryPath, newFileName);
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error(`Error renaming file: ${err}`);
      } else {
        console.log(`File '${oldFileName}' renamed to '${newFileName}' successfully in directory '${directoryPath}'.`);
      }
    });
  }
}




/**
 * Deletes a file from the specified directory
 * @param {String} directoryPath 
 * @param {String} fileName
 * return {void}
 */
function deleteFile(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);
  if (fileExists(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`File '${fileName}' deleted successfully from directory '${directoryPath}'`);
      }
    });
  } else {
    console.log(`File '${fileName}' does not exist in directory '${directoryPath}'`);
  }
}




////////////////////////////////////////////////////////////////////////
// Main
const directoryPath = '/Users/UseR/Desktop/testDir/';
const oldFileName = 'a.txt';
const oldFileContent = 'Hello, this is my old file content!';
const newFileName = 'updatedFile.txt';


// Operation to perform
const operation = 'createDirectory';


switch (operation) {
  case 'createDirectory':
    if (!directoryExists(directoryPath)) {
      createDirectory(directoryPath);
    }
    break;

  case 'createFile':
    const oldFilePath = path.join(directoryPath, oldFileName);
    if (!fileExists(oldFilePath)) {
      createFile('/Users/UseR/Desktop/testDir/', 'a.txt');
    }
    break;

  case 'writeFileContent':
    writeFileContent(directoryPath, oldFileName, oldFileContent);
    break;

  case 'updateFileName':
    UpdateFile(directoryPath, oldFileName, newFileName);
    break;

  case 'deleteFile':
    deleteFile(directoryPath, newFileName);
    break;

  default:
    console.log('Invalid operation.');
}
