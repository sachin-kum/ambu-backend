const category = require('../../model/category/category.model');
const productModel = require('../../model/product/product')

exports.get_all_product = async (req, res) => {
    try {
        const find = await productModel.find().sort({ creatdAt: -1 })

        res.render('pages/product/view_products', {
            data: find
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, status: false })
    }
}



exports.addNewProduct = async (req, res) => {
    try {
        const { name, description, price, categorys, stock, size, discount, delivery_charge } = req.body
        // const ingrdiantsPrice = req.body.ingrdiants[0].price
        const totalePrice = price
        const discountPrice = totalePrice * discount / 100
        const payPrice = totalePrice - discountPrice
        const img = req.file && req.file.path ? req.file.path : req.body.image;
        // console.log(img)

        const add_new_product = await productModel.create({
            name,
            description,
            price: payPrice,
            image: img,
            categorys,
            rating,
            stock,
            size,
            discount_amount: discountPrice,
            discount,
            delivery_charge
        })
        if (add_new_product) {
            return (
                res.status(201).json({
                    message: 'Product created successfully',
                    data: add_new_product,
                    status: true
                })
            )
        }

    } catch (error) {
        fileDelete(req.file)
        console.log(error);
        res.status(500).json({ message: error.message })
    }

}

exports.getSingelProducts = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const product = await productModel.findOne({_id: id})
        console.log(product)
        res.render('pages/product/product_update',{data:product})

    } catch (error) {
        res.status(500).json({ message: error.message, status: false })
    }
}


