const { Schema, model } = require("mongoose");

const citySchema = new Schema(
    {
        name: String,
        description: String,
        population: Number
    },
    {
        timestamps: true,
    }
);

module.exports = model("City", citySchema)