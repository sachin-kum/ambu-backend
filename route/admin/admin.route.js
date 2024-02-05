const express = require('express');
const { createAdmin, admin_login, logout, get_all_admin } = require('../../controller/admin/admin.controller');
const upload = require('../.././middleware/upload');
const { get_all_product, getSingelProducts } = require('../../controller/admin/product.controller');
const { get_all_users } = require('../../controller/admin/user.controller');
const { get_all_orders } = require('../../controller/admin/order.controller');
const { get_all_category, get_all_category_for_add_product, createNewCategory, categoryUpdate, getSingelCategory, deleteCategory } = require('../../controller/admin/category.controller');
const router = express.Router()

router.get('/add-admin-page', (req, res) => {
    res.render('pages/users/add_user')
})

router.get('/', (req, res) => {
    res.render('pages/LoginPage')
})

router.get('/dashboard', (req, res) => {
    res.render('pages/index')
})


// product
router.get('/products-page', (req, res) => {
    res.render('pages/products')
})

router.get('/products-add', get_all_category_for_add_product)


router.get('/products-view', get_all_product)
router.get('/get-singel-products/:id', getSingelProducts)

// site users
router.get('/users-view', get_all_users)
// admins
router.get('/admin-view', get_all_admin)
router.post('/create-admin', upload.single('profile'), createAdmin)

// orders
router.get('/orders-view', get_all_orders)

// categories

router.get('/category-add', (req,res)=>{
    res.render('pages/category/category_add')
})
router.post("/create-new-category",createNewCategory)
router.get('/get-singel-category/:id', getSingelCategory)
router.post('/category-update',categoryUpdate)
router.get('/category-delete/:id',deleteCategory)
router.get('/category-view', get_all_category)



//authentication
router.post('/login-admin', admin_login)
router.post('/logout-admin', logout)



module.exports = router