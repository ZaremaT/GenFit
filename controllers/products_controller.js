const express = require('express')

const router = express.Router()

const db = require('../models')


router.get('/', async (req, res, next) => {
    try {
        const products = await db.Product.find({})
        const context = { products }
        console.log(products)
        return res.render('index.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.get('/new', (req, res) => {
    res.render('new.ejs')
})


module.exports = router