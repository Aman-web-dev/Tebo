import {  useContext } from "react";
import AuthContext from "../context/contextCreator/authContext";

export const useAuth=()=>useContext(AuthContext);