const menuCategoriesSchema = require('../models/menuCategoriesSchema');

exports.create_menucategory = async function(req, res) {
    req.body.createdBy = req.user._id;
    var new_menucategory = new menuCategoriesSchema(req.body);
    new_menucategory.save().then(function(menucategory) {
            return res.json(menucategory);
        }).catch(err => res.status(400).send({
                message: err
            }));
};

exports.menucategory_list = async function(req, res, next) {
    if(req.body.restaurant_id){
            var filter = { userRestaurantId: req.body.restaurant_id}
        await menuCategoriesSchema.find(filter).then(function(menucategory) {
            res.send(menucategory);
        }).catch(err => res.status(400).send({
                message: err
        }));
    }else{
        res.status(401).send({message: "parameter missing"});        
    }
};