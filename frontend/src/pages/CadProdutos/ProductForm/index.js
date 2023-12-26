import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductForm = ({ getProducts, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [product, setProduct] = useState({
    descricao: "",
    preco: "",
    data_validade: "",
  });

  useEffect(() => {
    if (onEdit) {
      // Lógica para preencher formulário em caso de edição
      setProduct({
        descricao: onEdit.descricao,
        preco: onEdit.preco,
        data_validade: onEdit.data_validade,
      });
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!product.descricao || !product.preco || !product.data_validade) {
        return toast.warn("Preencha todos os campos");
      }

      if (onEdit) {
        await axios.put(`http://localhost:8800/products/${onEdit.id}`, product);
        toast.success("Produto atualizado com sucesso");
      } else {
        await axios.post("http://localhost:8800/products", product);
        toast.success("Produto adicionado com sucesso");
      }

      setProduct({
        descricao: "",
        preco: "",
        data_validade: "",
      });

      setOnEdit(null);
      getProducts();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="descricao" className="form-label">
        Descrição
      </label>
      <input
        type="text"
        className="form-control"
        id="descricao"
        name="descricao"
        value={product.descricao}
        onChange={(e) => setProduct({ ...product, descricao: e.target.value })}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="preco" className="form-label">
        Preço
      </label>
      <input
        type="number"
        className="form-control"
        id="preco"
        name="preco"
        value={product.preco}
        onChange={(e) => setProduct({ ...product, preco: e.target.value })}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="data_validade" className="form-label">
        Data de Validade
      </label>
      <input
        type="date"
        className="form-control"
        id="data_validade"
        name="data_validade"
        value={product.data_validade}
        onChange={(e) => setProduct({ ...product, data_validade: e.target.value })}
      />
    </div>

    <button type="submit" className="btn btn-primary">
      {onEdit ? "Atualizar Produto" : "Adicionar Produto"}
    </button>
  </form>

  );
};

export default ProductForm;


