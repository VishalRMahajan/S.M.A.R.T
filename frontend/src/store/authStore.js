import {create} from "zustand";
import axios from "axios";


const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isCheckingAuth:true,

    signup : async(email,password, name) => {
        set({error:null})
        try {
           const response = await axios.post(`${API_URL}/signup`, {email,password,name})
            set({user:response.data.user, isAuthenticated:true})
        } catch (error) {
            set({error:error.response.data.message || "Error signing up"});
            throw error;
        }
    },

    verifyemail : async(verificationToken) => {
        set({error:null})
        try {
           const response = await axios.post(`${API_URL}/verifyemail`, {verificationToken})
            set({user:response.data.user, isAuthenticated:true})
            return response.data;
        } catch (error) {
            set({error:error.response.data.message || "Error signing up"});
            throw error;
        }
    }
}))