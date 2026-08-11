const menu = [
  {category:'Breakfast',slug:'breakfast',tagline:'Slow mornings · bright plates',items:[['Avocado Sunrise','Sourdough, smashed avocado, feta, chilli and poached eggs',48,'assets/avocado-toast.webp','V'],['Turkish Eggs','Garlic yoghurt, soft eggs, chilli butter and toasted sourdough',46,'assets/avocado-toast.webp','V'],['Açaí Morning','Açaí, berries, banana, almond butter and house granola',44,'assets/smoothies.webp','VG']]},
  {category:'Appetizers',slug:'appetizers',tagline:'Start with something good',items:[['Crispy Cauliflower','Tahini ranch, pomegranate and fresh herbs',36,'assets/power-bowl.webp','VG'],['Halloumi Bites','Golden halloumi, hot honey and lemon',38,'assets/avocado-toast.webp','V']]},
  {category:'Salads',slug:'salads',tagline:'Fresh · crisp · satisfying',items:[['Green Goddess','Baby gem, avocado, cucumber, edamame and herb dressing',49,'assets/power-bowl.webp','VG'],['Power Protein Bowl','Quinoa, roasted vegetables, avocado and grilled chicken',59,'assets/power-bowl.webp','GF']]},
  {category:'Burgers',slug:'burgers',tagline:'Big flavour · no shortcuts',items:[['The Press’d Burger','Angus beef, cheddar, pickles, onion and house sauce',62,'assets/avocado-toast.webp',''],['Crispy Chicken','Buttermilk chicken, slaw, pickles and hot honey',58,'assets/avocado-toast.webp','']]},
  {category:'Pasta',slug:'pasta',tagline:'Comfort, freshly made',items:[['Pink Rigatoni','Tomato, cream, parmesan and fresh basil',55,'assets/power-bowl.webp','V'],['Truffle Mushroom','Wild mushrooms, truffle cream and parmesan',62,'assets/power-bowl.webp','V']]},
  {category:'Pizza',slug:'pizza',tagline:'Hand-stretched · oven-hot',items:[['Hot Honey Pepperoni','Beef pepperoni, mozzarella, tomato and hot honey',60,'assets/avocado-toast.webp',''],['Garden Pesto','Courgette, peppers, basil pesto and mozzarella',56,'assets/avocado-toast.webp','V']]},
  {category:'Coffee',slug:'coffee',tagline:'Proper coffee · every time',editorial:true,items:[['Flat White','Double espresso and silky milk',22,'assets/coffee-matcha.webp',''],['Spanish Latte','Espresso, milk and a touch of sweetness',25,'assets/coffee-matcha.webp',''],['Ceremonial Matcha','Stone-ground matcha and your choice of milk',28,'assets/coffee-matcha.webp','V']]},
  {category:'Mojitos',slug:'mojitos',tagline:'Fresh · fizzy · refreshing',editorial:true,items:[['Classic Mojito','Fresh lime, mint and sparkling soda',18,'assets/smoothies.webp','VG'],['Passion Mojito','Passion fruit, mint, lime and soda',22,'assets/smoothies.webp','VG'],['Strawberry Mojito','Fresh strawberry, mint and sparkling soda',22,'assets/smoothies.webp','VG']]},
  {category:'Desserts',slug:'desserts',tagline:'Always save a little room',items:[['Burnt Cheesecake','Basque-style cheesecake and berry compote',39,'assets/smoothies.webp','V'],['Date Pudding','Warm date sponge, caramel and vanilla ice cream',42,'assets/power-bowl.webp','V']]}
];

const categories=document.querySelector('.categories');
categories.innerHTML='<button class="active" data-filter="all">All</button>'+menu.map(c=>`<button data-filter="${c.slug}">${c.category}</button>`).join('');
const content=document.querySelector('.menu-content');
content.innerHTML=menu.map((c,index)=>c.editorial?`<article class="menu-category editorial ${index%2?'flip':''}" id="${c.slug}" data-category="${c.slug}"><div class="editorial-image"><img src="${c.items[0][3]}" alt="${c.category}" loading="lazy"></div><div class="editorial-list"><header><p>${String(index+1).padStart(2,'0')} · MENU</p><h3>${c.category}</h3><span>${c.tagline}</span></header>${c.items.map((x,i)=>`<div class="line-item"><b>${String(i+1).padStart(2,'0')}</b><div><h4>${x[0]} ${x[4]?`<i>${x[4]}</i>`:''}</h4><p>${x[1]}</p></div><strong>AED ${x[2]}</strong></div>`).join('')}</div></article>`:`<article class="menu-category" id="${c.slug}" data-category="${c.slug}"><header class="category-title"><div><p>${String(index+1).padStart(2,'0')} · MENU</p><h3>${c.category}</h3></div><span>${c.tagline}</span></header><div class="menu-grid">${c.items.map(x=>`<div class="menu-card"><div class="menu-img"><img src="${x[3]}" alt="${x[0]}" loading="lazy">${x[4]?`<span>${x[4]}</span>`:''}</div><div class="menu-card-info"><div><h4>${x[0]}</h4><p>${x[1]}</p></div><strong>AED ${x[2]}</strong></div></div>`).join('')}</div></article>`).join('');

