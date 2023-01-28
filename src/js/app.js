document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
})

function navegacionFija() {
    const navbar = document.querySelector('.navbar'); // --> Selecciono el elemento con la clase ".navbar" y lo almaceno.
    const hero = document.querySelector('.hero');  // --> Selecciono el elemento con la clase ".hero" y lo almaceno.
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {      // --> En la ventana aplicamos addEventListener(), para escuchar por el evento 'scroll', y aplique una función.

        if( hero.getBoundingClientRect().bottom < 0 ) {
            // console.log("Ya pasamos el elemento.");
            navbar.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            // console.log("Aún no lo pasamos...");
            navbar.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}
