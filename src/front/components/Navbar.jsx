import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "logout" });
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light px-4">
            <Link to="/" className="navbar-brand mb-0 h1 text-decoration-none">
                Auth JWT
            </Link>

            <div className="d-flex gap-2">
                {store.token ? (
                    <>
                        <Link to="/private" className="btn btn-outline-dark btn-sm">
                            Área privada
                        </Link>
                        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-outline-dark btn-sm">
                            Iniciar sesión
                        </Link>
                        <Link to="/signup" className="btn btn-dark btn-sm">
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
