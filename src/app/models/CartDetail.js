const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CartDetail = new Schema(
    {
        _productId: {
            type: Schema.Types.ObjectId, required: true
        },
        _CartId: {
            type: Schema.Types.ObjectId, required: true
        },
        name: { type: String },
        image: { type: String },
        price: { type: Number, required: true },
        quantity: {
            type: Number, required: true
        },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
CartDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('CartDetail', CartDetail);
