import express from "express";
import { createOrder, deleteOrder, getAllOrder, getOrder, updateOrder } from "../controllers/OrdersController.js";
import { verifyTokenAndAuthorization } from "../middleware/jwt.js";
const router = express.Router();

router.post("/", verifyTokenAndAuthorization, createOrder);
router.get("/single/:id", getOrder);
router.get("/All", getAllOrder);
router.patch("/:id", verifyTokenAndAuthorization, updateOrder);
router.delete("/:id", verifyTokenAndAuthorization, deleteOrder);

export default router