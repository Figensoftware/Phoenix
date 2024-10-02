import { Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import RegisterPage from "../page/RegisterPage";
import LoginPage from "../page/LoginPage";

function RouterConfig() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default RouterConfig;
