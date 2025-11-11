const menuCategoriesSchema = require('../models/menuCategoriesSchema');
const menuItemsSchema = require('../models/menuItemsSchema');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
                
    var menuItemListMatch = {};
    var menuCategoryListMatch = [];

    if(req.body.restaurant_id){
        menuCategoryListMatch = {
            userRestaurantId: new ObjectId(req.body.restaurant_id)
        };
    }

    if(req.body.restaurant_id && req.body.category_id){
        menuItemListMatch = {
                            categoryId: new ObjectId(req.body.category_id)
                        }
    
        menuCategoryListMatch = {
                            userRestaurantId: new ObjectId(req.body.restaurant_id),   
                            _id: new ObjectId(req.body.category_id)
                        };           
    } else if(req.body.restaurant_id){
        menuCategoryListMatch = {
            userRestaurantId: new ObjectId(req.body.restaurant_id)
        };
    } else {
        res.status(401).send({message: "parameter missing"});
        return;
    }

    await menuCategoriesSchema.aggregate([
        {
            $match: menuCategoryListMatch,
        },
        {                
            $lookup: {
                from: 'menuitems',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'menulist',
                pipeline: [
                    {
                        $match: menuItemListMatch
                    },
                ],
            },
        }
    ]).then((menuResult, err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.status(200).json(menuResult);
        });
    /* await menuCategoriesSchema.aggregate([
        {
            $match: {
                            userRestaurantId: new ObjectId(req.body.restaurant_id)
                        },
        },
        {                
            $lookup: {
                from: 'menuitems',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'menulist',
                pipeline: [
                    {
                        $match: {
                            filter
                        },
                    },
                ],
            },
        }
    ]).then((menuResult, err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.status(200).json(menuResult);
        });
     */
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