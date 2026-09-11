import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPrivate } from "../services/authService.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Private = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [datos, setDatos] = useState(null);

    useEffect(() => {
        if (!store.token) {
            navigate("/login");
            return;
        }
        getPrivate(store.token)
            .then((data) => setDatos(data))
            .catch(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                dispatch({ type: "logout" });
                navigate("/login");
            });
    }, [store.token]);

    if (!datos) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status"></div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h3 className="fw-bold mb-2">Área privada</h3>
            <p className="text-secondary">
                Bienvenido, {datos.user.email}. Esta página solo es visible con un token válido.
            </p>
        </div>
    );
};
