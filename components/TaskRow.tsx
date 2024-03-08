import { TaskType } from "@/types"
import { StatusTask } from "./statusTask"
import { PriorityStatusTask } from "./PriorityStatusTask"

export const TaskRow  = ({tasks}: {tasks: TaskType[]})=>{
    return(
        <div className="flex flex-1 flex-col">
            {
                tasks.map(task => <div className="border-t border-b border-stone-600 flex w-full">
                    <div className={`w-1/3 border-r border-stone-600 ${task.status === "Concluído"?"text-green-500": null }`}>{task.title}</div>
                    <div className="w-28 px-4 py-1.5 border-r border-stone-600"><StatusTask status={task.status}/></div>
                    <div className=" w-32 px-4 py-1.5 border-r border-stone-600"><PriorityStatusTask priority={task.priority} /></div>
                    <div className="flex-1 px-4 py-1.5  border-stone-600 overflow-y-scroll"><p>{task.description}</p></div>

                </div>)
            }
        </div>
    )
}