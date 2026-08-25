(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={limit:7},t={getRandomColor(){let e=`#`;for(let t=0;t<6;t++)e+=`0123456789ABCDEF`[Math.floor(Math.random()*16)];return e}},n={async getPagination(e,t){let n=`http://localhost:3000/garage/?_page=${e}&_limit=${t}`,r=await fetch(n),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return{CARS:await r.json(),TOTAL_COUNT:Number(r.headers.get(`x-total-count`))}},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/garage/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async generageRandom10Cars(){let r=new Date,i=`Random car ${String(r.getHours()).padStart(2,`0`)}${String(r.getMinutes()).padStart(2,`0`)}${String(r.getSeconds()).padStart(2,`0`)}`;for(let e=1;e<=10;e++){let r={name:`${i}-${String(e).padStart(2,`0`)}`,color:t.getRandomColor()};await n.create(r)}await u.render(1,e.limit)}},r={idForm:`create_car_form`,render(){return`
      <form id="${r.idForm}">
        <span>Car name:</span>
        <input type="text" name="name">
        <span>Color:</span>
        <input type="color" name="color">
        <button class="btn btn-success">Create</button>
      </form>
    `},init(){let e=document.querySelector(`#${r.idForm}`);if(!e){console.error(`Node not found: #${r.idForm}`);return}e.addEventListener(`submit`,r.onSubmit)},async onSubmit(t){t.preventDefault();let r=t.target,i=new FormData(r),a={name:i.get(`name`)||`Unnamed car`,color:i.get(`color`)||`#000000`};console.log(`Try to create car`,a);let o=await n.create(a);console.log(`Created car`,o),await u.render(1,e.limit)}},i=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/></svg>`,a={render(e){return`<span class="car__wrapper" style="color: ${e};">${i.replaceAll(/fill="[^"]*"/g,``).replace(`<svg`,`<svg fill="currentColor"`)}</span>`}},o={getLastPage(e,t){return Math.ceil(e/t)}},s={idPaginationContainer:`garage_pagination`,async render(t,n,r){let i=`#${s.idPaginationContainer}`,a=document.querySelector(i);if(!a){console.error(`Node is not found: ${i}`);return}a.innerHTML=`Loading...`;let c=o.getLastPage(r,n);a.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${t<=1?`disabled`:``}>Prev</button>
      <select id="pagination_select" class="btn">
        ${Array.from({length:c},(e,n)=>{let r=n+1;return`<option value="${r}" ${r===t?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      <button class="btn btn-primary" id="pagination_next_button" ${t>=c?`disabled`:``}>Next</button>
    `,document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await u.render(t-1,e.limit)),document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await u.render(t+1,e.limit)),document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n){let t=parseInt(n.value);await u.render(t,e.limit)}})}},c={idForm:`create_car_form`,render(e){return`
      <button class="btn btn-danger" data-car-id="${e}">Remove</button>
    `},init(e){let t=`button[data-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,c.onClickRemoveButton)},async onClickRemoveButton(t){let r=t.target,i=Number(r.dataset.carId)||0;console.log(`Remove car with ID: ${i}`),await n.remove(i),await u.render(1,e.limit)}},l={idGarageContent:`garage_content`,async render(e,t){let i=`#${l.idGarageContent}`,o=document.querySelector(i);if(!o){console.error(`Node is not found: ${i}`);return}o.innerHTML=`Loading...`;let{CARS:u,TOTAL_COUNT:d}=await n.getPagination(e,t);o.innerHTML=`
      <div>Garage (${d})</div>
      <div>Page #${e}</div>
      ${u.map(e=>`
        <div>
          ${c.render(e.id)}
          ${e.id} ${e.name}
        </div>
        <div>
          ${a.render(e.color)}
        </div>
      `).join(``)}
    `,u.length===0&&(o.innerHTML=`No cars`),r.init();for(let e of u)c.init(e.id);document.querySelector(`#generate_cars`)?.addEventListener(`click`,n.generageRandom10Cars),await s.render(e,t,d)}},u={async render(e,t){let n=`#${f.idContent}`,i=document.querySelector(n);if(!i){console.log(`Node is not found: ${n}`);return}try{i.innerHTML=`
        ${r.render()}
        <div>
          <button class="btn btn-primary" id="generate_cars">Generate cars</button>
        </div>
        <div id="${l.idGarageContent}"></div>
        <div id="${s.idPaginationContainer}"></div>
      `,await l.render(e,t)}catch(e){i.innerHTML=`
        <div>${e}</div>
      `}}},d={async render(){let e=`#${f.idContent}`,t=document.querySelector(e);if(!t){console.log(`Node is not found: ${e}`);return}try{t.innerHTML=`Winners page`}catch(e){t.innerHTML=`
        <div>${e}</div>
      `}}},f={idRoot:`app`,idContent:`content`,async render(){let t=`#${f.idRoot}`,n=document.querySelector(t);if(!n){console.error(`Node is not found: ${t}`);return}try{n.innerHTML=`
        <div>
          <button class="btn btn-primary" id="garage_render">To garage</button>
          <button class="btn btn-primary" id="winner_render">To winners</button>
        </div>
        <div id="${f.idContent}"></div>
      `,document.querySelector(`#garage_render`)?.addEventListener(`click`,async()=>u.render(1,e.limit)),document.querySelector(`#winner_render`)?.addEventListener(`click`,d.render),await u.render(1,e.limit)}catch(e){n.innerHTML=`
        <div style='color: red;'>
          ${e}
        </div>
      `}}};try{f.render()}catch(e){console.error(e)}