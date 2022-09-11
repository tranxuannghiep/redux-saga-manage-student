export interface Student {
    id?: string;
    name: string;
    ae: number;
    mark: number;
    gender: 'male' | 'female'
    city: string;
    createdAt?: number;
    updatedAt?: number;
}