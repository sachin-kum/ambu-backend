const express = require('express');
const { addtocart, removeCart, getAllCart, quantity_update } = require('../../controller/addtocart/addtocart.controller');
const { authentication } = require('../../middleware/auth');
const router = express.Router()


router.post('/add-to-cart', authentication,addtocart)
router.post('/remove-to-cart',authentication, removeCart)
router.post('/get-all-cart', authentication,getAllCart)

router.post('/quantity-update',quantity_update)




module.exports = router