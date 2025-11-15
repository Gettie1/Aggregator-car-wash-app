import { getHeaders } from "./profileApi";
import {url} from "./AuthApi";

export const getBookings = async () => {
    const response = await fetch(`${url}/bookings`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch bookings');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getBooking = async (id: number) => {
    const response = await fetch(`${url}/bookings/${id}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch booking');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const createBooking = async (data: any) => {
    const response = await fetch(`${url}/bookings`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create booking');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const updateBooking = async (id: number, data: any) => {
    const response = await fetch(`${url}/bookings/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update booking');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const deleteBooking = async (id: number) => {
    const response = await fetch(`${url}/bookings/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to delete booking');
    }
    return { message: 'Booking deleted successfully' };
};
export const getBookingsByCustomerId = async (customerId: number) => {
    const response = await fetch(`${url}/bookings/customer/${customerId}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch bookings for customer');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getBookingsByVendorId = async (vendorId: number) => {
    const response = await fetch(`${url}/bookings/vendor/${vendorId}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch bookings for vendor');
    }
    const jsonData = await response.json();
    return jsonData;
};

export const getUpdateBookingStatus = async (id: number, status: string) => {
    const response = await fetch(`${url}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        throw new Error('Failed to update booking status');
    }
    const jsonData = await response.json();
    return jsonData;
}