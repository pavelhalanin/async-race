(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={limitCars:7,limitWinners:10},t={async engineStart(e){let t=`http://localhost:3000/engine/?id=${e}&status=started`,n=await fetch(t,{method:`PATCH`}),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async engineDrive(e){let t=`http://localhost:3000/engine/?id=${e}&status=drive`,n=await fetch(t,{method:`PATCH`}),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async engineStopped(e){let t=`http://localhost:3000/engine/?id=${e}&status=stopped`,n=await fetch(t,{method:`PATCH`}),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()}},n={getLastPage(e,t){return Math.ceil(e/t)}},r=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/></svg>`,i={render(e){return`<span class="car__wrapper" style="color: ${e};">${r.replaceAll(/fill="[^"]*"/g,``).replace(`<svg`,`<svg fill="currentColor"`)}</span>`}},a={idPaginationContainer:`garage_pagination`,async render(t,r,i){let o=`#${a.idPaginationContainer}`,s=document.querySelector(o);if(!s){console.error(`Node is not found: ${o}`);return}s.innerHTML=`Loading...`;let c=n.getLastPage(i,r);s.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${t<=1?`disabled`:``}>Prev</button>
      <select id="pagination_select" class="btn">
        ${Array.from({length:c},(e,n)=>{let r=n+1;return`<option value="${r}" ${r===t?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      <button class="btn btn-primary" id="pagination_next_button" ${t>=c?`disabled`:``}>Next</button>
    `,document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await g.render(t-1,e.limitCars)),document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await g.render(t+1,e.limitCars)),document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n){let t=parseInt(n.value);await g.render(t,e.limitCars)}})}},o={paginationTypeSort:Object.freeze({noSort:0,idAsc:1,idDesc:2,winsAsc:3,winsDesc:4,timeAsc:5,timeDesc:6}),async getPagination(e,t,n=0){let r=`http://localhost:3000/winners/?_page=${e}&_limit=${t}`,i={[o.paginationTypeSort.idAsc]:{sort:`id`,order:`ASC`},[o.paginationTypeSort.idDesc]:{sort:`id`,order:`DESC`},[o.paginationTypeSort.winsAsc]:{sort:`wins`,order:`ASC`},[o.paginationTypeSort.winsDesc]:{sort:`wins`,order:`DESC`},[o.paginationTypeSort.timeAsc]:{sort:`time`,order:`ASC`},[o.paginationTypeSort.timeDesc]:{sort:`time`,order:`DESC`}}[n];i&&(r+=`&_sort=${i.sort}&_order=${i.order}`);let a=await fetch(r),s=a.status;if(s!==200)throw Error(`HTTP ${s}`);return{WINNERS:await a.json(),TOTAL_COUNT:Number(a.headers.get(`x-total-count`))}},async getById(e){let t=`http://localhost:3000/winners/${e}`,n=await fetch(t),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/winners/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async update(e,t){let n=`http://localhost:3000/garage/${t}`,r=await fetch(n,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return await r.json()}},s={idForm:`create_car_form`,render(e){return`
      <button
        class="btn btn-sm btn-danger"
        data-car-id="${e}"
      >
        Remove
      </button>
    `},init(e){let t=`button[data-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,s.onClick)},async onClick(t){let n=t.target,r=Number(n.dataset.carId)||0;console.log(`Remove car with ID: ${r}`),await m.remove(r),await o.remove(r),await g.render(u.getPage(),e.limitCars)}},c={idForm:`update_car_form`,localStorageKey:`async_race__car_update_data`,idNameInput:`update_car__name_input`,idColorInput:`update_car__color_input`,render(){let e=c.getUpdateData();return`
      <form id="${c.idForm}">
        <label
          for="${c.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${c.idNameInput}"
          type="text"
          name="name"
          value="${e.name}"
        >
        <label
          for="${c.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${c.idColorInput}"
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
    `},init(){let e=document.querySelector(`#${c.idForm}`);if(!e){console.error(`Node not found: #${c.idForm}`);return}e.addEventListener(`submit`,c.onSubmit);let t=document.querySelector(`#${c.idNameInput}`);if(!t){console.error(`Node not found: #${c.idNameInput}`);return}t.addEventListener(`input`,function(){c.setName(this.value)});let n=document.querySelector(`#${c.idColorInput}`);if(!n){console.error(`Node not found: #${c.idColorInput}`);return}n.addEventListener(`input`,function(){c.setColor(this.value)})},async onSubmit(t){t.preventDefault();let n=t.target,r=new FormData(n),i={name:r.get(`name`)||`Unnamed car`,color:r.get(`color`)||`#000000`};console.log(`Try to update car`,i);let a=c.getUpdateData(),o=await m.update(i,a.id);console.log(`Updated car`,o),await g.render(u.getPage(),e.limitCars)},getUpdateData(){let e=localStorage.getItem(c.localStorageKey),t={id:0,name:``,color:``};if(e)try{let n=JSON.parse(e);typeof n==`object`&&n&&`id`in n&&typeof n.id==`number`&&(t.id=n.id),typeof n==`object`&&n&&`name`in n&&typeof n.name==`string`&&(t.name=n.name),typeof n==`object`&&n&&`color`in n&&typeof n.color==`string`&&(t.color=n.color)}catch(e){console.error(e)}return localStorage.setItem(c.localStorageKey,JSON.stringify(t)),t},setId(e){let t=c.getUpdateData();t.id=e,localStorage.setItem(c.localStorageKey,JSON.stringify(t))},setName(e){let t=c.getUpdateData();t.name=e,localStorage.setItem(c.localStorageKey,JSON.stringify(t))},setColor(e){let t=c.getUpdateData();t.color=e,localStorage.setItem(c.localStorageKey,JSON.stringify(t))}},l={idForm:`select_car_form`,render(e){return`
      <button
        class="btn btn-sm btn-warning"
        data-select-car-id="${e}"
      >
        Select
      </button>
    `},init(e){let t=`button[data-select-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.error(`Node not found: ${t}`);return}n.addEventListener(`click`,l.onClick)},async onClick(t){let n=t.target,r=Number(n.dataset.selectCarId)||0;c.setId(r);let i=await m.getById(r);c.setName(i.name),c.setColor(i.color),await g.render(u.getPage(),e.limitCars)}},u={idGarageContent:`garage_content`,localStoragePage:`async_race__selected_page`,async render(e,t){let n=`#${u.idGarageContent}`,r=document.querySelector(n);if(!r){console.error(`Node is not found: ${n}`);return}r.innerHTML=`Loading...`;let{CARS:a,TOTAL_COUNT:o}=await m.getPagination(e,t);u.savePage(e),r.innerHTML=`
      <div>Garage (${o})</div> <div>Page #${e}</div>
      <div class="${u.idGarageContent}__cars">
        ${a.map(e=>`
          <div>
            ${l.render(e.id)}
            ${s.render(e.id)}
            ${e.id} ${e.name}
          </div>
          <button class="btn btn-sm btn-primary" data-button-car-start="${e.id}">A</button>
          <div class="garage_content__car_road" data-car-image="${e.id}">
            ${i.render(e.color)}
          </div>
          <div data-car-css="${e.id}"></div>
        `).join(``)}
      </div>
    `,a.length===0&&(r.innerHTML=`No cars`),await u.componentDidMount(a,e,t,o),u.addEventForCars(a)},addEventForCars(e){for(let t of e){let e=String(t.id);document.querySelector(`button[data-button-car-start="${CSS.escape(e)}"]`)?.addEventListener(`click`,async()=>await u.startCar(t.id))}},async startCar(e){try{let n=String(e),r=`div[data-car-image="${CSS.escape(n)}"] .car__wrapper`,i=document.querySelector(r);if(!i)throw Error(`Node is not found ${r}`);i.classList.remove(`animate--${n}`);let a=await t.engineStart(e),o=a.distance/1e3/a.velocity,s=`div[data-car-css="${CSS.escape(n)}"]`,c=document.querySelector(s);if(!c)throw Error(`Node is not found ${s}`);c instanceof HTMLElement&&(c.innerHTML=`
            <style>
            .garage_content__car_road .car__wrapper.animate--${n} {
              animation: moveRight ${o}s linear forwards;
            }
            </style>
          `),i.classList.add(`animate--${n}`)}catch(e){alert(e)}},getPage(){return Number(localStorage.getItem(u.localStoragePage)||1)||1},savePage(e){localStorage.setItem(u.localStoragePage,String(e))},fixPage(e,t,r){let i=n.getLastPage(r,t);e>i&&(u.savePage(i),u.render(i,t))},async componentDidMount(e,t,n,r){h.init(),c.init();for(let t of e)l.init(t.id),s.init(t.id);document.querySelector(`#generate_cars`)?.addEventListener(`click`,m.generageRandom100Cars),await a.render(t,n,r),u.fixPage(t,n,r)}},d={getRandomColor(){let e=`#`;for(let t=0;t<6;t++)e+=`0123456789ABCDEF`[Math.floor(Math.random()*16)];return e}},f={random_from_a_to_b(e,t){return Math.ceil(Math.random()*(t-e)+e)}},p={Tesla:[`Cyber`,`Ludicrous`,`Plaid`,`Space`,`Nova`,`Photon`,`Volt`,`Neon`,`Apex`,`Nexus`],BMW:[`M Sport`,`Dynamic`,`Elite`,`Vantage`,`X Drive`,`Pure`,`Sprint`,`Turbo`,`Premium`,`Evolution`],Mersedes:[`AMG`,`Elite`,`V8`,`Kompressor`,`Avantgarde`,`Sport`,`Luxury`,`Estate`,`Coupe`,`Sprint`],Ford:[`Raptor`,`SVT`,`Cobra`,`Boss`,`King`,`Titan`,`Wild`,`Maverick`,`Outlaw`,`Safari`],Audi:[`Quattro`,`S Line`,`RS`,`e-tron`,`Vorsprung`,`Sport`,`Elite`,`Progress`,`Advance`,`Motion`],Toyota:[`TRD`,`Hybrid`,`Supra`,`Off-Road`,`Sport`,`Luxury`,`Adventure`,`Touring`,`GR`,`Apex`],Honda:[`Type R`,`Sport`,`Touring`,`Hybrid`,`Performance`,`Elite`,`Si`,`Adventure`,`S-Tech`,`V-TEC`],Nissan:[`GT-R`,`Nismo`,`Sport`,`Elite`,`Pro-4X`,`Titan`,`Z`,`Skyline`,`Adventure`,`Performance`],Chevrolet:[`SS`,`ZR1`,`Z06`,`RST`,`LTZ`,`Sport`,`Performance`,`Trail`,`High Country`,`Bolt`],Volkswagen:[`R-Line`,`GTI`,`TDI`,`Sport`,`4Motion`,`Comfort`,`Sprint`,`Elite`,`Atlas`,`Taos`],Porsche:[`Turbo`,`S`,`GTS`,`RS`,`Targa`,`Carrera`,`Cayman`,`Boxster`,`Panamera`,`Taycan`],Ferrari:[`Scuderia`,`Spider`,`GTB`,`GTS`,`Special`,`Stradale`,`Pista`,`Assetto`,`Competizione`,`Challenge`],Lamborghini:[`SV`,`Spyder`,`Performante`,`Superleggera`,`Edizione`,`Nero`,`Giallo`,`Verde`,`Arancio`,`Bianco`],Maserati:[`GranSport`,`GranTurismo`,`S`,`Trofeo`,`Ghibli`,`Levante`,`MC`,`Racing`,`Sport`,`Luxury`],Bugatti:[`SuperSport`,`Pur Sport`,`Vitesse`,`Grand Sport`,`Sang Noir`,`Rembrandt`,`L'Or Blanc`,`La Voiture Noire`,`Centodieci`,`Divo`],"Aston Martin":[`Vantage`,`Vanquish`,`Rapide`,`DBS`,`Valkyrie`,`Valhalla`,`DB11`,`Volante`,`Q`,`Shadow`],Jaguar:[`SVR`,`R-Dynamic`,`Sport`,`Luxury`,`Performance`,`Black`,`Elegance`,`Portfolio`,`XKR`,`Supercharged`],"Land Rover":[`Autobiography`,`Sport`,`HSE`,`Vogue`,`SV`,`AWD`,`Adventure`,`Premium`,`Evoque`,`Defender`],Volvo:[`R-Design`,`Inscription`,`T8`,`Momentum`,`Polestar`,`Excellence`,`Ocean`,`Fusion`,`Thunder`,`Aurora`],Subaru:[`STI`,`WRX`,`Sport`,`Touring`,`Wilderness`,`XT`,`Premium`,`Limited`,`GT`,`Adventure`]},m={async getPagination(e,t){let n=`http://localhost:3000/garage/?_page=${e}&_limit=${t}`,r=await fetch(n),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return{CARS:await r.json(),TOTAL_COUNT:Number(r.headers.get(`x-total-count`))}},async getById(e){let t=`http://localhost:3000/garage/${e}`,n=await fetch(t),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/garage/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async update(e,t){let n=`http://localhost:3000/garage/${t}`,r=await fetch(n,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return await r.json()},async generageRandom100Cars(){this.setAttribute(`disabled`,`true`),this.innerHTML=`Generate cars (loading...)`;let t=p,n=Object.keys(t);for(let e=1;e<=100;e++){let e=n[f.random_from_a_to_b(0,n.length-1)],r=t[e],i={name:`${e}-${r[f.random_from_a_to_b(0,r.length-1)]}`,color:d.getRandomColor()};await m.create(i)}await g.render(u.getPage(),e.limitCars),this.removeAttribute(`disabled`),this.innerHTML=`Generate cars`}},h={idForm:`create_car_form`,localStorageKey:`async_race__car_create_data`,idNameInput:`create_car__name_input`,idColorInput:`create_car__color_input`,render(){let e=h.getCreateData();return`
      <form id="${h.idForm}">
        <label
          for="${h.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${h.idNameInput}"
          type="text"
          name="name"
          value="${e.name}"
        >
        <label
          for="${h.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${h.idColorInput}"  
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
    `},init(){let e=document.querySelector(`#${h.idForm}`);if(!e){console.error(`Node not found: #${h.idForm}`);return}e.addEventListener(`submit`,h.onSubmit);let t=document.querySelector(`#${h.idNameInput}`);if(!t){console.error(`Node not found: #${h.idNameInput}`);return}t.addEventListener(`input`,function(){h.setName(this.value)});let n=document.querySelector(`#${h.idColorInput}`);if(!n){console.error(`Node not found: #${h.idColorInput}`);return}n.addEventListener(`input`,function(){h.setColor(this.value)})},async onSubmit(t){t.preventDefault();let n=t.target,r=new FormData(n),i={name:r.get(`name`)||`Unnamed car`,color:r.get(`color`)||`#000000`};console.log(`Try to create car`,i);let a=await m.create(i);console.log(`Created car`,a),await g.render(u.getPage(),e.limitCars)},getCreateData(){let e=localStorage.getItem(h.localStorageKey),t={name:``,color:``};if(e)try{let n=JSON.parse(e);typeof n==`object`&&n&&`name`in n&&typeof n.name==`string`&&(t.name=n.name),typeof n==`object`&&n&&`color`in n&&typeof n.color==`string`&&(t.color=n.color)}catch(e){console.error(e)}return localStorage.setItem(h.localStorageKey,JSON.stringify(t)),t},setName(e){let t=h.getCreateData();t.name=e,localStorage.setItem(h.localStorageKey,JSON.stringify(t))},setColor(e){let t=h.getCreateData();t.color=e,localStorage.setItem(h.localStorageKey,JSON.stringify(t))}},g={async render(e,t){let n=`#${b.idContent}`,r=document.querySelector(n);if(!r){console.log(`Node is not found: ${n}`);return}try{r.innerHTML=`
        ${h.render()}
        ${c.render()}
        <div>
          <button
            class="btn btn-sm btn-primary"
            id="generate_cars"
            title="Generate random 100 cars"
          >
            Generate cars
          </button>
        </div>
        <div id="${u.idGarageContent}"></div>
        <div id="${a.idPaginationContainer}"></div>
      `,await u.render(e,t)}catch(e){r.innerHTML=`
        <div>${e}</div>
      `}}},_={idContainer:`winners_pagination`,async render(t,r,i){let a=`#${_.idContainer}`,o=document.querySelector(a);if(!o){console.error(`Node is not found: ${a}`);return}o.innerHTML=`Loading...`;let s=n.getLastPage(i,r);o.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${t<=1?`disabled`:``}>Prev</button>
      <select id="pagination_select" class="btn">
        ${Array.from({length:s},(e,n)=>{let r=n+1;return`<option value="${r}" ${r===t?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      <button class="btn btn-primary" id="pagination_next_button" ${t>=s?`disabled`:``}>Next</button>
    `,document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await y.render(t-1,e.limitWinners)),document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await y.render(t+1,e.limitWinners)),document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n){let t=parseInt(n.value);await y.render(t,e.limitWinners)}})}},v={idContent:`winners_content`,localStoragePage:`async_race__winners_selected_page`,async render(e,t,n){let r=`#${v.idContent}`,i=document.querySelector(r);if(!i){console.error(`Node is not found: ${r}`);return}i.innerHTML=`Loading...`;let{WINNERS:a,TOTAL_COUNT:s}=await o.getPagination(e,t,n);v.savePage(e),i.innerHTML=`
      <div>Winners (${s})</div> <div>Page #${e}</div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="120" class="winners__th">
              Number
              ${v.getSortButton(0,n,o.paginationTypeSort.idDesc,`winners_sort_id_desc_button`)}
              ${v.getSortButton(1,n,o.paginationTypeSort.idAsc,`winners_sort_id_asc_button`)}
            </th>
            <th width="70">Car</th>
            <th>Name</th>
            <th width="100" class="winners__th">
              Wins
              ${v.getSortButton(0,n,o.paginationTypeSort.winsDesc,`winners_sort_wins_desc_button`)}
              ${v.getSortButton(1,n,o.paginationTypeSort.winsAsc,`winners_sort_wins_asc_button`)}
            </th>
            <th width="200" class="winners__th">
              Best time (seconds)
              ${v.getSortButton(0,n,o.paginationTypeSort.timeDesc,`winners_sort_time_desc_button`)}
              ${v.getSortButton(1,n,o.paginationTypeSort.timeAsc,`winners_sort_time_asc_button`)}
            </th>
          </tr>
        </thead>
        ${await v.renderTbody(a)}
      </table>
    `,await v.componentDidMount(e,t,s,n)},getSortButton(e,t,n,r){return`
      <button
        class="btn btn-sm btn-primary ${e==0?`winners__button_top`:`winners__button_bottom`}"
        id="${r}"
        ${t==n?`disabled`:``}
      >
        ${e==0?`↑`:`↓`}
      </button>
    `},async renderTbody(e){return`
      <tbody>
        ${(await Promise.all(e.map(async e=>{try{let t=await m.getById(e.id);return`
            <tr>
              <td align="right">${e.id}</td>
              <td align="center">${i.render(t.color)}</td>
              <td>${t.name}</td>
              <td align="right">${e.wins}</td>
              <td align="right">${e.time}</td>
            </tr>
          `}catch(t){return`
            <tr>
              <td align="right">${e.id}</td>
              <td>${t}</td>
              <td>${t}</td>
              <td align="right">${e.wins}</td>
              <td align="right">${e.time}</td>
            </tr>
          `}}))).join(``)}
        ${e.length===0?`<tr><td colspan="5">Table is empty</td></tr>`:``}
      </tbody>
    `},getPage(){return Number(localStorage.getItem(v.localStoragePage)||1)||1},savePage(e){localStorage.setItem(v.localStoragePage,String(e))},fixPage(e,t,r,i){let a=n.getLastPage(r,t);e>a&&(v.savePage(a),v.render(a,t,i))},async componentDidMount(e,t,n,r){await _.render(e,t,n),v.fixPage(e,t,n,r),document.querySelector(`#winners_sort_id_asc_button`)?.addEventListener(`click`,()=>y.render(e,t,o.paginationTypeSort.idAsc)),document.querySelector(`#winners_sort_id_desc_button`)?.addEventListener(`click`,()=>y.render(e,t,o.paginationTypeSort.idDesc)),document.querySelector(`#winners_sort_wins_asc_button`)?.addEventListener(`click`,()=>y.render(e,t,o.paginationTypeSort.winsAsc)),document.querySelector(`#winners_sort_wins_desc_button`)?.addEventListener(`click`,()=>y.render(e,t,o.paginationTypeSort.winsDesc)),document.querySelector(`#winners_sort_time_asc_button`)?.addEventListener(`click`,()=>y.render(e,t,o.paginationTypeSort.timeAsc)),document.querySelector(`#winners_sort_time_desc_button`)?.addEventListener(`click`,()=>y.render(e,t,o.paginationTypeSort.timeDesc))}},y={async render(e,t,n=0){let r=`#${b.idContent}`,i=document.querySelector(r);if(!i){console.log(`Node is not found: ${r}`);return}try{i.innerHTML=`
        <div id="${v.idContent}"></div>
        <div id="${_.idContainer}"></div>
      `,await v.render(e,t,n)}catch(e){i.innerHTML=`
        <div>${e}</div>
      `}}},b={idRoot:`app`,idContent:`content`,async render(){let t=`#${b.idRoot}`,n=document.querySelector(t);if(!n){console.error(`Node is not found: ${t}`);return}try{n.innerHTML=`
        <div>
          <button class="btn btn-sm btn-primary" id="garage_render">To garage</button>
          <button class="btn btn-sm btn-primary" id="winner_render">To winners</button>
        </div>
        <div id="${b.idContent}"></div>
      `,document.querySelector(`#garage_render`)?.addEventListener(`click`,async()=>g.render(u.getPage(),e.limitCars)),document.querySelector(`#winner_render`)?.addEventListener(`click`,()=>y.render(v.getPage(),e.limitWinners)),await g.render(u.getPage(),e.limitCars)}catch(e){n.innerHTML=`
        <div style='color: red;'>
          ${e}
        </div>
      `}}};try{b.render()}catch(e){console.error(e)}