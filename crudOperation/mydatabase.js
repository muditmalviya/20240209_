/**internal modeule to help us to work with file system and their paths and to 
 * do diffrent operations with it like to create, to rename, to update and to delete
 */
const fs = require('fs')
const path = require('path')

/**
 * Function to create a folder if it doesn't exist at the given path.
 * @param {string} pathoftheFolder - The path of the folder to create.
 */
function createFolder(pathoftheFolder)
{
    //synchronus function to check file is alredy present or not
    if (fs.existsSync(pathoftheFolder)) 
    {
        console.log(`Folder "${pathoftheFolder}" already exists.`)
        return
    }
    //mk-dir is used to create newDirectory in file system
    fs.mkdir(pathoftheFolder, { recursive: true }, (error) => {
        if (error) 
        {
            console.error('Error creating folder:', error)
        } 
        else 
        {
            console.log(`Folder "${pathoftheFolder}" created successfully.`)
        }
    })
}

/**
 * Function to update the name of an already present folder.
 * @param {string} oldFolderPath - The current path of the folder.
 * @param {string} newFolderName - The new name for the folder.
 * @returns {string or null} The new path of the folder after renaming, or null if an error occurred.
 */
function updateFolderName(oldFolderPath, newFolderName) 
{
    //finds the parent directory path using old folder path
    const parentDirectory = path.dirname(oldFolderPath)
    //joins the old and new folder path
    const newFolderPath = path.join(parentDirectory, newFolderName)

    if (!fs.existsSync(oldFolderPath)) 
    {
        console.error(`Folder "${oldFolderPath}" does not exist.`)
        return null
    }

    if (oldFolderPath === newFolderPath) 
    {
        console.log('New folder name is the same as the old one.')
        return null
    }

    if (fs.existsSync(newFolderPath)) 
    {
        console.error(`Folder "${newFolderPath}" already exists.`)
        return null
    }

    fs.rename(oldFolderPath, newFolderPath, (error) => {
        if (error) 
        {
            console.error('Error renaming folder:', error)
            return null
        } 
        else 
        {
            console.log(`Folder "${oldFolderPath}" renamed to "${newFolderPath}" successfully.`)
            return newFolderPath
        }
    })
}

/**
 * Function to delete folder from the file system if it is empty and if it is empty
 * or folder does not exist then display the appropiate msg
 * @param {string} pathoftheFolder - The path of the folder to delete.
 */
function deleteFolder(pathoftheFolder)
{
    if (!fs.existsSync(pathoftheFolder)) 
    {
        console.error(`Folder "${pathoftheFolder}" does not exist.`)
        return
    }

    const folderContents = fs.readdirSync(pathoftheFolder)
    if (folderContents.length > 0) 
    {
        console.error(`Cannot delete folder "${pathoftheFolder}" because it is not empty.`)
        return
    }
    
    //is used to delete the folder by giving its a folder path
    fs.rmdir(pathoftheFolder, (error) => 
    {
        if (error) 
        {
            console.error('Error deleting folder:', error)
        } 
        else 
        {
            console.log(`Folder "${pathoftheFolder}" deleted successfully.`)
        }
    })
}

/**
 * Function to read the contents of a folder but folder should exist.
 * @param {string} pathoftheFolder - The path of the folder to read.
 */
function readFolderContents(pathoftheFolder) 
{
    if (!fs.existsSync(pathoftheFolder)) 
    {
        console.error(`Folder "${pathoftheFolder}" does not exist.`)
        return
    }
    //asynchronously reads the content of the file
    fs.readdir(pathoftheFolder, (error, files) => {
        if (error) 
        {
            console.error('Error reading folder contents:', error)
            return
        }
        //shows the content of folder
        console.log(`Contents of folder "${pathoftheFolder}":`)
        //iterate through each item in file
        files.forEach((file) => {
            const pathOfFile = path.join(pathoftheFolder, file)

            //while iterating the contents it shows whether content is
            //of file type or its an sub-folder
            if (fs.statSync(pathOfFile).isFile()) 
            {
                console.log(`File: ${file}`)
            } 
            else 
            {
                console.log(`Subfolder: ${file}`)
            }
        })
    })
}

/**
 * Function to create a JSON file in given folder with data.
 * @param {string} pathoftheFolder - The path of the folder where the JSON file will be created.
 * @param {string} fileName - The name of the JSON file.
 * @param {object} data - The JSON data to be written to the file.
 */
