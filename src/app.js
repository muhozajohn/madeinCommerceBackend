import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import VendorsRoutes from "./routes/vendorRoutses";
import cartRouter from "./routes/CartRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import adminRoutes from "./routes/adminRoutes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
dotenv.config();

// swager configuration

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "MadeIn Documentation",
      version: "1.0.0",
      description: "MadeIn API Documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          name: "Authorization",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/docs/*.js"],
};

const specs = swaggerJSDoc(options);

// configuration

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes

app.use("/api/zeus/users", userRoutes);
app.use("/api/zeus/products", productRoutes);
app.use("/api/zeus/category", categoryRoutes);
app.use("/api/zeus/vendor", VendorsRoutes);
app.use("/api/zeus/cart", cartRouter);
app.use("/api/zeus/vendorReq", vendorRoutes);
app.use("/api/zeus/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    author: "ZeusTheSaint",
    message: "Welcome to the MadeIn API",
  });
});

export default app;
