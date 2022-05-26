//Dependencies
const express = require("express");
const Product = require('./models/products.js')
const mongoose = require('mongoose');
const res = require("express/lib/response");
const req = require("express/lib/request");
const app = express();
const methodOverride = require("method-override");
require('dotenv').config();

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE & BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// SEED DATA
const productsSeed = require('./models/productsSeed.js');
app.get('/products/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {});

	Product.create(productsSeed, (error, data) => {
		res.redirect('/products');
	});
});


//Routes
//Index
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts
        })
    })
    
})

//New
app.get('/products/new', (req, res) => {
    res.render('new.ejs');
})



//Show
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        console.log(foundProduct);
        res.render('show.ejs', {
            product: foundProduct,
        })
    })
})


//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})