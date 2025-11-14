import { getHeaders } from "./profileApi";

const url = import.meta.env.VITE_API_URL + '/vehicles' || 'http://localhost:4001/vehicles';

export const getVehicles = async () => {
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
    }
    const jsonData = await response.json();
    return jsonData;
};

export const getVehicle = async (id: number) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle');
  }
  const jsonData = await response.json();
  return jsonData;
};
export const getVehiclesByCustomerId = async (customerId: number) => {
  console.log('🔍 Fetching vehicles for customerId:', customerId);
  
  const apiUrl = `${url}?customerId=${customerId}`;
  console.log('🔍 API URL:', apiUrl);
  
  // Don't send Authorization header since vehicles endpoints don't require auth
  const headers = {
    'Content-Type': 'application/json'
  };
  console.log('🔍 Request headers (no auth):', headers);
  
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: headers,
    });
    
    console.log('🔍 Response status:', response.status);
    console.log('🔍 Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('🔍 Response error:', errorText);
      throw new Error(`Failed to fetch vehicles for customer: ${errorText}`);
    }
    
    const jsonData = await response.json();
    console.log('🔍 API response successful:', jsonData);
    console.log('🔍 Number of vehicles returned:', jsonData.length);
    
    // Check if backend filtered correctly, if not apply client-side filtering
    const allBelongToCustomer = jsonData.every((vehicle: any) => 
      String(vehicle.customer_id) === String(customerId)
    );
    
    if (allBelongToCustomer) {
      console.log('🔍 Backend filtered correctly, returning all vehicles');
      return jsonData;
    } else {
      console.log('🔍 Backend did not filter, applying client-side filtering');
      return filterVehicles(jsonData, customerId);
    }
    
  } catch (error) {
    console.error('🔍 Fetch error:', error);
    throw error;
  }
}

// Helper function to filter vehicles
function filterVehicles(jsonData: Array<any>, customerId: number) {
  console.log('🔍 Raw API response:', jsonData);
  console.log('🔍 Number of vehicles returned:', jsonData.length);
  
  // Add client-side filtering as a fallback if backend doesn't filter properly
  const filteredVehicles = jsonData.filter((vehicle: any) => {
    console.log(`🔍 Vehicle ${vehicle.id}: customer_id=${vehicle.customer_id}, looking for=${customerId}`);
    return String(vehicle.customer_id) === String(customerId);
  });
  
  console.log('🔍 Filtered vehicles count:', filteredVehicles.length);
  console.log('🔍 Filtered vehicles:', filteredVehicles);
  
  return filteredVehicles;
}
export const createVehicle = async (data: any) => {
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create vehicle');
  }
  const jsonData = await response.json();
  return jsonData;
};

export const updateVehicle = async (id: number, data: any) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update vehicle');
  }
  const jsonData = await response.json();
  return jsonData;
};

export const deleteVehicle = async (id: number) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(), 
  });
  if (!response.ok) {
    throw new Error('Failed to delete vehicle');
  }
  return { message: 'Vehicle deleted successfully' };
};