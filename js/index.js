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

    function realizarBusqueda() {
        const termino = barraBusqueda.value.trim();
        const terminoLower = termino.toLowerCase();
        const tarjetas = contenedor.querySelectorAll('.espaciado');
        const mensajeError = document.getElementById('no-esta');

        let hayCoincidencias = false;

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.querySelector('.info-img span').innerText.toLowerCase();

            if (nombre.includes(terminoLower)) {
                tarjeta.style.display = 'block';
                hayCoincidencias = true;
            } else {
                tarjeta.style.display = 'none';
            }
        });

        if (hayCoincidencias) {
            mensajeError.innerHTML = "";
        } else {
            const queryNegrita = `<b>${termino}</b>`;
            let textoFinal = config.mensaje.replace('[query]', queryNegrita);

            mensajeError.innerHTML = textoFinal;
        }
    }

    botonBusqueda.addEventListener('click', realizarBusqueda);

    barraBusqueda.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            realizarBusqueda();
        }
    });

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

    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');

    if (query) {
        const barra = document.getElementById('barra');
        barra.value = query;

        realizarBusqueda();
    }

    // event listener
    contenedor.addEventListener('click', function (event) {
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