const nav=document.querySelector('.navbar'), toggle=document.querySelector('.menu-toggle'), mobile=document.querySelector('.mobile-menu');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',!open);mobile.classList.toggle('open',!open);mobile.setAttribute('aria-hidden',open);document.body.classList.toggle('menu-open',!open)});
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle.click()));

categories.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;categories.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');if(b.dataset.filter==='all')document.querySelector('#breakfast').scrollIntoView({behavior:'smooth',block:'start'});else document.getElementById(b.dataset.filter).scrollIntoView({behavior:'smooth',block:'start'});});
const menuSections=[...document.querySelectorAll('.menu-category')];
const menuObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){categories.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.filter===e.target.dataset.category));const active=categories.querySelector('.active');active?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});}}),{rootMargin:'-30% 0px -55%',threshold:0});
menuSections.forEach(x=>menuObserver.observe(x));

const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.13});
document.querySelectorAll('.reveal,.menu-card,.category-title,.editorial').forEach(x=>revealObserver.observe(x));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)addEventListener('scroll',()=>{document.querySelector('.hero-media').style.transform=`translateY(${scrollY*.12}px) scale(1.06)`},{passive:true});

const booking=document.querySelector('.booking');document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>booking.showModal()));
document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
booking.querySelector('form').addEventListener('submit',e=>{e.preventDefault();booking.querySelector('.form-note').textContent='Thanks — we’ll call shortly to confirm your table.';e.target.querySelector('button[type=submit]').textContent='Request received ✓';});
const lightbox=document.querySelector('.lightbox');document.querySelectorAll('.gallery-grid button').forEach(b=>b.addEventListener('click',()=>{lightbox.querySelector('img').src=b.querySelector('img').src;lightbox.querySelector('img').alt=b.querySelector('img').alt;lightbox.showModal()}));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));

// Make every hero quick-link land at the top of its matching section.
document.querySelectorAll('.hero-rail a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(!target)return;
  event.preventDefault();
  const root=document.documentElement;
  const previousBehavior=root.style.scrollBehavior;
  root.style.scrollBehavior='auto';
  window.scrollTo(0,target.getBoundingClientRect().top+window.scrollY-88);
  requestAnimationFrame(()=>{root.style.scrollBehavior=previousBehavior});
  history.replaceState(null,'',link.getAttribute('href'));
}));

// Re-apply deep links after the branded loader and image layout have settled.
window.addEventListener('load',()=>{
  if(!location.hash)return;
  const target=document.querySelector(location.hash);
  if(!target)return;
  setTimeout(()=>{
    const root=document.documentElement;
    const previousBehavior=root.style.scrollBehavior;
    root.style.scrollBehavior='auto';
    window.scrollTo(0,target.offsetTop-88);
    requestAnimationFrame(()=>{root.style.scrollBehavior=previousBehavior});
  },1250);
});

// Lightweight scroll progress and image parallax, batched to one frame.
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const parallaxImages=[...document.querySelectorAll('.pet-min-image img,.signature>img,.gallery-grid img')];
  parallaxImages.forEach(image=>image.classList.add('scroll-parallax'));
  let scrollFrame=0;
  const updateScrollMotion=()=>{
    scrollFrame=0;
    const max=document.documentElement.scrollHeight-innerHeight;
    document.documentElement.style.setProperty('--page-progress',max?Math.min(1,scrollY/max):0);
    parallaxImages.forEach(image=>{
      const rect=image.parentElement.getBoundingClientRect();
      if(rect.bottom<0||rect.top>innerHeight)return;
      const offset=((rect.top+rect.height/2)-innerHeight/2)/innerHeight;
      image.style.setProperty('--parallax-y',`${offset*-18}px`);
    });
  };
  addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScrollMotion)},{passive:true});
  updateScrollMotion();
}

// Consistent smooth navigation, active-section feedback, and quick return to top.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  if(link.closest('.hero-rail'))return;
  link.addEventListener('click',event=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(!target)return;
    event.preventDefault();
    window.scrollTo({top:target.offsetTop-88,behavior:reducedMotion?'auto':'smooth'});
    history.replaceState(null,'',link.getAttribute('href'));
  });
});
const backToTop=document.querySelector('.back-to-top');
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion?'auto':'smooth'}));
addEventListener('scroll',()=>backToTop.classList.toggle('visible',scrollY>700),{passive:true});
const primaryLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];
const primarySections=primaryLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
const activeNavObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  primaryLinks.forEach(link=>{
    const active=link.getAttribute('href')===`#${entry.target.id}`;
    link.classList.toggle('active',active);
    if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  });
}),{rootMargin:'-35% 0px -55%',threshold:0});
primarySections.forEach(section=>activeNavObserver.observe(section));
