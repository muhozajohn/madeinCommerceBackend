import Jwt from "jsonwebtoken";
import bcrypt, { genSalt, hash } from "bcrypt";
import { Customers } from "../dbase/models";
import { uploadToCloud } from "../helper/cloud";
import nodemailer from "nodemailer";

export const signUp = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
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

    const result = await uploadToCloud(req.file, res);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await Customers.create({
      firstName,
      lastName,
      email,
      profile: result?.secure_url || "profile.jpg",
      password: hashedPass,
    });
    const token = await Jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRE_DATE,
    });

    emailSubject = "Email verification";
    emailBody = `<p>Dear ${user.firstName},</p>
                   <p>Thanks for registering on our site.</p>
                   <p>Please verify your email to continue...</p>
                    <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify Email</a>
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
    const user = await Customers.findOne({ where: { email: req.body.email } });

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
      message: "User logged in successfully",
      data: user,
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
    const user = await Customers.findAll();
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
    const getId = await Customers.findByPk(id);

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
    const getid = await Customers.findByPk(id);

    if (!getid) {
      return res.status(404).json({
        statusbar: "Failed",
        message: "User Id not Found",
      });
    }

    let { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const result = await uploadToCloud(req.file, res);

    const userUpdate = await Customers.update(
      {
        firstName,
        lastName,
        email,
        profile: result?.secure_url || "profile.jpg",
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
  {
    try {
      const { id } = req.params;
      const getid = await Customers.findByPk(id);

      if (!getid) {
        return res.status(404).json({
          statusbar: "Failed",
          message: "User Id not Found",
        });
      }

      const deleUsers = await Customers.destroy(
        { where: { id } },
        { new: true }
      );
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
  }
};
