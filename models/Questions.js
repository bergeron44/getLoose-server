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
},
questionImage:{
    type:String,
    default:"",
},
rate: {
    type: Number,
    min: 0,  // Minimum value for rate
    max: 5,  // Maximum value for rate
    validate: {
        validator: function(v) {
            return v % 1 !== 0 || v >= 0 || v <= 5; // Ensures it's a float between 0 and 5
        },
        message: props => `${props.value} is not a valid rate! Rate should be a float between 0 and 5.`
    },
    default: 0,  // Default value for rate
}

})
const Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;