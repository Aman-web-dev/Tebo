import React, {useState} from 'react'

import ModalContext from './context/modal';


export const  ModalProvider=({children})=> {
    const [modalOpen,setmodalOpen]=useState(false);
    const [mode,setMode]=useState("");
    const [product,setProduct]=useState("");
    const [editableProduct,setEditableProduct]=useState(""); 

    const createProject=()=>{
        setMode("create");
        setProduct("project")
        console.log("Opening Modal to Create Project")
        setmodalOpen(true);
    }

    const editProject=(editableProductObj)=>{
        setMode("edit");
        setProduct("project")
        setmodalOpen(true)
        setEditableProduct(editableProductObj)
        console.log("Opening Modal  to Edit Project")
    }

    const editTask=(editableProductObj)=>{
        setMode("edit");
        setProduct("tasks")
        setmodalOpen(true)
        setEditableProduct(editableProductObj)
        console.log("Opening Modal to Edit Tasks")
    }

    const closeModal=()=>{
        setmodalOpen(false);
        setEditableProduct("");
        setProduct("");
        setMode("idle");
    }

    const openComment=(editableProduct)=>{
        setEditableProduct(editableProduct)
        setProduct("comment");
        setmodalOpen(true);
    }

    const openModal=()=>{
        setmodalOpen(true);
    }

  return (
    <ModalContext.Provider value={{modalOpen,product,editableProduct,setEditableProduct,mode,createProject,closeModal,editProject,openModal,editTask,openComment}}>
        {children}
    </ModalContext.Provider>
  )
}