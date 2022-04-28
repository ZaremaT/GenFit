const express = require('express')

const router = express.Router()

const db = require('../models')

// products route
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

//new route
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

//show route
router.get('/:id/', async (req, res, next) => {
    try {
        const foundProduct = await db.Product.findById(req.params.id)
        // const allReviews = await db.Review.find({product: req.params.id})
        // console.log(allReviews.length, 'Reviews Found');
        const context = { 
            oneProduct: foundProduct,
            reviews: allReviews,
            message: "Hello there"
        }
        return res.render('show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

//edit route
router.post('/', async (req,res, next) => {
    try {
        const createProduct = await db.Product.create(req.body);
        res.redirect('/products');
    } catch (error) {
        req.error = error;
        return next() ;
    }
})

router.get('/:id/edit', async (req,res, next)=>{
    try {
        const updatedProduct = await db.Product.findById(req.params.id);
        console.log(updatedProduct);
        const context = {
            product: updatedProduct
        }
        return res.render('edit.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

//delete route
router.delete('/:id', async (req,res, next)=>{
    try {
        const deletedProduct = await db.Product.findByIdAndDelete(req.params.id);
        // const deletedReviews = await db.Review.deleteMany({product: req.params.id})
        // console.log(deletedReviews);
        return res.redirect('/products')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

//update route
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