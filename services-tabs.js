// Services page tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const serviceGrids = document.querySelectorAll('.services-grid');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all service grids
            serviceGrids.forEach(grid => {
                grid.classList.add('hidden');
            });
            
            // Show selected category grid
            const targetGrid = document.getElementById(category);
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
            }
        });
    });
});