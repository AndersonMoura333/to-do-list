import { TaskType } from "@/types"
import { StatusTask } from "./statusTask"
import { PriorityStatusTask } from "./PriorityStatusTask"
import { TaskOptions } from "./TaskOptions"

export const TaskRowItem = ({task}: {task: TaskType}) => {
    return(
        <>
        
        <div className="border-t border-stone-600  max-h-12 flex w-full">
                    <div className={`flex items-center w-1/3 border-r border-stone-600 ${task.status === "Concluído"?"text-green-500": null }`}>{task.title}</div>
                    <div className="flex items-center justify-center w-28 px-4 py-1.5 border-r border-stone-600"><StatusTask status={task.status}/></div>
                    <div className=" flex items-center justify-center w-32 px-4 py-1.5 border-r border-stone-600"><PriorityStatusTask priority={task.priority} /></div>
                    <div className="flex w-1/3 px-4 py-1.5  border-stone-600 overflow-y-scroll"><p>{task.description}</p></div>
                    <div className=" flex-1 flex justify-center p-2">
                    <TaskOptions task={task} />
                    </div>

                </div>
        </>
    )
}