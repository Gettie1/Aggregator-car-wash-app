const url = 'http://localhost:4001';

export const getVehicles = async () => {
    const response = await fetch(`${url}/vehicles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
    }
    const jsonData = await response.json();
    return jsonData;
};

export const getVehicle = async (id: string) => {
  const response = await fetch(`${url}/vehicles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle');
  }
  const jsonData = await response.json();
  return jsonData;
};
export const getVehiclesByCustomerId = async (customerId: string) => {
  const response = await fetch(`${url}/vehicles?customerId=${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles for customer');
  }
  const jsonData = await response.json();
  return jsonData;
}
export const createVehicle = async (data: any) => {
  const response = await fetch(`${url}/vehicles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create vehicle');
  }
  const jsonData = await response.json();
  return jsonData;
};

export const updateVehicle = async (id: string, data: any) => {
  const response = await fetch(`${url}/vehicles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update vehicle');
  }
  const jsonData = await response.json();
  return jsonData;
};

export const deleteVehicle = async (id: string) => {
  const response = await fetch(`${url}/vehicles/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete vehicle');
  }
  return { message: 'Vehicle deleted successfully' };
};