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
content.innerHTML=menu.map((c,index)=>c.editorial?`<article class="menu-category editorial ${index%2?'flip':''}" id="${c.slug}" data-category="${c.slug}"><div class="editorial-image"><img src="${c.items[0][3]}" alt="${c.category}" loading="lazy"></div><div class="editorial-list"><header><p>${String(index+1).padStart(2,'0')} · MENU</p><h3>${c.category}</h3><span>${c.tagline}</span></header>${c.items.map((x,i)=>`<div class="line-item"><b>${String(i+1).padStart(2,'0')}</b><div><h4>${x[0]} ${x[4]?`<i>${x[4]}</i>`:''}</h4><p>${x[1]}</p></div><div class="line-actions"><strong>AED ${x[2]}</strong><button class="add-cart" data-name="${x[0]}" data-price="${x[2]}">Add +</button></div></div>`).join('')}</div></article>`:`<article class="menu-category" id="${c.slug}" data-category="${c.slug}"><header class="category-title"><div><p>${String(index+1).padStart(2,'0')} · MENU</p><h3>${c.category}</h3></div><span>${c.tagline}</span></header><div class="menu-grid">${c.items.map(x=>`<div class="menu-card"><div class="menu-img"><img src="${x[3]}" alt="${x[0]}" loading="lazy">${x[4]?`<span>${x[4]}</span>`:''}</div><div class="menu-card-info"><div><h4>${x[0]}</h4><p>${x[1]}</p></div><div class="menu-card-actions"><strong>AED ${x[2]}</strong><button class="add-cart" data-name="${x[0]}" data-price="${x[2]}">Add +</button></div></div></div>`).join('')}</div></article>`).join('');

const nav=document.querySelector('.navbar'), toggle=document.querySelector('.menu-toggle'), mobile=document.querySelector('.mobile-menu');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',!open);mobile.classList.toggle('open',!open);mobile.setAttribute('aria-hidden',open);document.body.classList.toggle('menu-open',!open)});
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle.click()));

categories.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;categories.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');if(b.dataset.filter==='all')document.querySelector('#breakfast').scrollIntoView({behavior:'smooth',block:'start'});else document.getElementById(b.dataset.filter).scrollIntoView({behavior:'smooth',block:'start'});});
const menuSections=[...document.querySelectorAll('.menu-category')];
const menuObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){categories.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.filter===e.target.dataset.category));}}),{rootMargin:'-30% 0px -55%',threshold:0});
menuSections.forEach(x=>menuObserver.observe(x));

const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.13});
document.querySelectorAll('.reveal,.menu-card,.category-title,.editorial').forEach(x=>revealObserver.observe(x));
if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelectorAll('video[autoplay]').forEach(video=>video.pause());
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)addEventListener('scroll',()=>{document.querySelector('.hero-media').style.transform=`translateY(${scrollY*.12}px) scale(1.06)`},{passive:true});

const booking=document.querySelector('.booking');document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>booking.showModal()));
document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
booking.querySelector('form').addEventListener('submit',e=>{e.preventDefault();booking.querySelector('.form-note').textContent='Thanks — we’ll call shortly to confirm your table.';e.target.querySelector('button[type=submit]').textContent='Request received ✓';});
const lightbox=document.querySelector('.lightbox');document.querySelectorAll('.gallery-grid button').forEach(b=>b.addEventListener('click',()=>{lightbox.querySelector('img').src=b.querySelector('img').src;lightbox.querySelector('img').alt=b.querySelector('img').alt;lightbox.showModal()}));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));

const detailSections=[...document.querySelectorAll('main>section:not(.hero)')];
const openRelatedSection=(target,behavior='smooth')=>{
  detailSections.forEach(section=>section.classList.toggle('active-detail',section===target));
  document.body.classList.remove('home-view');
  document.body.classList.add('detail-view');
  requestAnimationFrame(()=>window.scrollTo({top:target.offsetTop-88,behavior}));
};
const openHome=()=>{
  detailSections.forEach(section=>section.classList.remove('active-detail'));
  document.body.classList.remove('detail-view');
  document.body.classList.add('home-view');
  window.scrollTo({top:0,behavior:reducedMotion?'auto':'smooth'});
};

// Make every hero quick-link reveal only its matching section.
document.querySelectorAll('.hero-rail a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(!target)return;
  event.preventDefault();
  openRelatedSection(target,reducedMotion?'auto':'smooth');
  history.replaceState(null,'',link.getAttribute('href'));
}));

// Every fresh page load begins with the branded loader, then reveals the hero.
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.scrollTo(0,0);
window.addEventListener('load',()=>{
  const root=document.documentElement;
  const previousBehavior=root.style.scrollBehavior;
  root.style.scrollBehavior='auto';
  window.scrollTo(0,0);
  if(location.hash!=='#home')history.replaceState(null,'','#home');
  setTimeout(()=>{
    window.scrollTo(0,0);
    root.style.scrollBehavior=previousBehavior;
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
    if(link.getAttribute('href')==='#home')openHome();else openRelatedSection(target,reducedMotion?'auto':'smooth');
    history.replaceState(null,'',link.getAttribute('href'));
  });
});
const backToTop=document.querySelector('.back-to-top');
backToTop.addEventListener('click',()=>{openHome();history.replaceState(null,'','#home')});
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

