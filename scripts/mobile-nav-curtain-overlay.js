document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for mobile overlay curtain menu
    document.getElementsByClassName("mobile-nav-glyph-wrapper").addEventListener("touchend", function(){
        getElementsByClassName("mobile-nav-overlay").classList.remove("hidden");
    });
});