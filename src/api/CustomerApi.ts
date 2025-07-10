const url = 'http://localhost:4001/customer';

export const getCustomers = async () => {
    const response = await fetch(`${url}`, {
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
export const getCustomer = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
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
    const response = await fetch(`${url}`, {
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
export const updateCustomer = async (id: string, data: any) => {
    const response = await fetch(`${url}/${id}`, {
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
export const deleteCustomer = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
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
