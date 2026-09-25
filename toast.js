export const showToast = (msg, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl text-white text-xs font-black uppercase shadow-2xl z-[100] transition-all duration-300 ${type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'}`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500); }, 3000);
};
