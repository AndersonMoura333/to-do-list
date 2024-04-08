export const StatusTask = ({status}: {status: string}) =>{
    return(
        <div className={`flex rounded-3xl pl-2 w-auto ${status === "Concluído" ? "bg-green-500" : "bg-slate-500"} px-2 text-sm`}>{status}</div>
    )
}