export const removeLocalStorageToken = () => localStorage.removeItem("token");
export const getLocalStorageToken = () => localStorage.getItem("token");
export const setLocalStorageToken = (payload: object) =>
  localStorage.setItem("token", JSON.stringify(payload));

export const removeLocalStorageUser = () => localStorage.removeItem("user");
export const getLocalStorageUser = () =>
  JSON.parse(localStorage.getItem("user"));
export const setLocalStorageUser = (payload: object) =>
  localStorage.setItem("user", JSON.stringify(payload));
