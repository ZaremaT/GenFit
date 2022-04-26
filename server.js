const express = require('express')
const methodOverride = require('method-override')
const app = express()
const PORT = 4000

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', (req,res) => res.send
('Welcome to GenFit!'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))