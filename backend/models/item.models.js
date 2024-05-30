
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Defining Item Schema 
const itemSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
