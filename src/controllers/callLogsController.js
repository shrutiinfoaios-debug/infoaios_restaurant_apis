const callLogsSchema = require('../models/callLogsSchema');

exports.create_calllog = async function(req, res) {
    req.body.createdBy = req.user._id;
    console.log(req.body)
    var newCallLog = new callLogsSchema(req.body);
    newCallLog.save().then(function(callLog) {
            return res.json(callLog);
        }).catch(err => res.status(400).send({
                message: err
            }));
};

exports.calllog_list = async function(req, res, next) {
        if(req.query.restaurantId){
            var filter = { userRestaurantId: req.query.restaurantId}
        }
        await callLogsSchema.find(filter).then(function(calllog) {
            res.send(calllog);
        });
};