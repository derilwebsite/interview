const express = require('express')
const User = require('../../Models/User/User')
const router = express.Router()


router.get('/user/get', async (req, res) => {
    try {


        const user = await User.find()
        res.status(200).send(user)


    } catch (err) {
        res.status(400).send('Something went wrong, Please try again')
    }
})

router.post('/user/edit/:id', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            age,
            pincode
        } = req.body

        const user = await User.findOne({
            _id: req.params.id
        })
        if (user) {
            user.name = name,
                user.email = email
            user.phone = phone
            user.age = age
            user.pincode = pincode
            await user.save()
            res.status(200).send('Updated')
        } else {
            res.status(400).send('Something went wrong, Please try again')
        }



    } catch (err) {
        res.status(400).send('Something went wrong, Please try again')
    }
})

router.delete('/user/delete/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        })
        if (user) {
            await User.findOneAndDelete({
                _id: req.params.id
            })
            res.status(200).send('Updated')
        } else {
            res.status(400).send('Something went wrong, Please try again')
        }
    } catch (err) {
        res.status(400).send('Something went wrong, Please try again')
    }
})


router.post('/user/new', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            pincode,
            age
        } = req.body

        const user = await User.findOne({
            email
        })
        if (user) {
            res.status(400).send('Email already exist')
        } else {
            const newUser = new User({
                name,
                email,
                phone,
                pincode,
                age
            })
            await newUser.save()
            res.status(201).send('New User has been created')
        }
    } catch (err) {
        res.status(400).send('Something went wrong, Please try again')
    }
})


module.exports = router