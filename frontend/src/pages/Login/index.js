import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Substitua useHistory por useNavigate



const Login = () => {
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Substitua useHistory por useNavigate

  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Dados de login:", { email, fone }); // Adicione este console.log
      const response = await axios.post("http://localhost:8800/login", {
        email,
        fone: fone.toString(), // Converta para string se necessário
      });
      
      console.log(response.data);
      setErrorMessage("");
  
      // Redirecionar para a página de cadastro de produto
      navigate("/produtos");
    } catch (error) {
      console.error("Erro no login:", error.response.data);
      setErrorMessage("Credenciais inválidas. Por favor, verifique seu email e fone.");
    }
  };
  

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fone" className="form-label">
            Fone (Senha)
          </label>
          <input
            type="tel"
            className="form-control"
            id="fone"
            value={fone}
            onChange={(e) => setFone(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
    </div>  
  );
};

export default Login;


 