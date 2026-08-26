(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={limit:7},t={getLastPage(e,t){return Math.ceil(e/t)}},n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/></svg>`,r={render(e){return`<span class="car__wrapper" style="color: ${e};">${n.replaceAll(/fill="[^"]*"/g,``).replace(`<svg`,`<svg fill="currentColor"`)}</span>`}},i={idPaginationContainer:`garage_pagination`,async render(n,r,a){let o=`#${i.idPaginationContainer}`,s=document.querySelector(o);if(!s){console.error(`Node is not found: ${o}`);return}s.innerHTML=`Loading...`;let c=t.getLastPage(a,r);s.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${n<=1?`disabled`:``}>Prev</button>
      <select id="pagination_select" class="btn">
        ${Array.from({length:c},(e,t)=>{let r=t+1;return`<option value="${r}" ${r===n?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      <button class="btn btn-primary" id="pagination_next_button" ${n>=c?`disabled`:``}>Next</button>
    `,document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await m.render(n-1,e.limit)),document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await m.render(n+1,e.limit)),document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n){let t=parseInt(n.value);await m.render(t,e.limit)}})}},a={idForm:`create_car_form`,render(e){return`
      <button
        class="btn btn-sm btn-danger"
        data-car-id="${e}"
      >
        Remove
      </button>
    `},init(e){let t=`button[data-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,a.onClick)},async onClick(t){let n=t.target,r=Number(n.dataset.carId)||0;console.log(`Remove car with ID: ${r}`),await f.remove(r),await m.render(c.getPage(),e.limit)}},o={idForm:`update_car_form`,localStorageKey:`async_race__update_data`,idNameInput:`update_car__name_input`,idColorInput:`update_car__color_input`,render(){let e=o.getUpdateData();return`
      <form id="${o.idForm}">
        <label
          for="${o.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${o.idNameInput}"
          type="text"
          name="name"
          value="${e.name}"
        >
        <label
          for="${o.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${o.idColorInput}"
          type="color"
          name="color"
          value="${e.color}"
        >
        <button
          class="btn btn-sm btn-success"
        >
          Update
        </button>
        <input
          type="hidden"
          name="id"
          value="${e.id}"
        >
      </form>
    `},init(){let e=document.querySelector(`#${o.idForm}`);if(!e){console.error(`Node not found: #${o.idForm}`);return}e.addEventListener(`submit`,o.onSubmit);let t=document.querySelector(`#${o.idNameInput}`);if(!t){console.error(`Node not found: #${o.idNameInput}`);return}t.addEventListener(`input`,function(){o.setName(this.value)});let n=document.querySelector(`#${o.idColorInput}`);if(!n){console.error(`Node not found: #${o.idColorInput}`);return}n.addEventListener(`input`,function(){o.setColor(this.value)})},async onSubmit(t){t.preventDefault();let n=t.target,r=new FormData(n),i={name:r.get(`name`)||`Unnamed car`,color:r.get(`color`)||`#000000`};console.log(`Try to update car`,i);let a=o.getUpdateData(),s=await f.update(i,a.id);console.log(`Updated car`,s),await m.render(c.getPage(),e.limit)},getUpdateData(){let e=localStorage.getItem(o.localStorageKey),t={id:0,name:``,color:``};if(e)try{let n=JSON.parse(e);typeof n==`object`&&n&&`id`in n&&typeof n.id==`number`&&(t.id=n.id),typeof n==`object`&&n&&`name`in n&&typeof n.name==`string`&&(t.name=n.name),typeof n==`object`&&n&&`color`in n&&typeof n.color==`string`&&(t.color=n.color)}catch(e){console.error(e)}return localStorage.setItem(o.localStorageKey,JSON.stringify(t)),t},setId(e){let t=o.getUpdateData();t.id=e,localStorage.setItem(o.localStorageKey,JSON.stringify(t))},setName(e){let t=o.getUpdateData();t.name=e,localStorage.setItem(o.localStorageKey,JSON.stringify(t))},setColor(e){let t=o.getUpdateData();t.color=e,localStorage.setItem(o.localStorageKey,JSON.stringify(t))}},s={idForm:`select_car_form`,render(e){return`
      <button
        class="btn btn-sm btn-warning"
        data-select-car-id="${e}"
      >
        Select
      </button>
    `},init(e){let t=`button[data-select-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,s.onClick)},async onClick(t){let n=t.target,r=Number(n.dataset.selectCarId)||0;o.setId(r);let i=await f.getById(r);o.setName(i.name),o.setColor(i.color),await m.render(c.getPage(),e.limit)}},c={idGarageContent:`garage_content`,localStoragePage:`async_race__selected_page`,async render(e,t){let n=`#${c.idGarageContent}`,i=document.querySelector(n);if(!i){console.error(`Node is not found: ${n}`);return}i.innerHTML=`Loading...`;let{CARS:o,TOTAL_COUNT:l}=await f.getPagination(e,t);c.savePage(e),i.innerHTML=`
      <div>Garage (${l})</div> <div>Page #${e}</div>
      <div class="${c.idGarageContent}__cars">
        ${o.map(e=>`
          <div>
            ${s.render(e.id)}
            ${a.render(e.id)}
            ${e.id} ${e.name}
          </div>
          <div>
            ${r.render(e.color)}
          </div>
        `).join(``)}
      </div>
    `,o.length===0&&(i.innerHTML=`No cars`),await c.componentDidMount(o,e,t,l)},getPage(){return Number(localStorage.getItem(c.localStoragePage)||1)||1},savePage(e){localStorage.setItem(c.localStoragePage,String(e))},fixPage(e,n,r){let i=t.getLastPage(r,n);e>i&&(c.savePage(i),c.render(i,n))},async componentDidMount(e,t,n,r){p.init(),o.init();for(let t of e)s.init(t.id),a.init(t.id);document.querySelector(`#generate_cars`)?.addEventListener(`click`,f.generageRandom100Cars),await i.render(t,n,r),c.fixPage(t,n,r)}},l={getRandomColor(){let e=`#`;for(let t=0;t<6;t++)e+=`0123456789ABCDEF`[Math.floor(Math.random()*16)];return e}},u={random_from_a_to_b(e,t){return Math.ceil(Math.random()*(t-e)+e)}},d={Tesla:[`Cyber`,`Ludicrous`,`Plaid`,`Space`,`Nova`,`Photon`,`Volt`,`Neon`,`Apex`,`Nexus`],BMW:[`M Sport`,`Dynamic`,`Elite`,`Vantage`,`X Drive`,`Pure`,`Sprint`,`Turbo`,`Premium`,`Evolution`],Mersedes:[`AMG`,`Elite`,`V8`,`Kompressor`,`Avantgarde`,`Sport`,`Luxury`,`Estate`,`Coupe`,`Sprint`],Ford:[`Raptor`,`SVT`,`Cobra`,`Boss`,`King`,`Titan`,`Wild`,`Maverick`,`Outlaw`,`Safari`],Audi:[`Quattro`,`S Line`,`RS`,`e-tron`,`Vorsprung`,`Sport`,`Elite`,`Progress`,`Advance`,`Motion`],Toyota:[`TRD`,`Hybrid`,`Supra`,`Off-Road`,`Sport`,`Luxury`,`Adventure`,`Touring`,`GR`,`Apex`],Honda:[`Type R`,`Sport`,`Touring`,`Hybrid`,`Performance`,`Elite`,`Si`,`Adventure`,`S-Tech`,`V-TEC`],Nissan:[`GT-R`,`Nismo`,`Sport`,`Elite`,`Pro-4X`,`Titan`,`Z`,`Skyline`,`Adventure`,`Performance`],Chevrolet:[`SS`,`ZR1`,`Z06`,`RST`,`LTZ`,`Sport`,`Performance`,`Trail`,`High Country`,`Bolt`],Volkswagen:[`R-Line`,`GTI`,`TDI`,`Sport`,`4Motion`,`Comfort`,`Sprint`,`Elite`,`Atlas`,`Taos`],Porsche:[`Turbo`,`S`,`GTS`,`RS`,`Targa`,`Carrera`,`Cayman`,`Boxster`,`Panamera`,`Taycan`],Ferrari:[`Scuderia`,`Spider`,`GTB`,`GTS`,`Special`,`Stradale`,`Pista`,`Assetto`,`Competizione`,`Challenge`],Lamborghini:[`SV`,`Spyder`,`Performante`,`Superleggera`,`Edizione`,`Nero`,`Giallo`,`Verde`,`Arancio`,`Bianco`],Maserati:[`GranSport`,`GranTurismo`,`S`,`Trofeo`,`Ghibli`,`Levante`,`MC`,`Racing`,`Sport`,`Luxury`],Bugatti:[`SuperSport`,`Pur Sport`,`Vitesse`,`Grand Sport`,`Sang Noir`,`Rembrandt`,`L'Or Blanc`,`La Voiture Noire`,`Centodieci`,`Divo`],"Aston Martin":[`Vantage`,`Vanquish`,`Rapide`,`DBS`,`Valkyrie`,`Valhalla`,`DB11`,`Volante`,`Q`,`Shadow`],Jaguar:[`SVR`,`R-Dynamic`,`Sport`,`Luxury`,`Performance`,`Black`,`Elegance`,`Portfolio`,`XKR`,`Supercharged`],"Land Rover":[`Autobiography`,`Sport`,`HSE`,`Vogue`,`SV`,`AWD`,`Adventure`,`Premium`,`Evoque`,`Defender`],Volvo:[`R-Design`,`Inscription`,`T8`,`Momentum`,`Polestar`,`Excellence`,`Ocean`,`Fusion`,`Thunder`,`Aurora`],Subaru:[`STI`,`WRX`,`Sport`,`Touring`,`Wilderness`,`XT`,`Premium`,`Limited`,`GT`,`Adventure`]},f={async getPagination(e,t){let n=`http://localhost:3000/garage/?_page=${e}&_limit=${t}`,r=await fetch(n),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return{CARS:await r.json(),TOTAL_COUNT:Number(r.headers.get(`x-total-count`))}},async getById(e){let t=`http://localhost:3000/garage/${e}`,n=await fetch(t),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/garage/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async update(e,t){let n=`http://localhost:3000/garage/${t}`,r=await fetch(n,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return await r.json()},async generageRandom100Cars(){this.setAttribute(`disabled`,`true`),this.innerHTML=`Generate cars (loading...)`;let t=d,n=Object.keys(t);for(let e=1;e<=100;e++){let e=n[u.random_from_a_to_b(0,n.length-1)],r=t[e],i={name:`${e}-${r[u.random_from_a_to_b(0,r.length-1)]}`,color:l.getRandomColor()};await f.create(i)}await m.render(c.getPage(),e.limit),this.removeAttribute(`disabled`),this.innerHTML=`Generate cars`}},p={idForm:`create_car_form`,localStorageKey:`async_race__create_data`,idNameInput:`create_car__name_input`,idColorInput:`create_car__color_input`,render(){let e=p.getCreateData();return`
      <form id="${p.idForm}">
        <label
          for="${p.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${p.idNameInput}"
          type="text"
          name="name"
          value="${e.name}"
        >
        <label
          for="${p.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${p.idColorInput}"  
          type="color"
          name="color"
          value="${e.color}"
        >
        <button
          class="btn btn-sm btn-success"
        >
          Create
        </button>
      </form>
    `},init(){let e=document.querySelector(`#${p.idForm}`);if(!e){console.error(`Node not found: #${p.idForm}`);return}e.addEventListener(`submit`,p.onSubmit);let t=document.querySelector(`#${p.idNameInput}`);if(!t){console.error(`Node not found: #${p.idNameInput}`);return}t.addEventListener(`input`,function(){p.setName(this.value)});let n=document.querySelector(`#${p.idColorInput}`);if(!n){console.error(`Node not found: #${p.idColorInput}`);return}n.addEventListener(`input`,function(){p.setColor(this.value)})},async onSubmit(t){t.preventDefault();let n=t.target,r=new FormData(n),i={name:r.get(`name`)||`Unnamed car`,color:r.get(`color`)||`#000000`};console.log(`Try to create car`,i);let a=await f.create(i);console.log(`Created car`,a),await m.render(c.getPage(),e.limit)},getCreateData(){let e=localStorage.getItem(p.localStorageKey),t={name:``,color:``};if(e)try{let n=JSON.parse(e);typeof n==`object`&&n&&`name`in n&&typeof n.name==`string`&&(t.name=n.name),typeof n==`object`&&n&&`color`in n&&typeof n.color==`string`&&(t.color=n.color)}catch(e){console.error(e)}return localStorage.setItem(p.localStorageKey,JSON.stringify(t)),t},setName(e){let t=p.getCreateData();t.name=e,localStorage.setItem(p.localStorageKey,JSON.stringify(t))},setColor(e){let t=p.getCreateData();t.color=e,localStorage.setItem(p.localStorageKey,JSON.stringify(t))}},m={async render(e,t){let n=`#${g.idContent}`,r=document.querySelector(n);if(!r){console.log(`Node is not found: ${n}`);return}try{r.innerHTML=`
        ${p.render()}
        ${o.render()}
        <div>
          <button
            class="btn btn-sm btn-primary"
            id="generate_cars"
            title="Generate random 100 cars"
          >
            Generate cars
          </button>
        </div>
        <div id="${c.idGarageContent}"></div>
        <div id="${i.idPaginationContainer}"></div>
      `,await c.render(e,t)}catch(e){r.innerHTML=`
        <div>${e}</div>
      `}}},h={async render(){let e=`#${g.idContent}`,t=document.querySelector(e);if(!t){console.log(`Node is not found: ${e}`);return}try{t.innerHTML=`Winners page`}catch(e){t.innerHTML=`
        <div>${e}</div>
      `}}},g={idRoot:`app`,idContent:`content`,async render(){let t=`#${g.idRoot}`,n=document.querySelector(t);if(!n){console.error(`Node is not found: ${t}`);return}try{n.innerHTML=`
        <div>
          <button class="btn btn-sm btn-primary" id="garage_render">To garage</button>
          <button class="btn btn-sm btn-primary" id="winner_render">To winners</button>
        </div>
        <div id="${g.idContent}"></div>
      `,document.querySelector(`#garage_render`)?.addEventListener(`click`,async()=>m.render(c.getPage(),e.limit)),document.querySelector(`#winner_render`)?.addEventListener(`click`,h.render),await m.render(c.getPage(),e.limit)}catch(e){n.innerHTML=`
        <div style='color: red;'>
          ${e}
        </div>
      `}}};try{g.render()}catch(e){console.error(e)}