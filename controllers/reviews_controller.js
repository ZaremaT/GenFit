const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const db = require('../models')
const { findByIdAndDelete } = require('../models/Product')


//index route
router.get('/', async (req,res, next) => {
    try {
        const everyReview = await db.Review.find({})
        res.send(everyReview)
    } catch(error) {
        console.log(error)
        req.error = error
        return next()
    }
})

//new route 
router.get('/new', async (req,res, next)=>{

    try {
        const allProducts = await db.Product.find({})
        // console.log(allProducts)
        const context ={products: allProducts}
        res.render('reviews/new.ejs', context)

    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

//post rotute
router.post('/', async (req,res, next) => {
    try {
        const reviewData = req.body
        console.log(reviewData)
        const newReview = await db.Review.create(reviewData)
        console.log(newReview)
        res.redirect(`/products/${newReview.product}`)
    } catch(error) {
        console.log(error)
        req.error = error
        return next()
    }
})

//show route
router.get('/:reviewId', async (req,res, next)=>{
    try {
        const foundReview = await db.Product.findById(req.params.reviewId).populate('reviews')
        console.log(foundReview)
        res.render('reviews/show.ejs', {review: foundReview})
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

router.get("/", (req, res) => {
    db.Review.find({})
      .populate("product")
      .exec((error, allReviews) => {
        if (error) {
          console.log(error);
          req.error = error;
          return next();
        }
        db.Product.find({}, (error, allProducts) => {
          if (error) {
            console.log(error);
            req.error = error;
            return next();
          }
  
          const context = { reviews: allReviews, products: allProducts };
          return res.render("reviews/index", context);
        });
      });
  });

  //show route
router.put('/:reviewId', async(req, res, next) => {
    res.send('hitting review: ' + req.params.reviewId)
})

//update route
router.get('/:reviewId/edit', async(req,res, next) => {
    res.send('hitting review edit: ' + req.params.reviewId)
})

router.delete('/:reviewId', async(req,res, next) => {
    try {
        let removeSpace = req.params.reviewId
        console.log(req.params.reviewId)
        const deleteReview = await db.Review.findByIdAndDelete(removeSpace.trim())
        console.log(deleteReview)
        res.redirect('/products/' + deleteReview.product)
    } catch(error) {
        req.error = error
        return next()
    }
})

module.exports = router