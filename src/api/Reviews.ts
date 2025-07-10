const url = 'http://localhost:4001/reviews';

export const getReviews = async () => {
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reviews');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getReview = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch review');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const createReview = async (data: any) => {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create review');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const updateReview = async (id: string, data: any) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update review');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const deleteReview = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete review');
    }
    return { success: true };
};
export const getReviewsByVehicleId = async (vehicleId: string) => {
    const response = await fetch(`${url}/vehicle/${vehicleId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reviews for vehicle');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getReviewsByCustomerId = async (customerId: string) => {
    const response = await fetch(`${url}/customer/${customerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reviews for customer');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getReviewsByVendorId = async (vendorId: string) => {
    const response = await fetch(`${url}/vendor/${vendorId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reviews for vendor');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getReviewsByBookingId = async (bookingId: string) => {
    const response = await fetch(`${url}/booking/${bookingId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reviews for booking');
    }
    const jsonData = await response.json();
    return jsonData;
};
export const getReviewsByServiceId = async (serviceId: string) => {
    const response = await fetch(`${url}/service/${serviceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reviews for service');
    }
    const jsonData = await response.json();
    return jsonData;
};
