import { response } from "express";
import { pool } from "../db.js";

export const getProyect = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM proyects");
    return res.json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Something went wrong",
    });
  } 
};

export const createProyect = async (req, res) => {
  const { descripcion, imgurl, link, nombre } = req.body;

  const proyect = {
    descripcion: descripcion || "",
    imgurl: imgurl || "",
    link: link || "",
    nombre: nombre || "",
  };
  try {
    const [result] = await pool.query(
      "INSERT INTO proyects (descripcion, imgurl, link, nombre) VALUES (?, ?, ?, ?)",
      [proyect.descripcion, proyect.imgurl, proyect.link, proyect.nombre]
    );
    proyect["id"] = result.insertId;
    console.log(proyect);
    return res.send(proyect);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const deleteProyect = async (req, res) => {
  const id = req.params.id;

  try {
    const [item] = await pool.query("SELECT * FROM proyects WHERE id = ?", [
      id,
    ]);

    const [result] = await pool.query("DELETE FROM proyects WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows < 1) {
      return res.status(404).send("Not found");
    }

    console.log(item[0]);

    return res.send(item[0]);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const editProyect = async (req, res) => {
  const id = req.params.id;
  const { descripcion, imgurl, link, nombre } = req.body;

  const proyect = {
    descripcion: descripcion || undefined,
    imgurl: imgurl || undefined,
    link: link || undefined,
    nombre: nombre || undefined,
  };
  try {
    const [rows] = await pool.query(
      "UPDATE proyects SET descripcion = IFNULL(?, descripcion) , imgurl = IFNULL(?, imgurl) , link = IFNULL(?, link), nombre = IFNULL(?, nombre)  WHERE id = ?",
      [proyect.descripcion, proyect.imgurl, proyect.link, proyect.nombre, id]
    );

    if (rows.affectedRows < 1) {
      return res.status(404).send("Not found");
    }
    console.log(proyect);
    res.send(proyect);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
