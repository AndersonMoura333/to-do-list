import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "@/types";

interface TodoListSliceProps {
    hasList: boolean;
    tasks: TaskType[];
    orderBy: "Maior prioridade" | "Menor prioridade" | "Concluído" | "Pendente"
}

const initialState: TodoListSliceProps = {
    hasList: false,
    tasks: [],
    orderBy: "Maior prioridade"
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
        setOrderBy: (state, action: PayloadAction<"Maior prioridade" | "Menor prioridade" | "Concluído" | "Pendente">) => {
            state.orderBy = action.payload;
        },
        orderBy: (state) =>{
            const order = state.orderBy;
            const sortedTasks = [...state.tasks]; 
            
            switch (order) {
                case "Menor prioridade":
                    sortedTasks.sort((a, b) => {
                        if (a.priority === b.priority) {
                            return 0;
                        }
                        return a.priority === "Baixa" ? -1 : (b.priority === "Baixa" ? 1 : (a.priority === "Média" ? -1 : 1));
                    });
                    break;
                case "Maior prioridade":
                    sortedTasks.sort((a, b) => {
                        if (a.priority === b.priority) {
                            return 0;
                        }
                        return a.priority === "Alta" ? -1 : (b.priority === "Alta" ? 1 : (a.priority === "Média" ? -1 : 1));
                    });
                    break;
                case "Concluído":
                    sortedTasks.sort((a, b) => {
                        if (a.status === b.status) {
                            return 0;
                        }
                        return a.status === "Concluído" ? -1 : 1;
                    });
                    break;
                case "Pendente":
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

export const { setHasList, setTask, editTask, deleteTask, deleteCompletedTasks, orderBy, setOrderBy } = todoListSlice.actions;
export default todoListSlice.reducer;
