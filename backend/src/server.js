import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();

// permite que o front-end acesse a API
app.use(cors());

// permite receber JSON no body das requisições
app.use(express.json());

// rota de teste
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API rodando!" });
});

// listar eventos
app.get("/eventos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM eventos ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar eventos" });
  }
});

// criar evento
app.post("/eventos", async (req, res) => {
  try {
    const { titulo, data, local, descricao, capacidade_total, vagas_restantes, mapa_url } = req.body;

    if (!titulo || !data || !local || !descricao || !capacidade_total || !vagas_restantes || !mapa_url) {
      return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    const result = await pool.query(
      `INSERT INTO eventos (titulo, data, local, descricao, capacidade_total, vagas_restantes, mapa_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [titulo, data, local, descricao, capacidade_total, vagas_restantes, mapa_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar evento" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});