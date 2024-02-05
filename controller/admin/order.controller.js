const orderModel=require("../../model/product/order.schema")

exports.get_all_orders = async (req, res) => {
    try {
        const find_data=await orderModel.find()

        res.render('pages/order/order_view',{
            data:find_data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })
    }
}