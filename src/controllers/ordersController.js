const ordersSchema = require('../models/ordersSchema');

exports.create_order = async function(req, res) {
    req.body.createdBy = req.user._id;
    var newOrder = new ordersSchema(req.body);
    newOrder.ipAddress = req.ip.split(':').slice(-1)[0];
    newOrder.save().then(function(order) {
            return res.json(order);
        }).catch(err => res.status(400).send({
                message: err
            }));
};

exports.order_list = async function(req, res, next) {
         var filter = {};
        if(req.query.restaurantId){
            filter = { userRestaurantId: req.query.restaurantId }
        }
        await ordersSchema.aggregate([
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
                 
        ]).then(function(order) {
            res.send(order);
        });
};