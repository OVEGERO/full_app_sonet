const fs = require('fs');
const path = require('path');

const directoryPath = '/app/src/db'
const filenamePart = 'SmartOLT_onus_list';

const cargarData = async () => {
    const files = await new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(files);
          }
        });
      });

    const csvFile = files.find((file) => file.includes(filenamePart));

    if (!csvFile) {
        console.error(`No se encontró un archivo CSV que contenga "${filenamePart}" en el nombre.`);
        return;
    }

    const filePath = path.join(directoryPath, csvFile);
    const fileData = fs.readFileSync(filePath, 'utf8');
    return fileData;
};

module.exports = {
    cargarData
};