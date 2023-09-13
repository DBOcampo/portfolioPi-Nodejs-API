import { response } from "express";
import { pool } from "../db.js";

export const getList = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM exp_list");
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const createList = async (req, res) => {
  const { empresa, periodo, puesto } = req.body;

  const list = {
    empresa: empresa || "",
    periodo: periodo || "",
    puesto: puesto || "",
  };

  try {
    const [result] = await pool.query(
      "INSERT INTO exp_list (empresa, periodo, puesto) VALUES (?, ?, ?)",
      [list.empresa, list.periodo, list.puesto]
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
    const [item] = await pool.query("SELECT * FROM exp_list WHERE id = ?", [
      id,
    ]);

    const [result] = await pool.query("DELETE FROM exp_list WHERE id = ?", [
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
  const { empresa, periodo, puesto } = req.body;

  const list = {
    empresa: empresa || undefined,
    periodo: periodo || undefined,
    puesto: puesto || undefined,
  };

  try {
    const [rows] = await pool.query(
      "UPDATE exp_list SET empresa = IFNULL(?, empresa) , periodo = IFNULL(?, periodo) , puesto = IFNULL(?, puesto)  WHERE id = ?",
      [list.empresa, list.periodo, list.puesto, id]
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
