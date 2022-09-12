const router = require('express').Router();
const Restaurant = require('../modals/Restaurant');
const verify = require ("./verifyToken.js");

// Add New Restaurant
router.post('/',verify,async (req,res)=>{
    const restaurant = new Restaurant({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        services: req.body.services,
    });
    try {
        const saveRestaurant =await restaurant.save();
        res.json(saveRestaurant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get All Restaurant
router.get('/',async(req,res)=>{
    try {
        const restaurant =await Restaurant.find();
        res.json(restaurant);
    } catch (error) {
        res.json({message : error})
    }
});

// Get Single Restaurant
router.get('/:restaurantId',async (req,res)=>{
    try {
        const restaurant =await Restaurant.findById(req.params.restaurantId);
        res.json(restaurant);
    } catch (error) {
        res.json({message : error})
    }
});

// Update Restaurant
router.put('/:restaurantId',verify,async (req,res)=>{
    const restaurant = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        services: req.body.services,
    }
    try {
        const updateRestaurant =await Restaurant.findByIdAndUpdate(req.params.restaurantId, restaurant);
        res.json(updateRestaurant);
    } catch (error) {
        res.json({message : error})
    }
})

//Delete Restaurant
router.delete('/:restaurantId',verify,async (req,res)=>{
    try {
        const deleteRestaurant =await Restaurant.findByIdAndDelete(req.params.restaurantId);
        res.json(deleteRestaurant);
    } catch (error) {
        res.json({message : error});
    }
})

module.exports = router;