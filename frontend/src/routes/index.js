import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadAdmin from "../pages/CadAdmin";
import Home from "../pages/Home";
import ProductForm from "../pages/CadProdutos/ProductForm";
import CadProdutos from "../pages/CadProdutos";
import Login from "../pages/Login";



const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path= "/" element={<CadAdmin/>}/>
                <Route path= "/home" element={<Home/>}/>
                <Route path= "/product" element={<CadProdutos/>}/>
                <Route path= "/login" element={<Login/>}/>
                
            </Routes>      
        </BrowserRouter>             
    
    );
};

export default RoutesApp;