// getting the connection
require('./config/db.connection.js');


const express = require('express')
const methodOverride = require('method-override')
const controllers = require('./controllers')
const app = express()
const PORT = process.env.PORT

// require our model

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

app.get ('/', (req, res) => {
        return res.redirect('/products')
})

// "profile" page
app.get ('/profile', (req, res) => {
        return res.render('profile.ejs', {})
})

app.use('/products', controllers.products)
app.use('/reviews', controllers.reviews)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
