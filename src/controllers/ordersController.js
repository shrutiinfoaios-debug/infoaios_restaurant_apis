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
        if(req.query.restaurantId){
            var filter = { userRestaurantId: req.query.restaurantId}
        }
        await ordersSchema.find(filter).then(function(order) {
            res.send(order);
        });
};