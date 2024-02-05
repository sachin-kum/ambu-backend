const express = require('express')
const router = express.Router()
const upload = require('../.././middleware/upload')
const { createProduct, get_single_product, get_all_product, delete_single_product, product_update, findDataDate } = require('../../controller/products/product.controller')

router.post('/add-new-product',upload.single('image'), createProduct)
router.post('/get-singel-product', get_single_product)
router.post('/get-all-product', get_all_product)
router.delete('/delete-single-product', delete_single_product)
router.put('/update-product',upload.single('image'), product_update)
router.get('/date',findDataDate)

module.exports = router