// Replayable section transitions respond to both downward and upward scrolling.
if(!reducedMotion){
  const motionSections=[...document.querySelectorAll('main>section:not(.hero)')];
  motionSections.forEach(section=>section.classList.add('section-motion'));
  let previousScrollY=scrollY;
  let scrollDirection='down';
  addEventListener('scroll',()=>{
    const nextY=scrollY;
    if(Math.abs(nextY-previousScrollY)>4)scrollDirection=nextY>previousScrollY?'down':'up';
    previousScrollY=nextY;
  },{passive:true});
  const sectionMotionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const section=entry.target;
    if(entry.isIntersecting){
      section.classList.toggle('from-up',scrollDirection==='up');
      requestAnimationFrame(()=>section.classList.add('in-view'));
    }else{
      const rect=section.getBoundingClientRect();
      if(rect.bottom<-120||rect.top>innerHeight+120)section.classList.remove('in-view');
    }
  }),{rootMargin:'8% 0px 8%',threshold:.04});
  motionSections.forEach(section=>sectionMotionObserver.observe(section));
}

// Cart with persistent quantities and a pre-filled WhatsApp order.
const cartToggle=document.querySelector('.cart-toggle'),dockCart=document.querySelector('.dock-cart'),dockCartCount=document.querySelector('.dock-cart i'),cartDrawer=document.querySelector('.cart-drawer'),cartBackdrop=document.querySelector('.cart-backdrop'),cartClose=document.querySelector('.cart-close'),cartItems=document.querySelector('.cart-items'),cartEmpty=document.querySelector('.cart-empty'),cartCount=document.querySelector('.cart-toggle span'),cartHeadingCount=document.querySelector('.cart-heading-count'),cartTotal=document.querySelector('.cart-total strong'),whatsappOrder=document.querySelector('.whatsapp-order');
let cart=[];
try{cart=JSON.parse(localStorage.getItem('pressd-cart')||'[]')}catch{cart=[]}
const saveCart=()=>localStorage.setItem('pressd-cart',JSON.stringify(cart));
const openCart=()=>{cartDrawer.classList.add('open');cartBackdrop.classList.add('open');cartDrawer.setAttribute('aria-hidden','false');document.body.classList.add('cart-open');cartClose.focus()};
const closeCart=()=>{cartDrawer.classList.remove('open');cartBackdrop.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true');document.body.classList.remove('cart-open');cartToggle.focus()};
const renderCart=()=>{
  const quantity=cart.reduce((sum,item)=>sum+item.qty,0),total=cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  cartCount.textContent=quantity;dockCartCount.textContent=quantity;cartHeadingCount.textContent=quantity;cartTotal.textContent=`AED ${total}`;cartEmpty.hidden=cart.length>0;cartItems.hidden=!cart.length;
  cartItems.innerHTML=cart.map((item,index)=>`<article class="cart-item"><div><h3>${item.name}</h3><p>AED ${item.price}</p></div><div class="cart-quantity"><button data-cart-action="minus" data-index="${index}" aria-label="Remove one ${item.name}">−</button><span>${item.qty}</span><button data-cart-action="plus" data-index="${index}" aria-label="Add one ${item.name}">+</button></div></article>`).join('');
  if(cart.length){const lines=cart.map(item=>`• ${item.name} x${item.qty} — AED ${item.price*item.qty}`);const message=`Hello PRESS'D! I'd like to order:\n\n${lines.join('\n')}\n\nTotal: AED ${total}\n\nPlease confirm availability and delivery/pickup details.`;whatsappOrder.href=`https://wa.me/971543962660?text=${encodeURIComponent(message)}`;whatsappOrder.classList.remove('disabled');whatsappOrder.setAttribute('aria-disabled','false')}else{whatsappOrder.href='#';whatsappOrder.classList.add('disabled');whatsappOrder.setAttribute('aria-disabled','true')}
  saveCart();
};
document.addEventListener('click',event=>{const add=event.target.closest('.add-cart');if(add){const name=add.dataset.name,price=Number(add.dataset.price),existing=cart.find(item=>item.name===name);if(existing)existing.qty++;else cart.push({name,price,qty:1});renderCart();add.textContent='Added ✓';setTimeout(()=>add.textContent='Add +',900)}const control=event.target.closest('[data-cart-action]');if(control){const index=Number(control.dataset.index);if(control.dataset.cartAction==='plus')cart[index].qty++;else cart[index].qty--;cart=cart.filter(item=>item.qty>0);renderCart()}});
cartToggle.addEventListener('click',openCart);dockCart.addEventListener('click',openCart);cartClose.addEventListener('click',closeCart);cartBackdrop.addEventListener('click',closeCart);document.addEventListener('keydown',event=>{if(event.key==='Escape'&&cartDrawer.classList.contains('open'))closeCart()});whatsappOrder.addEventListener('click',event=>{if(!cart.length)event.preventDefault()});renderCart();
