/**
 * Trust Bank Component Library
 * Standardized UI elements for the Trust Bank ecosystem.
 */

// 1. Top Header Component
export const renderHeader = (title, showBack = false) => `
    <header class="flex items-center justify-between px-6 py-8 bg-white border-b border-slate-100">
        <div class="flex items-center gap-4">
            ${showBack ? `
                <button onclick="history.back()" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#002147] active:scale-90 transition-transform">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>` : ''}
            <h1 class="text-xl font-black text-[#002147] tracking-tight">${title}</h1>
        </div>
        <div class="w-10 h-10 bg-[#002147] rounded-xl flex items-center justify-center shadow-lg shadow-navy-900/20">
            <span class="text-[#D4AF37] font-black text-xs">TB</span>
        </div>
    </header>
`;

// 2. Bottom Navigation Component
// Enhanced to support internal tab switching on Dashboard vs regular links
export const renderBottomNav = (active = 'dashboard') => {
    const isDashboard = window.location.pathname.includes('dashboard.html');
    
    // Helper to determine if the link should switch a tab or go to a page
    const getHomeAction = isDashboard ? `onclick="switchTab('home')"` : `onclick="location.href='dashboard.html'"`;
    const getChatAction = isDashboard ? `onclick="switchTab('support')"` : `onclick="location.href='dashboard.html?tab=support'"`;

    return `
        <nav class="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50">
            <!-- Home -->
            <button ${getHomeAction} class="flex flex-col items-center gap-1 ${active === 'dashboard' && !window.location.search.includes('support') ? 'text-[#002147]' : 'text-slate-300'}">
                <i class="fa-solid fa-house text-lg"></i>
                <span class="text-[9px] font-black uppercase tracking-widest">Home</span>
            </button>

            <!-- Transfer -->
            <a href="transfer.html" class="flex flex-col items-center gap-1 ${active === 'transfer' ? 'text-[#002147]' : 'text-slate-300'}">
                <i class="fa-solid fa-paper-plane text-lg"></i>
                <span class="text-[9px] font-black uppercase tracking-widest">Send</span>
            </a>

            <!-- Live Chat -->
            <button ${getChatAction} class="flex flex-col items-center gap-1 ${window.location.search.includes('support') ? 'text-[#002147]' : 'text-slate-300'}">
                <i class="fa-solid fa-comment-dots text-lg"></i>
                <span class="text-[9px] font-black uppercase tracking-widest">Chat</span>
            </button>

            <!-- Profile/Settings -->
            <a href="settings.html" class="flex flex-col items-center gap-1 ${active === 'settings' ? 'text-[#002147]' : 'text-slate-300'}">
                <i class="fa-solid fa-user-gear text-lg"></i>
                <span class="text-[9px] font-black uppercase tracking-widest">Account</span>
            </a>
        </nav>
    `;
};

// 3. Status Badge Component
export const renderStatusBadge = (status) => {
    const s = status ? status.toUpperCase() : 'PENDING';
    let classes = 'bg-slate-50 text-slate-400 border-slate-100';

    if (['APPROVED', 'VERIFIED', 'SUCCESSFUL', 'COMPLETED'].includes(s)) {
        classes = 'bg-emerald-50 text-emerald-600 border-emerald-100';
    } else if (['PENDING', 'OPEN', 'AWAITING'].includes(s)) {
        classes = 'bg-amber-50 text-amber-600 border-amber-100';
    } else if (['DECLINED', 'REJECTED', 'FAILED', 'CLOSED'].includes(s)) {
        classes = 'bg-rose-50 text-rose-600 border-rose-100';
    }

    return `<span class="px-3 py-1 rounded-full text-[9px] font-black uppercase border ${classes} tracking-tighter">${s}</span>`;
};

// 4. Decline Message Component
export const renderDeclinedBanner = (reason) => `
    <div class="mb-6 p-5 bg-rose-50 border border-rose-100 rounded-[2rem] flex gap-4 items-start animate-in slide-in-from-top duration-300">
        <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-sm shrink-0">
            <i class="fa-solid fa-circle-exclamation"></i>
        </div>
        <div>
            <p class="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Request Declined</p>
            <p class="text-xs font-bold text-rose-800 leading-relaxed mb-3">${reason || 'The information provided could not be verified by our audit team.'}</p>
            <p class="text-[9px] font-medium text-rose-600 uppercase font-black">
                Need help? <a href="dashboard.html?tab=support" class="underline">Chat with an Agent</a>
            </p>
        </div>
    </div>
`;

// 5. Action Success Component (Large Card)
export const renderApprovedSuccess = (message, buttonAction) => `
    <div class="text-center py-12 px-6 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl animate-in zoom-in duration-300">
        <div class="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
            <i class="fa-solid fa-check text-4xl"></i>
        </div>
        <h2 class="text-2xl font-black text-[#002147] mb-2 tracking-tight">Success!</h2>
        <p class="text-slate-500 text-sm mb-10 leading-relaxed">${message}</p>
        <div class="flex flex-col gap-4">
            <button onclick="${buttonAction}" class="btn-primary h-16 w-full rounded-2xl shadow-xl shadow-navy-900/20">
                Perform Another Action
            </button>
            <a href="dashboard.html" class="text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-[#002147] transition-colors">
                Back to Dashboard
            </a>
        </div>
    </div>
`;

// 6. Empty State Component
export const renderEmptyState = (msg) => `
    <div class="py-16 text-center bg-white/40 rounded-[2rem] border border-dashed border-slate-200">
        <div class="w-14 h-14 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa-solid fa-folder-open text-xl"></i>
        </div>
        <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest">${msg}</p>
    </div>
`;
