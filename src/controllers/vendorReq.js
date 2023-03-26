import { VendorReq } from "../dbase/models";

export const VendorRequest = async (req, res) => {
  const vendorData = req.Users;
  let { shopName, shopAddress } = req.body;
  try {
    const vendorreq = await VendorReq.create({
      shopName,
      shopAddress,
      vendorData: vendorData,
      roleId: vendorData.roleId,
      userId: vendorData.id,
    });
    return res.status(201).json({
      statusbar: "Success",
      message: "Vendor Request Send",
      data: vendorreq,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Can't Creat This Request",
      error: error.message,
    });
  }
};
