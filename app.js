import express from "express";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import AccountRouter from "./routes/AccountRouter.js";
import { corsConfig, parseCookies, rateLimiter, securityHeaders } from "./security/SecurityConfig.js";

dotenv.config({
   path: "./.env",
});
const app = express();
const port = process.env.PORT || 3000;

// SECURITY
// Cấu hình bảo mật cơ bản
app.use(securityHeaders);
app.use(rateLimiter);
app.use(corsConfig);
app.use(parseCookies);
app.use(express.json());
// Sử dụng CSRF protection sau cookieParser và trước các route khác
// app.use(csrfProtection);

// API ROOT
app.use("/api/account", AccountRouter);
app.use("/api", userRouter);

// CONNECT DB
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI)

// PORT
app.listen(port, () => {
   console.log("Server is running on port ", port);
})