function navegacionFija(){const e=document.querySelector(".navbar"),o=document.querySelector(".hero"),n=document.querySelector("body");window.addEventListener("scroll",(function(){o.getBoundingClientRect().bottom<0?(e.classList.add("fijo"),n.classList.add("body-scroll")):(e.classList.remove("fijo"),n.classList.remove("body-scroll"))}))}document.addEventListener("DOMContentLoaded",(function(){navegacionFija()}));
//# sourceMappingURL=app.js.map