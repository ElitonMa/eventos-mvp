router.post("/", async (req, res) => {
    try {
        const { titulo, descricao, local, data, capacidade_total, vagas_restantes, mapa_url } = req.body;
        // validar os campos obrigatórios
        if (!titulo || !descricao || !local || !capacidade_total || !data || !vagas_restantes || !mapa_url) {
            return res.status(400).json({ error: "Preencha todos os campos" })
        }
    

    // Inserir (INSERT) no Banco
    const r = await pool.query (
            `INSERT INTO eventos (titulo, descricao, local, data, capacidade_total, vagas_restantes, mapa_url) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
            [titulo, descricao, local, data, capacidade_total, vagas_restantes, mapa_url]
    );

    res.status(201).json(r.rows[0]);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar evento", detalhe: error.message })
    }
});