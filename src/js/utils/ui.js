/**
 * UI Utilities for Notifications and Dialogs
 */

export const UI = {
    // Initialize UI Containers
    init() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    },

    /**
     * Show a Toast Notification
     * @param {string} message 
     * @param {'success'|'error'|'warning'|'info'} type 
     */
    showToast(message, type = 'info') {
        this.init(); // Ensure container exists
        const container = document.querySelector('.toast-container');

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'ri-information-line';
        if (type === 'success') icon = 'ri-checkbox-circle-line';
        if (type === 'error') icon = 'ri-error-warning-line';
        if (type === 'warning') icon = 'ri-alert-line';

        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Remove after animation (3s total usually)
        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    /**
     * Show a Confirmation Dialog
     * @param {string} title 
     * @param {string} message 
     * @param {Function} onConfirm - Callback if confirmed
     * @param {string} confirmText 
     * @param {string} cancelText 
     * @param {boolean} isDestructive - If true, confirm button is red
     */
    showConfirm(title, message, onConfirm, confirmText = 'Confirmar', cancelText = 'Cancelar', isDestructive = false) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        // Icon Logic
        const iconClass = isDestructive ? 'ri-error-warning-line' : 'ri-question-line';
        const iconColor = isDestructive ? 'var(--destructive)' : 'var(--primary)';

        const confirmBtnClass = isDestructive ? 'btn btn-primary' : 'btn btn-primary';
        // Note: destructuve usually red. Let's use inline style or class if we have it.
        // We defined .btn-primary. Let's make it flexible.
        const confirmStyle = isDestructive ? 'background-color: var(--destructive); border-color: var(--destructive);' : '';

        overlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <i class="${iconClass}" style="font-size: 1.5rem; color: ${iconColor};"></i>
                    <h3 class="modal-title">${title}</h3>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline btn-sm" id="modal-cancel">${cancelText}</button>
                    <button class="btn btn-primary btn-sm" id="modal-confirm" style="${confirmStyle}">${confirmText}</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const close = () => {
            overlay.classList.add('is-closing');
            overlay.addEventListener('animationend', () => {
                overlay.remove();
            });
        };

        overlay.querySelector('#modal-cancel').addEventListener('click', close);

        overlay.querySelector('#modal-confirm').addEventListener('click', () => {
            if (onConfirm) onConfirm();
            close();
        });

        // Close on backdrop click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
    }
};
