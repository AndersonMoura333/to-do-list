import { TaskType } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

type User = {
    email?: string,
    username: string,
    password: string,
    confirmPassword?:string
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export const apiService = {
    login: async (user: User) =>{
        try {
            
            let userLoggedIn = await axios.post(`${baseUrl}auth/login`, user);
            let userJson = userLoggedIn.data;
            console.log("authdata",userJson)
            if (userJson) {
                Cookies.set("currentUser", JSON.stringify(userJson));
              }
            return userLoggedIn.data;
        } catch (error) {
            console.log(error)
        }
    },
    register: async (user: User) =>{
        try {
            
            let userLoggedIn = await axios.post(`${baseUrl}auth/signup/`, user);
            let userJson = userLoggedIn.data;
            console.log("authdata",userJson)
            return userLoggedIn.data;
        } catch (error) {
            console.log(error)
        }
    },

    createTask: async (userId: string, task:TaskType, token:string) => {
            try{
                const body = {
                    userId,
                    ...task
                }
        
              
            let newTasckCreated = await axios.post(`${baseUrl}tasks`, body, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return newTasckCreated.data;
        }catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError type check
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                }
            } else {
                console.error('Non-Axios error:', error);
            }
    
            throw error;
        }
    },
    putTask: async (userId: string, task:TaskType, token:string) => {
            try{
                const body = {
                    userId,
                    ...task
                }
        
              
            let newTasckCreated = await axios.put(`${baseUrl}tasks/${body.id}`, body, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return newTasckCreated.data;
        }catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError type check
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                }
            } else {
                console.error('Non-Axios error:', error);
            }
    
            throw error;
        }
    },
    getAllTask: async (userId: string ,token:string) => {
            try{
               
        
              
            let newTasckCreated = await axios.get(`${baseUrl}tasks`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return newTasckCreated.data;
        }catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError type check
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                }
            } else {
                console.error('Non-Axios error:', error);
            }
    
            throw error;
        }
    },
    deleteTask: async (taskId: string ,token:string) => {
            try{
               
        
              
            let newTasckCreated = await axios.delete(`${baseUrl}tasks/${taskId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return newTasckCreated.data;
        }catch (error) {
            if (axios.isAxiosError(error)) {
                // AxiosError type check
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                }
            } else {
                console.error('Non-Axios error:', error);
            }
    
            throw error;
        }
    },

}