"use client";

const { createContext, useReducer } = require("react");

let initialState = {
  token: "",
};

if (typeof window == "undefined") {
  initialState = {
    token: "",
  };
} else {
  initialState = JSON.parse(localStorage.getItem("socialMedia")) || {
    token: "",
  };
}

function reducer(state, action) {
  try {
    switch (action.type) {
      case "SIGN_IN":
        const newState = {
          token: action.payload.token,
        };
        localStorage.setItem("socialMedia", JSON.stringify(newState));
        return newState;
      case "SIGN_OUT":
        localStorage.removeItem("socialMedia");
        return {
          token: "",
        };
      default:
        return state;
    }
  } catch (error) {}
}

export const AuthContext = createContext();

export function Authprovider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ AuthState: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
