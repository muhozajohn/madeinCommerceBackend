import { Category } from "../dbase/models";

export const createCat = async (req, res) => {
  let { categoryName, categoryDescrptiom } = req.body;
  try {
    const category = await Category.create({
      categoryName,
      categoryDescrptiom,
    });
    return res.status(201).json({
      statusbar: "succes",
      message: "Category Created Well",
      data: {
        body: category,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Failed to Create Category",
      error: error.message,
    });
  }
};

// getAll category

export const getAllCat = async (req, res) => {
  try {
    const getall = await Category.findAll();
    return res.status(200).json({
      statusbar: "Success",
      message: "Category Fetched Succesfully",
      data: {
        body: getall,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "failed",
      message: "Can't Get all Category",
      error: error.message,
    });
  }
};

// getOneCat

export const getOneCat = async (req, res) => {
  const { id } = req.params;
  const getPk = await Category.findByPk(id);
  try {
    if (!getPk) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "Category Id Not Found",
      });
    }
    const getById = await Category.findAll({ where: { id } });
    return res.status(200).json({
      statusbar: "Success",
      message: "One Geted Well !!",
      data: {
        body: getById,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Cant Get One Category",
      error: error.message,
    });
  }
};

// delete

export const delCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const getPk = await Category.findByPk(id);
    if (!getPk) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "Category Id You Want To Delete Not Found",
      });
    } else {
      const delId = await Category.destroy({ where: { id } }, { new: true });
      return res.status(201).json({
        statusbar: "succes",
        message: "Data Deleted Wel!! ",
        data: {
          body: getPk,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Can not Delete  This Category",
      error: error.message,
    });
  }
};

// update

export const upCategory = async (req, res) => {
  const { id } = req.params;
  let { categoryName, categoryDescrptiom } = req.body;
  try {
    const getId = await Category.findByPk(id);
    if (!getId) {
      return res.status(404).json({
        statusbar: "Error",
        message: "ID Not Found",
      });
    }
    const upDate = await Category.update(
      { categoryName, categoryDescrptiom },
      { where: { id } },
      { new: true }
    );
    return res.status(200).json({
      statusbar: "Success",
      message: "Category Updated Well ",
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Can not Update This Category",
      error: error.message,
    });
  }
};
