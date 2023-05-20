export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, data ? JSON.stringify(data) : '');
};
