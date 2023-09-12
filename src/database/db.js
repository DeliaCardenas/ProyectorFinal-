//const mongoose = require ("mongoose");
import mongoose from "mongoose";

export const connectDB = async () =>{
  try{
    await mongoose.connect("mongodb+srv://Delia:ProyectoFinal@cluster0.umoldv8.mongodb.net/");
    //await mongoose.connect(process.env.CONNECTION_STRING); Por que carajos no me conecta aca???????????????
    console.log(">>> DB esta conectada")
  } catch (error){
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};
