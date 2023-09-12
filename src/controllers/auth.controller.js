import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js'

export const register = async(req, res) => {
  const {nombre, correo, password} = req.body;
  try {
    const userFound = await User.findOne({correo});
    if(userFound) 
      return res.status(400).json(["El correo ya esta en uso"]);


    const passwordHash = await bcrypt.hash(password, 10)
    const newUser=  new User({
    nombre,
    correo,
    // username,
    // email,
    password: passwordHash,
  });
  const userSaved =  await newUser.save();// Guardamos el usuario
  const token = await createAccessToken({id:userSaved._id});// Creamos un token
  res.cookie('token', token)
  res.json({
    id: userSaved._id, 
    nombre: userSaved.nombre,
    correo: userSaved.correo,
    createdAt: userSaved.createdAt,
    updatedAt: userSaved.updatedAt,
  });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

export const login = async(req, res) => {
  const {correo, password} = req.body;

  try {
    const userFound = await User.findOne({ correo})

    if (!userFound) return res.status(400).json({message: "User not found"});

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({message: "Incorrect password"});

    const token = await createAccessToken({id: userFound._id});
    res.cookie('token', token);
    res.json({
      id: userFound._id, 
      nombre: userFound.nombre,
      correo: userFound.correo,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
    } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

export const logout = (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)
  
  if(!userFound) return res.status(400).json({ message: "Usuario no encontrado"});
  return res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    correo: userFound.correo,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt, 
  });
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies

  if (!token) return res.status(401). json({ message: "No autorizado"});

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id)
    if(!userFound) return res.status(401).json({ message: "No autorizado"});

    return res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      correo: userFound.correo,
    });
  });
};

