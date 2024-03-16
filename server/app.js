import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const PORT = process.env.PORT ?? 8001;
const app = express();

app.use(fileUpload({ createParentPath: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({ origin: process.env.URL_CLIENT, credentials: true }));

app.use(errorMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(join(__dirname, "client")));
  const indexPath = join(__dirname, "client", "index.html");
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}
//pass Qe7GKb5LS1tJFbFC
//docker build -t taskey .
//docker run -d -p 8080:8080 --name taskey --rm taskey
async function start() {
  try {
    await mongoose.connect(process.env.PATH_DB);
    // mongoose.connection.once("open", () => {});
    app.listen(PORT, () =>
      console.log(`Server started http://localhost:${PORT}`)
    );
  } catch (e) {
    new Error("Error connecting to db: " + e.message);
    process.exit(1);
  }
}

start();
