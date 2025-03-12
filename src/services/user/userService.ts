import { request } from '@umijs/max'; 
 
export async function getUsers() { 
  return request<UserTyping.UserInfo>('https://jsonplaceholder.typicode.com/users'); 
} 
 
export async function addUser(data: UserTyping.UserDTO) { 
  return request<UserTyping.UserInfo>('https://jsonplaceholder.typicode.com/users', { 
    method: 'POST', 
    data, 
  }); 
} 
 
export async function updateUser(id: string, data: UserTyping.UserDTO) { 
  return request<UserTyping.UserInfo>(`https://jsonplaceholder.typicode.com/users/${id}`, { 
    method: 'PUT', 
    data, 
  }); 
} 
 
export async function deleteUser(id: string) { 
  return request(`https://jsonplaceholder.typicode.com/users/${id}`, { 
    method: 'DELETE', 
  }); 
} 