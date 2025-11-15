import { getHeaders } from "./profileApi";
import {url} from "./AuthApi";

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
export const getVendor = async (id: number) => {
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
export const updateVendor = async (id: number, data: any) => {
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
export const deleteVendor = async (id: number) => {
    const response = await fetch(`${url}/vendors/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to delete vendor');
    }
    return { message: 'Vendor deleted successfully' };
};