const header=document.querySelector('.site-header');const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');
window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',window.scrollY>40);});
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
const sections=[...document.querySelectorAll('main section[id]')];const links=[...document.querySelectorAll('.main-nav a')];
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id));}})},{rootMargin:'-35% 0px -55%'});sections.forEach(s=>observer.observe(s));
const reveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,easing:'cubic-bezier(.2,.75,.25,1)',fill:'forwards'});reveal.unobserve(e.target);}})},{threshold:.08});
document.querySelectorAll('.section-kicker,.problem-layout,.about-heading,.principles,.resource-grid,.blog-top,.articles,.manifesto-grid,.cta-content').forEach(el=>{el.style.opacity='0';reveal.observe(el)});
