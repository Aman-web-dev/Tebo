import React, {useState} from 'react'

import ModalContext from './contextCreator/ModalContext';


export const  ModalProvider=({children})=> {
    const [modalOpen,setmodalOpen]=useState(false);
    const [mode,setMode]=useState("idle");

    const createProject=()=>{
        setmodalOpen(true);
        setMode("create");
        console.log("Opening Modal")
    }

    const closeModal=()=>{
        setMode(idle);
        setmodalOpen(false);
    }

    const editProject=()=>{
        setMode("edit");
        setmodalOpen(true)
    }

  return (
    <ModalContext.Provider value={{modalOpen,mode,createProject,closeModal,editProject}}>
        {children}
    </ModalContext.Provider>
   
  )
}


