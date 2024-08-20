const mongoose= require("mongoose");
const LiveGameSchema = new mongoose.Schema({
gameType:{
        type:String,
        enum:["Date","Friends"],
        required:true,
    },
waiterApprove:{
    type:Boolean,
    default:false,
},
bar: {
    type:mongoose.Types.ObjectId,
    ref: 'Bars',
},
tableName: {
    type:String,
    default:"choose no name ",
},
tableNumber:{
    type:Number,
    default:666,
    },
package: {
        type:mongoose.Types.ObjectId,
        ref: 'Packages',
    },
 playersNames: {
        type: [String], // This defines an array of strings
        required: true // maybe to let it down
    },

})
const LiveGame = mongoose.model('LiveGame', LiveGameSchema);

module.exports = DailyStatistic;