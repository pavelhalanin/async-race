(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={limit:7},t={getRandomColor(){let e=`#`;for(let t=0;t<6;t++)e+=`0123456789ABCDEF`[Math.floor(Math.random()*16)];return e}},n={random_from_a_to_b(e,t){return Math.ceil(Math.random()*(t-e)+e)}},r={Tesla:[`Cyber`,`Ludicrous`,`Plaid`,`Space`,`Nova`,`Photon`,`Volt`,`Neon`,`Apex`,`Nexus`],BMW:[`M Sport`,`Dynamic`,`Elite`,`Vantage`,`X Drive`,`Pure`,`Sprint`,`Turbo`,`Premium`,`Evolution`],Mersedes:[`AMG`,`Elite`,`V8`,`Kompressor`,`Avantgarde`,`Sport`,`Luxury`,`Estate`,`Coupe`,`Sprint`],Ford:[`Raptor`,`SVT`,`Cobra`,`Boss`,`King`,`Titan`,`Wild`,`Maverick`,`Outlaw`,`Safari`],Audi:[`Quattro`,`S Line`,`RS`,`e-tron`,`Vorsprung`,`Sport`,`Elite`,`Progress`,`Advance`,`Motion`],Toyota:[`TRD`,`Hybrid`,`Supra`,`Off-Road`,`Sport`,`Luxury`,`Adventure`,`Touring`,`GR`,`Apex`],Honda:[`Type R`,`Sport`,`Touring`,`Hybrid`,`Performance`,`Elite`,`Si`,`Adventure`,`S-Tech`,`V-TEC`],Nissan:[`GT-R`,`Nismo`,`Sport`,`Elite`,`Pro-4X`,`Titan`,`Z`,`Skyline`,`Adventure`,`Performance`],Chevrolet:[`SS`,`ZR1`,`Z06`,`RST`,`LTZ`,`Sport`,`Performance`,`Trail`,`High Country`,`Bolt`],Volkswagen:[`R-Line`,`GTI`,`TDI`,`Sport`,`4Motion`,`Comfort`,`Sprint`,`Elite`,`Atlas`,`Taos`],Porsche:[`Turbo`,`S`,`GTS`,`RS`,`Targa`,`Carrera`,`Cayman`,`Boxster`,`Panamera`,`Taycan`],Ferrari:[`Scuderia`,`Spider`,`GTB`,`GTS`,`Special`,`Stradale`,`Pista`,`Assetto`,`Competizione`,`Challenge`],Lamborghini:[`SV`,`Spyder`,`Performante`,`Superleggera`,`Edizione`,`Nero`,`Giallo`,`Verde`,`Arancio`,`Bianco`],Maserati:[`GranSport`,`GranTurismo`,`S`,`Trofeo`,`Ghibli`,`Levante`,`MC`,`Racing`,`Sport`,`Luxury`],Bugatti:[`SuperSport`,`Pur Sport`,`Vitesse`,`Grand Sport`,`Sang Noir`,`Rembrandt`,`L'Or Blanc`,`La Voiture Noire`,`Centodieci`,`Divo`],"Aston Martin":[`Vantage`,`Vanquish`,`Rapide`,`DBS`,`Valkyrie`,`Valhalla`,`DB11`,`Volante`,`Q`,`Shadow`],Jaguar:[`SVR`,`R-Dynamic`,`Sport`,`Luxury`,`Performance`,`Black`,`Elegance`,`Portfolio`,`XKR`,`Supercharged`],"Land Rover":[`Autobiography`,`Sport`,`HSE`,`Vogue`,`SV`,`AWD`,`Adventure`,`Premium`,`Evoque`,`Defender`],Volvo:[`R-Design`,`Inscription`,`T8`,`Momentum`,`Polestar`,`Excellence`,`Ocean`,`Fusion`,`Thunder`,`Aurora`],Subaru:[`STI`,`WRX`,`Sport`,`Touring`,`Wilderness`,`XT`,`Premium`,`Limited`,`GT`,`Adventure`]},i={async getPagination(e,t){let n=`http://localhost:3000/garage/?_page=${e}&_limit=${t}`,r=await fetch(n),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return{CARS:await r.json(),TOTAL_COUNT:Number(r.headers.get(`x-total-count`))}},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/garage/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async generageRandom100Cars(){this.setAttribute(`disabled`,`true`),this.innerHTML=`Generate cars (loading...)`;let a=r,o=Object.keys(a);for(let e=1;e<=100;e++){let e=o[n.random_from_a_to_b(0,o.length-1)],r=a[e],s={name:`${e}-${r[n.random_from_a_to_b(0,r.length-1)]}`,color:t.getRandomColor()};await i.create(s)}await f.render(1,e.limit),this.removeAttribute(`disabled`),this.innerHTML=`Generate cars`}},a={idForm:`create_car_form`,render(){return`
      <form id="${a.idForm}">
        <span>Car name:</span>
        <input type="text" name="name">
        <span>Color:</span>
        <input type="color" name="color">
        <button class="btn btn-success">Create</button>
      </form>
    `},init(){let e=document.querySelector(`#${a.idForm}`);if(!e){console.error(`Node not found: #${a.idForm}`);return}e.addEventListener(`submit`,a.onSubmit)},async onSubmit(t){t.preventDefault();let n=t.target,r=new FormData(n),a={name:r.get(`name`)||`Unnamed car`,color:r.get(`color`)||`#000000`};console.log(`Try to create car`,a);let o=await i.create(a);console.log(`Created car`,o),await f.render(1,e.limit)}},o=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/></svg>`,s={render(e){return`<span class="car__wrapper" style="color: ${e};">${o.replaceAll(/fill="[^"]*"/g,``).replace(`<svg`,`<svg fill="currentColor"`)}</span>`}},c={getLastPage(e,t){return Math.ceil(e/t)}},l={idPaginationContainer:`garage_pagination`,async render(t,n,r){let i=`#${l.idPaginationContainer}`,a=document.querySelector(i);if(!a){console.error(`Node is not found: ${i}`);return}a.innerHTML=`Loading...`;let o=c.getLastPage(r,n);a.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${t<=1?`disabled`:``}>Prev</button>
      <select id="pagination_select" class="btn">
        ${Array.from({length:o},(e,n)=>{let r=n+1;return`<option value="${r}" ${r===t?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      <button class="btn btn-primary" id="pagination_next_button" ${t>=o?`disabled`:``}>Next</button>
    `,document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await f.render(t-1,e.limit)),document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await f.render(t+1,e.limit)),document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n){let t=parseInt(n.value);await f.render(t,e.limit)}})}},u={idForm:`create_car_form`,render(e){return`
      <button class="btn btn-danger" data-car-id="${e}">Remove</button>
    `},init(e){let t=`button[data-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,u.onClickRemoveButton)},async onClickRemoveButton(t){let n=t.target,r=Number(n.dataset.carId)||0;console.log(`Remove car with ID: ${r}`),await i.remove(r),await f.render(1,e.limit)}},d={idGarageContent:`garage_content`,async render(e,t){let n=`#${d.idGarageContent}`,r=document.querySelector(n);if(!r){console.error(`Node is not found: ${n}`);return}r.innerHTML=`Loading...`;let{CARS:o,TOTAL_COUNT:c}=await i.getPagination(e,t);r.innerHTML=`
      <div>Garage (${c})</div>
      <div>Page #${e}</div>
      ${o.map(e=>`
        <div>
          ${u.render(e.id)}
          ${e.id} ${e.name}
        </div>
        <div>
          ${s.render(e.color)}
        </div>
      `).join(``)}
    `,o.length===0&&(r.innerHTML=`No cars`),a.init();for(let e of o)u.init(e.id);document.querySelector(`#generate_cars`)?.addEventListener(`click`,i.generageRandom100Cars),await l.render(e,t,c)}},f={async render(e,t){let n=`#${m.idContent}`,r=document.querySelector(n);if(!r){console.log(`Node is not found: ${n}`);return}try{r.innerHTML=`
        ${a.render()}
        <div>
          <button
            class="btn btn-primary"
            id="generate_cars"
            title="Generate random 100 cars"
          >
            Generate cars
          </button>
        </div>
        <div id="${d.idGarageContent}"></div>
        <div id="${l.idPaginationContainer}"></div>
      `,await d.render(e,t)}catch(e){r.innerHTML=`
        <div>${e}</div>
      `}}},p={async render(){let e=`#${m.idContent}`,t=document.querySelector(e);if(!t){console.log(`Node is not found: ${e}`);return}try{t.innerHTML=`Winners page`}catch(e){t.innerHTML=`
        <div>${e}</div>
      `}}},m={idRoot:`app`,idContent:`content`,async render(){let t=`#${m.idRoot}`,n=document.querySelector(t);if(!n){console.error(`Node is not found: ${t}`);return}try{n.innerHTML=`
        <div>
          <button class="btn btn-primary" id="garage_render">To garage</button>
          <button class="btn btn-primary" id="winner_render">To winners</button>
        </div>
        <div id="${m.idContent}"></div>
      `,document.querySelector(`#garage_render`)?.addEventListener(`click`,async()=>f.render(1,e.limit)),document.querySelector(`#winner_render`)?.addEventListener(`click`,p.render),await f.render(1,e.limit)}catch(e){n.innerHTML=`
        <div style='color: red;'>
          ${e}
        </div>
      `}}};try{m.render()}catch(e){console.error(e)}