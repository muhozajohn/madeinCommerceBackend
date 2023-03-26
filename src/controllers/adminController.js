import { Op } from "sequelize";
import { Shop, Users } from "../dbase/models";

// Shop creation
export const approvedReq = async (req, res) => {
  const { id } = req.params;
  let { roleId, shopName, shopAddress } = req.body;
  try {
    const getId = await Users.findByPk(id);
    if (!getId) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "Users Id Not Found",
      });
    } else {
      const createShop = await Shop.create({ shopName, shopAddress });
      await Users.update(
        { shopId: createShop.id },
        { where: { id } },
        { new: true }
      );
      return res.status(200).json({
        statusbar: "Success",
        message: "Vendor Shop created And request Sent ",
        data: createShop,
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Failed to Update status",
      error: error.message,
    });
  }
};
// approve
export const approve = async (req, res) => {
  const { id } = req.params;
  let { roleId } = req.body;
  try {
    const getId = await Users.findByPk(id);
    if (!getId) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "Users Id Not Found",
      });
    } else {
      // const createShop = await Shop.create({ shopName, shopAddress });
      await Users.update({ roleId: 2 }, { where: { id } }, { new: true });
      return res.status(200).json({
        statusbar: "Success",
        message: "Vendor Request Accepted",
        data: getId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Failed to Approve status",
      error: error.message,
    });
  }
};

// Reject
export const Reject = async (req, res) => {
  let { shopId } = req.body;
  const { id } = req.params;
  try {
    const getId = await Shop.findByPk(id);
    const userId = await Users.findByPk(id);
    if (!userId) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "Shop Id Not Found",
      });
    }
    if (!getId) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "Shop Id Not Found",
      });
    } else {
      await Users.update({ shopId: null }, { where: { id } }, { new: true });
      const deleteShop = await Shop.destroy({ where: { id } });
      return res.status(200).json({
        statusbar: "Success",
        message: "Request Rejected ",
        data: getId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Failed to Delete Shop",
      error: error.message,
    });
  }
};

// Get All requeted

export const getAllReq = async (req, res) => {
  try {
    const getAll = await Users.findAll({
      where: { roleId: 3, shopId: { [Op.not]: null } },
    });
    return res.status(200).json({
      statusbar: "Sucess",
      message: "All Requested",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Failed To Retrive All Vendors Request",
      error: error.message,
    });
  }
};

// get one Shop
export const getOneShop = async (req, res) => {
  let { id } = req.params;
  try {
    const getOneVendor = await Shop.findByPk(id);
    if (!getOneVendor) {
      return res.status(404).json({
        statusbar: "error",
        message: "Shop ID not found",
      });
    }
    const getOne = await Shop.findByPk();
    return res.status(200).json({
      statusbar: "success",
      message: "Fetched one Shop Successfully",
      data: getOneVendor,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Can't getOne Shop",
      error: error.message,
    });
  }
};
// get all shop
export const getShop = async (req, res) => {
  try {
    const getAll = await Shop.findAll();
    return res.status(200).json({
      statusbar: "success",
      message: "Fetched all Shop Successfully",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Can't get vendor",
      error: error.message,
    });
  }
};

// updateShop

export const updateShop = async (req, res) => {
  const { id } = req.params;
  try {
    let { shopName, shopAddress } = req.body;
    const getId = await Shop.findByPk(id);
    if (!getId) {
      return res.status(404).json({
        statusbar: "error",
        message: "Shop ID not found",
      });
    }
    const updateVendor = await Shop.update(
      {
        shopName,
        shopAddress,
      },
      { where: { id } },
      { new: getId }
    );

    return res.status(200).json({
      statusbar: "success",
      message: "Shop Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Can't update Shop",
      error: error.message,
    });
  }
};
