const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const signup = async (email, password) => {
    const res = await fetch(backendUrl + "/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error al registrarse");
    return data;
};

export const login = async (email, password) => {
    const res = await fetch(backendUrl + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error al iniciar sesión");
    return data;
};

// Pregunta al backend si el token sigue siendo válido.
// Sin esto, la ruta privada solo estaría protegida en apariencia.
export const getPrivate = async (token) => {
    const res = await fetch(backendUrl + "/api/private", {
        headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "No autorizado");
    return data;
};
