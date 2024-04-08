import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "@/types";

interface TodoListSliceProps {
    hasList: boolean;
    tasks: TaskType[];
    orderBy: "Maior prioridade" | "Menor prioridade" | "Concluído" | "Pendente",
    filterBy: "Todas"| "Alta" | "Média" | "Baixa" | "Concluído" | "Pendente",
    filteredTasks: TaskType[]
}

const initialState: TodoListSliceProps = {
    hasList: true,
    tasks: [],
    orderBy: "Maior prioridade",
    filterBy: "Todas",
    filteredTasks: []
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
            state.tasks.push(action.payload)
            filterTasks(state);
        },
        setAllTask: (state, action: PayloadAction<TaskType[]>) => {
            state.tasks = action.payload
            filterTasks(state);
        },
        editTask: (state, action: PayloadAction<{ taskId: string; newTask: TaskType }>) => {
            const { taskId, newTask } = action.payload;
            state.tasks.forEach(item => console.log(item.title))
            const taskIndex = state.tasks.findIndex(task => task.id === taskId);
            console.log("index", taskIndex, taskId)
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = newTask;
                filterTasks(state);
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
            filterTasks(state);
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
            
            state.filteredTasks = sortedTasks; 
        },
        setFilterBy: (state, action: PayloadAction<"Todas" | "Alta" | "Média" | "Baixa" | "Concluído" | "Pendente">) => {
            state.filterBy = action.payload;
            const filteredTasks = state.tasks.filter(task => {
                switch (action.payload) {
                    case "Alta":
                        return task.priority === "Alta";
                    case "Média":
                        return task.priority === "Média";
                    case "Baixa":
                        return task.priority === "Baixa";
                    case "Concluído":
                        return task.status === "Concluído";
                    case "Pendente":
                        return task.status === "Pendente";
                    default:
                        return true;
                }
            });
            state.filteredTasks = filteredTasks;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            const searchQuery = action.payload.toLowerCase();
            state.filteredTasks = state.tasks.filter(task =>
                task.title.toLowerCase().includes(searchQuery) ||
                task.description.toLowerCase().includes(searchQuery)
            );
            if(searchQuery ===""){
                state.filteredTasks = state.tasks
            }
        }


        // setFilteredTasks: (state) => {
        //     const filteredTasks = state.tasks.filter(task => {
        //         switch (state.filterBy) {
        //             case "Alta":
        //                 return task.priority === "Alta";
        //             case "Média":
        //                 return task.priority === "Média";
        //             case "Baixa":
        //                 return task.priority === "Baixa";
        //             case "Concluído":
        //                 return task.status === "Concluído";
        //             case "Pendente":
        //                 return task.status === "Pendente";
        //             default:
        //                 return true;
        //         }
        //     });
        //     state.filteredTasks = filteredTasks;
        // }
    }
});

const filterTasks = (state: TodoListSliceProps) => {
    const filteredTasks = state.tasks.filter(task => {
        switch (state.filterBy) {
            case "Alta":
                return task.priority === "Alta";
            case "Média":
                return task.priority === "Média";
            case "Baixa":
                return task.priority === "Baixa";
            case "Concluído":
                return task.status === "Concluído";
            case "Pendente":
                return task.status === "Pendente";
            default:
                return true;
        }
    });
    state.filteredTasks = filteredTasks;
}

export const { setHasList, setTask, editTask, deleteTask, deleteCompletedTasks, orderBy, setOrderBy, setAllTask,setFilterBy, setSearchQuery} = todoListSlice.actions;
export default todoListSlice.reducer;
