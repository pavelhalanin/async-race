(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={limitCars:7,limitWinners:7},t={getLastPage(e,t){return Math.ceil(e/t)}},n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/></svg>`,r={render(e){return`<span class="car__wrapper" style="color: ${e};">${n.replaceAll(/fill="[^"]*"/g,``).replace(`<svg`,`<svg fill="currentColor"`)}</span>`}},i={idPaginationContainer:`garage_pagination`,async render(n,r,a){let o=`#${i.idPaginationContainer}`,s=document.querySelector(o);if(!s){console.error(`Node is not found: ${o}`);return}s.innerHTML=`Loading...`;let c=t.getLastPage(a,r);s.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${n<=1?`disabled`:``}>Prev</button>
      <select id="pagination_select" class="btn">
        ${Array.from({length:c},(e,t)=>{let r=t+1;return`<option value="${r}" ${r===n?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      <button class="btn btn-primary" id="pagination_next_button" ${n>=c?`disabled`:``}>Next</button>
    `,document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await h.render(n-1,e.limitCars)),document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await h.render(n+1,e.limitCars)),document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n){let t=parseInt(n.value);await h.render(t,e.limitCars)}})}},a={async getPagination(e,t){let n=`http://localhost:3000/winners/?_page=${e}&_limit=${t}`,r=await fetch(n),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return{WINNERS:await r.json(),TOTAL_COUNT:Number(r.headers.get(`x-total-count`))}},async getById(e){let t=`http://localhost:3000/winners/${e}`,n=await fetch(t),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/winners/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async update(e,t){let n=`http://localhost:3000/garage/${t}`,r=await fetch(n,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return await r.json()}},o={idForm:`create_car_form`,render(e){return`
      <button
        class="btn btn-sm btn-danger"
        data-car-id="${e}"
      >
        Remove
      </button>
    `},init(e){let t=`button[data-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,o.onClick)},async onClick(t){let n=t.target,r=Number(n.dataset.carId)||0;console.log(`Remove car with ID: ${r}`),await p.remove(r),await a.remove(r),await h.render(l.getPage(),e.limitCars)}},s={idForm:`update_car_form`,localStorageKey:`async_race__car_update_data`,idNameInput:`update_car__name_input`,idColorInput:`update_car__color_input`,render(){let e=s.getUpdateData();return`
      <form id="${s.idForm}">
        <label
          for="${s.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${s.idNameInput}"
          type="text"
          name="name"
          value="${e.name}"
        >
        <label
          for="${s.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${s.idColorInput}"
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
    `},init(){let e=document.querySelector(`#${s.idForm}`);if(!e){console.error(`Node not found: #${s.idForm}`);return}e.addEventListener(`submit`,s.onSubmit);let t=document.querySelector(`#${s.idNameInput}`);if(!t){console.error(`Node not found: #${s.idNameInput}`);return}t.addEventListener(`input`,function(){s.setName(this.value)});let n=document.querySelector(`#${s.idColorInput}`);if(!n){console.error(`Node not found: #${s.idColorInput}`);return}n.addEventListener(`input`,function(){s.setColor(this.value)})},async onSubmit(t){t.preventDefault();let n=t.target,r=new FormData(n),i={name:r.get(`name`)||`Unnamed car`,color:r.get(`color`)||`#000000`};console.log(`Try to update car`,i);let a=s.getUpdateData(),o=await p.update(i,a.id);console.log(`Updated car`,o),await h.render(l.getPage(),e.limitCars)},getUpdateData(){let e=localStorage.getItem(s.localStorageKey),t={id:0,name:``,color:``};if(e)try{let n=JSON.parse(e);typeof n==`object`&&n&&`id`in n&&typeof n.id==`number`&&(t.id=n.id),typeof n==`object`&&n&&`name`in n&&typeof n.name==`string`&&(t.name=n.name),typeof n==`object`&&n&&`color`in n&&typeof n.color==`string`&&(t.color=n.color)}catch(e){console.error(e)}return localStorage.setItem(s.localStorageKey,JSON.stringify(t)),t},setId(e){let t=s.getUpdateData();t.id=e,localStorage.setItem(s.localStorageKey,JSON.stringify(t))},setName(e){let t=s.getUpdateData();t.name=e,localStorage.setItem(s.localStorageKey,JSON.stringify(t))},setColor(e){let t=s.getUpdateData();t.color=e,localStorage.setItem(s.localStorageKey,JSON.stringify(t))}},c={idForm:`select_car_form`,render(e){return`
      <button
        class="btn btn-sm btn-warning"
        data-select-car-id="${e}"
      >
        Select
      </button>
    `},init(e){let t=`button[data-select-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,c.onClick)},async onClick(t){let n=t.target,r=Number(n.dataset.selectCarId)||0;s.setId(r);let i=await p.getById(r);s.setName(i.name),s.setColor(i.color),await h.render(l.getPage(),e.limitCars)}},l={idGarageContent:`garage_content`,localStoragePage:`async_race__selected_page`,async render(e,t){let n=`#${l.idGarageContent}`,i=document.querySelector(n);if(!i){console.error(`Node is not found: ${n}`);return}i.innerHTML=`Loading...`;let{CARS:a,TOTAL_COUNT:s}=await p.getPagination(e,t);l.savePage(e),i.innerHTML=`
      <div>Garage (${s})</div> <div>Page #${e}</div>
      <div class="${l.idGarageContent}__cars">
        ${a.map(e=>`
          <div>
            ${c.render(e.id)}
            ${o.render(e.id)}
            ${e.id} ${e.name}
          </div>
          <div>
            ${r.render(e.color)}
          </div>
        `).join(``)}
      </div>
    `,a.length===0&&(i.innerHTML=`No cars`),await l.componentDidMount(a,e,t,s)},getPage(){return Number(localStorage.getItem(l.localStoragePage)||1)||1},savePage(e){localStorage.setItem(l.localStoragePage,String(e))},fixPage(e,n,r){let i=t.getLastPage(r,n);e>i&&(l.savePage(i),l.render(i,n))},async componentDidMount(e,t,n,r){m.init(),s.init();for(let t of e)c.init(t.id),o.init(t.id);document.querySelector(`#generate_cars`)?.addEventListener(`click`,p.generageRandom100Cars),await i.render(t,n,r),l.fixPage(t,n,r)}},u={getRandomColor(){let e=`#`;for(let t=0;t<6;t++)e+=`0123456789ABCDEF`[Math.floor(Math.random()*16)];return e}},d={random_from_a_to_b(e,t){return Math.ceil(Math.random()*(t-e)+e)}},f={Tesla:[`Cyber`,`Ludicrous`,`Plaid`,`Space`,`Nova`,`Photon`,`Volt`,`Neon`,`Apex`,`Nexus`],BMW:[`M Sport`,`Dynamic`,`Elite`,`Vantage`,`X Drive`,`Pure`,`Sprint`,`Turbo`,`Premium`,`Evolution`],Mersedes:[`AMG`,`Elite`,`V8`,`Kompressor`,`Avantgarde`,`Sport`,`Luxury`,`Estate`,`Coupe`,`Sprint`],Ford:[`Raptor`,`SVT`,`Cobra`,`Boss`,`King`,`Titan`,`Wild`,`Maverick`,`Outlaw`,`Safari`],Audi:[`Quattro`,`S Line`,`RS`,`e-tron`,`Vorsprung`,`Sport`,`Elite`,`Progress`,`Advance`,`Motion`],Toyota:[`TRD`,`Hybrid`,`Supra`,`Off-Road`,`Sport`,`Luxury`,`Adventure`,`Touring`,`GR`,`Apex`],Honda:[`Type R`,`Sport`,`Touring`,`Hybrid`,`Performance`,`Elite`,`Si`,`Adventure`,`S-Tech`,`V-TEC`],Nissan:[`GT-R`,`Nismo`,`Sport`,`Elite`,`Pro-4X`,`Titan`,`Z`,`Skyline`,`Adventure`,`Performance`],Chevrolet:[`SS`,`ZR1`,`Z06`,`RST`,`LTZ`,`Sport`,`Performance`,`Trail`,`High Country`,`Bolt`],Volkswagen:[`R-Line`,`GTI`,`TDI`,`Sport`,`4Motion`,`Comfort`,`Sprint`,`Elite`,`Atlas`,`Taos`],Porsche:[`Turbo`,`S`,`GTS`,`RS`,`Targa`,`Carrera`,`Cayman`,`Boxster`,`Panamera`,`Taycan`],Ferrari:[`Scuderia`,`Spider`,`GTB`,`GTS`,`Special`,`Stradale`,`Pista`,`Assetto`,`Competizione`,`Challenge`],Lamborghini:[`SV`,`Spyder`,`Performante`,`Superleggera`,`Edizione`,`Nero`,`Giallo`,`Verde`,`Arancio`,`Bianco`],Maserati:[`GranSport`,`GranTurismo`,`S`,`Trofeo`,`Ghibli`,`Levante`,`MC`,`Racing`,`Sport`,`Luxury`],Bugatti:[`SuperSport`,`Pur Sport`,`Vitesse`,`Grand Sport`,`Sang Noir`,`Rembrandt`,`L'Or Blanc`,`La Voiture Noire`,`Centodieci`,`Divo`],"Aston Martin":[`Vantage`,`Vanquish`,`Rapide`,`DBS`,`Valkyrie`,`Valhalla`,`DB11`,`Volante`,`Q`,`Shadow`],Jaguar:[`SVR`,`R-Dynamic`,`Sport`,`Luxury`,`Performance`,`Black`,`Elegance`,`Portfolio`,`XKR`,`Supercharged`],"Land Rover":[`Autobiography`,`Sport`,`HSE`,`Vogue`,`SV`,`AWD`,`Adventure`,`Premium`,`Evoque`,`Defender`],Volvo:[`R-Design`,`Inscription`,`T8`,`Momentum`,`Polestar`,`Excellence`,`Ocean`,`Fusion`,`Thunder`,`Aurora`],Subaru:[`STI`,`WRX`,`Sport`,`Touring`,`Wilderness`,`XT`,`Premium`,`Limited`,`GT`,`Adventure`]},p={async getPagination(e,t){let n=`http://localhost:3000/garage/?_page=${e}&_limit=${t}`,r=await fetch(n),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return{CARS:await r.json(),TOTAL_COUNT:Number(r.headers.get(`x-total-count`))}},async getById(e){let t=`http://localhost:3000/garage/${e}`,n=await fetch(t),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/garage/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async update(e,t){let n=`http://localhost:3000/garage/${t}`,r=await fetch(n,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return await r.json()},async generageRandom100Cars(){this.setAttribute(`disabled`,`true`),this.innerHTML=`Generate cars (loading...)`;let t=f,n=Object.keys(t);for(let e=1;e<=100;e++){let e=n[d.random_from_a_to_b(0,n.length-1)],r=t[e],i={name:`${e}-${r[d.random_from_a_to_b(0,r.length-1)]}`,color:u.getRandomColor()};await p.create(i)}await h.render(l.getPage(),e.limitCars),this.removeAttribute(`disabled`),this.innerHTML=`Generate cars`}},m={idForm:`create_car_form`,localStorageKey:`async_race__car_create_data`,idNameInput:`create_car__name_input`,idColorInput:`create_car__color_input`,render(){let e=m.getCreateData();return`
      <form id="${m.idForm}">
        <label
          for="${m.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${m.idNameInput}"
          type="text"
          name="name"
          value="${e.name}"
        >
        <label
          for="${m.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${m.idColorInput}"  
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
    `},init(){let e=document.querySelector(`#${m.idForm}`);if(!e){console.error(`Node not found: #${m.idForm}`);return}e.addEventListener(`submit`,m.onSubmit);let t=document.querySelector(`#${m.idNameInput}`);if(!t){console.error(`Node not found: #${m.idNameInput}`);return}t.addEventListener(`input`,function(){m.setName(this.value)});let n=document.querySelector(`#${m.idColorInput}`);if(!n){console.error(`Node not found: #${m.idColorInput}`);return}n.addEventListener(`input`,function(){m.setColor(this.value)})},async onSubmit(t){t.preventDefault();let n=t.target,r=new FormData(n),i={name:r.get(`name`)||`Unnamed car`,color:r.get(`color`)||`#000000`};console.log(`Try to create car`,i);let a=await p.create(i);console.log(`Created car`,a),await h.render(l.getPage(),e.limitCars)},getCreateData(){let e=localStorage.getItem(m.localStorageKey),t={name:``,color:``};if(e)try{let n=JSON.parse(e);typeof n==`object`&&n&&`name`in n&&typeof n.name==`string`&&(t.name=n.name),typeof n==`object`&&n&&`color`in n&&typeof n.color==`string`&&(t.color=n.color)}catch(e){console.error(e)}return localStorage.setItem(m.localStorageKey,JSON.stringify(t)),t},setName(e){let t=m.getCreateData();t.name=e,localStorage.setItem(m.localStorageKey,JSON.stringify(t))},setColor(e){let t=m.getCreateData();t.color=e,localStorage.setItem(m.localStorageKey,JSON.stringify(t))}},h={async render(e,t){let n=`#${y.idContent}`,r=document.querySelector(n);if(!r){console.log(`Node is not found: ${n}`);return}try{r.innerHTML=`
        ${m.render()}
        ${s.render()}
        <div>
          <button
            class="btn btn-sm btn-primary"
            id="generate_cars"
            title="Generate random 100 cars"
          >
            Generate cars
          </button>
        </div>
        <div id="${l.idGarageContent}"></div>
        <div id="${i.idPaginationContainer}"></div>
      `,await l.render(e,t)}catch(e){r.innerHTML=`
        <div>${e}</div>
      `}}},g={idContainer:`winners_pagination`,async render(n,r,i){let a=`#${g.idContainer}`,o=document.querySelector(a);if(!o){console.error(`Node is not found: ${a}`);return}o.innerHTML=`Loading...`;let s=t.getLastPage(i,r);o.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${n<=1?`disabled`:``}>Prev</button>
      <select id="pagination_select" class="btn">
        ${Array.from({length:s},(e,t)=>{let r=t+1;return`<option value="${r}" ${r===n?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      <button class="btn btn-primary" id="pagination_next_button" ${n>=s?`disabled`:``}>Next</button>
    `,document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await v.render(n-1,e.limitWinners)),document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await v.render(n+1,e.limitWinners)),document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n){let t=parseInt(n.value);await v.render(t,e.limitWinners)}})}},_={idContent:`winners_content`,localStoragePage:`async_race__winners_selected_page`,async render(e,t){let n=`#${_.idContent}`,r=document.querySelector(n);if(!r){console.error(`Node is not found: ${n}`);return}r.innerHTML=`Loading...`;let{WINNERS:i,TOTAL_COUNT:o}=await a.getPagination(e,t);_.savePage(e),r.innerHTML=`
      <div>Winners (${o})</div> <div>Page #${e}</div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="100">Number</th>
            <th width="70">Car</th>
            <th>Name</th>
            <th width="100">Wins</th>
            <th width="150">Best time (seconds)</th>
          </tr>
        </thead>
        ${await _.renderTbody(i)}
      </table>
    `,await _.componentDidMount(e,t,o)},async renderTbody(e){return`
      <tbody>
        ${(await Promise.all(e.map(async e=>{try{let t=await p.getById(e.id);return`
            <tr>
              <td align="right">${e.id}</td>
              <td align="center">${r.render(t.color)}</td>
              <td>${t.name}</td>
              <td align="right">${e.wins}</td>
              <td align="right">${e.time}</td>
            </tr>
          `}catch(t){return`
            <tr>
              <td>${e.id}</td>
              <td>${t}</td>
              <td>${t}</td>
              <td>${e.wins}</td>
              <td>${e.time}</td>
            </tr>
          `}}))).join(``)}
        ${e.length===0?`<tr><td colspan="5">Table is empty</td></tr>`:``}
      </tbody>
    `},getPage(){return Number(localStorage.getItem(_.localStoragePage)||1)||1},savePage(e){localStorage.setItem(_.localStoragePage,String(e))},fixPage(e,n,r){let i=t.getLastPage(r,n);e>i&&(_.savePage(i),_.render(i,n))},async componentDidMount(e,t,n){await g.render(e,t,n),_.fixPage(e,t,n)}},v={async render(e,t){let n=`#${y.idContent}`,r=document.querySelector(n);if(!r){console.log(`Node is not found: ${n}`);return}try{r.innerHTML=`
        <div id="${_.idContent}"></div>
        <div id="${g.idContainer}"></div>
      `,await _.render(e,t)}catch(e){r.innerHTML=`
        <div>${e}</div>
      `}}},y={idRoot:`app`,idContent:`content`,async render(){let t=`#${y.idRoot}`,n=document.querySelector(t);if(!n){console.error(`Node is not found: ${t}`);return}try{n.innerHTML=`
        <div>
          <button class="btn btn-sm btn-primary" id="garage_render">To garage</button>
          <button class="btn btn-sm btn-primary" id="winner_render">To winners</button>
        </div>
        <div id="${y.idContent}"></div>
      `,document.querySelector(`#garage_render`)?.addEventListener(`click`,async()=>h.render(l.getPage(),e.limitCars)),document.querySelector(`#winner_render`)?.addEventListener(`click`,()=>v.render(_.getPage(),e.limitWinners)),await h.render(l.getPage(),e.limitCars)}catch(e){n.innerHTML=`
        <div style='color: red;'>
          ${e}
        </div>
      `}}};try{y.render()}catch(e){console.error(e)}