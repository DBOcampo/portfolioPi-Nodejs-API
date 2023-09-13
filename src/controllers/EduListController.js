import { response } from "express";
import { pool } from "../db.js";

export const getList = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM edu_list");
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const createList = async (req, res) => {
  const { institucion, titulo, periodo } = req.body;

  const list = {
    institucion: institucion || "",
    titulo: titulo || "",
    periodo: periodo || "",
  };

  try {
    const [result] = await pool.query(
      "INSERT INTO edu_list (institucion, periodo, titulo) VALUES (?, ?, ?)",
      [list.institucion, list.titulo, list.periodo]
    );
    list["id"] = result.insertId;
    console.log(list);
    return res.send(list);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const deleteList = async (req, res) => {
  const id = req.params.id;

  try {
    const [item] = await pool.query("SELECT * FROM edu_list WHERE id = ?", [
      id,
    ]);

    const [result] = await pool.query("DELETE FROM edu_list WHERE id = ?", [
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

export const editList = async (req, res) => {
  const id = req.params.id;
  const { institucion, titulo, periodo } = req.body;
  const list = {
    institucion: institucion || undefined,
    titulo: titulo || undefined,
    periodo: periodo || undefined,
  };

  try {
    const [rows] = await pool.query(
      "UPDATE edu_list SET institucion = IFNULL(?, institucion) , titulo = IFNULL(?, titulo) , periodo = IFNULL(?, periodo)  WHERE id = ?",
      [list.institucion, list.titulo, list.periodo, id]
    );

    if (rows.affectedRows < 1) {
      return res.status(404).send("Not found");
    }
    res.send(list);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
