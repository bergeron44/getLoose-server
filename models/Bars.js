const mongoose= require("mongoose");
const BarsSchema = new mongoose.Schema({
barName:{
    type:String,
    required:true,
},
location:{
    type:String,
    required:true
},
capacity:{
    type:Number,
    default:0
},
barPackages: [{
    type:mongoose.Types.ObjectId,
    ref: 'Packages',
}],
    
})
const Bars = mongoose.model('Bars', BarsSchema);
module.exports = Bars;