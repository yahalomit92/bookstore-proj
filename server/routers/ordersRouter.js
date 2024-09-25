import express from "express";
import ordersFunctions from "../modules/ordersModule.js";

const router = express.Router();

router.get("/", ordersFunctions.getAll);
router.get("/:id", ordersFunctions.get);
router.get("/by/betweenDates", ordersFunctions.getBetweenDates);
router.get("/by/highestProfitDay", ordersFunctions.getByHighestProfitDay);
router.get(
	"/by/profitBetweenDates",
	ordersFunctions.getTotalProfitBetweenDates
);
router.get("/by/mostPopularBook", ordersFunctions.getMostPopularBook);
router.get("/by/mostPopularAuthor", ordersFunctions.getMostPopularAuthor);
router.get("/by/mostPopularGenres", ordersFunctions.getMostPopularGenres);
router.post("/", ordersFunctions.add);
router.delete("/:id", ordersFunctions.delete);

export default router;
