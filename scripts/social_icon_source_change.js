let nav_twitter_icon = document.getElementById('nav-twitter-icon');
let nav_instagram_icon = document.getElementById('nav-instagram-icon');
let nav_facebook_icon = document.getElementById('nav-facebook-icon');

nav_twitter_icon.addEventListener('mouseover', function() {
  document.getElementById('nav-twitter-img').src = '../images/twitter_icon_purple.png';
});
nav_instagram_icon.addEventListener('mouseover', function() {
  document.getElementById('nav-instagram-img').src = '../images/instagram_icon_purple.png';
});
nav_facebook_icon.addEventListener('mouseover', function() {
  document.getElementById('nav-facebook-img').src = '../images/facebook_icon_purple.png';
});
nav_twitter_icon.addEventListener('mouseout', function() {
  document.getElementById('nav-twitter-img').src = '../images/twitter_icon_red.png';
});
nav_instagram_icon.addEventListener('mouseout', function() {
  document.getElementById('nav-instagram-img').src = '../images/instagram_icon_red.png';
});
nav_facebook_icon.addEventListener('mouseout', function() {
  document.getElementById('nav-facebook-img').src = '../images/facebook_icon_red.png';
});