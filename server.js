const express = require ("express");
const dotenv = require ("dotenv");
const  cors = require("cors");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/productroutes");
const errorHandler = require("./src/middleware/errorhandler");
const userRoutes = require('./src/routes/users');
const authRoutes=require("./src/routes/authRoutes");
dotenv.config();
const app = express();
   app.use(express.json());
   app.use(cors());
   app.use("/api/products", productRoutes);
    app.use("/api/auth", authRoutes);
    app.use(errorHandler);
    app.use('/users', userRoutes);
    //app.use("/api/orders",require("./src/routes/orderRoutes"));
    app.use("/api/wishlist",require("./src/routes/wishlistRoutes"));
    app.get('/',( req, res) => {
    res.send("Brain is not working for code");
});
const PORT = process.env.PORT;
connectDB().then(()=> {
    app.listen(PORT, ()=>{
        console.log("server is running on port" + PORT);
    });
});
