(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={getRandomColor(){let e=`#`;for(let t=0;t<6;t++)e+=`0123456789ABCDEF`[Math.floor(Math.random()*16)];return e}},t={async get(){let e=await fetch(`http://localhost:3000/garage/`),t=e.status;if(t!==200)throw Error(`HTTP ${t}`);return await e.json()},async getPagination(e,t){let n=`http://localhost:3000/garage/?_page=${e}&_limit=${t}`,r=await fetch(n),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return await r.json()},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/garage/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async generageRandom10Cars(){let n=new Date,r=`Random car ${String(n.getHours()).padStart(2,`0`)}${String(n.getMinutes()).padStart(2,`0`)}${String(n.getSeconds()).padStart(2,`0`)}`;for(let n=1;n<=10;n++){let i={name:`${r}-${String(n).padStart(2,`0`)}`,color:e.getRandomColor()};await t.create(i)}await l.render()},async getCount(){let e=await fetch(`http://localhost:3000/garage/?_page=1&_limit=1`),t=e.status;if(t!==200)throw Error(`HTTP ${t}`);return Number(e.headers.get(`x-total-count`))}},n={idForm:`create_car_form`,render(){return`
      <form id="${n.idForm}">
        <input type="text" name="name">
        <input type="color" name="color">
        <button>Create</button>
      </form>
    `},init(){let e=document.querySelector(`#${n.idForm}`);if(!e){console.error(`Node not found: #${n.idForm}`);return}e.addEventListener(`submit`,n.onSubmit)},async onSubmit(e){e.preventDefault();let n=e.target,r=new FormData(n),i={name:r.get(`name`)||`Unnamed car`,color:r.get(`color`)||`#000000`};console.log(`Try to create car`,i);let a=await t.create(i);console.log(`Created car`,a),await l.render()}},r=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/></svg>`,i={render(e){return`<span class="car__wrapper" style="color: ${e};">${r.replaceAll(/fill="[^"]*"/g,``).replace(`<svg`,`<svg fill="currentColor"`)}</span>`}},a={idForm:`create_car_form`,render(e){return`
      <button data-car-id="${e}">Remove</button>
    `},init(e){let t=`button[data-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,a.onClickRemoveButton)},async onClickRemoveButton(e){let n=e.target,r=Number(n.dataset.carId)||0;console.log(`Remove car with ID: ${r}`),await t.remove(r),await l.render()}},o={idGarageContent:`garage_content`,async render(e,r){let s=`#${o.idGarageContent}`,c=document.querySelector(s);if(!c){console.error(`Node is not found: ${s}`);return}c.innerHTML=`Loading...`;let l=await t.getPagination(e,r);c.innerHTML=l.map(e=>`
        <div>
          ${a.render(e.id)}
          ${e.id} ${e.name}
        </div>
        <div>
          ${i.render(e.color)}
        </div>
      `).join(``),l.length===0&&(c.innerHTML=`No cars`),n.init();for(let e of l)a.init(e.id);document.querySelector(`#generate_cars`)?.addEventListener(`click`,t.generageRandom10Cars)}},s={getLastPage(e,t){return Math.ceil(e/t)}},c={idPaginationContainer:`garage_pagination`,async render(e){let n=`#${c.idPaginationContainer}`,r=document.querySelector(n);if(!r){console.error(`Node is not found: ${n}`);return}r.innerHTML=`Loading...`;let i=await t.getCount(),a=s.getLastPage(i,e),l=``;for(let e=1;e<=a;e++)l+=`<button data-page="${e}">${e}</button>`;r.innerHTML=l;for(let e=1;e<=a;e++){let t=`${n} button[data-page="${CSS.escape(String(e))}"]`;document.querySelector(t)?.addEventListener(`click`,async()=>await o.render(e,5))}}},l={async render(){let e=`#${d.idContent}`,t=document.querySelector(e);if(!t){console.log(`Node is not found: ${e}`);return}try{t.innerHTML=`
        ${n.render()}
        <div>
          <button id="generate_cars">Generate cars</button>
        </div>
        <div id="${o.idGarageContent}"></div>
        <div id="${c.idPaginationContainer}"></div>
      `,await o.render(1,5),c.render(5)}catch(e){t.innerHTML=`
        <div>${e}</div>
      `}}},u={async render(){let e=`#${d.idContent}`,t=document.querySelector(e);if(!t){console.log(`Node is not found: ${e}`);return}try{t.innerHTML=`Winners page`}catch(e){t.innerHTML=`
        <div>${e}</div>
      `}}},d={idRoot:`app`,idContent:`content`,async render(){let e=`#${d.idRoot}`,t=document.querySelector(e);if(!t){console.error(`Node is not found: ${e}`);return}try{t.innerHTML=`
        <div>
          <button id="garage_render">To garage</button>
          <button id="winner_render">To winners</button>
        </div>
        <div id="${d.idContent}"></div>
      `,document.querySelector(`#garage_render`)?.addEventListener(`click`,l.render),document.querySelector(`#winner_render`)?.addEventListener(`click`,u.render),await l.render()}catch(e){t.innerHTML=`
        <div style='color: red;'>
          ${e}
        </div>
      `}}};try{d.render()}catch(e){console.error(e)}