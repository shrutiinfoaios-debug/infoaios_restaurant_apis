const menuCategoriesSchema = require('../models/menuCategoriesSchema');

exports.create_menucategory = async function(req, res) {
    var new_menucategory = new menuCategoriesSchema(req.body);
    new_menucategory.save().then(function(menucategory) {
            return res.json(menucategory);
        }).catch(err => res.status(400).send({
                message: err
            }));
};

exports.menucategory_list = async function(req, res, next) {
        if(req.query.restaurantId){
            var filter = { userRestaurantId: req.query.restaurantId}
        }
        await menuCategoriesSchema.find(filter).then(function(menucategory) {
            res.send(menucategory);
        });
};