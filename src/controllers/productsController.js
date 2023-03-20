import { Products } from "../dbase/models";
import { uploadToCloud } from "../helper/cloud";

export const createProduct = async (req, res) => {
  const Vendor = req.Vendors;
  let {
    productName,
    productImage,
    productCategory,
    productPrice,
    productDiscount,
    productDescription,
    productTags,
    vendorId,
  } = req.body;

  try {
    const result = await uploadToCloud(req.file, res);
    const product = await Products.create({
      productName,
      productImage: result.secure_url || "TheSaint.jpg",
      productCategory,
      productPrice,
      productDiscount,
      productDescription,
      productTags,
      vendorId: Vendor.id,
    });

    return res.status(201).json({
      statusbar: "success",
      mesasge: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      mesasge: "Failed to create product",
      error: error.mesasge + " Check Create Product Query",
    });
  }
};

// get all products

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    return res.status(200).json({
      statusbar: "success",
      mesasge: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      mesasge: "Failed to get all products",
      error: error.mesasge + " Check Get All Products Query",
    });
  }
};

// getOne

export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const getOne = await Products.findByPk(id);
    if (!getOne) {
      return res.status(404).json({
        statusbar: "error",
        mesasge: "Product Id not Found",
      });
    }

    return res.status(200).json({
      statusbar: "success",
      mesasge: "one products Geted Well!!",
      data: getOne,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "failed",
      mesasge: "Failed to getOne",
      error: error.mesasge,
    });
  }
};

// delete

export const deletePoducts = async (req, res) => {
  try {
    let { id } = req.params;
    const getId = await Products.findByPk(id);
    if (!getId) {
      return res.status(404).json({
        statusbar: "error",
        mesasge: "Product Id not Found",
      });
    }
    const delProduct = await Products.destroy(
      { where: { id } },
      { new: getId }
    );
    return res.status(200).json({
      statusbar: "success",
      mesasge: "Product deleted successfully",
      data: delProduct,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "failed",
      mesasge: "Can't Delete This Product",
      error: error.mesasge,
    });
  }
};

// upDate

export const updateProduct = async (req, res) => {
  let {
    productName,
    productImage,
    productCategory,
    productPrice,
    productDiscount,
    productDescription,
    productTags,
    // vendorId,
  } = req.body;
  // const Vendor = req.Vendors;
  const { id } = req.params;
  const getOne = await Products.findByPk(id);
  if (!getOne) {
    return res.status(404).json({
      statusbar: "error",
      mesasge: "Product Id not Found",
    });
  }
  try {
    const result = await uploadToCloud(req.file, res);
    const updateProduct = await Products.update(
      {
        productName,
        productImage: result.secure_url || "TheSaint.jpg",
        productCategory,
        productPrice,
        productDiscount,
        productDescription,
        productTags,
        // vendorId: Vendor.id,
      },
      { where: { id } },
      { new: true }
    );

    return res.status(200).json({
      statusbar: "success",
      mesasge: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "failed",
      mesasge: "Can't Update This Product",
      error: error.mesasge,
    });
  }
};
