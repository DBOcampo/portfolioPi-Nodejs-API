import { response } from "express";
import { pool } from "../db.js";

export const getSkillDi = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM skill_di");
    pool.releaseConnection()
    return res.json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const createSkillDi = async (req, res) => {
  const { color, porcentaje, skill, idioma } = req.body;

  const skillDi = {
    color: color || "",
    porcentaje: porcentaje || "",
    skill: skill || "",
    idioma: idioma || "",
  };
  try {
    const [result] = await pool.query(
      "INSERT INTO skill_di (color, porcentaje, skill, idioma) VALUES (?, ?, ?, ?)",
      [skillDi.color, skillDi.porcentaje, skillDi.skill, skillDi.idioma]
    );
    skillDi["id"] = result.insertId;
    console.log(skillDi);
    return res.send(skillDi);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const deleteSkillDi = async (req, res) => {
  const id = req.params.id;

  try {
    const [item] = await pool.query("SELECT * FROM skill_di WHERE id = ?", [
      id,
    ]);

    const [result] = await pool.query("DELETE FROM skill_di WHERE id = ?", [
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

export const editSkillDi = async (req, res) => {
  const id = req.params.id;
  const { color, porcentaje, skill, idioma } = req.body;

  const skillDi = {
    color: color || undefined,
    porcentaje: porcentaje || undefined,
    skill: skill || undefined,
    idioma: idioma || undefined,
  };
  try {
    const [rows] = await pool.query(
      "UPDATE skill_di SET color = IFNULL(?, color) , porcentaje = IFNULL(?, porcentaje) , skill = IFNULL(?, skill), idioma = IFNULL(?, idioma)  WHERE id = ?",
      [skillDi.color, skillDi.porcentaje, skillDi.skill, skillDi.idioma, id]
    );

    if (rows.affectedRows < 1) {
      return res.status(404).send("Not found");
    }
    console.log(skillDi);
    res.send(skillDi);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
