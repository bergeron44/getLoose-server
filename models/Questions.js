const mongoose= require("mongoose");
const QuestionsSchema = new mongoose.Schema({
category:{
    type:String,
},
game: {
    type:String,
},
difficult: {
    type:String,},
appearance: {
    type:Number,
    default:0,
},
successRate:{
type:Number,
default:0,
},
question:{
    type:String,
    require:true,
},
questionEnglish:{
    type:String,
    default:"",
},
punishment:{
    type:String,
    require:true,
},
punishmentEnglish:{
    type:String,
    default:"", 
}
// questionImage:{
//     type:URL,
// },
})
const Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;