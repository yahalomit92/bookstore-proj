import express from "express";
import booksRouter from "./booksRouter.js";
import ordersRouter from "./ordersRouter.js";
import authorsRouter from "./authorsRouter.js";

const router = express.Router();

router.use("/books", booksRouter);
router.use("/orders", ordersRouter);
router.use("/authors", authorsRouter);

export default router;
