import {  useContext } from "react";
import AuthContext from "../context/context/auth";

export const useAuth=()=>useContext(AuthContext);