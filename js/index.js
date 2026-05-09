function index() {
    document.getElementById('semester').innerText = config.semester;
    document.getElementById('name').innerText = config.name;
    document.getElementById('copyRight').innerText = config.copyRight;

    document.getElementById('site-1').innerText = config.site[0];
    document.getElementById('site-2').innerText = config.site[1];
    document.getElementById('site-3').innerText = config.site[2];
}

window.onload = index;