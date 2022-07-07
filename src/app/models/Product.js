const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
        intro: { type: String, required: true },
        description: { type: Array },
        price_product: { type: Number, required: true },
        price_promo: { type: Number, required: true },
        _catId: {
            type: Schema.Types.ObjectId, required: true
        },
        _userId: {
            type: Schema.Types.ObjectId, required: true
        },
        images: { type: Text, required: true },
        activated: { type: Date }
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Product', Product);
