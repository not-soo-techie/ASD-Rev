import http from "http";
import { URL } from "url";

// GET /users/:id

const users = [
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

const server = http.createServer((req, res) => {
    // Method & Path
    // req.method -> Method
    // req.url -> Path

    console.log("Path: ", req.url);

    const obj = {
        success: true,
        message: "Chal toh raha h"
    }

    if(req.url.startsWith("/users")) {
        if(req.method === "GET") {
            let userId = Number(req.url.split("/")[2]);

        } else if(req.method === "PATCH") {
            // /users/:id
            try {

                let userId = Number(req.url.split("/")[2]);

                if(!userId) {
                    res.statusCode = 400;

                    return res.end("Id is required")
                }

                let existingUser = users.filter(user => user.id === userId);
                console.log("Exi: ", existingUser);

                if(existingUser.length == 0) {
                    res.statusCode = 404;

                    return res.end("User not found")
                }

                let bodyData = "", data;

                req.on("data", (chunk) => {
                    bodyData += chunk.toString();

                })

                req.on("end", () => {

                    data = JSON.parse(bodyData);

                    data.id = users.length + 1;
    
                    users.forEach(element => {
                        if(element.id === userId) {
                            element = data
                        }
                    });

                    res.statusCode = 200;

                    res.end("Maze hi maze")

                })

                
                
            } catch (error) {
                res.statusCode = 500;
                res.setHeader("content-type", "application/json")

                res.end(JSON.stringify({"error": error.message}))
            }

            
        }
    }

    // GET "/"
    if(req.url === "/") {
        if(req.method === "GET") {
            console.log("object");

            res.statusCode = 200;
            res.setHeader("content-type", "application/json")

            // res.writeHead(200, {
            //     "content-type": "text/plain"
            // })

            // res.write("Thik h bhai")
            // res.write("Thik h bhai")
            // res.write("Thik h bhai")
            // res.end("Okay")
            // res.write("Thik h bhai")

            res.end(JSON.stringify(obj))
        }
    }

    if(req.url === "/users") {
        if(req.method === "POST") {
            let bodyData = "";

            req.on("data", (chunk) => {
                bodyData += chunk.toString();
            })

            req.on("end", () => {
                console.log("Data: ", bodyData);
                // console.log(bodyData?.name);
                // console.log("Type: ", typeof bodyData);
                let data = JSON.parse(bodyData);

                const { name, email } = data;

                if(!name || !email) {
                    res.statusCode = 400;

                    return res.end("All fields are required")
                }

                data.id = users.length + 1;

                users.push(data)

                console.log("New data: ", users);
                res.end("Done with post request")
            })
        }
    }
})

server.listen(4747, () => {
    console.log("Server running");
})


