import express from 'express';
import formidable from 'express-formidable'
const router = express.Router();

//controllers
import { addProduct, updateProductDetails, removeProduct, fetchProducts } from '../controllers/productController.js'

import { authenticated, authorizeAdmin } from '../middleware/authMiddleWare.js';
import checkId from '../middleware/checkId.js'


router.route('/').get(fetchProducts).post(authenticated, authorizeAdmin, formidable(), addProduct)
router.route('/:id').put(authenticated, authorizeAdmin, formidable(), updateProductDetails)
    .delete(authenticated, authorizeAdmin, removeProduct)


export default router;