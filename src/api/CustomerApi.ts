import { url } from "./AuthApi";
import type { Customer } from "@/types/users";

export const getCustomers = async () => {
    const response = await fetch(`${url}/customer`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch customers');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getCustomer = async (id: number): Promise<Customer> => {
    const response = await fetch(`${url}/customer/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch customer');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const createCustomer = async (data: any) => {
    const response = await fetch(`${url}/customer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create customer');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const updateCustomer = async (id: number, data: any) => {
    const response = await fetch(`${url}/customer/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update customer');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const deleteCustomer = async (id: number) => {
    const response = await fetch(`${url}/customer/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete customer');
    }
    return { message: 'Customer deleted successfully' };
};
