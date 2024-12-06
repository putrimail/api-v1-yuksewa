import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/config/database.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import FileUpload from "express-fileupload";
import vendorRoute from "./src/routes/vendorRoute.js";
import productRoute from "./src/routes/productRoute.js";
import testimoniRoute from "./src/routes/testimoniRoute.js";
dotenv.config();
const app = express();
const port = process.env.SPORT || 3000;

try {
  await dbConnection.authenticate();
} catch (error) {
  console.error(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(FileUpload());
app.use(express.static("public"));
app.use(vendorRoute);
app.use(productRoute);
app.use(testimoniRoute);

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", msg: "server is runnig" });
});
app.listen(port, "0.0.0.0", () => {
  console.log(`server runnig at http://localhost:${port}`);
});

export default app;
