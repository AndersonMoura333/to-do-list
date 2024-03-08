
export type TaskType = {
    id: string;
    title: string;
    description: string;
    status: "Pendente" | "Concluído";
    priority: "Alta" | "Baixa" | "Média";
    }

    export type TaskColumnType = {
        name: "Pendente" | "Concluído";
        tasks:TaskType[];
    }
