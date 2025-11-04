const callLogsSchema = require('../models/callLogsSchema');
const userRolesSchema = require('../models/userRolesSchema');

exports.create_calllog = async function(req, res) {
    var newCallLog = new callLogsSchema(req.body);
    newCallLog.save().then(function(callLog) {
            return res.json(callLog);
        }).catch(err => res.status(400).send({
                message: err
            }));
};

exports.calllog_list = async function(req, res, next) {
        
        await callLogsSchema.find().then(function(calllog) {
            res.send(calllog);
        });
};