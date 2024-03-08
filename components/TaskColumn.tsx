import { TaskColumnItem } from "./TaskColunmItem";
import { TaskColumnType } from "@/types";



export const TaskColumn = ({name, tasks}:TaskColumnType) => {
    return(
        <div className="flex flex-col rounded-md bg-stone-700 w-full md:w-1/4 mb-6 p-4 max-h-max overflow-y-full overflow-x-hidden space-y-3">
            <div className={`${name === "Concluído"? "bg-green-500": "bg-slate-500"} flex rounded-3xl pl-2 w-auto`}>
            <h3>{name}</h3>
            </div>
            {
                tasks.map((item, i)=> <TaskColumnItem id={item.id} title={item.title} description={item.description} 
                status={item.status} priority={item.priority} key={i}/>)
            }
        </div>
    )
}