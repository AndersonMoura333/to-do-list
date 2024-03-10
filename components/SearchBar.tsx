import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setSearchQuery } from "@/store/todoListSlice";


interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    };

    useEffect(()=>{
        dispatch(setSearchQuery(value));
        console.log()
    }, [value])

    return (
        <div>
            <input
                type="text"
                placeholder="Pesquisar tarefa..."
                value={value}
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
        </div>
    );
};
