// Importe a instância do banco de dados (db) da sua configuração
import { db } from "../db.js";

// Função para adicionar um novo produto
export const addProduct = (req, res) => {
  const q =
    "INSERT INTO produtos (`descricao`, `preco`, `data_validade`) VALUES (?)";

  const values = [req.body.descricao, req.body.preco, req.body.data_validade];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto adicionado com sucesso");
  });
};

// Função para obter todos os produtos
export const getProducts = (_, res) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

// Função para atualizar um produto existente
export const updateProduct = (req, res) => {
  const q =
    "UPDATE produtos SET `descricao` = ?, `preco` = ?, `data_validade` = ? WHERE `id` = ?";
  const values = [req.body.descricao, req.body.preco, req.body.data_validade];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso");
  });
};

// Função para excluir um produto
export const deleteProduct = (req, res) => {
  const q = "DELETE FROM produtos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto excluído com sucesso");
  });
};
