import { response } from "express";
import { pool } from "../db.js";


export const getInfo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM info_card");
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const createInfo = async (req, res) => {
  const { edad, sobremi, ubicacion } = req.body;

  const info = {
    edad: edad || "",
    sobremi: sobremi || "",
    ubicacion: ubicacion || "",
  };
  try {
    const [result] = await pool.query(
      "INSERT INTO info_card (edad, sobremi, ubicacion) VALUES (?, ?, ?)",
      [info.edad, info.sobremi, info.ubicacion]
    );
    info["id"] = result.insertId;
    console.log(info);
    return res.send(info);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const editInfo = async (req, res) => {
  const id = req.params.id;
  const { edad, sobremi, ubicacion } = req.body;

  const info = {
    edad: edad || undefined,
    sobremi: sobremi || undefined,
    ubicacion: ubicacion || undefined,
  };
  try {
    const [rows] = await pool.query(
      "UPDATE info_card SET edad = IFNULL(?, edad) , sobremi = IFNULL(?, sobremi) , ubicacion = IFNULL(?, ubicacion) WHERE id = ?",
      [info.edad, info.sobremi, info.ubicacion, id]
    );

    if (rows.affectedRows < 1) {
      return res.status(404).send("Not found");
    }
    console.log(info);
    res.send(info);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
