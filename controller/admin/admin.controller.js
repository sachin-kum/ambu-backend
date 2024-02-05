const fs = require('fs')
const bcrypt = require('bcryptjs')
const admin = require('../../model/admin/admin.Model')
const fileDelete = (file) => {
    if (file) {
        fs.unlink(file.path, (err) => {
            if (err) throw err
            console.log('file delete Succesfully')
        })
    }
}


exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const image = req.file && req.file.path ? req.file.path : ""
        const findData = await admin.findOne({ email }).select('-password')
        console.log(findData)
        if (findData) {
            res.status(403).json({ message: `User ${email} already exists` })
        } else {
            const hashPassword = await bcrypt.hash('password', 10)
            console.log(hashPassword)
            const data = await admin.create({
                name, email,
                password: hashPassword,
                profile: image
            })
            if (data) {
                res.redirect('/admin/dashboard')
            }
        }

    } catch (err) {
        fileDelete(req.file)
        console.log(err);
        res.status(500).json({ message: err.message, status: false })
    }
}

exports.admin_login = async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log(req.body)
        const findEmail = await admin.findOne({ email: email })
        if (findEmail) {
            const matchPassword = await bcrypt.compare(password, findEmail.password)
            if (matchPassword) {
                res.redirect('/dashboard')
            } else {
                res.status(409).json({ message: `Invalid email and password `, status: false })
            }
        } else {
            res.status(409).json({ message: `Invalid email and password `, status: false })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })
    }
}

exports.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
              console.error(err);
            }
            res.redirect('/login');
          });
       
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })
    }
}

exports.get_all_admin = async (req, res) => {
    try {

        // console.log(req.body)
        const findEmail = await admin.find().sort({creatdAt:-1})
        res.render('pages/users/view_user',{
            data:findEmail
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })
    }
}
