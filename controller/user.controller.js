const getUser = async (req, res) => {
    console.log("Get route chal gaya");

    res.status(200).json({
        success: true,
        message: "Systummmm"
    })
}

const updateUser = async (req, res) => {
    
}

const deleteUser = async (req, res) => {

}

const postOpen = async (req, res) => {
    console.log("Get route chal gaya");
    
    // User lao 

    // Post lao

    // Post ke likes lao

    // Post ke comments lao

    // Post ke comments ke replies lao

    res.status(200).json({
        success: true,
        message: "Systummmm"
    })
}

module.exports = {
    getUser,
    postOpen,
    updateUser,
    deleteUser
}