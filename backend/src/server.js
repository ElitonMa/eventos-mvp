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

function parseEventoFotos(evento) {
  if (typeof evento.fotos === "string") {
    try { evento.fotos = JSON.parse(evento.fotos); } 
    catch { evento.fotos = []; }
  }
  return evento;
}

// listar eventos
app.get("/eventos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM eventos ORDER BY id DESC"
    );

    res.json(result.rows.map(parseEventoFotos));
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar eventos" });
  }
});

// criar evento
app.post("/eventos", async (req, res) => {
  try {
    const { titulo, data, local, descricao, capacidade_total, vagas_restantes, mapa_url, status, fotos } = req.body;

    if (!titulo || !data || !local || !descricao || !capacidade_total || !vagas_restantes || !mapa_url) {
      return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    const result = await pool.query(
      `INSERT INTO eventos (titulo, data, local, descricao, capacidade_total, vagas_restantes, mapa_url, status, fotos)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [titulo, data, local, descricao, capacidade_total, vagas_restantes, mapa_url, status, JSON.stringify(fotos)]
    );

    res.status(201).json(result.rows.map(parseEventoFotos));
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar evento" });
  }
});

// Receber os dados de eventos via id
app.get("/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM eventos WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: "Evento não encontrado" });
    res.json(parseEventoFotos(result.rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar evento" });
  }
});

app.delete("/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM eventos WHERE id = $1", [id]);
    res.json({ mensagem: "Evento removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao remover evento" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});