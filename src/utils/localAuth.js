// src/utils/localAuth.js

// Hash a string using SHA-256 and return hex
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getAllUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

export function saveAllUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export async function register(username, password) {
  const users = getAllUsers();
  if (users.find(u => u.username === username)) {
    throw new Error('Username already exists');
  }
  const hashed = await hashPassword(password);
  users.push({ username, password: hashed });
  saveAllUsers(users);
  localStorage.setItem('currentUser', username);
  return username;
}

export async function login(username, password) {
  const users = getAllUsers();
  const hashed = await hashPassword(password);
  const user = users.find(u => u.username === username && u.password === hashed);
  if (!user) throw new Error('Invalid username or password');
  localStorage.setItem('currentUser', username);
  return username;
}

export function logout() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

export function getFavorites(username) {
  return JSON.parse(localStorage.getItem(`favorites_${username}`) || '{"tools":[],"stacks":[]}');
}

export function saveFavorites(username, favorites) {
  localStorage.setItem(`favorites_${username}` , JSON.stringify(favorites));
}

export function addFavoriteTool(username, tool) {
  const fav = getFavorites(username);
  if (!fav.tools.find(t => t.name === tool.name)) {
    fav.tools.push(tool);
    saveFavorites(username, fav);
  }
}

export function removeFavoriteTool(username, tool) {
  const fav = getFavorites(username);
  fav.tools = fav.tools.filter(t => t.name !== tool.name);
  saveFavorites(username, fav);
}

export function addFavoriteStack(username, stack) {
  const fav = getFavorites(username);
  if (!fav.stacks.find(s => s.id === stack.id)) {
    fav.stacks.push(stack);
    saveFavorites(username, fav);
  }
}

export function removeFavoriteStack(username, stack) {
  const fav = getFavorites(username);
  fav.stacks = fav.stacks.filter(s => s.id !== stack.id);
  saveFavorites(username, fav);
} 