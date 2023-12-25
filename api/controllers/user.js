import {db} from "../db.js"

export const getUsers = (_, res) => {
    //q de query
    const q = "SELECT * FROM usuarios";
    
    //(db o mysql)primeiro parametro o q, se tiver erro ele devolve, senão devolve errado 
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};



export const addUser = (req, res) => {
    const q =   "INSERT INTO usuarios(`nome`, `email`, `fone`,`data_nascimento`) VALUES (?)";
    
    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];
    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso");
    });
};

export const updateUser = (req, res) => {
    const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";
    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso");
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso");
    });
}


export const loginUser = (req, res) => {
    const { email, fone } = req.body;
  
    console.log("Dados recebidos no backend:", { email, fone }); // Adicione este console.log
  
    const q = "SELECT * FROM usuarios WHERE email = ? AND fone = ?";
    const values = [email, fone];
  
    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Erro no banco de dados:", err);
        return res.status(500).json("Erro interno no servidor");
      }
  
      console.log("Resultado do banco de dados:", data); // Adicione este console.log
  
      if (data.length > 0) {
        // Usuário autenticado com sucesso
        return res.status(200).json("Login bem-sucedido");
      } else {
        // Credenciais inválidas
        return res.status(401).json("Credenciais inválidas");
      }
    });
  };
  