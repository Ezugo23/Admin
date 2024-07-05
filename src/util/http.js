import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export async function getAllUsers() {
    const response = await fetch('https://delivery-chimelu-new.onrender.com/api/v1/user/profile/');
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching all users');
      error.code = response.status;
      throw error;
    }
  
    const data = await response.json();

    return data;
  }

export async function fetchUserProfile( id ) {
  const response = await fetch(`https://delivery-chimelu-new.onrender.com/api/v1/user/profile/${id}`);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the user profile');
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data.data;
}

export async function getOrderHistory(id) {
  const response = await fetch(`https://delivery-chimelu-new.onrender.com/api/v1/orders/user-orders/${id}`);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching order history');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function suspendOrActivate(id) {
  const response = await fetch(`https://delivery-chimelu-new.onrender.com/api/v1/${id}/toggle-user-status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
  }
  });

  if (!response.ok) {
    const error = new Error('An error occurred while trying to fetch data');
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function getPaymentDetails(id) {
  const response = await fetch(`https://delivery-chimelu-new.onrender.com/api/v1/transaction/user/${id}`);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching all users');
    error.code = response.status;
    throw error;
  }

  const {data} = await response.json();

  return data;
}
// export async function updateUserInfo({ id, user }) {
//   const response = await fetch(`https://delivery-chimelu-new.onrender.com/api/v1/user/profile/update/byId/${id}`, {
//     method: 'PATCH',
//     body: JSON.stringify({ user }),
//     headers: {
//       'Content-Type': 'application/json',
//   }
//   });

//   if (!response.ok) {
//     const error = new Error('An error occurred while fetching the user profile');
//     throw error;
//   }

//   const data = await response.json();

//   return data;
// }
