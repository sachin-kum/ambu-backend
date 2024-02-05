const Order = require('../.././model/product/order.schema')
const orderModel = require('../.././model/product/order.schema')
const Product = require('../../model/product/product')

exports.createOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, user_id, paymentInfo, paidAt, itemsPrice, taxPrice, shippingPrice } = req.body
        const paidAtdate = new Date(paidAt)
        // const  deliveryDate = new Date().getDate() 
        // console.log(deliveryDate)
        const delivered = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()  + 5}`
        
        console.log("amount", delivered)
        const findProdct_price = await Product.findOne({ _id: orderItems[0].product_id })
        const amount = (findProdct_price.price * orderItems[0].quantity) - ( shippingPrice + taxPrice)
        // const orderNow = await orderModel.create({
        //     shippingInfo,
        //     orderItems,
        //     user_id,
        //     paymentInfo,
        //     paidAt:paidAtdate,
        //     itemsPrice:findProdct_price.price,
        //     taxPrice,
        //     shippingPrice,
        //     totalPrice: amount,
        //     deliveredAt:delivered
        // })

        return (
            res.status(200).json({message:`Order Create Successfully`,data:orderNow, status:true })
        )


    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
}

