const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000
};
const mongoURI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, option).then(function(){
        console.log("connected successfully");
    }, function(err) {
        console.log(err)
    });
// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, function (error) {
//     if (error) {
//         console.log("Error!" + error);
//     }
// });

