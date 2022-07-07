const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const OrderDetail = new Schema(
    {
        _productId: {
            type: Schema.Types.ObjectId, required: true
        },
        _OrderId: {
            type: Schema.Types.ObjectId, required: true
        },
        price: { type: Number, required: true },
        quantity: {
            type: Number, required: true
        },
        name: { type: String }
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
OrderDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('OrderDetail', OrderDetail);
