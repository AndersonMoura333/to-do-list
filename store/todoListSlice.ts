import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "@/types";

interface TodoListSliceProps {
    hasList: boolean;
    tasks: TaskType[];
}

const initialState: TodoListSliceProps = {
    hasList: false,
    tasks: []
};

export const todoListSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        setHasList: (state, action: PayloadAction<boolean>) => {
            state.hasList = action.payload;
            console.log("state", state.hasList);
        },
        setTask: (state, action: PayloadAction<TaskType>) => {
            state.tasks.push(action.payload);
        },
        editTask: (state, action: PayloadAction<{ taskId: string; newTask: TaskType }>) => {
            const { taskId, newTask } = action.payload;
            state.tasks.forEach(item => console.log(item.title))
            const taskIndex = state.tasks.findIndex(task => task.id === taskId);
            console.log("index", taskIndex, taskId)
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = newTask;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
        },
        deleteCompletedTasks: (state)=> {
            state.tasks = state.tasks.filter(task => task.status !== "Concluído")
        },
        orderBy:(state, action: PayloadAction<string>) =>{
            const order = action.payload;
            const sortedTasks = [...state.tasks]; 
            
            switch (order) {
                case "menor prioridade":
                    sortedTasks.sort((a, b) => {
                        if (a.priority === b.priority) {
                            return 0;
                        }
                        return a.priority === "Baixa" ? -1 : (b.priority === "Baixa" ? 1 : (a.priority === "Média" ? -1 : 1));
                    });
                    break;
                case "maior prioridade":
                    sortedTasks.sort((a, b) => {
                        if (a.priority === b.priority) {
                            return 0;
                        }
                        return a.priority === "Alta" ? -1 : (b.priority === "Alta" ? 1 : (a.priority === "Média" ? -1 : 1));
                    });
                    break;
                case "concluido":
                    sortedTasks.sort((a, b) => {
                        if (a.status === b.status) {
                            return 0;
                        }
                        return a.status === "Concluído" ? -1 : 1;
                    });
                    break;
                case "pendente":
                    sortedTasks.sort((a, b) => {
                        if (a.status === b.status) {
                            return 0;
                        }
                        return a.status === "Pendente" ? -1 : 1;
                    });
                    break;
                default:
                    break;
            }
            
            state.tasks = sortedTasks; 
        }
           
    }
});

export const { setHasList, setTask, editTask, deleteTask, deleteCompletedTasks, orderBy } = todoListSlice.actions;
export default todoListSlice.reducer;
