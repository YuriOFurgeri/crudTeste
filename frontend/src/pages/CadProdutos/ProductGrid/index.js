import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const ProductGrid = ({ products, setOnEdit, setProducts }) => {
  // Certifique-se de que 'products' está definido antes de mapear
  if (!products) {
    return <p>Nenhum produto disponível.</p>;
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8800/products/${id}`);
      const newArray = products.filter((product) => product.id !== id);
      setProducts(newArray);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Preço</th>
          <th scope="col">Data de Validade</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, i) => (
          <tr key={i}>
            <td width="30%">{item.descricao}</td>
            <td width="30%">{item.preco}</td>
            <td width="20%">{item.data_validade}</td>
            <td align="center" width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </td>
            <td align="center" width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductGrid;
