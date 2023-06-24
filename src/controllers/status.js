const { response } = require('express');
const Papa = require('papaparse');
const { descargarCSV } = require('../helpers/descargarCSV.js');
const { cargarData } = require('../helpers/cargarData.js');

const getStatuses = async (req, res = response) => {
    try {
        data = [];
        await descargarCSV();
        const fileData  = await cargarData(); 
        const parsedData = Papa.parse(fileData, { header: true });
        const csvData = parsedData.data;
        csvData.forEach((element) => {
            if (element.Status === 'Power fail') {
                data.push({
                    id: element["ONU external ID"],
                    name: element.Name,
                    status: element.Status,
                    zone: element.Zone,
                });
            }
        });

        return res.status(200).json({
            ok: true,
            longitud: data.length,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getStatuses
}