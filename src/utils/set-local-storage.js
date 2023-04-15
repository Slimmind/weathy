export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
