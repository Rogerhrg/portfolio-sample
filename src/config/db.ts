import mongoose from "mongoose";
import colors from 'colors';

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL);
        const url = `${connection.host}:${connection.port}`;
        console.log( colors.cyan(`mongodb Conectado en ${url}`));
    } catch (error) {
        console.log(colors.bgRed.white(error.message));
        process.exit(1); // Exit the process with failure
    }
}