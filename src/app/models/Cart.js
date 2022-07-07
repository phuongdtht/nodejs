
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        _userId: {
            type: Schema.Types.ObjectId, required: true
        },
        sub_total: { type: Number, required: true },
        total: { type: Number, required: true },
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
Cart.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Cart', Cart);
