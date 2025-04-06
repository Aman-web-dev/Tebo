import { useContext } from "react"
import ModalContext from "../context/contextCreator/ModalContext"

export const useModal=()=>useContext(ModalContext)
