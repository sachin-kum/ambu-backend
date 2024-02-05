const categoryModel = require('../../model/category/category.model')

exports.createNewCategory = async (req, res) => {
    try{
        const { category} = req.body
        const findCategoryName = await categoryModel.findOne({ category: category})
        console.log(findCategoryName)
        if(findCategoryName){
            res.render("category",{error:"msg"})
        }else{
            const data = await categoryModel.create({category})
            res.redirect('/category-view')
        }
    }catch(error){
        console.log(error);
    }
}

exports.get_all_category = async (req, res) => {
    try {
        const find_data=await categoryModel.find().sort({creatdAt:-1})

        res.render('pages/category/category_view',{
            data:find_data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })
    }
}

exports.get_all_category_for_add_product = async (req, res) => {
    try {
        const find_data=await categoryModel.find()

        res.render('pages/product/product_add',{
            category:find_data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })
    }
}

exports.getSingelCategory = async (req, res) => {
    try {
        const id = req.params.id
        const find_data=await categoryModel.findOne({_id:id})
        console.log(find_data);
        res.render('pages/category/category-update',{
            data:find_data
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message, status:false})
    }
}

exports.categoryUpdate = async (req, res) => {
    try {
        const { id, category} = req.body
        const find_data = await categoryModel.findOne({_id:id})
        if(find_data){
            const data = await categoryModel.updateOne({_id:id},{$set:{category:category}})
            res.redirect('/category-view')
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message, status:false});
    }
}


exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const find_data=await categoryModel.deleteOne({_id:id})
        // console.log(id);s
       res.redirect('/category-view')
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message, status:false})
    }
}