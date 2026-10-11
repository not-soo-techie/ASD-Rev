const { Router } = require("express");
const { getUser, postOpen, updateUser, deleteUser } = require("../controller/user.controller");

const userRouter = Router();

userRouter.post("/", getUser)

// userRouter.route("/:id")
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser)

userRouter.get("/:id", getUser)

userRouter.patch("/:id", updateUser)

userRouter.delete("/:id", deleteUser)

userRouter.get("/open/post", postOpen)

userRouter.post("/", (req, res) => {
    console.log("Router chal gaya");

    res.status(200).json({
        success: true,
        message: "Wohoooo"
    })
})

module.exports = userRouter;