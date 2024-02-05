const userModel=require("../../model/users/users")

exports.get_all_users = async (req, res) => {
    try {
        const find_data=await userModel.find().sort({creatdAt:-1})

        res.render('pages/users/site_user',{
            data:find_data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })
    }
}