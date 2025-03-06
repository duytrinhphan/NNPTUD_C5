const express = require('express');
const router = express.Router();
const Category = require('../schemas/categories');

router.get('/', async (req, res) => {
    try {
        let categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        let newCategory = new Category({
            name: req.body.name,
            description: req.body.description
        });
        await newCategory.save();
        res.json(newCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) return res.status(404).json({ error: "Danh mục không tồn tại" });
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ error: "Danh mục không tồn tại" });
        res.json({ message: "Xóa thành công" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
