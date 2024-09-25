import express from "express";
import booksFunctions from "../modules/booksModule.js";

const router = express.Router();

router.get("/", booksFunctions.getAll);
router.get("/by/genre", booksFunctions.getGenres);
router.get("/:id", booksFunctions.get);
router.get("/by/genre/:genre", booksFunctions.getByGenre);
router.post("/", booksFunctions.add);
router.put("/:id", booksFunctions.update);
router.delete("/:id", booksFunctions.delete);

export default router;
