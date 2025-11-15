const bookingsSchema = require('../models/bookingsSchema');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.create_booking = async function(req, res) { 

    req.body.createdBy = req.user._id;
    var newBooking = new bookingsSchema(req.body);
    newBooking.ipAddress = req.ip.split(':').slice(-1)[0];
    newBooking.save().then(function(booking) {
            return res.json(booking);
        }).catch(err => res.status(400).send({
                message: err
            }));
};

exports.booking_list = async function(req, res, next) {
        var filter = {};
        if(req.query.restaurantId){
            filter = { userRestaurantId: new ObjectId(req.query.restaurantId) }
        }
        
        await bookingsSchema.aggregate([
            {
                $match : filter
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userRestaurantId',
                    foreignField: '_id',
                    as: 'restaurantDetails',
                    pipeline: [{
                        $project:{
                            restaurantName: 1,
                            restaurantAddress: 1
                        }
                    }]
                }   
            },
                 
        ]).then(function(booking) {
            res.send(booking);
        });
};