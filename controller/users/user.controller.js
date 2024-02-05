// const userModel = require('../../model/users/users')
const userModel = require('../../model/users/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
// const { request } = require('express');
const fs = require('fs');

const fileDelete = (file) => {
    if (file) {
        fs.unlink(file.path, (err) => {
            if (err) throw err
            console.log('file deleted successfully')
        })
    }
}

const sendMail = (transporter, mailOptions, res) => {
    transporter.sendMail(mailOptions, (error, res) => {
        if (error) {
            console.error("error ==", error);
        } else {
            console.log('Email sent: ', res.messageId);
        }
    });
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password, phone_number, country_code, address } = req.body
        // console.log(req.body)
        const findData = await userModel.findOne({ email })
        console.log(findData)
        if (findData) {
            return (
                res.status(403).json({ message: 'This user allredy exists', statu: false })
            )
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            console.log(hashPassword)
            const user = await userModel.create({
                name, email,
                password: hashPassword,
                phone_number, country_code,
                address

            })
            let result = user.toObject();
            delete result.password;
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1d'
            })
            console.log("token", token)

            if (user) {
                return (
                    res.status(201).json({
                        message: `user sign up successfully`,
                        data: result, status: true,
                        token
                    })
                )
            }

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })

    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const findData = await userModel.findOne({ email }).select('+password')
        console.log(findData)
        if (findData) {
            const hashPassword = await bcrypt.compare(password, findData.password)
            const token = await jwt.sign({ id: findData._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1d'
            })

            if (hashPassword == true) {
                // console.log("hashPassword")
                return (
                    res.status(200).json({ message: `user login successful`, status: true, token: token })
                )

            } else {
                return (
                    res.status(401).json({ message: ` incorrect password and email`, status: false })
                )
            }

        } else {

            res.status(401).json({ message: 'Invalid email and  password', status: false })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.sendOTP = async (req, res) => {
    try {

        const { email } = req.body
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'subbankhan96@gmail.com',
                pass: 'zrga jhrq onml brjs'
            }
        });
        const generateOTP = Math.floor(100000 + Math.random() * 900000)
        const mailOptions = {
            from: 'subbankhan96@gmail.com',
            to: email,
            subject: 'send OTP ',
            text: `${generateOTP}`
        };
        const find_user = await userModel.findOne({ email })
        if (find_user) {
            // const otp = await bcrypt.hash('generateOTP',10)

            const data = await userModel.updateOne({ email: email }, { $set: { otp: generateOTP } })
            console.log(data)
            return (
                // await data.save(),
                sendMail(transporter, mailOptions, res),
                res.status(200).json({ message: `User updated successfully and send OTP ${generateOTP} successfully send`, data: data, status: true })
            )
        } else {
            return res.status(400).json({
                message: `User with email ${email} not found or OTP not updated`,
                status: false
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        const { otp, email } = req.body
        const findData = await userModel.findOne({ email })
        const find_otp = findData.otp
        // const compareOTP = await bcrypt.compare('find_otp', otp)

        if (find_otp === otp) {
            return (
                res.status(200).json({ message: `user otp verified successfully`, status: true })
            )
        } else {
            res.status(400).json({ message: `invalid otp`, status: false })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })
    }
}


exports.forgot_password = async (req, res) => {
    try {

        const { new_password, confirm_password, email } = req.body
        const findData = await userModel.findOne({ email })
        if (new_password === confirm_password) {
            if (findData) {
                const hashNewPassword = await bcrypt.hash(new_password, 10)
                await userModel.updateOne({ email: email }, { $set: { password: hashNewPassword } })
                return (
                    res.status(200).json({ message: `reset password successfully`, status: true })
                )
            }
        } else {
            res.status(403).json({ message: `Invalid confirm password`, status: false })
        }

    } catch (error) {
        console.log(error)
        res.status(403).json({ message: error.message, status: false })
    }
}

exports.get_singel_user = async (req, res) => {
    try {

        res.status(200).json({ data: req.user, status: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })

    }
}

exports.userUpdate = async (req, res) => {
    try {
        const { id, name, email, password, phone_number, country_code } = req.body
        // console.log(req.body);
        const findData = await userModel.findOne({ _id: id })
        const image = req.file && req.file.path ? req.file.path : findData.image
        console.log(findData)
        if (findData) {
            let hashNewPassword
            if (password) {

                hashNewPassword = await bcrypt.hash(password, 10)
            }
            // if (req.file) {
            //     fileDelete(findData.image)
            // }
            const data = await userModel.updateOne(
                { _id: id },
                {
                    $set: {
                        name,
                        email,
                        password: hashNewPassword,
                        phone_number,
                        country_code,
                        image
                    }
                }
            );
            res.status(200).json({ data: data, message: `data updated successfully`, status: true })

        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, status: false })

    }
}