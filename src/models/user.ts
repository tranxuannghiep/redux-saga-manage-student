export interface User {
    id?: string | number;
    email: string;
    name: string;
    gender: "male" | "female";
    avatar?: string;
    description?: string;
    region: number;
    state: number;
    token: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Region {
    id: number;
    pid: string | null;
    name: string;
    createdAt?: string;
}

export interface State {
    id: number;
    pid: string | null;
    name: string;
    createdAt?: string;
}