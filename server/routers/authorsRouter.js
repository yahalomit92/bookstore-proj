import express from "express";
import authorsFunctions from "../modules/authorsModule.js";

const router = express.Router();

router.get("/", authorsFunctions.getAll);
router.get("/:id", authorsFunctions.get);
router.post("/", authorsFunctions.add);
router.put("/:id", authorsFunctions.update);
router.delete("/:id", authorsFunctions.delete);

export default router;
