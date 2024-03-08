export const PriorityStatusTask = ({priority}: {priority: string}) => {
    return(
        <div className={`flex rounded-3xl justify-center pl-2 w-auto ${priority === "Alta" ? "bg-red-500" : priority === "Média" ? "bg-yellow-500" : "bg-blue-500"} px-2 text-sm`}>{priority}</div>

    )
}