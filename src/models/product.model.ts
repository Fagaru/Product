import mongoose from 'mongoose'

const Product = mongoose.model( 
    "Product",
    new mongoose.Schema({
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        category: {
            type: String,
            enum: []
        },
        typeProduct: {
            type: String,
            enum: ['parapharmacy' , 'pharmacy'],
            default:'parapharmacy'
        },
        qrCode: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        verified: {
            type: Boolean,
            default: false
        },
        deleted: {
            type: Boolean,
            default: false,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
        updateAt: {
            type: Date,
            required: false
        },
        deletedAt: {
            type: Date,
            required: false
        },
    })
)

export default Product;
