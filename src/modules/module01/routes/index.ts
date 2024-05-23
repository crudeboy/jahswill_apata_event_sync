import { Router } from "express";
import { fetchEvents, syncWithToken } from "../controllers/nftEventsController";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello From Module 01");
});
router.get("/fetch", fetchEvents)
router.get("/sync", syncWithToken)

export default router