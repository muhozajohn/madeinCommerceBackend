import Jwt from "jsonwebtoken";
import bcrypt, { genSalt, hash } from "bcrypt";
// import { Customers } from "../dbase/models";
import { Users } from "../dbase/models";
import { uploadToCloud } from "../helper/cloud";
import nodemailer from "nodemailer";
import * as crypto from "crypto";

export const signUp = async (req, res) => {
  let { firstName, lastName, email, password, address } = req.body;
  try {
    let emailSubject;

    let emailBody;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_VALUE,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
   let result;

    if(req.file){
    result = await uploadToCloud(req.file, res);
    }
    
  
  const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      address,
      profile:
        result?.secure_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      password: hashedPass,
      emailToken: crypto.randomBytes(64).toString("hex"),
    });
    const token = await Jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRE_DATE,
    });

    emailSubject = "Email verification";
    emailBody = `<p>Dear ${user.firstName},</p>
                   <p>Thanks for registering on our site.</p>
                   <p>Please verify your email to continue...</p>
                    <a href="http://${req.headers.host}/api/zeus/users/verifyEmail/${user.id}">Verify Email</a>
                   `;
    const mailOptions = {
      from: process.env.EMAIL_VALUE,
      to: user.email,
      subject: emailSubject,
      html: emailBody,
    };
    //sending email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res.status(201).json({
      statusbar: "success",
      message: "User created successfully",
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Failed to sign up or Create account",
      message: error.message,
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    // const customer = await Customers.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // if (user.isVerified !== true) {
    //   // Customer not verified
    //   return res.status(401).send({ message: "Account not verified" });
    // }
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
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      statusbar: "error",
      message: "Can't login Users",
      error: error.message,
    });
  }
};

// all Users
export const getAllUsers = async (req, res) => {
  try {
    const user = await Users.findAll();
    return res.status(200).json({
      statusbar: "success",
      message: "Users fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Data not found",
      error: error.message + "  Check Retrive Query  for more details",
    });
  }
};

// get By Id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const getId = await Users.findByPk(id);

    if (!getId) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "The Id You Try To get Not Exist",
      });
    }

    return res.status(200).json({
      statusbar: "Success",
      message: "Single User Retrived Succesfully",
      data: getId,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "failed",
      message: "Data Not Found",
      error: error.message + " Check Retrive Query  for more details",
    });
  }
};

// update

export const upDate = async (req, res) => {
  try {
    const { id } = req.params;
    const getid = await Users.findByPk(id);

    if (!getid) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "User Id not Found",
      });
    }

    let { firstName, lastName, email, password, address } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const result = await uploadToCloud(req.file, res);

    const userUpdate = await Users.update(
      {
        firstName,
        lastName,
        email,
        profile: result?.secure_url || "profile.jpg",
        address,
        password: hashedPass,
      },
      { where: { id: id } },
      { new: true }
    );

    return res.status(201).json({
      statusbar: "Succeful",
      message: "User Updated Succesul",
      data: getid,
    });
  } catch (error) {
    return res.status(500).json({
      statusbar: "Failed",
      message: "Cant not Update This user",
      error: error.message + " check your update Query",
    });
  }
};

// Delete user

export const delUser = async (req, res) => {

    try {
      const { id } = req.params;
      const getid = await Users.findByPk(id);

      if (!getid) {
        return res.status(404).json({
          statusbar: "Failed",
          message: "User Id not Found",
        });
      }

      const deleUsers = await Users.destroy({ where: { id } }, { new: true });
      // console.log(deleUsers);
      return res.status(200).json({
        statusbar: "success",
        message: "User Deleted Successfully",
        dat: getid,
      });
    } catch (error) {
      return res.status(500).json({
        statusbar: "Failed",
        message: "Failed to Delete User",
        error: error.message + "Check your internet And Query",
      });
    }
};

// ================verify email===========================

export const verifyEmail = async (req, res) => {
  try {
    // const token = req.params.token;
    const { id } = req.params;
    console.log("tokrn------", id);
    const user = await Users.findByPk(id);
    console.log("user------", user);
    if (!user) {
      return res.status(400).json({
        message: "Invalid verification token",
      });
    }
    await user.update({ isVerified: true });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_VALUE,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let emailSubject = "Email verified Successfully";
    let emailBody = `<p>Dear ${user.firstName} ${user.lastName}</p>
             <p>Thanks for registering on our site.</p>
             <p>Your email has been successfully verified.</p>`;
    const mailOptions = {
      from: process.env.EMAIL_VALUE,
      to: user.email,
      subject: emailSubject,
      html: emailBody,
    };
    //sending email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res.status(200).json({
      message: "Email verified ,Now you can log in with your email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unexpected error",
    });
  }
};
