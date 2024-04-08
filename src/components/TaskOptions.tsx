"use client"
import { use, useState } from "react"
import { MdModeEdit } from "react-icons/md"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { Task } from "./Task"
import { TaskType } from "@/types"
import { useDispatch } from "react-redux"
import { deleteTask } from "@/store/todoListSlice"
import { apiService } from "@/app/services/api"
import { authService } from "@/app/services/auth"

export const TaskOptions = ({task}: {task: TaskType}) => {
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    const user = authService.isUserAuthenticated()

    return(
        <>
        {openModal&&<Task open={openModal} hasNew={false} setOpen={()=> setOpenModal(!openModal)} description={task.description} id={task.id}
        key={task.id} priority={task.priority} status={task.status} title={task.title}
        />}
        <div className="flex space-x-2">
                        <div className="flex justify-center items-center p-2 rounded-full hover:bg-stone-700 cursor-pointer"
                            onClick={() => setOpenModal(true)}
                        >
                            <MdModeEdit />
                        </div>
                        <div className="flex justify-center items-center p-2 rounded-full hover:bg-stone-700 cursor-pointer"
                            onClick={() => {dispatch(deleteTask(task.id))
                                apiService.deleteTask(task.id, user.access_token)
                            }}
                        >
                            <RiDeleteBin6Fill />
                        </div>
                    </div>
        </>
    )
}