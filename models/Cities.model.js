const { Schema, model } = require("mongoose");

const citiesSchema = new Schema({
    title: String,
    description: String,
    rating: Number,
    population: Number,
    imageUrl: String,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Autumn', 'Winter']}
    
    },
    {
        timestamps: true
    }
);

module.exports = model("Cities", citiesSchema);