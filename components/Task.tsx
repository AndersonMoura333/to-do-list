"use client"
import { deleteTask, editTask, orderBy, setTask } from "@/store/todoListSlice";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { uuid } from 'uuidv4';

export type TaskProps = {
    title?: string;
    description?: string;
    status?: "Pendente" | "Concluído";
    priority?: "Alta" | "Baixa" | "Média";
    id?: string,
    hasNew: boolean
    open: boolean,
    setOpen: () => void
}
export const Task = ({ description = "", priority = "Alta", status = "Pendente", title = "", open, setOpen, hasNew, id }: TaskProps) => {

    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newPriority, setNewPriority] = useState<"Alta" | "Baixa" | "Média">(priority)
    const [newStatus, setNewStatus] = useState<"Pendente" | "Concluído">(status)
    const dispatch = useDispatch()
    return (
        open ? (

            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 
        backdrop-opacity-10 bg-black/30">
                <div className="flex flex-col w-1/3 bg-stone-900 h-2/4 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between space-x-3">
                        <input type="text" className="text-xl w-full bg-stone-900" placeholder="título" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />

                        <RxCross1 onClick={setOpen} className="cursor-pointer" />

                    </div>
                    <p className="">Descrição:</p>
                    <textarea
                        className="px-4 rounded-xl max-h-48 overflow-scroll text-lg w-full bg-stone-800 flex text-left"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />

                    <div className="flex justify-around">
                        <div>
                            <label htmlFor="priority">Prioridade: </label>
                            <select name="priority" id="" className="bg-stone-800"
                                value={newPriority} onChange={(e) => setNewPriority(e.target.value as "Alta" | "Baixa" | "Média")}
                            >
                                <option value="Baixa" selected={newPriority === "Baixa" ? true : undefined}>Baixa</option>
                                <option value="Média" selected={newPriority === "Média" ? true : undefined}>Média</option>
                                <option value="Alta" selected={newPriority === "Alta" ? true : undefined}>Alta</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status">Status: </label>
                            <select name="status" id="" className="bg-stone-800"
                                value={newStatus} onChange={(e) => setNewStatus(e.target.value as "Pendente" | "Concluído")}
                            >
                                <option value="Pendente" selected={newStatus === "Pendente" ? true : undefined}>Pendente</option>
                                <option value="Concluído" selected={newStatus === "Concluído" ? true : undefined}>Concluído</option>
                            </select>
                        </div>
                    </div>
                    <div className={`w-full flex-1 flex ${!hasNew?"justify-between": "justify-center"} items-end space-x-4`}>
                        {!hasNew && <button className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-800 target:bg-red-900"
                        onClick={() => {
                            console.log("id", id)
                            dispatch(deleteTask(id!))
                            setOpen()
                        }
                        }
                           
                        >Excluir</button>
                        }
                        <button className="bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-800 target:bg-blue-900"
                            onClick={() => {
                                const newTask = { id: id ? id : uuid(), description: newDescription, title: newTitle, priority: newPriority, status: newStatus }
                                hasNew ? dispatch(setTask(newTask)) : dispatch(editTask({ taskId: newTask.id, newTask }))
                                dispatch(orderBy("maior prioridade"))
                                setOpen()
                            }
                            } 
                        >{hasNew ? "Criar" : "Editar"}</button>
                    </div>



                </div>
            </div>
        ) : (
            null
        )
    )
}