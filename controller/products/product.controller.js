const productModel = require('../.././model/product/product')
const fs = require('fs')
const moment=require('moment')

const fileDelete = (file) => {
    if (file) {
        fs.unlink(file.path, (err) => {
            if (err) throw err
            console.log('file deleted successfully')
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, categorys, stock, size, ingrdiants, color, discount, delivery_charge } = req.body
        const ingrdiantsPrice = req.body.ingrdiants[0].price
        const totalePrice = price + ingrdiantsPrice
        // console.log(totalePrice*discount/100)
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
            reviews,
            stock,
            size,
            ingrdiants,
            color,
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

exports.get_single_product = async (req, res) => {
    try {
        const { id } = req.body
        const find = await productModel.findOne({ _id: id })
        if (!find) {
            res.status(404).json({ message: 'Product not found', data: [], status: false })
        } else {
            return (
                res.status(200).json({ data: find, status: true })
            )
        }
    } catch (error) {
        console.log(error);
    }
}


exports.get_all_product = async (req, res) => {
    try {
        // const page = parseInt(req.query.page) || 1; 
        // const limit = parseInt(req.query.limit) || 10; 
        const { page, limit, rating, search, from, end } = req.body
        const skip = (page - 1) * limit;

        let filterData = {}

        if (search && !from && end && !rating) {
            console.log("rating", rating)
            filterData = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { categorys: { $regex: search, $options: "i" } }
                ]
            }
        }

        if (search && from && end) {
            console.log("search ==>", search, from, end)
            filterData = {
                $and: [
                    { name: { $regex: search, $options: "i" } },
                    { price: { $gte: from, $lte: end } }
                ]
            }
        }

        if (search && rating) {
            let rating1;
            let rating2;

            if (rating >= 1 && rating < 2) {
                rating1 = 1
                rating2 = 1.99
                console.log("1")
            }

            if (rating >= 2 && rating < 3) {
                rating1 = 2
                rating2 = 2.99
                console.log("2")
            }

            if (rating >= 3 && rating < 4) {
                rating1 = 3
                rating2 = 4.99
                console.log("3")
            }

            if (rating >= 4 && rating < 5) {
                rating1 = 4
                rating2 = 4.99
                console.log("4")
            }

            if (rating == 5) {
                rating1 = 5
                rating2 = 5
            }

            filterData = {
                $and: [
                    { name: { $regex: search, $options: "i" } },
                    { rating: { $gte: rating1, $lte: rating2 } }
                ]
            }
        }


        console.log("filterData", filterData, end, from)

        // const find = await productModel.find().skip(skip).limit(limit)
        const find = await productModel.find(filterData).skip(skip).limit(limit)

        if (!find) {
            res.status(404).json({ message: 'Product not found', data: [], status: false })
        } else {
            return (
                res.status(200).json({ data: find, status: true, page, limit })
            )
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, status: false })
    }
}

exports.delete_single_product = async (req, res) => {
    try {
        const { id } = req.body
        const find = await productModel.findOne({ _id: id })
        if (!find) {
            res.status(404).json({ message: 'Product not found', data: [], status: false })
        } else {
            // if (find.image) {
            //     fs.unlinkSync(find.image);
            // }
            await productModel.deleteOne({ _id: id }),
                fileDelete(find.image)
            return (
                res.status(200).json({ message: `Product Delete Successfuly`, status: true })
            )
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, status: false })
    }
}

exports.product_update = async (req, res) => {
    try {
        const { id, name, description, like_users, small_prize, larze_prize, ingrdiants, categorys } = req.body
        const img = req.file.path
        const find = await productModel.findOne({ _id: id })
        if (find) {
            if (find.image) {
                fs.unlinkSync(find.image);
            }
            const data = await productModel.updateOne({ name: name, description: description, like_users: like_users, small_prize: small_prize, larze_prize: larze_prize, ingrdiants, categorys, image: img })

            return (
                res.status(200).json({ message: `Successfully updated`, data: data, status: true })
            )
        }

    } catch (error) {
        console.log(error)
        fileDelete(req.file)
        res.status(500).json({ message: error.message })
    }
}




exports.findDataDate  = async (req, res)=> {
    try {
        const findData = await productModel.find({createdAt:{$gte:new Date('2023-12-28'),$lte:new Date('2024-01-10')}})
        let enddate=moment("2024-01-09").endOf("day")
        // const findData = await productModel.find({createdAt:{$gte:new Date("2024-01-09"),$lte:enddate}})
        console.log(findData)
        res.send(findData)
    } catch (error) {
        console.log(error)
    }
}
