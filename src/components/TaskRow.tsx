"use client"
import { TaskType } from "@/types"
import { useState } from "react"
import { Task } from "./Task"
import { TaskRowItem } from "./TaskRowItem"

export const TaskRow  = ({tasks}: {tasks: TaskType[]})=>{
    const [openModal, setOpenModal] = useState(false)
    return(
        <>
        {openModal&&<Task open={openModal} setOpen={()=> setOpenModal(!openModal)} hasNew={true}/>}
        <div className="flex flex-1 flex-col">
            {
                tasks.map(task => <TaskRowItem key={task.id} task={task}/>)
            }
            <div className="border-t p-2 border-stone-600 border-b max-h-12 flex w-full hover:bg-stone-600 cursor-pointer
            active:bg-stone-400"
            onClick={()=>setOpenModal(true)}
            >Nova Tarefa +</div>
        </div>
        </>
    )
}