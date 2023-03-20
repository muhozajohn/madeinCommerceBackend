import { Vendors } from "../dbase/models";
import { uploadToCloud } from "../helper/cloud";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
// get all vendors
export const getVendor = async (req, res) => {
  try {
    const getAll = await Vendors.findAll();
    return res.status(200).json({
      statusbar: "success",
      message: "Fetched all vendors Successfully",
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

// create vendor
export const createVendor = async (req, res) => {
  let {
    firstName,
    lastName,
    email,
    phone,
    address,
    profile,
    password,
    shopName,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const result = await uploadToCloud(req.file, res);
    const createVendor = await Vendors.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      profile: result.secure_url || "profile.jpg",
      shopName,
      password: hashedPass,
    });
    const token = await Jwt.sign(
      { id: createVendor.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE_DATE }
    );
    return res.status(200).json({
      statusbar: "success",
      message: "Vendor Created Successfully",
      data: createVendor,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Can't create vendor",
      error: error.message,
    });
  }
};

// getOne vendor

export const getOneVendor = async (req, res) => {
  let { id } = req.params;
  try {
    const getOneVendor = await Vendors.findByPk(id);
    if (!getOneVendor) {
      return res.status(404).json({
        statusbar: "error",
        message: "Vendor ID not found",
      });
    }
    const getOne = await Vendors.findByPk();
    return res.status(200).json({
      statusbar: "success",
      message: "Fetched one vendor Successfully",
      data: getOneVendor,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Can't getOne vendor",
      error: error.message,
    });
  }
};

// delete vendor
export const deleteVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const delvendor = await Vendors.findByPk(id);
    if (!delvendor) {
      return res.status(404).json({
        statusbar: "error",
        message: "Vendor ID not found",
      });
    } else {
      const del = await Vendors.destroy({ where: { id: id } });
      return res.status(200).json({
        statusbar: "success",
        message: "Vendor Deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Can't delete vendor",
      error: error.message,
    });
  }
};

// Update vendor
export const updateVendor = async (req, res) => {
  const { id } = req.params;
  try {
    let {
      firstName,
      lastName,
      email,
      phone,
      address,
      profile,
      shopName,
      password,
    } = req.body;
    const getId = await Vendors.findByPk(id);
    if (!getId) {
      return res.status(404).json({
        statusbar: "error",
        message: "Vendor ID not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const img = await uploadToCloud(req.file, res);
    const updateVendor = await Vendors.update(
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        profile: img.secure_url || "profile.jpg",
        password: hashedPass,
        shopName,
      },
      { where: { id } },
      { new: getId }
    );

    return res.status(200).json({
      statusbar: "success",
      message: "Vendor Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "error",
      message: "Can't update vendor",
      error: error.message,
    });
  }
};

// login vendor

export const loginVendor = async (req, res) => {
  try {
    console.log(req.body);
    const user = await Vendors.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Password is incorrect",
      });
    }
    const token = await Jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRE_DATE,
    });
    res.status(200).json({
      message: "Vendors logged in successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      statusbar: "error",
      message: "Can't login vendor",
      error: error.message,
    });
  }
};
