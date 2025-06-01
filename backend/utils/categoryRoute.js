import express from "express";
const router = express.Router()
import { createCategory, updateCategory, listCategory, removeCategory, readCategory } from "../controllers/categoryController.js";
import { authenticated, authorizeAdmin } from '../middleware/authMiddleWare.js'


router.route('/').post(authenticated, authorizeAdmin, createCategory)
router.route('/:category').put(authenticated, authorizeAdmin, updateCategory);
router.route('/:categoryId').delete(authenticated, authorizeAdmin, removeCategory)

router.route('/categories').get(listCategory);

router.route('/id').get(readCategory);
export default router;