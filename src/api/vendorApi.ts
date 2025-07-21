import { getHeaders } from "./profileApi";

const url = 'http://localhost:4001';

export const getVendors = async () => {
    const response = await fetch(`${url}/vendors`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch vendors');
    }
    const jsonData = await response.json();
    return jsonData;
}
export const getVendor = async (id: string) => {
    const response = await fetch(`${url}/vendors/${id}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch vendor');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const createVendor = async (data: any) => {
    const response = await fetch(`${url}/vendors`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create vendor');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const updateVendor = async (id: string, data: any) => {
    const response = await fetch(`${url}/vendors/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update vendor');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const deleteVendor = async (id: string) => {
    const response = await fetch(`${url}/vendors/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to delete vendor');
    }
    return { message: 'Vendor deleted successfully' };
};