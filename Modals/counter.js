const mongoose = require("mongoose")

const CounterSchema = new mongoose.Schema({
    name: String,
    count: Number

})

mongoose.model('Counter', CounterSchema);
