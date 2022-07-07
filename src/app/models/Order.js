const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Order = new Schema(
    {
        _userId: {
            type: Schema.Types.ObjectId, required: true
        },
        sub_total: { type: Number, required: true },
        total: { type: Number, required: true },
        status: { type: Number },
        note: { type: String },
        address: { type: String },
        type: { type: String },
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
Order.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Order', Order);
