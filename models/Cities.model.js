const { Schema, model } = require("mongoose");

const citiesSchema = new Schema({
    title: String,
    description: String,
    rating: Number,
    imageUrl: String,
    season: {
        type: String,
        enum: ['Winter', 'Spring', 'Summer', 'Autumn']}
    
    },
    {
        timestamps: true
    }
);

module.exports = model("Cities", citiesSchema);