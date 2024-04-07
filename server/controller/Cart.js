const  {Cart} = require( "../model/Cart")

exports.addToCart = async (req,res) => {
  const {id} = req.user;
 //console.log(req.user); //{ id: '6531a4f5311e145e5cbbcae3', role: 'admin' }
  const cart = new Cart({...req.body,user:id});
    try {
      const data = await cart.save()
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json(error);
    }

}

exports.fetchCartByUser = async (req,res) => {
  const {user} = req.query;
  try {
    const result = await Cart.find({user: user}).populate('user').populate('product');
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}
exports.deleteFromCart = async(req,res) =>{
  const {id} =  req.params;
  try {
    const result = await Cart.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error)
  }
}
//In backend we can get the values from frontend through 3 methods
//  cart/:id ---> req.params.id
//  cart?userId=74146946  ----> req.query.user
//  / any endpoint we will get user through req.user which have came through passport authentication through jwt strategy
exports.updateCart = async(req,res) =>{
  const {id} =  req.params;
  try {
    const result = await Cart.findByIdAndUpdate(id,req.body,{new:true});
    const data = await result.populate('product')
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error)
  }
}

