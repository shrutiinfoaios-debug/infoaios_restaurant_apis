const bookingsSchema = require('../models/bookingsSchema');

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
        if(req.query.restaurantId){
            var filter = { userRestaurantId: req.query.restaurantId}
        }
        await bookingsSchema.find(filter).then(function(booking) {
            res.send(booking);
        });
};