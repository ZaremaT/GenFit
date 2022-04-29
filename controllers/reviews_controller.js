const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const db = require('../models')
const { findByIdAndDelete } = require('../models/Product')

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

router.post('/', async (req,res, next) => {
    try {
        const reviewData = req.body
        const newReview = await db.Review.create(reviewData)
        console.log(newReview)
        res.redirect(`/products/${newReview.product}`)
    } catch(error) {
        console.log(error)
        req.error = error
        return next()
    }
})

router.put('/:reviewId', async(req, res, next) => {
    res.send('hitting review: ' + req.params.reviewId)
})

router.get('/:reviewId/edit', async(req,res, next) => {
    res.send('hitting review edit: ' + req.params.reviewId)
})

router.delete('/:reviewId', async(req,res, next) => {
    try {
        const deleteReview = await db.Review
        findByIdAndDelete(req.params.reviewId)
        res.redirect('/products/' + deleteReview.product)
    } catch(error) {
        req.error = error
        return next()
    }
})

module.exports = router