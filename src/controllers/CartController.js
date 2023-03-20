import { Cart, Products } from "../dbase/models";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findAll();
    return res.status(200).json({
      statusbar: "success",
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Cant Get Cart",
      error: error.message,
    });
  }
};

// AddToCart
export const addToCart = async (req, res) => {
  const userID = req.Customers;
  const { id } = req.params;
  try {
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({
        statusbar: "error",
        message: "Product not found",
      });
    }
    let { productId, customerId, numberOfItems } = req.body;
    const cart = await Cart.create({
      productId: product,
      customerId: userID.id,
      numberOfItems,
    });
    Cart.push(cart);
    return res.status(200).json({
      statusbar: "success",
      message: "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Can't Add To Cart",
      error: error.message,
    });
  }
};
