import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "src/database";
import { authRouter, groceryRouter } from "src/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// Function to check if required environment variables are defined
function checkEnvVariables() {
  if (!process.env.PORT) {
    console.error("PORT environment variable is not defined.");
    process.exit(1);
  }
  if (!process.env.DB_URL) {
    console.error("DB_CONNECTION_STRING environment variable is not defined.");
    process.exit(1);
  }
}

// Function to start the server
async function startServer() {
  try {
    // Connect to the MongoDB database
    await connectDB();

    // Enable basic middlewares
    app.use(express.json());
    app.use(cors());

    // Route for authentication
    app.use("/auth", authRouter);

    // Route for grocery-related operations
    app.use("/grocery", groceryRouter);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

checkEnvVariables();
startServer();
