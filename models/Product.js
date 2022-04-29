const mongoose = require('mongoose');
const atlasPlugin = require('mongoose-atlas-search');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty :(']
    },
    price: {
        type: Number,
        min: [0, 'you cannot add a negative number!'],
        required: [true, 'price cannot be empty!']
    },
    image: {
        type: String,
        required: [true, 'image cannot be empty!']
    },
},
    {
        timestamps: true
    }
);


const Product = mongoose.model('Product', productSchema)

// initializing atlasPlugin on name of the product
atlasPlugin.initialize({
    model: Product,
    overwriteFind: true,
    searchKey: 'search',
    addFields: {
      id: '$_id',
    },
    searchFunction: query => {
      return {
        'wildcard': {
          'query': `${query}*`,
          'path': 'name',
          'allowAnalyzedField': true
        }
      }
    }
  });
module.exports = Product;