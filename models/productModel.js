const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String, required: true
    },
    desc: String,
    price: {
        type: Number,
        required: true
    },
    brand: String,
    category: {
        type: String,
        required: true
    },
    imageUrl: String,
    quantity: {
        type: Number,
        min: 0,
        default: 0,
    },
    ratings: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
    }],
    reviews: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now() },
    }],
}, {
    timestamps: true,
})

// Define  a virtual property 'isAvailable'
// productSchema.virtual('isAvailable').get(function () {
//     return this.quantity > 0 ? 'available' : 'out of stock';
// });

// Custom getter for 'createdAt'
productSchema.path('reviews.0.createdAt').get(function (createdAt) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(createdAt);
  });
  
  // Custom getter for 'updatedAt'
//   productSchema.path('updatedAt').get(function (updatedAt) {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
//     return new Intl.DateTimeFormat('en-US', options).format(updatedAt);
//   });

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;