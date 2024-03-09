
"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCompletedTasks, orderBy, setHasList, setOrderBy } from "../store/todoListSlice";
import { Task } from "./Task";
import { Select } from "./Select";

export const Appbar = () =>{
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [fileterSelectedOption, setFilterSelectedOption] = useState('Filtrar');
    const options = ["Maior prioridade", "Menor prioridade", "Concluído", "Pendente"];
  
    const handleFilterChange = (option: "Maior prioridade"| "Menor prioridade"| "Concluído" | "Pendente") => {
      dispatch(setOrderBy(option));
      dispatch(orderBy())
    };
    return(
        <>
        {openModal&&<Task hasNew={true} open={openModal} setOpen={()=> setOpenModal(!openModal)}/>}
        <div className="flex flex-row bg-gray-700 w-screen h-24 items-center justify-between p-4">
            <div className="w-1/2">
            <h2 className="text-2xl flex items-center font-bold font"><IoMdCheckmarkCircleOutline />Tarefas</h2>
            <div className="flex space-x-6">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-slate-300" onClick={()=>{dispatch(setHasList(false))}}>
            <MdDashboard/>
            <p>Quadros</p>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-slate-300" onClick={()=>{dispatch(setHasList(true))}}>
            <FaList/>
            <p>Lista</p>
            </div>
            
            </div>
            </div>
            <div className="flex space-x-6">
            <Select options={options} onChange={handleFilterChange} value={fileterSelectedOption} />
                <p>ordenar</p>
                <button className="bg-blue-600 px-2 py-1 rounded-lg hover:bg-blue-800 target:bg-blue-900"
                onClick={()=> setOpenModal(true)}
                >Nova tarefa</button>
                <button className="bg-green-600 px-2 py-1 rounded-lg hover:bg-green-800 target:bg-green-900"
                onClick={()=> dispatch(deleteCompletedTasks())}
                >Finalizar tarefas concluídas</button>
            </div>
        </div>
        </>
    )
}