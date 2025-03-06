var express = require('express');
var router = express.Router();
let productModel = require('../schemas/product');

/* GET products listing. */
router.get('/', async function(req, res, next) {
  try {
    let products = await productModel.find({});
    res.status(200).send({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* POST create a new product */
router.post('/', async function(req, res, next) {
  try {
    let newProduct = new productModel({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category
    });
    await newProduct.save();
    res.status(200).send({
      success: true,
      data: newProduct
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({ success: false, message: 'Không tìm thấy sản phẩm' });
    }
    res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    let deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send({ success: false, message: 'Không tìm thấy sản phẩm' });
    }
    res.status(400).send({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;