// Mobile navigation handler
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (sidebar && sidebar.classList.contains('show')) {
            const isClickInside = sidebar.contains(event.target) || mobileMenuToggle.contains(event.target);
            if (!isClickInside) {
                sidebar.classList.remove('show');
            }
        }
    });
});
