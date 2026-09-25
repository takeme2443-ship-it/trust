export const saveSession = (data) => localStorage.setItem('tb_user', JSON.stringify(data));
export const getSession = () => JSON.parse(localStorage.getItem('tb_user'));
export const clearSession = () => localStorage.removeItem('tb_user');
