const addtocartModel = require('../.././model/product/addtocart')
const productModel = require('../../model/product/product')


exports.addtocart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body
    const findData = await addtocartModel.findOne({ product_id, user_id:req.user._id }).populate({ path: 'product_id' })
    const findProduct = await productModel.findOne({ _id: product_id })
    let discount_amount = findProduct?.discount_amount ? findProduct.discount_amount :0
    let delivery_charge = findProduct?.delivery_charge? findProduct.delivery_charge : 0

    if (findData) {
      let qty = findData.quantity + quantity
      await addtocartModel.updateOne({ _id: findData._id }, {
        $set: {
          quantity: qty,
          totaleamount: (qty * findProduct.price) - (discount_amount) + (delivery_charge)
        }
      })
    }else {
      
      let addtocart = await addtocartModel.create({
        product_id,
        user_id:req.user._id,
        quantity,
        totaleamount: (quantity * findProduct.price) - (discount_amount) + (delivery_charge)
      })

      await addtocart.save()

    return (
      res.status(200).json({
        message: "add to cart successfully",
        status: true,
        data: addtocart
      })
    )

    }

    return (
      res.status(200).json({
        message: "add to cart successfully",
        status: true,
        // data: addtocart
      })
    )

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message, status: true })
  }
}


exports.removeCart = async (req, res) => {
  try {
    const { id } = req.body
    const findData = await addtocartModel.findOne({ _id: id })
    console.log(findData)
    if (findData) {
      const removeData = await addtocartModel.deleteOne({ _id: findData._id })
      return (
        res.status(200).json({ message: `Remove Cart  Successfully `, status: true })
      )
    } else {
      return res.status(404).json({ message: `Cart not found`, status: false })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message, status: false })
  }
}

exports.getAllCart = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const skip = (page - 1) * limit;
    // console.log(page, limit, skip);

    const findData = await addtocartModel.find({user_id:req.user._id}).populate('product_id').skip(skip).limit(limit).sort({ 'createdAt': -1 });
    const countData = await addtocartModel.find({user_id:req.user._id}).countDocuments()

    console.log(findData);
    if (findData) {
      return (
        res.status(200).json({ data: findData, status: true, PageCount: countData })
      )
    } else {
      res.status(404).json({ data: [], status: false })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message, status: false })
  }
}


exports.quantity_update = async (req, res) => {
  try {
      const{cart_id, quantity} = req.body
      const findcart_id = await addtocartModel.findOne({_id:cart_id}).populate('product_id')
      if(findcart_id){
        const qyt =  quantity
        const newPrice = findcart_id.product_id.price * qyt
        findcart_id.quantity = qyt
        findcart_id.totaleamount = newPrice
        findcart_id.save()
        // const data = await addtocartModel.updateOne({ _id: cart_id },
        //   { $set: { quantity: qyt, totaleamount: newPrice } },
        //   { new: true })
          
        res.status(200).json({ data:findcart_id , status:true})
      }else{
        res.status(404).json({message:`this id not exists `, status:false})
      }
      
  } catch (error) {
      console.log(error);
  }
}