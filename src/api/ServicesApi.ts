import { getHeaders } from "./profileApi";
import {url} from "./AuthApi";

export const getServices = async () => {
    const response = await fetch(`${url}/services`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch services');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getService = async (id: number) => {
    const response = await fetch(`${url}/services/${id}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch service');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const createService = async (data: any) => {
    const response = await fetch(`${url}/services`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create service');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const updateService = async (id: number, data: any) => {
    const response = await fetch(`${url}/services/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update service');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const deleteService = async (id: number) => {
    const response = await fetch(`${url}/services/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to delete service');
    }
    return { message: 'Service deleted successfully' };
};
export const getServiceByVendor = async (vendorId: number) => {
    const response = await fetch(`${url}/services/vendor/${vendorId}`, {
        method: 'GET',
        headers:getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch services by vendor');
    }
    const jsonData = await response.json();
    return jsonData;
};
