import { auth, db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { hashPin } from './utils.js';
import { showToast } from './toast.js';

export const withPin = async (callback) => {
    const user = auth.currentUser;
    if (!user) return;

    const userSnap = await getDoc(doc(db, "users", user.uid));
    const userData = userSnap.data();

    if (!userData.pinHash) {
        window.location.href = "set-pin.html";
        return;
    }

    // Create Modal
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-[#002147]/95 z-[9999] flex items-center justify-center p-6 backdrop-blur-sm";
    modal.innerHTML = `
        <div class="max-w-sm w-full bg-white rounded-[2.5rem] p-10 text-center animate-in fade-in zoom-in duration-300">
            <div class="w-16 h-16 bg-slate-50 text-[#002147] rounded-3xl flex items-center justify-center mx-auto mb-6">
                <i class="fa-solid fa-shield-halved text-2xl"></i>
            </div>
            <h3 class="text-xl font-black text-[#002147] mb-2">Authorize Action</h3>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Enter Transaction PIN</p>
            <input type="password" id="guard-pin" class="w-full text-center text-3xl tracking-[0.5em] h-16 bg-slate-50 border-slate-100 mb-6" maxlength="6" inputmode="numeric" autofocus>
            <div class="grid grid-cols-2 gap-4">
                <button id="cancel-pin" class="h-14 rounded-2xl text-[10px] font-black uppercase text-slate-400 tracking-widest">Cancel</button>
                <button id="confirm-pin" class="h-14 btn-primary rounded-2xl text-[10px] uppercase tracking-widest">Verify</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = modal.querySelector('#guard-pin');
    const confirmBtn = modal.querySelector('#confirm-pin');
    const cancelBtn = modal.querySelector('#cancel-pin');

    cancelBtn.onclick = () => modal.remove();

    confirmBtn.onclick = async () => {
        const hashedInput = await hashPin(input.value);
        if (hashedInput === userData.pinHash) {
            modal.remove();
            callback();
        } else {
            showToast("Invalid PIN", "error");
            input.value = "";
            input.focus();
        }
    };
};
