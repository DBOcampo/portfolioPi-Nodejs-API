import { response } from "express";
import { pool } from "../db.js";

export const getMainImages = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM main_images");
    return res.json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const createMainImages = async (req, res) => {
  const { img } = req.body;

  const mainImages = {
    img: img || "",
  };
  try {
    const [result] = await pool.query(
      "INSERT INTO main_images (img) VALUES (?)",
      [mainImages.img]
    );
    mainImages["id"] = result.insertId;
    console.log(mainImages);
    return res.send(mainImages);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const editMainImages = async (req, res) => {
  const id = req.params.id;
  const { img } = req.body;

  const mainImages = {
    img: img || undefined,
  };

  try {
    const [rows] = await pool.query(
      "UPDATE main_images SET img = IFNULL(?, img) WHERE id = ?",
      [mainImages.img, id]
    );

    if (rows.affectedRows < 1) {
      return res.status(404).send("Not found");
    }
    console.log(mainImages);
    res.send(mainImages);
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
