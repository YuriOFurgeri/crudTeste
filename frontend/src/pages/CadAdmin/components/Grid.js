import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Grid = ({ setOnEdit, users, setUsers }) => {
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("http://localhost:8800/" + id);
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(response.data.message);
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
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col" className="d-none d-md-table-cell">
            Fone
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, i) => (
          <tr key={i}>
            <td width="30%">{item.nome}</td>
            <td width="30%">{item.email}</td>
            <td width="20%" className="d-none d-md-table-cell">
              {item.fone}
            </td>
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

export default Grid;
