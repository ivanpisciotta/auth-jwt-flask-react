export const initialStore = () => {
  return {
    // Se recupera la sesión guardada al recargar la página,
    // para no perder el login con un F5.
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "logout":
      return {
        ...store,
        token: null,
        user: null,
      };

    default:
      return store;
  }
}
