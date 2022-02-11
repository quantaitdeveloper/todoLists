import { createContext } from "react";
import { AuthStore } from "./AuthStore";


export const stores = Object.freeze({
    AuthStore: new AuthStore(),
});

export const storesContext = createContext(stores);
export const StoresProvider = storesContext.Provider;
