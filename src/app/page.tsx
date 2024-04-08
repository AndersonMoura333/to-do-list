"use client";
import { useDispatch, useSelector } from "react-redux";
import { Appbar } from "../components/Appbar";
import { TaskColumn } from "../components/TaskColumn";
import { RootState } from "@/store";
import { Task } from "@/components/Task";
import { TaskColumnType, TaskType } from "@/types";
import { useEffect, useState } from "react";
import { TaskRow } from "@/components/TaskRow";
import { apiService } from "./services/api";
import { authService } from "./services/auth";
import { setAllTask } from "@/store/todoListSlice";


export default function Home() {
  
  const hasList = useSelector((state: RootState) => state.todoList.hasList);
  const [pendingTasks, setPendingTasks] = useState<string[]>([])
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const tasks = useSelector((state: RootState) => state.todoList.filteredTasks)
  const user = authService.isUserAuthenticated()
  const dispatch = useDispatch()

//   useEffect(() => {
//     tasks.forEach((task,i) => {
    
//         if (task.status === "Concluído") {
//             if (!completedTasks.find(index => index === i+1)) {
//               console.log("entrou")
//               setCompletedTasks((prevState) => [...prevState, i+1]);
//                 const oldTask = pendingTasks.find(item => item === i+1)
//                 if(oldTask){
//                   setPendingTasks(prevState => (pendingTasks.filter(item => item !== oldTask)));
//                 }
//             }
//         } else {
//           if (!pendingTasks.find(index => index === i+1)) {
//             console.log("entrou")
//             setPendingTasks((prevState) => [...prevState, i+1]);
//               const oldTask = completedTasks.find(item => item === i+1)
//               if(oldTask){
//                 setCompletedTasks(prevState => (completedTasks.filter(item => item !== oldTask)));
//               }
//           }
//         }
//     });
// }, [tasks]);
  useEffect(() => {
    tasks.forEach((task,i) => {
    
        if (task.status === "Concluído") {
            if (!completedTasks.find(index => index === task.id)) {
              console.log("entrou")
              setCompletedTasks((prevState) => [...prevState, task.id]);
                const oldTask = pendingTasks.find(item => item === task.id)
                if(oldTask){
                  setPendingTasks(prevState => (pendingTasks.filter(item => item !== oldTask)));
                }
            }
        } else {
          if (!pendingTasks.find(index => index === task.id)) {
            console.log("entrou")
            setPendingTasks((prevState) => [...prevState, task.id]);
              const oldTask = completedTasks.find(item => item === task.id)
              if(oldTask){
                setCompletedTasks(prevState => (completedTasks.filter(item => item !== oldTask)));
              }
          }
        }
    });
}, [tasks]);

useEffect(()=>{
  const getData = async() => {
    const data: TaskType[]= await apiService.getAllTask(user.id, user.access_token)
    dispatch(setAllTask(data))
  }

  getData()
}, [])

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <>
      </>
      <Appbar />
      <div className="flex-1 flex p-12 flex-col md:justify-center max-h-svh md:flex-row md:space-x-20 bg-stone-900">
      {hasList ? (
        <>
        <TaskRow tasks={tasks}/>
        </>
      ) : (
      <>
         <TaskColumn name={"Pendente"} tasks={tasks.filter(task => pendingTasks.includes(task.id))} />
        <TaskColumn name={"Concluído"} tasks={tasks.filter(task => completedTasks.includes(task.id))} />
          
      </>
          )}
          </div>
    </main>
  );
}

