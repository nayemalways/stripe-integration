import server from "./app.js";
import { PORT } from "./app/config/config.js";
import connectDB from "./connection/database.js";


const Bootstrap = () => {
    // MONGODB CONNECTION
    connectDB();

    //RUN YOU APPLICATIONS
    server.listen(PORT, () => {
        console.log(`Your App is running on the port number ${PORT}`);
    });
}



Bootstrap();



