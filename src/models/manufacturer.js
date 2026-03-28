const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema(
    {
        Id: {
            type: Number,
            required: true,
            unique: true
        },
        Name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 32,
            trim: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Manufacturer', manufacturerSchema);