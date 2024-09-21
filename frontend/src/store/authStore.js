import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    signup: async (email, password) => {
        set({ isLoading: true });
        try {
            const { data } = await axios.post(`${API_URL}/signup`, { email, password });
            set({ user: data.user, isAuthenticated: true, error: null, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "error signing up", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: data.user, isAuthenticated: true, error: null, isLoading: false });
            return data;
        } catch (error) {
            set({ error: error.response.data.message || "error verifying email", isLoading: false });
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axios.post(`${API_URL}/login`, { email, password });
            set({ user: data.user, isAuthenticated: true, error: null, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "error logging in", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const { data } = await axios.get(`${API_URL}/check-auth`);
            set({ user: data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isAuthenticated: false, isCheckingAuth: false });
            throw error;
        }
    },
    forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
}));