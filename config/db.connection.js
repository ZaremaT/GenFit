const mongoose = require('mongoose');

require('dotenv').config();
connectionStr = process.env.MONGODB_URI;

mongoose.connect(connectionStr);

//connected
mongoose.connection.on('connected', () => {
    console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected`)
})
//error
mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error ', error)
})

//disconnected
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected ⚡️ 🔌 ⚡️')
})