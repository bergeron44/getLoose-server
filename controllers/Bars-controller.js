const {
    getAllBars,
    getAllBarsWithSameAttribute,
    getBarById,
    getBar,
    removeAllBarsFromThisList,
    removeBarFromDataBase,
    addBar,
    updateBar,
    updateBarById,
} = require('../services/Bars-services')
const serverResponse = require('../utils/serverResponse')

const getBarByNameCont = async (req, res) => {
    try{
        const bar = await getBar(req.params.barName)
        const {barName, location,capacity,barPackages} = bar
        if(!bar){
            return serverResponse(res, 404, { message: "no category found"})
        }
        return serverResponse(res, 200,{barName, location,capacity,barPackages})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'error occured while trying to get bar by name'})
    }
}
const getBarByIdCont = async (req, res) => {
    try{
        const bar = await getBar(req.params._id)
        const {barName, location,capacity,barPackages} = bar
        if(!bar){
            return serverResponse(res, 404, { message: "no category found"})
        }
        return serverResponse(res, 200,{barName, location,capacity,barPackages})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'error occured while trying to get bar by id'})
    }
}
const deleteBarByNameCont = async (req, res) => {
    try{
        const Bar = await removeBarFromDataBase(req.params.barName)

        if(!Bar){
            return serverResponse(res, 404, { message: "the bar dosent exsist"})
        }

        return serverResponse(res, 200,  { message: "bar remove seccesfully"})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'error occured while trying to remove bar'})
    }
}


const createBarCont = async (req, res) => {
    try{
        const newBar = {...req.body}
            if((newBar.barName=="")||(newBar.location=="")||(newBar.capacity==0)){
             return serverResponse(res, 404, { message: "no capble to add new bar to data base missing information"})
        }
        const barName=newBar.barName
        const bar = await getCategory(barName)
             if(!bar){
                const newBAR = await addBar(newBar)
                if(!newBAR){
                    return serverResponse(res, 404, { message: "no capble to add new bar"})
                }
                return serverResponse(res, 200,newBAR)
           }

        return serverResponse(res, 200, bar)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to add bar to data base'})
    }
}

const editBarCont = async (req, res) => {
    try{
        const oldBarContent = await getBar(req.params.barName)
        if(!oldBarContent){
            return serverResponse(res, 400, { message: "no bar found"})
        }
        const newbarInfo={...req.body};
        const updatedBar = await updateBar(oldBarContent.barName,newbarInfo);
        if(!updatedBar){
            return serverResponse(res, 400, { message: "no able to update bar "+req.params.categoryName+" with new name :  "+req.params.barName})
        }

        return serverResponse(res, 200, updatedBar)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update category'})
    }
}

//////
//פונקציה יחסית מיותרת
//////
const getAllBarsNamesCont = async (req, res) => {
    try{
        const allBars = await getAllBars()
        const arr=[]
        allBars.forEach(({barName}) =>{arr.push(barName)})
        if(!allBars){
            return serverResponse(res, 404, { message: "no capble to get all bars name"})
        }

        return serverResponse(res, 200, arr)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all names from categorys'})
    }
}
//ֿֿֿֿ//////////
const getAllBarssCont = async (req, res) => {
    try{
        const allbars = await getAllBars()
       
        if(!allbars){
            return serverResponse(res, 404, { message: "no capble to get all bar's"})
        }

        return serverResponse(res, 200, allbars)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all names from bars'})
    }
}



//end



module.exports = {
    getBarByNameCont,
    getBarByIdCont,
    deleteBarByNameCont,
    createBarCont,
    editBarCont,
    getAllBarsNamesCont,
    getAllBarssCont,
}