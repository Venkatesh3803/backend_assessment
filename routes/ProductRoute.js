import express from "express"
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../controllers/ProductController.js"
import { verifyToken, verifyTokenAndAuthorization } from "../middleware/jwt.js"
const router = express.Router()

router.post("/", verifyToken, createProduct)
router.get("/single/:id", getProduct)
router.get("/All", getAllProduct)
router.patch("/:id",verifyTokenAndAuthorization, updateProduct)
router.delete("/:id",verifyTokenAndAuthorization, deleteProduct)

export default router