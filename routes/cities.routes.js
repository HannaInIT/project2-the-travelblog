const express = require('express');
const Cities = require("../models/Cities.model");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn.js");


// READ: display all Cities
router.get("/cities", (req, res, next) => {
    Cities.find()
        .populate("title")
        .then((citiesFromDB) => {

            const data = {
                cities: citiesFromDB
            }

            res.render("cities/cities-list", data);
        })
        .catch((e) => {
            console.log("Error getting list of Cities from DB", e);
            next(e);
        })
})



// CREATE: display form
router.get("/cities/cities-create", isLoggedIn, (req, res, next) => {
    Cities.find()
        .then( citiesFromDB => {
            const data = {
                cities: citiesFromDB
            }
            res.render("cities/cities-create", data);
        })
        .catch((e) => {
            console.log("Error getting list of Cities from DB", e);
            next(e);
        });
});


// CREATE: process form
router.post("/cities/cities-create", isLoggedIn, (req, res, next) => {

    const newCities = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        rating: req.body.rating,
        season: req.body.season,
    };

    console.log("***** in the create form funciton");

    Cities.create(newCities)
        .then((newCities) => {
            res.redirect("/cities");
        })
        .catch(e => {
            console.log("error creating new cities", e);
            next(e);
        });
});



// UPDATE: display form
router.get('/cities/:citiesId/edit', async (req, res, next) => {
    const { citiesId } = req.params;

    try {
        const citiesDetails = await Cities.findById(citiesId);

        console.log("*&*&*******  Cities ID 1  "+ citiesId);
        
        const data = { 
            cities: citiesDetails, 
        }

        res.render('cities/cities-edit', data)

    } catch(error){
        next(error)
    }
});



// UPDATE: process form
router.post('/cities/:citiesId/edit', (req, res, next) => {
    const { citiesId } = req.params;
    const { title, description, rating, population, season, imageUrl } = req.body;
    console.log("*&*&*******  Cities ID 2  ");
    Cities.findById(citiesId)
    .then((city) => {
Cities.findByIdAndUpdate(citiesId, { title, description, rating, population, season, imageUrl: imageUrl ? imageUrl : city.imageUrl }, { new: true })
        // .then(updatedCities => res.redirect(`/cities/${updatedCities.id}`)) // go to the details page to see the updates
        .then(() => res.redirect('/cities'))
    })
        .catch(error => next(error));
});

// READ: display details of one city
router.get("/cities/:citiesId", (req, res, next) => {
    const id = req.params.citiesId;
    Cities.findById(id)
        .populate("title")
        .then(citiesFromDB => {
            res.render("cities/cities-details", citiesFromDB);
        })
        .catch((e) => {
            console.log("Error getting Cities details from DB", e);
            next(e);
        })

})


// DELETE: delete city
router.post('/cities/:citiesId/delete', (req, res, next) => {
    const { citiesId } = req.params;

    Cities.findByIdAndDelete(citiesId)
        .then(() => res.redirect('/cities'))
        .catch(error => next(error));
});

module.exports = router;