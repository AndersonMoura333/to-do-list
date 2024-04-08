"use client"
import { useState } from "react";
import { FaSheetPlastic } from "react-icons/fa6"
import { MdModeEdit } from "react-icons/md"
import { Task } from "./Task";
import { TaskType } from "@/types";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/store/todoListSlice";
import { StatusTask } from "./statusTask";
import { PriorityStatusTask } from "./PriorityStatusTask";
import { TaskOptions } from "./TaskOptions";



export const TaskColumnItem = ({ title, description, status, priority, id }: TaskType) => {
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    return (
        <>

            {openModal && <Task id={id} description={description} title={title} status={status} priority={priority} open={openModal} setOpen={() => setOpenModal(!openModal)} hasNew={false} />}
            <div className="w-full bg-stone-900 h-auto p-4 rounded-xl flex flex-col justify-center space-y-2">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                        <FaSheetPlastic />
                        <p>{title}</p>
                    </div>
                    <TaskOptions task={{description, id,priority,status,title}}/>
                </div>
                <div className="px-4 text-sm bg-stone-800 rounded-xl max-h-28 overflow-y-scroll overflow-x-hidden">
                    <p>{description}</p>
                </div>
                <div className="flex justify-between">
                    <StatusTask status={status}/>
                    <PriorityStatusTask priority={priority} />
                </div>
            </div>
        </>
    )
}