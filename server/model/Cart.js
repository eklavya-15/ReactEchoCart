const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        quantity: {type: Number,required: true},
        user:     {type: mongoose.Schema.Types.ObjectId,ref:'User'},
        product:  {type: mongoose.Schema.Types.ObjectId,ref:'Product'}
    }
)

const virtual  = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Cart = mongoose.model("Cart",cartSchema);