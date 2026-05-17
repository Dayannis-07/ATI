function cargarIdioma(lang, callback) {
    const script = document.createElement('script');
    const langFile = `./conf/config${lang.toUpperCase()}.json`;
    script.src = langFile;

    script.onload = () => {
        console.log(`Idioma ${lang} cargado`);
        callback();
    };
    document.head.appendChild(script);
}

function scriptCI(ci, callback) {
    const script = document.createElement('script');
    script.src = `../${ci}/profile.json`;

    script.onload = callback;

    document.head.appendChild(script);
}

function validarEtiqueta(configArray, profileData) {
    // para verificar si uso el singular o plural de las preguntas
    if (Array.isArray(profileData) && profileData.length > 1) {
        return configArray[1];
    }
    return configArray[0];
}

function rellenarDatos() {

    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang') || 'es';

    const linkHome = document.getElementById('link-index');
    if (linkHome) {
        linkHome.href = `./index.html?lang=${lang}`;
    }

    document.getElementById('copyRight').innerText = config.copyRight;
    document.getElementById('site-1').innerText = config.site[0];
    document.getElementById('site-2').innerText = config.site[1];
    document.getElementById('site-3').innerText = config.site[2];
    document.getElementById('texto-mi-perfil').innerText = config.profile;

    const barraBusqueda = document.getElementById('barra');
    if (barraBusqueda) {
        barraBusqueda.placeholder = config.name;
    }

    const botonBusqueda = document.getElementById('boton');
    if (botonBusqueda) {
        botonBusqueda.value = config.search;
    }

    function redirigirABusqueda() {
        const termino = barraBusqueda.value.trim();
        if (termino !== "") {
            const params = new URLSearchParams(window.location.search);
            const lang = params.get('lang') || 'es';

            window.location.href = `./index.html?lang=${lang}&q=${encodeURIComponent(termino)}`;
        }
    }

    botonBusqueda.addEventListener('click', redirigirABusqueda);

    barraBusqueda.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            redirigirABusqueda();
        }
    });

    if (typeof profile !== 'undefined') {
        document.getElementById('titulo').innerText = profile.name;
        document.getElementById('texto-perfil').innerText = profile.description;

        const fraseCompleta = config.email;
        const partes = fraseCompleta.split('[email]');
        const pCorreo = document.getElementById('texto-correo');
        const aCorreo = pCorreo.querySelector('a');
        const spanEmail = document.getElementById('texto-email');
        pCorreo.firstChild.textContent = partes[0];
        spanEmail.innerText = profile.email;
        aCorreo.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`;

        // perfil segun ci
        document.getElementById('imagen-perfil').src = `../${profile.ci}/${profile.ci}Big.jpg`;
        //document.getElementById('imagen-perfil-small').src = `../${profile.ci}/${profile.ci}Small.png`;
        document.getElementById('imagen-perfil-small').src = `../${profile.ci}/${profile.ci}Small.jpg`;

        const questions = document.querySelectorAll('.items-q');
        const answers = document.querySelectorAll('.items-a');

        const datosTabla = [
            { q: config.color, a: profile.color },
            {
                q: validarEtiqueta(config.book, profile.book),
                a: Array.isArray(profile.book) ? profile.book.join(", ") : profile.book
            },
            {
                q: validarEtiqueta(config.music, profile.music),
                a: Array.isArray(profile.music) ? profile.music.join(", ") : profile.music
            },
            {
                q: validarEtiqueta(config.video_game, profile.video_game),
                a: Array.isArray(profile.video_game) ? profile.video_game.join(", ") : profile.video_game
            },
            {
                q: config.language,
                a: Array.isArray(profile.language) ? profile.language.join(", ") : profile.language
            }
        ];

        datosTabla.forEach((item, index) => {
            if (questions[index] && answers[index]) {
                questions[index].innerText = item.q;
                answers[index].innerText = item.a;
            }
        });
    }

    const menuHamburguesa = document.getElementById('menu-hamburguesa');
    const navbar = document.querySelector('.navbar');

    if (menuHamburguesa) {
        menuHamburguesa.addEventListener('click', () => {
            navbar.classList.toggle('nav-active');
        });
    }
}


window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const personCI = params.get('ci');
    let lang = params.get('lang') || 'es'; // Si no hay lang, usa 'es'

    // Primero cargamos el idioma, luego los datos de la persona
    cargarIdioma(lang, () => {
        if (personCI) {
            scriptCI(personCI, rellenarDatos);
        } else {
            // Incluso si no hay CI, rellenamos lo que dependa del idioma (nav, footer)
            rellenarDatos();
            if (document.getElementById('titulo')) {
                document.getElementById('titulo').innerText = "CI no especificada";
            }
        }
    });
};