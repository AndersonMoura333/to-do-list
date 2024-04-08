"use client"
import { apiService } from "@/app/services/api";
import { authService } from "@/app/services/auth";
import { deleteTask, editTask, orderBy, setTask } from "@/store/todoListSlice";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {v4} from 'uuid'

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
    const user = authService.isUserAuthenticated()
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
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status">Status: </label>
                            <select name="status" id="" className="bg-stone-800"
                                value={newStatus} onChange={(e) => setNewStatus(e.target.value as "Pendente" | "Concluído")}
                            >
                                <option value="Pendente">Pendente</option>
                                <option value="Concluído">Concluído</option>
                            </select>
                        </div>
                    </div>
                    <div className={`w-full flex-1 flex ${!hasNew?"justify-between": "justify-center"} items-end space-x-4`}>
                        {!hasNew && <button className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-800 target:bg-red-900"
                        onClick={() => {
                            console.log("id", id)
                            dispatch(deleteTask(id!))
                            apiService.deleteTask(id!, user.access_token)
                            
                            setOpen()
                        }
                        }
                           
                        >Excluir</button>
                        }
                        <button className="bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-800 target:bg-blue-900"
                            onClick={() => {
                                const newTask = { 
                                    id: id ? id : v4(), 
                                    description: newDescription, 
                                    title: newTitle, 
                                    priority: newPriority, 
                                    status: newStatus 
                                };
                                
                                if (hasNew) {
                                    dispatch(setTask(newTask));
                                    apiService.createTask(user.id, newTask, user.access_token );
                                } else {
                                    dispatch(editTask({ taskId: newTask.id, newTask }));
                                    apiService.putTask(user.id, newTask, user.access_token );

                                }
                                
                                dispatch(orderBy());
                                setOpen();
                                
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