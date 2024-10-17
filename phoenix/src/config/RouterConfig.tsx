import { Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import RegisterPage from "../page/RegisterPage";
import LoginPage from "../page/LoginPage";
import ProductDetail from "../page/ProductDetail";
import ErrorPage from "../page/ErrorPage";

function RouterConfig() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/product-detail/:productId" element={<ProductDetail />} />
        </Routes>
    )
}

export default RouterConfig;
