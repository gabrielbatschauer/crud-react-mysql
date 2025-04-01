import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "crud",
});

app.get("/usuarios", (req, res) => {
  const q = "SELECT * FROM usuarios";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/usuarios/:id", (req, res) => {
  const usuarioId = req.params.id;
  const q = "SELECT * FROM usuarios WHERE id = ?";

  db.query(q, [usuarioId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/usuarios", (req, res) => {
  const q = "INSERT INTO usuarios (`nome`, `email`, `fone`) VALUES (?)";
  const values = [req.body.nome, req.body.email, req.body.fone];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/usuarios/:id", (req, res) => {
  const usuarioId = req.params.id;
  const q = "DELETE FROM usuarios WHERE id = ?";

  db.query(q, [usuarioId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Usuário deletado.");
  });
});

app.put("/usuarios/:id", (req, res) => {
  const usuarioId = req.params.id;
  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ? WHERE id = ?";

  const values = [req.body.nome, req.body.email, req.body.fone];

  db.query(q, [...values, usuarioId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Usuário atualizado.");
  });
});

app.listen(8800, () => {
  console.log("Conectado ao backend.");
});
