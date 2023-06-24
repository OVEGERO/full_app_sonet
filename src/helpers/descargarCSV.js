const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

console.log('Directorio raiz:', __dirname);

const directoryPath = '/app/src/db'
const donwloadPath = '/app';
const chromiumPath = '/app/node_modules/chromium/lib/chromium/chrome-win/chrome.exe';

const descargarCSV = async () => {
    try {
        await eliminarCSV(directoryPath);
        await eliminarCSV(donwloadPath);
        const browser = await puppeteer.launch({ 
            headless: false,
            executablePath: chromiumPath,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();
        await page.goto('https://livingnet.smartolt.com/auth/login');
        await page.type('#identity', 'jhollcps907@gmail.com');
        await page.type('#password', 'Finetic1234.');
        await page.click('input[type="submit"]');
        await page.waitForNavigation();
        await page.goto('https://livingnet.smartolt.com/reports/export');
        await page.waitForTimeout(1000);
        const exportButton = await page.waitForSelector('.btn.btn-primary.export-button');
        await exportButton.focus();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);
        await browser.close();
        await moverCSV(donwloadPath, directoryPath);
        console.log('Descarga finalizada');
    } catch (error) {
        console.log(error);
    }
};

const eliminarCSV = async (directoryPath) => {
    const filenamePart = 'SmartOLT_onus_list';
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

    if (csvFile) {
        await fs.promises.unlink(path.join(directoryPath, csvFile));
    }
}

const moverCSV = async (oldDirectory, newDirectory) => {
    const filenamePart = 'SmartOLT_onus_list';
    const files = await new Promise((resolve, reject) => {
        fs.readdir(oldDirectory, (err, files) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(files);
            }
        });
    });

    const csvFile = files.find((file) => file.includes(filenamePart));

    if (csvFile) {
        const oldPath = path.join(oldDirectory, csvFile);
        const newPath = path.join(newDirectory, csvFile);

        try {
            await fs.promises.copyFile(oldPath, newPath);
            await fs.promises.unlink(oldPath);
            console.log('Archivo movido exitosamente a la carpeta de destino.');
        } catch (error) {
            console.error('Error al mover el archivo:', error);
        }
    }
};


module.exports = {
    descargarCSV
}