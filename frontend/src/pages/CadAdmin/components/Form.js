import React, { useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;
    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos");
    }
    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => {
          toast.success(data);
        })
        .catch(({ data }) => {
          toast.error(data);
        });
    }
    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          id="nome"
          name="nome"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="fone" className="form-label">
          Telefone
        </label>
        <input
          type="tel"
          className="form-control"
          id="fone"
          name="fone"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="data_nascimento" className="form-label">
          Data de Nascimento
        </label>
        <input
          type="date"
          className="form-control"
          id="data_nascimento"
          name="data_nascimento"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};

export default Form;
