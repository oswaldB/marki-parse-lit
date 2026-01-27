document.addEventListener('alpine:init', () => {
  Alpine.store('toast', {
    toasts: [],

    showToast(message, type = 'info', duration = 5000) {
      const id = Date.now();
      const toast = { id, message, type };
      this.toasts.push(toast);

      // Supprimer le toast après la durée spécifiée
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    },

    removeToast(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id);
    }
  });
});