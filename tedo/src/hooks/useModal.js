import { useContext } from "react"
import ModalContext from "../context/context/modal"

export const useModal=()=>useContext(ModalContext)
