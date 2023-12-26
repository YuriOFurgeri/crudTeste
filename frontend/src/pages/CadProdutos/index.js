import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductGrid from "./ProductGrid";
import axios from "axios";

const CadProdutos = () => {
  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8800/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []); // Chama getProducts apenas uma vez ao montar o componente

  return (
    <div className="container mt-4">
      <h2>CADASTRO DE PRODUTOS</h2>
      <ProductForm getProducts={getProducts} onEdit={onEdit} setOnEdit={setOnEdit} />
      <ProductGrid products={products} setProducts={setProducts} setOnEdit={setOnEdit} />
    </div>
  );
};

export default CadProdutos;
