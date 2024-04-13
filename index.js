import express from "express"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { createServer } from 'node:http';
import path from "node:path";
import { Server } from "socket.io"
import AuthRoute from "./routes/AuthRoute.js"
import ProductRoute from "./routes/ProductRoute.js"
import OrderRoute from "./routes/OrderRoute.js"
import UserRoute from "./routes/UserRoute.js"

// congfirations 
const app = express();
dotenv.config();
app.use(express.json());
const port = 5000;
const server = createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve("./public")));

// mongoDB connection
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log(err)
    })
}

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

io.on('connection', (socket) => {
    console.log('a user connected');
});


//App listen at
app.listen(port, () => {
    connectDB();
    console.log(`app is listenint at port ${port}`)
})


// routes
app.use("/api/v1/auth", AuthRoute)
app.use("/api/v1/user", UserRoute)
app.use("/api/v1/product", ProductRoute)
app.use("/api/v1/order", OrderRoute)