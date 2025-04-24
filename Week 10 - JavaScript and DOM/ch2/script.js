document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', function() {
        this.classList.add('hidden');
    });
});