const {
    getAllDailyStatistics,
    getAllDailyStatisticsWithSameAttribute,
    getDailyStatisticByBar,
    getDailyStatisticByDate,
    getDailyStatisticByDay,
    getDailyStatisticByPackage,
    getDailyStatisticByQuantity,
    updateDailyStatistic,
    updateDailyStatisticById,
    removeDailyStatisticsByAttribute,
    removeSpacificDailyStatistic,
    addDailyStatistic,
    getDailyStatistic,
} = require('../services/DailyStatistic-services')
const serverResponse = require('../utils/serverResponse')

const getDailyStatisticCont = async (req, res) => {
    try{
        const DailyStatistic = await getDailyStatistic(req.params.day,req.params.bar,req.params.package)
        const {day, bar,package,date,quantity,rebuy} = DailyStatistic
        if(!DailyStatistic){
            return serverResponse(res, 404, { message: "no daily statistic found"})
        }
        return serverResponse(res, 200, {day, bar,package,date,quantity,rebuy})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get this statistic '})
    }
}
const deleteDailyStatisticCont = async (req, res) => {
    try{
        const DailyStatistic = await removeSpacificDailyStatistic(eq.params.day,req.params.bar,req.params.package)

        if(!DailyStatistic){
            return serverResponse(res, 404, { message: "the DailyStatistic dosent exsist"})
        }

        return serverResponse(res, 200,  { message: "DailyStatistic remove seccesfully"})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to remove DailyStatistic'})
    }
}
const createDailyStatisticCont = async (req, res) => {
    try{
        const newDailyStatistic= {...req.body}
            if((newDailyStatistic.bar=={})||(newDailyStatistic.day=="")||(newDailyStatistic.package=={})){
             return serverResponse(res, 404, { message: "no capble to add new category becose you dont fill all parameters"})
        }
        const oldDailyStatistic = await getDailyStatistic(req.params.day,req.params.bar,req.params.package)
             if(!oldDailyStatistic){
                const dailyStatistic = await addDailyStatistic(newDailyStatistic)
                if(!newDailyStatistic){
                    return serverResponse(res, 404, { message: "no capble to add new Daily Statistic"})
                }
                return serverResponse(res, 200,newcategory)
           }
           else
           {
            const dailyStatistic=await updateDailyStatisticById(oldDailyStatistic._id,{quantity:oldDailyStatistic.quantity+1})
           }

        return serverResponse(res, 200, dailyStatistic)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to add this dailyStat'})
    }
}
const editdailyStatisticCont = async (req, res) => {
    try{
        const DailyStatistic = await getDailyStatistic(req.params.day,req.params.bar,req.params.package)

        if(!DailyStatistic){
            return serverResponse(res, 400, { message: "no Daily Statistic found"})
        }
        const newDailyStatistic={...req.body};
        const updatedDailyStatistic = await updateDailyStatistic(DailyStatistic._id,newDailyStatistic);
        if(!updatedDailyStatistic){
            return serverResponse(res, 400, { message: "update sucsesfuly dDaily Statistic"})
        }

        return serverResponse(res, 200, updatedDailyStatistic)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update Daily Statistic'})
    }
}
//not needed we can just get them all and in the front dill with thet
const getAllDailyStatisticPackagesCont = async (req, res) => {
    try{
        const allDailyStatistic = await getAllDailyStatistics()
        const arr=[]
        allDailyStatistic.forEach(({package}) =>{arr.push(package)})
        if(!allDailyStatistic){
            return serverResponse(res, 404, { message: "no capble to get all Daily Statistic's"})
        }

        return serverResponse(res, 200, arr)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all names from Daily Statistic'})
    }
}
const getAllDailyStatisticCont = async (req, res) => {
    try{
        const allDailyStatistic = await getAllDailyStatistics()
       
        if(!allDailyStatistic){
            return serverResponse(res, 404, { message: "no capble to get all Daily Statistic's"})
        }

        return serverResponse(res, 200, allDailyStatistic)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all names from all Daily Statistic'})
    }
}



module.exports = {
    getDailyStatisticCont,
    deleteDailyStatisticCont,
    editdailyStatisticCont,
    createDailyStatisticCont,
    getAllDailyStatisticPackagesCont,
    getAllDailyStatisticCont,
}