function createJSONFile(pathoftheFolder, fileName, data) 
{
    if (!fs.existsSync(pathoftheFolder)) 
    {
        console.error("Folder doesn't exist.")
        return
    }

    const pathOfFile = path.join(pathoftheFolder, fileName)

    if (fs.existsSync(pathOfFile)) 
    {
        console.error("File already exists.")
        return
    }
    //converts the data object into json string format
    //replacer function and then for adding indentation
    const jsonData = JSON.stringify(data, null, 2)
    //writes the data to the specified path
    fs.writeFile(pathOfFile, jsonData, (error) => {
        if (error) 
        {
            console.error("Error writing JSON file:", error)
            return
        }
        console.log("JSON file created successfully.")
    })
}

/**
 * Function to read data from a JSON file.
 * @param {string} pathOfFile - The path of the JSON file to read.
 * @param {Function} callback - The callback function for parsed JSON data.
 */
function readJSONFile(pathOfFile, callback) 
{
    if (!fs.existsSync(pathOfFile)) 
    {
        console.error("File doesn't exist.")
        return
    }
    //read the content of the file
    fs.readFile(pathOfFile, 'utf8', (error, data) => {
        if (error) 
        {
            console.error("Error reading JSON file:", error)
            return
        }

        try 
        {
            //tries to read the content in JSON format
            const jsonData = JSON.parse(data)
            //asynchronously keep reading the content in file and keep running
            //in background while other getting execute
            callback(jsonData)
        } 
        catch (parseError) 
        {
            console.error("Error parsing JSON data:", parseError)
        }
    })
}

/**
 * Function to update data in a JSON file based on a unique key.
 * @param {string} pathOfFile - The path of the JSON file to update.
 * @param {string|number} uniqueKey - The unique key to identify the object to update.
 * @param {object} newData - The new data to update.
 */
function updateJSONData(pathOfFile, uniqueKey, newData) 
{
    readJSONFile(pathOfFile, (jsonData) => {
        //it checks the id property of each object matches the unique key given
        const index = jsonData.findIndex(item => item.id === uniqueKey)
        //checks if given unique key is present in JSONdata or not 
        if (index !== -1) 
        {
            //updates the object with new data
            jsonData[index] = { ...jsonData[index], ...newData }
            fs.writeFile(pathOfFile, JSON.stringify(jsonData, null, 2), (error) => {
                if (error) 
                {
                    console.error("Error updating JSON file:", error)
                    return
                }
                console.log("JSON file updated successfully.")
            })
        } 
        else 
        {
            console.error("Object with provided unique key not found.")
        }
    })
}

/**
 * Function to delete a record from a JSON file
 * @param {string} pathOfFile - The path of the JSON file to update.
 * @param {string or number} uniqueKey - The unique key (ID) to identify the object to delete.
 */
function deleteJSONRecord(pathOfFile, uniqueKey) 
{
    readJSONFile(pathOfFile, (jsonData) => {
        // Find the index of the record with the given unique key
        const index = jsonData.findIndex(item => item.id === uniqueKey)
        if (index !== -1) 
        {
            // Remove the record from the array
            jsonData.splice(index, 1)
            // Write the updated JSON data back to the file
            fs.writeFile(pathOfFile, JSON.stringify(jsonData, null, 2), (error) => {
                if (error) 
                {
                    console.error("Error updating JSON file:", error)
                    return
                }
                console.log("Record deleted successfully.")
            })
        } 
        else 
        {
            console.error("Record with provided unique key not found.")
        }
    })
}




// Example usage:

const pathoftheFolder = './exampleFolder'
const fileName = 'example3.json'

createFolder(pathoftheFolder)
const newFolderName = 'newExampleFolder'
const updatedFolderPath = updateFolderName(pathoftheFolder, newFolderName)
if (updatedFolderPath) {
    readFolderContents(updatedFolderPath)
}


const jsonData = [
    { id: 1, Username: "Mudit", Userage: 21, Usercity: "Amravati", Usercompany: "Innovapptive"},
    { id: 2, Username: "Keshav", Userage: 22, Usercity: "Amravati", Usercompany: "Innovapptive" },
    { id: 3, Username: "Ayush", Userage: 23, Usercity: "Yavatmal", Usercompany: "Google" },
    { id: 4, Username: "Shubham", Userage: 24, Usercity: "Nagpur", Usercompany:"Amazon" },
    { id: 5, Username: "Sachin", Userage: 25, Usercity: "Mumbai", Usercompany:"Accenture" },
    { id: 6, Username: "Nikhil", Userage: 26, Usercity: "Jabalpur", Usercompany:"DXC" }
]

createJSONFile(pathoftheFolder, fileName, jsonData)
const uniqueKey = 2
const newData = { Username: "ABC" }
updateJSONData(path.join(pathoftheFolder, fileName), uniqueKey, newData)
//deleteFolder(pathoftheFolder)
//deleteFolder(updatedFolderPath)

const uniqueKeyToDelete = 3; // ID of the record to delete
deleteJSONRecord(path.join(pathoftheFolder, fileName), uniqueKeyToDelete);
