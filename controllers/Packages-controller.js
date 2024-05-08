const {
    getAllPackages,
    getPackageId,
    getPackageByPrice,
    addPackages,
    removeAllPackagesFromList,
    removePackageById,
    updatePackageById,
} = require('../services/Packages-services')
const serverResponse = require('../utils/serverResponse')

const getPackageCont = async (req, res) => {
    try{
        const package = await getPackageId(req.params._id)
        const {price, packagesContant} = package
        if(!package){
            return serverResponse(res, 404, { message: "no package found"})
        }
        return serverResponse(res, 200, {price, packagesContant})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to get package'})
    }
}

const deletePackageCont = async (req, res) => {
    try{
        const packageToRemove = await removePackageById(req.params._id)

        if(!packageToRemove){
            return serverResponse(res, 404, { message: "the package To Remove doesn't exist"})
        }

        return serverResponse(res, 200,  { message: "package To Remove ,removed successfully"})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to remove package'})
    }
}

const deleteAllPackagesFromListCont = async (req, res) => {
    try{
        const packageToRemove = await removeAllPackagesFromList(req.body.list)

        if(!packageToRemove){
            return serverResponse(res, 404, { message: "the packages To Remove doesn't exist"})
        }

        return serverResponse(res, 200,  { message: "packages To Remove ,all removed successfully"})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to remove all package in list'})
    }
}

const createPackageCont = async (req, res) => {
    try{
        const newPackageData = {...req.body}
        if(newPackageData.packagesContant === ""){
            return serverResponse(res, 404, { message: "unable to add new package because you provided no content"})
        }

            const newCategory = await addPackages(newPackageData)
            if(!newCategory){
                return serverResponse(res, 404, { message: "unable to add new package"})
            }
            return serverResponse(res, 200, newCategory)

    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to add category'})
    }
}


const editPackageByIdCont = async (req, res) => {
    try{
        const oldPackage = await getPackageId(req.params.categoryId)
        if(!oldPackage){
            return serverResponse(res, 400, { message: "no pakge  found to update"})
        }

        const newPackageData = {...req.body};
        const newPackage = await updatePackageById(oldPackage._id, newPackageData);
        if(!newPackage){
            return serverResponse(res, 400, { message: "unable to update this package"})
        }

        return serverResponse(res, 200, newPackage)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to update package'})
    }
}

const getAllPackagesCont = async (req, res) => {
    try{
        const allPackages = await getAllPackages()
       
        if(!allPackages){
            return serverResponse(res, 404, { message: "unable to get all packages"})
        }

        return serverResponse(res, 200, allPackages)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to get all names from packages'})
    }
}




module.exports = {
    getPackageCont,
    deletePackageCont,
    deleteAllPackagesFromListCont,
    createPackageCont,
    editPackageByIdCont,
    getAllPackagesCont,
}
