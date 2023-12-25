import { db } from "../db.js";

export const loginUser = (req, res) => {
  const { email, fone } = req.body;

  const q = "SELECT * FROM usuarios WHERE email = ? AND fone = ?";
  const values = [email, fone.toString()];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);

    if (data.length > 0) {
      // Usuário autenticado com sucesso
      return res.status(200).json("Login bem-sucedido");
    } else {
      // Credenciais inválidas
      return res.status(401).json("Credenciais inválidas");
    }
  });
};
