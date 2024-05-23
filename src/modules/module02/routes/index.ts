import { Router } from "express";
import { setExpiredTokenPriceToNull, syncTokens } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello From Module 02");
});
router.get("/sync", syncTokens);
router.get("/set-to-null", setExpiredTokenPriceToNull);

export default router;
