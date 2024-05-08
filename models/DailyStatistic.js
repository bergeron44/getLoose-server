const mongoose= require("mongoose");
const DailyStatisticSchema = new mongoose.Schema({
day:{
    type:String,
    enum:["SUNDAY","MONDAY","TUESDAY","THURSDAY","WEDNESDAY","FRIDAY","SATURDAY"],
    required:true,
},
bar: {
    type:mongoose.Types.ObjectId,
    ref: 'Bars',
},
package: {
    type:mongoose.Types.ObjectId,
    ref: 'Packages',
},
date: {
    type:Date,
    required:true,
},
quantity:{
type:Number,
default:0,
},
rebuy:{
    type:Number,
    default:0,
    },
})
const DailyStatistic = mongoose.model('DailyStatistic', DailyStatisticSchema);

module.exports = DailyStatistic;