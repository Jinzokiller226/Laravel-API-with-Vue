export interface Branches{
    id: number;
    role_name: string;
    role_description: string;
    role_data: string;
}

export interface BranchesPayload{
   
    role_name: string;
    role_description: string;
    role_data: string;
}

export interface ApiResponse<T> {
    data: T;
    
}

export interface PaginatedResponse<T> {
    data: T[];
   links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}