const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
   score: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
   },
   content: {
       type: String,
       required: [true, 'If you have something to say, say it']
   },
   product: {
       type: mongoose.Types.ObjectId,
       ref: 'Product'
   }
}, {tiimestamps: true})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review