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
    
    document.getElementById('copyRight').innerText = config.copyRight;
    document.getElementById('site-1').innerText = config.site[0];
    document.getElementById('site-2').innerText = config.site[1];
    document.getElementById('site-3').innerText = config.site[2];
    

    if (typeof profile !== 'undefined') {
        document.getElementById('titulo').innerText = profile.name;
        document.getElementById('texto-perfil').innerText = profile.description;
        document.getElementById('texto-email').innerText = profile.email;

        // perfil segun ci
        document.getElementById('imagen-perfil').src = `../${profile.ci}/${profile.ci}Big.jpg`;
        document.getElementById('imagen-perfil-small').src = `../${profile.ci}/${profile.ci}Small.png`;

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
}


window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const personCI = params.get('ci');

    if (personCI) {
        scriptCI(personCI, rellenarDatos);
    } else {
        document.getElementById('titulo').innerText = "CI no especificada";
    }
};