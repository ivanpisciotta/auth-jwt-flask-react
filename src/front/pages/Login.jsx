import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);
        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "login", payload: data });
            navigate("/private");
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "420px" }}>
            <h3 className="fw-bold mb-4">Iniciar sesión</h3>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-dark w-100" disabled={cargando}>
                    {cargando ? "Entrando..." : "Entrar"}
                </button>
            </form>
            <p className="text-secondary small mt-3 mb-0">
                ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
            </p>
        </div>
    );
};
