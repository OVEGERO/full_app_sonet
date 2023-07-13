const { Schema, model } = require('mongoose');

const OnuSchema = Schema({

    name:{
        type: String,
    },
    unique_external_id:{
        type: String,
        unique: true
    },
    status:{
        type: String,
        required: true
    },
    state:{
        type: Boolean,
        default: true
    },
    odb_name:{
        type: String,
        default: "N/A"
    },
    zone_name:{
        type: String,
        default: "N/A"
    },
    fecha:{
        type: Date,
        default: "N/A"
    }
});

module.exports = model('Onu', OnuSchema);