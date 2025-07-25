import Category from "../model/categoryModel.js";
import asyncHandler from "../middleware/AsyncHandler.js";


const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.json({ error: "Name is required" })
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ error: "Already exists" })
        }

        const category = await new Category({ name }).save();
        res.json(category)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findOne({ _id: categoryId })

        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }

        category.name = name;

        const updatedCategory = await category.save();

        res.json(updatedCategory)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
});

const removeCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId);

      if (!removed) {
          return res.status(404).json({ error: "Category not found" });
      }

      // Return a success message and the deleted category's name (optional)
      res.status(200).json({ message: "Category deleted", name: removed.name });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});


const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({})
        res.json(all)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id })
        res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(404).json(error.message)
    }
})

export { createCategory, updateCategory, removeCategory, listCategory, readCategory }