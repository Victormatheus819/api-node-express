const mongoose = require("mongoose")
const Schema= mongoose.Schema ;

const schema = new Schema({ 
    number: {
    type: String,
    required: true,
    trim: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    
    createDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    status: {
            type: String,
            required: true,
            enum :['created','done'],
            default: 'created'
    },
    items: [{
            quantity: {
                type: Number,
                required: true,
                trim: true,
                default:1 
            },
            price: {
                type: Number,
                required: true,
                trim: true,
                
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
    }],
        
    
});

module.exports = mongoose.model('Order',schema);