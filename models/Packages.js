const mongoose= require("mongoose");

const PackagesSchema = new mongoose.Schema({
price:{
    type:Number,
    required:true,
},
packagesContant:{
    type:String,
    required:true,
},

})
const Packages = mongoose.model('Packages', PackagesSchema);

module.exports = Packages;