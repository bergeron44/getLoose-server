const Bars = require('../models/Bars')

const getBar= (barName) => {
    return Bars.findOne({barName})

}
const getBarById= (BarId) => {
    return Bars.findOne({_id:BarId})

}
const getAllBarsWithSameAttribute= (attribute, whatToCheck) => {
    return Bars.find({[attribute]: whatToCheck})
}//get an attribute and bring baeck all the objects with the same attribute

const getAllBars = () => {
    return Bars.find({})
}

const addBar =(barObject) =>{
    newBar = new Bar(barObject)
    return newBar.save()
}

const removeBarFromDataBase = (barName) => {
    return Bars.findOneAndRemove({barName})
}

const removeAllBarsFromThisList = (BarsListNames) => {
    categoryListNames.forEach(barName => {
        Bars.findOneAndRemove({barName})
    })
}


const updateBar = (barName, newContent) => {
    return Bars.findOneAndUpdate({barName}, newContent, {new:true})
}
const updateBarById = (barId, newContent) => {
    return Bars.findOneAndUpdate({_id:barId}, newContent, {new:true})
}

module.exports = {
    getBar,
    getBarById,
    getAllBarsWithSameAttribute,
    getAllBars,
    addBar,
    removeBarFromDataBase,
    removeAllBarsFromThisList,
    updateBar,
    updateBarById
}