const express = require("express");
const userRouter = require("./routes/user.route");
const faltu = require("./middlewares/faltuMiddleware");

let users = [
    {
        "id": 1,
        "name": "A",
        "email": "a.c"
    },
    {
        "id": 2,
        "name": "B",
        "email": "b.c"
    },
]

const app = express();

app.use(express.json());


// Routing Middleware

app.use("/users", userRouter)


// Middleware

app.use("/users", (req, res, next) => {
    console.log("User aa raha h");

    // req.body;
    // req.method;

    res.status(404).json({
        success: false,
        message: "Aukaad ke bahar"
    })

    next();
})

app.use("/users", (req, res, next) => {
    console.log("System h");
    next()
})

app.get("/users", async (req, res) => {
    // console.log("Get /users");
    // await func(req, res);

    // next();

    res.status(200).json({
        data: "Users data"
    })
})





// const func = async (req, res) => {
//     console.log("User aa raha h");

//     // req.body;
//     // req.method;

//     return res.status(404).json({
//         success: false,
//         message: "Aukaad ke bahar"
//     })
// }



// app.use(express.urlencoded())

// express().get("/", (req, res) => {
//     res.send("Hello from server")
// })

app.get("/", faltu, (req, res) => {
    res.send("Hello from server")
})

app.post("/users", (req, res) => {
    // func(req, res)
    const { name, email } = req.body;

    if(!name || !email) {
        return res.status(400).json({
            success: false,
            error: "All fields are required"
        })
    }

    let user = req.body;
    user.id = users.length + 1;

    users.push(user);

    return res.status(201).json({
        success: true,
        message: "User has been created successfully",
        user
    })

})


app.patch("/users/:id", (req, res) => {
    try {
        const userId = Number(req.params.id);

        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required"
            })
        }

        let user = users.filter(e => e.id === userId)

        if(user.length == 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const { name } = req.body;

        if(!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            })
        }

        const updatedUser = users.map(user => 
            user.id === userId ? { ...user, name } : user
        );

        users = updatedUser;

        console.log("Updated users: ", updatedUser);
        console.log("Old users: ", users);

        return res.status(200).json({
            success: true,
            message: "User updated successfully"
        })

        // let existingUser = users.find((user) => 
        //     user.id === userId
        // )
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
})


const PORT = 4848;

// express().listen(PORT, () => {
//     console.log("Server running");
// })

app.listen(PORT, () => {
    console.log("Server running");
})


// Routing middleware
// In built middleware
// Third party middleware
// Error handling middleware


// Users
// Post
// Comments
// Replies
// Stories