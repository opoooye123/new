import express from "express";
const router = express.Router();
import {
    createCategory,
    updateCategory,
    listCategory,
    removeCategory,
    readCategory,
} from "../controllers/categoryController.js";
import { authenticated, authorizeAdmin } from "../middleware/authMiddleWare.js";

// List all categories - define this route first
router.route("/categories").get(listCategory);

// Create new category
router.route("/").post(authenticated, authorizeAdmin, createCategory);

// Update category by ID
router.route("/:categoryId").put(authenticated, authorizeAdmin, updateCategory);

// Delete category by ID
router.route("/:categoryId").delete(authenticated, authorizeAdmin, removeCategory);

// Get single category by ID
router.route("/:categoryId").get(readCategory);

export default router;
