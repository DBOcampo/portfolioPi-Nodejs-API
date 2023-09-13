import { response } from "express";
import { pool } from "../db.js";

export const getMainInfo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM main_info");
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const createMainInfo = async (req, res) => {
  const { nombre, ocupacion } = req.body;

  const mainInfo = {
    nombre: nombre || "",
    ocupacion: ocupacion || ""
  };
  try {
    const [result] = await pool.query(
      "INSERT INTO main_info (nombre, ocupacion) VALUES (?, ?)",
      [mainInfo.nombre, mainInfo.ocupacion]
    );
    mainInfo["id"] = result.insertId;
    console.log(mainInfo);
    return res.send(mainInfo);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};


export const editMainInfo = async (req, res) => {
  const id = req.params.id;
  const { nombre, ocupacion } = req.body;

  const mainInfo = {
    nombre: nombre || undefined,
    ocupacion: ocupacion || undefined
  };
  try {
    const [rows] = await pool.query(
      "UPDATE main_info SET nombre = IFNULL(?, nombre) , ocupacion = IFNULL(?, ocupacion) WHERE id = ?",
      [mainInfo.nombre, mainInfo.ocupacion,  id]
    );

    if (rows.affectedRows < 1) {
      return res.status(404).send("Not found");
    }
    console.log(mainInfo);
    res.send(mainInfo);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
