const menuCategoriesSchema = require('../models/menuCategoriesSchema');
const menuItemsSchema = require('../models/menuItemsSchema');

exports.create_menuitem = async function(req, res) {
    req.body.createdBy = req.user._id;
    var new_menuitem = new menuItemsSchema(req.body);
    new_menuitem.save().then(function(menuitem) {
            return res.json(menuitem);
        }).catch(err => res.status(400).send({
                message: err
            }));
};

exports.menuitem_list = async function(req, res, next) {
    
    menuCategoriesSchema.aggregate([
        {
            $lookup: {
                from: 'menuitems',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'menulist'
            }
        }
    ]).then((menuResult, err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.status(200).json(menuResult);
        });
    
    /* var filter = {};
    if(req.body.restaurant_id)
            filter.userRestaurantId=req.body.restaurant_id;
    
    if(req.body.category_id){
            filter.categoryId=req.body.category_id;        
        await menuItemsSchema.find(filter).populate('categoryId','categoryName').then(function(menuitem) {
            res.send(menuitem);
        }).catch(err => res.status(400).send({
                message: err
        }));
    }else{
        res.status(401).send({message: "parameter missing"});        
    } */
};