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

router.post('/', async (req,res, next) => {
    try {
        const createProduct = await db.Product.create(req.body);
        res.redirect('/products');
    } catch (error) {
        req.error = error;
        return next() ;
    }
})

router.put('/:id', async (req, res, next)=>{
    try {
        const updatedProduct = await db.Product.findByIdAndUpdate(req.params.id, req.body);
        console.log(updatedProduct);
        return res.redirect(`/products`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router