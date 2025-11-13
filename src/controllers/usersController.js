const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersSchema = require('../models/usersSchema');
const userRolesSchema = require('../models/userRolesSchema');
const jwtSecretToken = process.env.JWT_SECRET_ACCESS_TOKEN;
const jwtTokenExpiresDays = process.env.JWT_EXPIRES_DAYS;
async function hashPassword(password) {
  try {
    const saltRounds = 10; // Recommended value, adjust as needed
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}
exports.register = async function(req, res) {
    var newUser = new usersSchema(req.body);
    var userRoleType = 2;
    
    if(req.body.userRoleType){
        userRoleType = req.body.userRoleType
    }

    if(req.body.noOfTables && req.body.userRoleType == 1){
        newUser.noOfTables= req.body.noOfTables;
    }
    newUser.userrole = await userRolesSchema.findOne({ roleType: userRoleType });
    newUser.ipAddress = req.ip.split(':').slice(-1)[0];
    var hashedPassword = await hashPassword(req.body.password).then(newUser.passwordHash = hashedPassword)
                                   .catch(err => console.error("Failed to hash password:", err));
    newUser.passwordHash = hashedPassword;
    if(req.user){
        newUser.createdBy = req.user._id;
    } else {
        newUser.createdBy = null;
    }
    newUser.save().then(function(user) {
            user.passwordHash = undefined;
            return res.json(user);
        }).catch(err => res.status(400).send({
                message: err
            }));
    };

exports.sign_in = async function(req, res) {  
    if(!req.body.userRoleType){
        return res.status(401).json({ message: 'Userrole type is missing' });
    } 
    const signin_userroletype = await userRolesSchema.findOne({ roleType: req.body.userRoleType });
    await usersSchema.findOne({ email: req.body.email, userrole: signin_userroletype }).then(function(user) {
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, jwtSecretToken, {
            expiresIn: jwtTokenExpiresDays
        }) });
        });
    };

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!!' });
    }
};

exports.profile = async function(req, res, next) {
    var user_profile_id;
    if(req.body.user_id){
        user_profile_id = req.body.user_id;
    }    
    else if (req.user) {
        user_profile_id = req.user._id
    }
    if(user_profile_id)
    {
        await usersSchema.findOne({_id: user_profile_id}).then(function(user) {
            res.send(user);
        });
    }
    else {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.usersList = async function(req, res, next) {
        
        await usersSchema.find().then(function(user) {
            res.send(user);
        });
};

exports.changePassword = async function(req, res, next) {
    if(!req.body.old_password || !req.body.new_password){
        return res.status(400).json({ message: 'parameter missing' });
    }

    await usersSchema.findOne({ _id: req.user._id}).then(async function(user) {
        if (!user || !user.comparePassword(req.body.old_password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }
        try{
            await usersSchema.updateOne({_id: req.user._id} , {$set : { passwordHash: await hashPassword(req.body.new_password)}});
            return res.status(200).json({message: 'Password changed successfully.'});
        }catch(e){
            return res.status(400).json({ message: e.message});
        }
    });
};
