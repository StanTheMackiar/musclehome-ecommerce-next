import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../interfaces';


const orderSchema = new Schema({

    // User es de tipo ID, debe hacer match con un usario y es requerido
    user: { type: Schema.Types.ObjectId, ref: '', required: true },
    orderItems: [{
        _id     : { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        image   : { type: String, required: true },
        gender  : { type: String, required: true },
        price   : { type: Number, required: true },
        quantity: { type: Number, required: true },
        size    : { type: String, required: true },
        slug    : { type: String, required: true },
        title   : { type: String, required: true },
    }],
    shippingAddress: {
        address  : { type: String, required: true },
        address2 : { type: String },
        city     : { type: String, required: true },
        country  : { type: String, required: true },
        lastname : { type: String, required: true },
        name     : { type: String, required: true },
        phone    : { type: String, required: true },
        zip      : { type: String, required: true },
    },

    cartSummary: {
        numberOfItems: { type: Number, required: true },
        subtotal     : { type: Number, required: true },
        tax          : { type: Number, required: true },
        total        : { type: Number, required: true },
    },

    isPaid: { type: Boolean, required: true, default: false },
    paiAt:  { type: String },

}, {
    timestamps: true,
});

const Order:Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;