import { response } from "express";
import { pool } from "../db.js";
export const getSkillHs = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM skill_hs");
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const createSkillHs = async (req, res) => {
  const { color, porcentaje, skill} = req.body;

  const skillDi = {
    color: color || "",
    porcentaje: porcentaje || "",
    skill: skill || ""
  };
  try {
    const [result] = await pool.query(
      "INSERT INTO skill_hs (color, porcentaje, skill) VALUES (?, ?, ?)",
      [skillDi.color, skillDi.porcentaje, skillDi.skill]
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

export const deleteSkillHs = async (req, res) => {
  const id = req.params.id;

  try {
    const [item] = await pool.query("SELECT * FROM skill_hs WHERE id = ?", [
      id,
    ]);

    const [result] = await pool.query("DELETE FROM skill_hs WHERE id = ?", [
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

export const editSkillHs = async (req, res) => {
  const id = req.params.id;
  const { color, porcentaje, skill} = req.body;

  const skillDi = {
    color: color || undefined,
    porcentaje: porcentaje || undefined,
    skill: skill || undefined
  };
  try {
    const [rows] = await pool.query(
      "UPDATE skill_hs SET color = IFNULL(?, color) , porcentaje = IFNULL(?, porcentaje) , skill = IFNULL(?, skill) WHERE id = ?",
      [skillDi.color, skillDi.porcentaje, skillDi.skill, id]
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
