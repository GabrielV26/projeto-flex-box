// Função para rolagem suave
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.offsetTop;
    var startPosition = window.pageYOffset;
    var headerHeight = document.querySelector('#header').offsetHeight; // Obtém a altura do cabeçalho
    var distance = targetPosition - startPosition - headerHeight; // Subtrai a altura do cabeçalho da posição alvo
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Função para cálculo de aceleração da rolagem
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Evento de clique nos links com classe "smooth-scroll"
var links = document.querySelectorAll('.smooth-scroll');
links.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = this.getAttribute('href');
        var duration = 1000; // Tempo de duração da rolagem em milissegundos 
        smoothScroll(target, duration);
    });
});
