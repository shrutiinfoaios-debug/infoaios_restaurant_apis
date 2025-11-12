const callLogsSchema = require('../models/callLogsSchema');

exports.create_calllog = async function(req, res) {
    req.body.createdBy = req.user._id;
    var newCallLog = new callLogsSchema(req.body);
    newCallLog.save().then(function(callLog) {
            return res.json(callLog);
        }).catch(err => res.status(400).send({
                message: err
            }));
};

exports.calllog_list = async function(req, res, next) {
        var filter = {};
        if(req.query.restaurantId){
            filter = { userRestaurantId: req.query.restaurantId}
        }
        await callLogsSchema.aggregate([
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
                 
        ]).then(function(calllog) {
            res.send(calllog);
        });
};