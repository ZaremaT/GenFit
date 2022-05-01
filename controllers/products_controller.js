const express = require('express')


const router = express.Router()

const db = require('../models')


// products route

//  "show" route to show a single product by _id

router.get('/:id', async (req, res, next) => {
    try {
      const foundProduct = await db.Product.findById(req.params.id)
      console.log(foundProduct);
      const context = { product: foundProduct }
      res.render('show.ejs', context);
    } catch (error) {
     console.log(error);
     req.error = error;
     return next();
    }
 })


router.get('/', async (req, res, next) => {
    try {
        const products = await db.Product.find({})
        console.log(products)
        const categories = new Set()
        for (let i = 0; i < products.length; i++) {
            categories.add(products[i].category)
        }
        const context = { products: products, categories: categories }
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
// "category" route

router.get('/category/:category', async (req,res, next) => {
    try {
        console.log('category route')
        const category = req.params.category
        const products = await db.Product.find({})
        const categoryProducts = [];
        for (let product of products)  {
            if (product.category === category) {
                categoryProducts.push(product);
            }
        }
        const categories = new Set()
        for (let i = 0; i < products.length; i++) {
            categories.add(products[i].category)
        }

        const context = { products:categoryProducts, pageName: category + ' Category', categories: categories}
        console.log(products)
        return res.render('index.ejs', context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next() ;
    }
})

//edit route

// "search" route
router.get('/search/:search_param', async (req,res, next) => {
    try {
        query = req.params.search_param
        console.log(query)
        const products = await db.Product.find({search: query})
        
        const allProducts = await db.Product.find({})
        const categories = new Set()
        for (let i = 0; i < allProducts.length; i++) {
            categories.add(allProducts[i].category)
        }
        const context = { products, pageName: 'Search Results', categories: categories }
        console.log(products)
        return res.render('index.ejs', context)
    } catch (error) {
        console.log(error)
        req.error = error;
        return next() ;
    }
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
