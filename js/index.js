function cargarIdioma(lang, callback) {
    const script = document.createElement('script');
    const langFile = `./conf/config${lang.toUpperCase()}.json`;
    script.src = langFile;
    
    script.onload = () => {
        //console.log(`Idioma ${lang} cargado`);
        callback();
    };
    
    document.head.appendChild(script);
}

function index() {
    document.getElementById('semester').innerText = config.semester;
    document.getElementById('copyRight').innerText = config.copyRight;

    document.getElementById('site-1').innerText = config.site[0];
    document.getElementById('site-2').innerText = config.site[1];
    document.getElementById('site-3').innerText = config.site[2];

    const barraBusqueda = document.getElementById('barra');
    if (barraBusqueda) {
        barraBusqueda.placeholder = config.name;
    }

    const botonBusqueda = document.getElementById('boton');
    if (botonBusqueda) {
        botonBusqueda.value = config.search;
    }

    const contenedor = document.getElementById('contenedor-tabla');
    contenedor.innerHTML = '';

    profiles.forEach(persona => {
        const htmlPerfil = `
            <div class="espaciado">
                <a href="#" class="enlace" data-ci="${persona.ci}">
                    <img src="../${persona.ci}/${persona.ci}Big${persona.image_ext}" alt="${persona.name}" class="img-tabla">
                    <div class="info-img"> <span>${persona.name}</span> </div>
                    <div class="pie-img"></div>
                </a>
            </div>
        `;
        contenedor.innerHTML += htmlPerfil;
    });

    // event listener
    contenedor.addEventListener('click', function(event) {
        const tarjeta = event.target.closest('.enlace');
        
        if (tarjeta) {
            event.preventDefault();
            // obtenemos ci
            const ci = tarjeta.getAttribute('data-ci');
            //mantengo el idioma de la paginas iguales
            const urlParams = new URLSearchParams(window.location.search);
            const langActual = urlParams.get('lang') || 'es';
            window.location.href = `./profile.html?ci=${ci}&lang=${langActual}`;
        }
    });
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || 'es';

    cargarIdioma(lang, index);
};