const {
    getAllPackages,
    getPackageId,
    getPackageByPrice,
    addPackages,
    removeAllPackagesFromList,
    removePackageById,
    updatePackageById,
    checkPackageExists,
} = require('../services/Packages-services');
const serverResponse = require('../utils/serverResponse');

const getPackageCont = async (req, res) => {
    try {
        const pkg = await getPackageId(req.params.packageId);
        if (!pkg) {
            return serverResponse(res, 404, { message: "No package found" });
        }
        const { price, packagesContant } = pkg;
        return serverResponse(res, 200, { price, packagesContant });
    } catch (e) {
        console.log(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to get package' });
    }
};

const deletePackageCont = async (req, res) => {
    try {
        const packageToRemove = await removePackageById(req.params.packageId);

        if (!packageToRemove) {
            return serverResponse(res, 404, { message: "The package doesn't exist" });
        }

        return serverResponse(res, 200, { message: "Package removed successfully" });
    } catch (e) {
        console.log(e);  // Check this log for more details
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to remove package' });
    }
};

const deleteAllPackagesFromListCont = async (req, res) => {
    try {
        const result = await removeAllPackagesFromList(req.body.list);

        if (result.deletedCount === 0) {
            return serverResponse(res, 404, { message: "No packages found to remove" });
        }

        return serverResponse(res, 200, { message: "All packages removed successfully" });
    } catch (e) {
        console.log(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to remove packages' });
    }
};

const createPackageCont = async (req, res) => {
    try {
        const newPackageData = { ...req.body };

        if (!newPackageData.packagesContant) {
            return serverResponse(res, 400, { message: "Package content is required" });
        }

        // Check if a package with the same price and content already exists
        const existingPackage = await checkPackageExists(newPackageData.price, newPackageData.packagesContant);
        if (existingPackage) {
            return serverResponse(res, 400, { message: "A package with the same price and content already exists" });
        }

        const newPackage = await addPackages(newPackageData);
        if (!newPackage) {
            return serverResponse(res, 400, { message: "Unable to add new package" });
        }

        return serverResponse(res, 201, newPackage);
    } catch (e) {
        console.log(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to add package' });
    }
};


const editPackageByIdCont = async (req, res) => {
    try {
        const oldPackage = await getPackageId(req.params.packageId);
        if (!oldPackage) {
            return serverResponse(res, 404, { message: "No package found to update" });
        }

        const newPackageData = { ...req.body };
        const newPackage = await updatePackageById(req.params.packageId, newPackageData);
        if (!newPackage) {
            return serverResponse(res, 400, { message: "Unable to update this package" });
        }

        return serverResponse(res, 200, newPackage);
    } catch (e) {
        console.log(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to update package' });
    }
};

const getAllPackagesCont = async (req, res) => {
    try {
        const allPackages = await getAllPackages();

        if (!allPackages || allPackages.length === 0) {
            return serverResponse(res, 404, { message: "No packages found" });
        }

        return serverResponse(res, 200, allPackages);
    } catch (e) {
        console.log(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to get all packages' });
    }
};

module.exports = {
    getPackageCont,
    deletePackageCont,
    deleteAllPackagesFromListCont,
    createPackageCont,
    editPackageByIdCont,
    getAllPackagesCont,
};
