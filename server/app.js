// ALL THE DEPENDENCIES 
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import router from "./routes/api.js";
import { REQUEST_LIMIT_TIME, REQUEST_LIMIT_NUMER, MAX_JSON_SIZE, URL_ENCODED, WEB_CACHE } from './app/config/config.js';
import dotenv from "dotenv";
 dotenv.config();


// EXPRESS APP CREATE
const app = express();


// GLOBAL APPLICATIONS MIDDLEWARES
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(hpp());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODED}));


// RATE LIMIT
const limitter = rateLimit({windowMs:REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMER});
app.use(limitter);


// WEB CAHCE
app.set('etag', WEB_CACHE);

// SET APPLICATION STORAGE
app.use(express.static('storage')); // The file will recognize randomly

// SET ROUTING
app.use('/api', router);

// NO ROUTE MATCHES
app.use((req, res, next) => {
	res.status(404).json({message: "No route matches"});
})

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



export default app;