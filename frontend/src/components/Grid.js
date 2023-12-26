import React from "react";
import styled from "styled-components";
import {FaTrash, FaEdit} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Table = styled.table`
width: 100%;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
max-width: 800px;
margin-width: 20px;
margin: 20px auto;
word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tr = styled.tr``;


export const Th = styled.th`
text-align: start;
border-bottom: inset;
padding-bottom: 5px;

@media(max-width: 500px) {
    ${(props)=> props.onlyWeb && "display: none"}
`;

const Td = styled.td`
padding-top: 15px;
text-align: ${(props)=> props.alignCenter ? "center": "start"};
width: ${(props)=> props.width ? props.width : "auto"};

@media(max-width: 500px) {
    ${(props)=> props.onlyWeb && "display: none"}
}
`;

const Tbody = styled.tbody``;

//vai vir do banco
const Grid = ({setOnEdit,users, setUsers}) => {
//é necessário também então importar o setUsers, para salvar os outros
    const handleDelete = async (id) => {
    //função assincrona por estar no banco, a porta mais o id de parametro, validação pelo then(promisse) data é o texto informado no backend e no toast a informação, a const newArray volta os outros usuários(menos o excluido)
        await axios
        .delete("http://localhost:8800/" + id)
        .then(({data})=>{
            const newArray = users.filter((user)=>user.id !== id);
            setUsers(newArray);
            toast.success(data.message);
    }).catch(({data}) => toast.error(data));
    
    setOnEdit(null);
    };

const handleEdit = (item) => {
    setOnEdit(item);
};







    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Fone</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.nome}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="20%" onlyWeb>{item.fone}</Td>
                        
                        <Td aligCenter width="5%">
                            <FaEdit onClick={()=>handleEdit(item)}/>
                        </Td>
                        <Td aligCenter width="5%">
                            <FaTrash onClick={()=>handleDelete(item.id)}/>
                        </Td>   
                    </Tr>
                ))}

            </Tbody>
        </Table>
        )
}

export default Grid;