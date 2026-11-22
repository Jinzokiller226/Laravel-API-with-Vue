import api from './api';
import type {ApiResponse, PaginatedResponse, Roles, RolesPayload} from '../types/roles';

export const rolesService ={
    async getAll(page = 1): Promise<PaginatedResponse<Roles>> {
        const response = await api.get<PaginatedResponse<Roles>>(`/roles`, {
            params: { page },
        });
        return response.data;
    },

    async getById(id: number): Promise<ApiResponse<Roles>> {
        const response = await api.get<ApiResponse<Roles>>(`/roles/${id}`);
        return response.data;
    },

    async create(payload: RolesPayload): Promise<ApiResponse<Roles>> {
        const response = await api.post<ApiResponse<Roles>>(`/roles`, payload);
        return response.data;
    },

    async update(id: number, payload: RolesPayload): Promise<ApiResponse<Roles>> {
        const response = await api.put<ApiResponse<Roles>>(`/roles/${id}`, payload);    
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/roles/${id}`);
    }
}