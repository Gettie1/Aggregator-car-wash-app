const url='http://localhost:4001/bookings';

export const getBookings = async () => {
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch bookings');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getBooking = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch booking');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const createBooking = async (data: any) => {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create booking');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const updateBooking = async (id: string, data: any) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update booking');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const deleteBooking = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete booking');
    }
    return { message: 'Booking deleted successfully' };
};
export const getBookingsByCustomerId = async (customerId: string) => {
    const response = await fetch(`${url}/customer/${customerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch bookings for customer');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getBookingsByVendorId = async (vendorId: string) => {
    const response = await fetch(`${url}/vendor/${vendorId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch bookings for vendor');
    }
    const jsonData = await response.json();
    return jsonData;
};