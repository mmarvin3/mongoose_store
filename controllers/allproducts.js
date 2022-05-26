//Dependencies
const express = require("express");
const Product = require('../models/products')
//Initialize the router object
const router = express.Router();

// SEED DATA
const productsSeed = require('../models/productsSeed.js');
router.get('/products/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => { });

    Product.create(productsSeed, (error, data) => {
        res.redirect('/products');
    });
});


//Routes
//Index
router.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts
        })
    })

})

//New
router.get('/new', (req, res) => {
    res.render('new.ejs');
})

//Delete
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/products")
    })
})

//Update
router.put("/:id", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`)
        }
    )
})

//Create
router.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        console.log(Product)
        res.redirect('/products')
    })
})

//Buy Button
router.post('/:id/buy', (req, res) => {
    Product.findById(req.params.id, (err,data) => {
        if (data.qty <= 0) {
        
        }
        else{
            data.qty--;
            data.save();
        }

        res.redirect(`/products/${data.id}`);
    })
})

//Edit
router.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render("edit.ejs", {
            product: foundProduct,
        })
    })
})

//Show
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        console.log(foundProduct);
        res.render('show.ejs', {
            product: foundProduct,
        })
    })
})

//export the router object using module.exports
module.exports = router;


