import { formatError } from "../utils/formatError.js";
import { Admin } from "../models/admin.js";
import { generateUniqueID } from "../utils/GenerateId.js";
import { SendEmailAdmin } from "../helpers/sendConfirmationEmail.js";

export const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      throw new Error("Email ya registrado");
    }

    admin = new Admin({
      email,
      password,
      admission: Date.now(),
    });

    await admin.save();
    return res.status(200).json({ msg: "Admin creado" });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    let admins = await Admin.find();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    let admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const updateAdminById = async (req, res) => {
  const { id } = req.params;

  const { name, lastName, country, state } = req.body;
  try {
    let admin = await Admin.findByIdAndUpdate(
      id,
      {
        name: name,
        lastName: lastName,
        country: country,
        state: state,
      },
      { new: true }
    );
    res.status(200).json({ admin });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const updateAdminsEmail = async (req, res) => {
  try {
    const { dataMensaje } = req.body;
    const id = generateUniqueID();
    dataMensaje.id = id;
    let admin = await Admin.updateMany(
      {},
      { $push: { Notifications: dataMensaje } }
    );
    res.status(200).json({ admin });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );

    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findOne({});
    const index = admin.Notifications.findIndex((el) => el.id === id);
    if (index !== -1) {
      admin.Notifications.splice(index, 1); //elimino el objeto
      await admin.save();

      return res
        .status(200)
        .json({ message: "Elemento eliminado correctamente" });
    }

    return res.status(404).json({ message: "Elemento no encontrado" });
  } catch (error) {
    return res.status(400).json(formatError(error.message));
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { email, user_message, Admin_message } = req.body;

    await SendEmailAdmin(email, user_message, Admin_message);
    return res.status(200).json({ message: "mensaje enviado correctamente" });
  } catch (error) {
    return res.status(400).json(formatError(error.message));
  }
};
