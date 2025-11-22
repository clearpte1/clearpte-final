import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export class UserService {
    private static instance: UserService;

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    
    async getUserProfile(userId: string) {
        try {
            const response = await axios.get(`${API_BASE}/user/profile/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    }

    async updateUserProfile(userId: string, data: any) {
        try {
            const response = await axios.put(`${API_BASE}/user/profile/${userId}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    }
    
}

export const userService = UserService.getInstance();
