const Product = require('../models/Product');
const Manufacturer = require('../models/Manufacturer');

const buildViewData = async (overrides = {}) => {
  const manufacturers = await Manufacturer.find().sort({ Id: 1 }).lean();
  const products = await Product.find().sort({ Id: 1 }).lean();

  return {
    message: null,
    error: null,
    manufacturers,
    products,
    query: {
      name: '',
      size: '',
      status: '',
      manufacturerId: '',
    },
    ...overrides,
  };
};

exports.seedManufacturers = async (req, res) => {
  try {
    const data = [
      { Id: 1, Name: 'Rolex' },
      { Id: 2, Name: 'Patek Philippe' },
      { Id: 3, Name: 'Hublot' }
    ];

    for (const item of data) {
      await Manufacturer.updateOne(
        { Id: item.Id },
        { $set: item },
        { upsert: true }
      );
    }

    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const data = await buildViewData();
    res.render('products', data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const manufacturerId = Number(req.body.ManufacturerId);

    const manufacturerExists = await Manufacturer.findOne({ Id: manufacturerId });
    if (!manufacturerExists) {
      const data = await buildViewData({
        error: 'ManufacturerId does not exist',
      });
      return res.status(400).render('products', data);
    }

    const productData = {
      Id: Number(req.body.Id),
      Name: req.body.Name,
      Quantity: Number(req.body.Quantity),
      Price: Number(req.body.Price),
      Size: req.body.Size,
      Status: req.body.Status === 'true' || req.body.Status === 'on',
      ExpirationDate: req.body.ExpirationDate,
      ManufacturerId: manufacturerId,
    };

    await Product.create(productData);

    const data = await buildViewData({
      message: 'Add product successfully',
    });
    return res.render('products', data);
  } catch (err) {
    const data = await buildViewData({
      error: err.message,
    });
    return res.status(400).render('products', data);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const manufacturerId = Number(req.body.ManufacturerId);

    const manufacturerExists = await Manufacturer.findOne({ Id: manufacturerId });
    if (!manufacturerExists) {
      const data = await buildViewData({
        error: 'ManufacturerId does not exist',
      });
      return res.status(400).render('products', data);
    }

    const updateData = {
      Id: Number(req.body.Id),
      Name: req.body.Name,
      Quantity: Number(req.body.Quantity),
      Price: Number(req.body.Price),
      Size: req.body.Size,
      Status: req.body.Status === 'true' || req.body.Status === 'on',
      ExpirationDate: req.body.ExpirationDate,
      ManufacturerId: manufacturerId,
    };

    await Product.findByIdAndUpdate(req.params.mongoId, updateData, {
      new: true,
      runValidators: true,
    });

    const data = await buildViewData({
      message: 'Update product successfully',
    });
    return res.render('products', data);
  } catch (err) {
    const data = await buildViewData({
      error: err.message,
    });
    return res.status(400).render('products', data);
  }
};