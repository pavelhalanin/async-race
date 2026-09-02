(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={limitCars:7,limitWinners:10},t={async engineStart(e){let t=`http://localhost:3000/engine/?id=${e}&status=started`,n=await fetch(t,{method:`PATCH`}),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async engineDrive(e){let t=`http://localhost:3000/engine/?id=${e}&status=drive`,n=await fetch(t,{method:`PATCH`}),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async engineStopped(e){let t=`http://localhost:3000/engine/?id=${e}&status=stopped`,n=await fetch(t,{method:`PATCH`}),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()}},n={paginationTypeSort:Object.freeze({noSort:0,idAsc:1,idDesc:2,winsAsc:3,winsDesc:4,timeAsc:5,timeDesc:6}),async getPagination(e,t,r=0){let i=`http://localhost:3000/winners/?_page=${e}&_limit=${t}`,a={[n.paginationTypeSort.idAsc]:{sort:`id`,order:`ASC`},[n.paginationTypeSort.idDesc]:{sort:`id`,order:`DESC`},[n.paginationTypeSort.winsAsc]:{sort:`wins`,order:`ASC`},[n.paginationTypeSort.winsDesc]:{sort:`wins`,order:`DESC`},[n.paginationTypeSort.timeAsc]:{sort:`time`,order:`ASC`},[n.paginationTypeSort.timeDesc]:{sort:`time`,order:`DESC`}}[r];a&&(i+=`&_sort=${a.sort}&_order=${a.order}`);let o=await fetch(i),s=o.status;if(s!==200)throw Error(`HTTP ${s}`);return{WINNERS:await o.json(),TOTAL_COUNT:Number(o.headers.get(`x-total-count`))}},async getById(e){let t=`http://localhost:3000/winners/${e}`,n=await fetch(t),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async create(e){let t=await fetch(`http://localhost:3000/winners/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/winners/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async update(e,t){let n=`http://localhost:3000/winners/${t}`,r=await fetch(n,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return await r.json()}},r={getLastPage(e,t){return Math.ceil(e/t)}},i=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M147 170.7L117.2 256L240.1 256L240.1 160L162.2 160C155.4 160 149.3 164.3 147.1 170.7zM48.6 257.9L86.5 149.6C97.8 117.5 128.1 96 162.1 96L360 96C385.2 96 408.9 107.9 424 128L520.2 256.3C587.1 260.5 640 316.1 640 384L640 400C640 435.3 611.3 464 576 464L559.6 464C555.6 508.9 517.9 544 472 544C426.1 544 388.4 508.9 384.4 464L239.7 464C235.7 508.9 198 544 152.1 544C106.2 544 68.5 508.9 64.5 464L64.1 464C28.8 464 .1 435.3 .1 400L.1 320C.1 289.9 20.8 264.7 48.7 257.9zM440 256L372.8 166.4C369.8 162.4 365 160 360 160L288 160L288 256L440 256zM152 496C174.1 496 192 478.1 192 456C192 433.9 174.1 416 152 416C129.9 416 112 433.9 112 456C112 478.1 129.9 496 152 496zM512 456C512 433.9 494.1 416 472 416C449.9 416 432 433.9 432 456C432 478.1 449.9 496 472 496C494.1 496 512 478.1 512 456z"/></svg>`,a=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
</svg>`,o={render(e){return`
      <span class="car__wrapper" style="color: ${e};">
        <span class="car__dtp_warning">${a}</span>
        ${i.replaceAll(/fill="[^"]*"/g,``).replace(`<svg`,`<svg fill="currentColor"`)}
      </span>
    `}},s={idPaginationContainer:`garage_pagination`,async render(e,t,n){let i=`#${s.idPaginationContainer}`,a=document.querySelector(i);if(!a){console.info(`Node is not found: ${i}`);return}a.innerHTML=`Loading...`;let o=r.getLastPage(n,t);if(o==0){a.replaceChildren(``);return}a.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${e<=1?`disabled`:``}>Prev</button>
      <button class="btn btn-primary" id="pagination_next_button" ${e>=o?`disabled`:``}>Next</button>
      Page:
      <select id="pagination_select" class="btn" style="border-color: var(--primary-border-color);">
        ${Array.from({length:o},(t,n)=>{let r=n+1;return`<option value="${r}" ${r===e?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      Limit: ${t}
    `,s.addListenerPrevButton(e,t),s.addListenerNextButton(e,t),s.addListenerSelect(t)},addListenerPrevButton(e,t){document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await y.render(e-1,t))},addListenerNextButton(e,t){document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await y.render(e+1,t))},addListenerSelect(e){document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n instanceof HTMLSelectElement){let t=parseInt(n.value);await y.render(t,e)}})}},c={idForm:`create_car_form`,render(e){return`
      <button
        class="btn btn-sm btn-danger"
        data-car-id="${e}"
      >
        Remove
      </button>
    `},init(e){let t=`button[data-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.info(`Node not found: ${t}`);return}n.addEventListener(`click`,c.onClick)},async onClick(t){let r=t.target;if(!(r instanceof HTMLButtonElement))return;let i=Number(r.dataset.carId)||0;console.log(`Remove car with ID: ${i}`);try{await _.remove(i)}catch(e){console.info(e)}try{await n.remove(i)}catch(e){console.info(e)}await y.render(p.getPage(),e.limitCars)}},l={idForm:`update_car_form`,localStorageKey:`async_race__car_update_data`,idNameInput:`update_car__name_input`,idColorInput:`update_car__color_input`,render(){let e=l.getUpdateData();return`
      <form id="${l.idForm}">
        <label
          for="${l.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${l.idNameInput}"
          type="text"
          name="name"
          value="${e.name}"
        >
        <label
          for="${l.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${l.idColorInput}"
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
    `},init(){let e=document.querySelector(`#${l.idForm}`);if(!e){console.info(`Node not found: #${l.idForm}`);return}e.addEventListener(`submit`,l.onSubmit);let t=document.querySelector(`#${l.idNameInput}`);if(!t){console.info(`Node not found: #${l.idNameInput}`);return}t.addEventListener(`input`,function(){l.setName(this.value)});let n=document.querySelector(`#${l.idColorInput}`);if(!n){console.info(`Node not found: #${l.idColorInput}`);return}n.addEventListener(`input`,function(){l.setColor(this.value)})},async onSubmit(t){t.preventDefault();let n=t.target;if(!(n instanceof HTMLFormElement))return;let r=new FormData(n),i={name:r.get(`name`)?.toString()||`Unnamed car`,color:r.get(`color`)?.toString()||`#000000`};console.log(`Try to update car`,i);let a=l.getUpdateData(),o=await _.update(i,a.id);console.log(`Updated car`,o),await y.render(p.getPage(),e.limitCars)},getUpdateData(){let e=localStorage.getItem(l.localStorageKey),t={id:0,name:``,color:``};if(e)try{let n=JSON.parse(e);typeof n==`object`&&n&&`id`in n&&typeof n.id==`number`&&(t.id=n.id),typeof n==`object`&&n&&`name`in n&&typeof n.name==`string`&&(t.name=n.name),typeof n==`object`&&n&&`color`in n&&typeof n.color==`string`&&(t.color=n.color)}catch(e){console.info(e)}return localStorage.setItem(l.localStorageKey,JSON.stringify(t)),t},setId(e){let t=l.getUpdateData();t.id=e,localStorage.setItem(l.localStorageKey,JSON.stringify(t))},setName(e){let t=l.getUpdateData();t.name=e,localStorage.setItem(l.localStorageKey,JSON.stringify(t))},setColor(e){let t=l.getUpdateData();t.color=e,localStorage.setItem(l.localStorageKey,JSON.stringify(t))}},u={idForm:`select_car_form`,render(e){return`
      <button
        class="btn btn-sm btn-warning"
        data-select-car-id="${e}"
      >
        Select
      </button>
    `},init(e){let t=`button[data-select-car-id="${CSS.escape(String(e))}"]`,n=document.querySelector(t);if(!n){console.info(`Node not found: ${t}`);return}n.addEventListener(`click`,u.onClick)},async onClick(t){let n=t.target;if(!(n instanceof HTMLButtonElement))return;let r=Number(n.dataset.selectCarId)||0;l.setId(r);let i=await _.getById(r);l.setName(i.name),l.setColor(i.color),await y.render(p.getPage(),e.limitCars)}},d=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 64C145.7 64 160 78.3 160 96L160 112L229 94.8C267.1 85.3 307.3 89.7 342.5 107.3C388.8 130.5 443.3 130.5 489.6 107.3L499.2 102.5C519.8 92.1 544 107.1 544 130.1L544 409.8C544 423.1 535.7 435.1 523.2 439.8L488.5 452.8C442.3 470.1 390.9 467.4 346.8 445.4C308.9 426.4 265.4 421.7 224.3 432L160 448L160 544C160 561.7 145.7 576 128 576C110.3 576 96 561.7 96 544L96 96C96 78.3 110.3 64 128 64zM160 251.1L224 237.2L224 302.7L160 316.6L160 382.1L208.8 369.9C213.9 368.6 218.9 367.5 224 366.6L224 302.7L262.9 294.3C271.2 292.5 279.6 291.8 288 292.2L288 228.2C301.6 228.6 315.2 230.8 328.4 234.6L352 241.5L352 308.2L310.3 295.9C303 293.8 295.5 292.5 288 292.1L288 363.5C309.8 365.4 331.3 370.2 352 377.9L352 308.1L374.7 314.8C388.2 318.8 402 321.2 416 322.2L416 258C408.2 257.2 400.4 255.7 392.8 253.5L352 241.5L352 179.5C339 175.7 326.2 170.7 313.8 164.5C305.6 160.4 296.9 157.5 288 155.7L288 228.1C275 227.7 262 228.9 249.3 231.7L224 237.2L224 162L160 178L160 251.1zM416 399.7C432.8 401.2 449.9 399 466 392.9L480 387.7L480 316L472.1 317.8C453.7 322.1 434.8 323.5 416 322.3L416 399.7zM480 250.3L480 179.5C459.1 185.6 437.6 188.6 416 188.6L416 258C429.9 259.4 444 258.5 457.7 255.4L480 250.2z"/></svg>`,f={render(e){return`
      <span data-finish-for-car-id="${e}">
        ${d}
      </span>
    `},getFlag(e){let t=`span[data-finish-for-car-id="${String(e)}"]`,n=document.querySelector(t);if(!n)throw Error(`Node is not found: ${t}`);if(!(n instanceof HTMLSpanElement))throw TypeError(`Node is not found ${t}`);return n},addFinishCrushAnimation(e){f.getFlag(e).classList.add(`car__finish-flag--crush`)},addFinishSuccessAnimation(e){f.getFlag(e).classList.add(`car__finish-flag--success`)},removeFinishAnimation(e){f.getFlag(e).classList.remove(`car__finish-flag--crush`,`car__finish-flag--success`)}},p={idGarageContent:`garage_content`,localStoragePage:`async_race__selected_page`,async render(e,t){let n=`#${p.idGarageContent}`,r=document.querySelector(n);if(!r){console.info(`Node is not found: ${n}`);return}r.innerHTML=`Loading...`;let{CARS:i,TOTAL_COUNT:a}=await _.getPagination(e,t);p.savePage(e),r.innerHTML=`
      <div>Garage (${a})</div> <div>Page #${e}</div>
      <div class="${p.idGarageContent}__cars scroll">
        ${i.map(e=>`
            <div class="car__element">
              <div>
                ${u.render(e.id)}
                ${c.render(e.id)}
                ${e.id} ${e.name}
              </div>
              <button class="btn btn-sm btn-success" data-button-car-start="${e.id}">A</button>
              <button class="btn btn-sm btn-danger" data-button-car-stop="${e.id}" disabled="true">B</button>
              <div class="garage_content__car_road" data-car-image="${e.id}">
                ${o.render(e.color)}
                ${f.render(e.id)}
              </div>
              <div data-car-css="${e.id}"></div>
            </div>
          `).join(``)}
      </div>
    `,i.length===0&&(r.innerHTML=`No cars`),await p.componentDidMount(i,e,t,a),p.addEventForCars(i)},addEventForCars(e){for(let t of e){let e=String(t.id);document.querySelector(`button[data-button-car-start="${CSS.escape(e)}"]`)?.addEventListener(`click`,async()=>await p.startCar(t.id)),document.querySelector(`button[data-button-car-stop="${CSS.escape(e)}"]`)?.addEventListener(`click`,async()=>await p.stopEngine(t.id))}},_startCar_before(e){p.removeDtp(e),p.removeAnimate(e),f.removeFinishAnimation(e),p.disableA(e),p.enableB(e)},async startCar(e){try{p._startCar_before(e);let n=await t.engineStart(e),r=n.distance/1e3/n.velocity;p.addAnimate(e,r);let i=p.getB(e);try{if(i.disabled)return 9999999;await t.engineDrive(e)}catch(t){return i.disabled||p._startCar_onCrush(t,e),9999999}return i.disabled?9999999:(f.addFinishSuccessAnimation(e),r)}catch(e){return console.info(`Error start car`,e),9999999}},_startCar_ifEngineNotFound(e){throw f.removeFinishAnimation(e),Error(`Engine not started for car ${e}`)},_startCar_onCrush(e,t){e instanceof Error&&e.message==`HTTP 404`&&p._startCar_ifEngineNotFound(t),console.info(`Car not finished - car is crushed`),f.addFinishCrushAnimation(t),p.addDtp(t)},getLeftProcent(e){let t=p.getRoadElement(e),n=p.getCarElement(e),r=globalThis.getComputedStyle(t).width,i=globalThis.getComputedStyle(n).left,a=Number(r.replace(`px`,``)),o=Number(i.replace(`px`,``))*100/a;return console.log(`Crush for cardId='${e} on ${o}%'`),n.style.left=`${o}%`,o},getRoadElement(e){let t=`div[data-car-image="${e}"]`,n=document.querySelector(t);if(!n)throw Error(`Node is not found ${t}`);if(!(n instanceof HTMLElement))throw TypeError(`Node is not found ${t}`);return n},getCarElement(e){let t=`div[data-car-image="${e}"] .car__wrapper`,n=document.querySelector(t);if(!n)throw Error(`Node is not found ${t}`);if(!(n instanceof HTMLElement))throw TypeError(`Node is not found ${t}`);return n},removeDtp(e){let t=p.getCarElement(e);t.dataset.dtp=`false`,t.style.left=``},addDtp(e){let t=p.getCarElement(e);t.dataset.dtp=`true`;let n=p.getLeftProcent(e);t.setAttribute(`title`,`Crush on ${n}%`.replaceAll(`"`,`'`)),p.removeAnimate(e)},removeAnimate(e){p.getCarElement(e).classList.remove(`animate--${e}`)},addAnimate(e,t){let n=`div[data-car-css="${CSS.escape(String(e))}"]`,r=document.querySelector(n);if(!r)throw Error(`Node is not found ${n}`);r instanceof HTMLElement&&(r.innerHTML=`
            <style>
            .garage_content__car_road .car__wrapper.animate--${e} {
              animation: moveRight ${t}s linear forwards;
            }
            </style>
          `),p.getCarElement(e).classList.add(`animate--${e}`)},async resetRace(e,t){let n=`#reset_race`,r=document.querySelector(n);if(!r){console.info(`Node is not found: ${n}`);return}r.setAttribute(`disabled`,`true`),r.innerHTML=`Reset race (loading...)`;let{CARS:i}=await _.getPagination(e,t),a=i.map(async e=>{let t=e.id;p.stopEngine(t)});await Promise.all(a),r.innerHTML=`Reset race`,r.removeAttribute(`disabled`)},async startRace(e,t){let n=`#start_race`,r=document.querySelector(n);if(!r){console.info(`Node is not found: ${n}`);return}r.setAttribute(`disabled`,`true`),r.innerHTML=`Start race (loading...)`;let{CARS:i}=await _.getPagination(e,t),a=[],o=i.map(async e=>{let t=e.id;return{carId:t,time:await p.startCar(t)}}),s=await Promise.all(o);a.push(...s);let c=9999999;for(let e of a)e.time<c&&(c=e.time);let l=p._start_race__getArrayWinners(c,i,a);p._start_race__saveWinner(l,c),p._start_race__alert(c,l,a,i),r.innerHTML=`Start race`,r.removeAttribute(`disabled`)},_start_race__getArrayWinners(e,t,n){let r=[];if(e==9999999)return r;for(let i of n)if(i.time==e)for(let e of t)e.id===i.carId&&r.push(e);return r},async _start_race__saveWinner(e,t){for(let r of e){let e=r.id;try{let r=await n.getById(e),i=Math.min(r.time,t);await n.update({wins:r.wins+1,time:i},e)}catch(r){console.info(`Car not found for update`,r),await n.create({id:e,time:t,wins:1})}}},getFormatedTime(e){return(Math.round(e*100)/100).toFixed(2)},_start_race__alert(e,t,n,r){if(e==9999999){alert(`nothing not win race because cars crush`);return}let i=[`Winner:
`,t.map(t=>`${p.getFormatedTime(e)}s - [id=${t.id}] ${t.name} (color ${t.color})`).join(`
`),`
`,`Cars in race:
`,n.toSorted((e,t)=>e.time-t.time).map(e=>{for(let t of r)if(t.id==e.carId)return`${p.getFormatedTime(e.time)}s [id=${e.carId}] ${t.name} (color ${t.color})`;return`${p.getFormatedTime(e.time)}s [id=${e.carId}]`}).join(`
`)].join(``);console.log(i),alert(i)},async stopEngine(e){p.disableA(e),p.disableB(e),await t.engineStopped(e),p.removeDtp(e),p.enableA(e),p.disableB(e),p.removeAnimate(e),f.removeFinishAnimation(e)},getA(e){let t=String(e),n=`button[data-button-car-start="${CSS.escape(t)}"]`,r=document.querySelector(n);if(!r)throw Error(`Node is not found: ${n}`);if(!(r instanceof HTMLButtonElement))throw TypeError(`Node is not found ${n}`);return r},disableA(e){p.getA(e).setAttribute(`disabled`,`true`)},enableA(e){p.getA(e).removeAttribute(`disabled`)},getB(e){let t=String(e),n=`button[data-button-car-stop="${CSS.escape(t)}"]`,r=document.querySelector(n);if(!r)throw Error(`Node is not found: ${n}`);if(!(r instanceof HTMLButtonElement))throw TypeError(`Node is not found ${n}`);return r},disableB(e){p.getB(e).setAttribute(`disabled`,`true`)},enableB(e){p.getB(e).removeAttribute(`disabled`)},getPage(){return Number(localStorage.getItem(p.localStoragePage)||1)||1},savePage(e){localStorage.setItem(p.localStoragePage,String(e))},fixPage(e,t,n){let i=r.getLastPage(n,t);e>i&&(p.savePage(i),p.render(i,t)),e<0&&(p.savePage(1),p.render(1,t))},async componentDidMount(e,t,n,r){v.init(),l.init();for(let t of e)u.init(t.id),c.init(t.id);document.querySelector(`#generate_cars`)?.addEventListener(`click`,_.generageRandom100Cars),document.querySelector(`#reset_race`)?.addEventListener(`click`,async()=>await p.resetRace(t,n)),document.querySelector(`#start_race`)?.addEventListener(`click`,async()=>await p.startRace(t,n)),await s.render(t,n,r),p.fixPage(t,n,r)}},m={getRandomColor(){let e=`#`;for(let t=0;t<6;t++)e+=`0123456789ABCDEF`[Math.floor(Math.random()*16)];return e}},h={random_from_a_to_b(e,t){return Math.ceil(Math.random()*(t-e)+e)}},g={Tesla:[`Cyber`,`Ludicrous`,`Plaid`,`Space`,`Nova`,`Photon`,`Volt`,`Neon`,`Apex`,`Nexus`],BMW:[`M Sport`,`Dynamic`,`Elite`,`Vantage`,`X Drive`,`Pure`,`Sprint`,`Turbo`,`Premium`,`Evolution`],Mersedes:[`AMG`,`Elite`,`V8`,`Kompressor`,`Avantgarde`,`Sport`,`Luxury`,`Estate`,`Coupe`,`Sprint`],Ford:[`Raptor`,`SVT`,`Cobra`,`Boss`,`King`,`Titan`,`Wild`,`Maverick`,`Outlaw`,`Safari`],Audi:[`Quattro`,`S Line`,`RS`,`e-tron`,`Vorsprung`,`Sport`,`Elite`,`Progress`,`Advance`,`Motion`],Toyota:[`TRD`,`Hybrid`,`Supra`,`Off-Road`,`Sport`,`Luxury`,`Adventure`,`Touring`,`GR`,`Apex`],Honda:[`Type R`,`Sport`,`Touring`,`Hybrid`,`Performance`,`Elite`,`Si`,`Adventure`,`S-Tech`,`V-TEC`],Nissan:[`GT-R`,`Nismo`,`Sport`,`Elite`,`Pro-4X`,`Titan`,`Z`,`Skyline`,`Adventure`,`Performance`],Chevrolet:[`SS`,`ZR1`,`Z06`,`RST`,`LTZ`,`Sport`,`Performance`,`Trail`,`High Country`,`Bolt`],Volkswagen:[`R-Line`,`GTI`,`TDI`,`Sport`,`4Motion`,`Comfort`,`Sprint`,`Elite`,`Atlas`,`Taos`],Porsche:[`Turbo`,`S`,`GTS`,`RS`,`Targa`,`Carrera`,`Cayman`,`Boxster`,`Panamera`,`Taycan`],Ferrari:[`Scuderia`,`Spider`,`GTB`,`GTS`,`Special`,`Stradale`,`Pista`,`Assetto`,`Competizione`,`Challenge`],Lamborghini:[`SV`,`Spyder`,`Performante`,`Superleggera`,`Edizione`,`Nero`,`Giallo`,`Verde`,`Arancio`,`Bianco`],Maserati:[`GranSport`,`GranTurismo`,`S`,`Trofeo`,`Ghibli`,`Levante`,`MC`,`Racing`,`Sport`,`Luxury`],Bugatti:[`SuperSport`,`Pur Sport`,`Vitesse`,`Grand Sport`,`Sang Noir`,`Rembrandt`,`L'Or Blanc`,`La Voiture Noire`,`Centodieci`,`Divo`],"Aston Martin":[`Vantage`,`Vanquish`,`Rapide`,`DBS`,`Valkyrie`,`Valhalla`,`DB11`,`Volante`,`Q`,`Shadow`],Jaguar:[`SVR`,`R-Dynamic`,`Sport`,`Luxury`,`Performance`,`Black`,`Elegance`,`Portfolio`,`XKR`,`Supercharged`],"Land Rover":[`Autobiography`,`Sport`,`HSE`,`Vogue`,`SV`,`AWD`,`Adventure`,`Premium`,`Evoque`,`Defender`],Volvo:[`R-Design`,`Inscription`,`T8`,`Momentum`,`Polestar`,`Excellence`,`Ocean`,`Fusion`,`Thunder`,`Aurora`],Subaru:[`STI`,`WRX`,`Sport`,`Touring`,`Wilderness`,`XT`,`Premium`,`Limited`,`GT`,`Adventure`]},_={async getPagination(e,t){let n=`http://localhost:3000/garage/?_page=${e}&_limit=${t}`,r=await fetch(n),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return{CARS:await r.json(),TOTAL_COUNT:Number(r.headers.get(`x-total-count`))}},async getById(e){let t=`http://localhost:3000/garage/${e}`,n=await fetch(t),r=n.status;if(r!==200)throw Error(`HTTP ${r}`);return await n.json()},async create(e){let t=await fetch(`http://localhost:3000/garage/`,{method:`POST`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),n=t.status;if(n!==201)throw Error(`HTTP ${n}`);return await t.json()},async remove(e){let t=`http://localhost:3000/garage/${e}`,n=(await fetch(t,{method:`DELETE`})).status;if(n!==200)throw Error(`HTTP ${n}`)},async update(e,t){let n=`http://localhost:3000/garage/${t}`,r=await fetch(n,{method:`PUT`,body:JSON.stringify(e),headers:{"Content-Type":`application/json`}}),i=r.status;if(i!==200)throw Error(`HTTP ${i}`);return await r.json()},async generageRandom100Cars(){this.setAttribute(`disabled`,`true`),this.innerHTML=`Generate cars (loading...)`;let t=g,n=Object.keys(t);for(let e=1;e<=100;e++){let e=n[h.random_from_a_to_b(0,n.length-1)],r=t[e],i={name:`${e}-${r[h.random_from_a_to_b(0,r.length-1)]}`,color:m.getRandomColor()};await _.create(i)}await y.render(p.getPage(),e.limitCars),this.removeAttribute(`disabled`),this.innerHTML=`Generate cars`}},v={idForm:`create_car_form`,localStorageKey:`async_race__car_create_data`,idNameInput:`create_car__name_input`,idColorInput:`create_car__color_input`,render(){let e=v.getCreateData();return`
      <form id="${v.idForm}">
        <label
          for="${v.idNameInput}"
        >
          Name:
        </label>
        <input
          id="${v.idNameInput}"
          type="text"
          name="name"
          value="${e.name}"
        >
        <label
          for="${v.idColorInput}"
        >
          Color:
        </label>
        <input
          id="${v.idColorInput}"  
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
    `},init(){let e=document.querySelector(`#${v.idForm}`);if(!e){console.info(`Node not found: #${v.idForm}`);return}e.addEventListener(`submit`,v.onSubmit);let t=document.querySelector(`#${v.idNameInput}`);if(!t){console.info(`Node not found: #${v.idNameInput}`);return}t.addEventListener(`input`,function(){v.setName(this.value)});let n=document.querySelector(`#${v.idColorInput}`);if(!n){console.info(`Node not found: #${v.idColorInput}`);return}n.addEventListener(`input`,function(){v.setColor(this.value)})},async onSubmit(t){t.preventDefault();let n=t.target;if(!(n instanceof HTMLFormElement))return;let r=new FormData(n),i={name:r.get(`name`)?.toString()||`Unnamed car`,color:r.get(`color`)?.toString()||`#000000`};console.log(`Try to create car`,i);let a=await _.create(i);console.log(`Created car`,a),await y.render(p.getPage(),e.limitCars)},getCreateData(){let e=localStorage.getItem(v.localStorageKey),t={name:``,color:``};if(e)try{let n=JSON.parse(e);typeof n==`object`&&n&&`name`in n&&typeof n.name==`string`&&(t.name=n.name),typeof n==`object`&&n&&`color`in n&&typeof n.color==`string`&&(t.color=n.color)}catch(e){console.info(`State manager error`,e)}return localStorage.setItem(v.localStorageKey,JSON.stringify(t)),t},setName(e){let t=v.getCreateData();t.name=e,localStorage.setItem(v.localStorageKey,JSON.stringify(t))},setColor(e){let t=v.getCreateData();t.color=e,localStorage.setItem(v.localStorageKey,JSON.stringify(t))}},y={async render(e,t){let n=`#${C.idContent}`,r=document.querySelector(n);if(!r){console.log(`Node is not found: ${n}`);return}try{r.innerHTML=`
        ${v.render()}
        ${l.render()}
        <div>
          ${y.getHtmlStartRaceButton()}
          ${y.getHtmlResetRaceButton()}
          ${y.getHtmlGenerateRandom100CarsButton()}
        </div>
        <div id="${p.idGarageContent}"></div>
        <div id="${s.idPaginationContainer}"></div>
      `,await p.render(e,t)}catch(e){r.innerHTML=`
        <div>${e}</div>
      `}},getHtmlStartRaceButton(){return`
      <button
        class="btn btn-sm btn-success"
        id="start_race"
      >
        Start race
      </button>
    `},getHtmlResetRaceButton(){return`
      <button
        class="btn btn-sm btn-danger"
        id="reset_race"
      >
        Reset race
      </button>
    `},getHtmlGenerateRandom100CarsButton(){return`
      <button
        class="btn btn-sm btn-primary"
        id="generate_cars"
        title="Generate random 100 cars"
      >
        Generate cars
      </button>
    `}},b={idContainer:`winners_pagination`,async render(e,t,n){let i=`#${b.idContainer}`,a=document.querySelector(i);if(!a){console.info(`Node is not found: ${i}`);return}a.innerHTML=`Loading...`;let o=r.getLastPage(n,t);if(o===0){a.replaceChildren(``);return}a.innerHTML=`
      <button class="btn btn-primary" id="pagination_prev_button" ${e<=1?`disabled`:``}>Prev</button>
      <button class="btn btn-primary" id="pagination_next_button" ${e>=o?`disabled`:``}>Next</button>
      Page:
      <select id="pagination_select" class="btn" style="border-color: var(--primary-border-color);">
        ${Array.from({length:o},(t,n)=>{let r=n+1;return`<option value="${r}" ${r===e?`selected`:``}>${r}</option>`}).join(``)}
      </select>
      <span>Limit: ${t}</span>
    `,b.addListenerPrevButton(e,t),b.addListenerNextButton(e,t),b.addListenerSelect(t)},addListenerPrevButton(e,t){document.querySelector(`#pagination_prev_button`)?.addEventListener(`click`,async()=>await S.render(e-1,t))},addListenerNextButton(e,t){document.querySelector(`#pagination_next_button`)?.addEventListener(`click`,async()=>await S.render(e+1,t))},addListenerSelect(e){document.querySelector(`#pagination_select`)?.addEventListener(`change`,async t=>{let n=t.target;if(n instanceof HTMLSelectElement){let t=parseInt(n.value);await S.render(t,e)}})}},x={idContent:`winners_content`,localStoragePage:`async_race__winners_selected_page`,async render(e,t,r){let i=`#${x.idContent}`,a=document.querySelector(i);if(!a){console.info(`Node is not found: ${i}`);return}a.innerHTML=`Loading...`;let{WINNERS:o,TOTAL_COUNT:s}=await n.getPagination(e,t,r);x.savePage(e),a.innerHTML=await x._render_getHtml(s,o,e,r),await x.componentDidMount(e,t,s,r)},async _render_getHtml(e,t,r,i){return`
      <div class="winners__table_container scroll">
        <div>Winners (${e})</div>
        <div>Page #${r}</div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th width="120" class="winners__th">
                Number
                ${x.getSortButton(0,i,n.paginationTypeSort.idDesc,`winners_sort_id_desc_button`)}
                ${x.getSortButton(1,i,n.paginationTypeSort.idAsc,`winners_sort_id_asc_button`)}
              </th>
              <th width="70">Car</th>
              <th>Name</th>
              <th width="100" class="winners__th">
                Wins
                ${x.getSortButton(0,i,n.paginationTypeSort.winsDesc,`winners_sort_wins_desc_button`)}
                ${x.getSortButton(1,i,n.paginationTypeSort.winsAsc,`winners_sort_wins_asc_button`)}
              </th>
              <th width="200" class="winners__th">
                Best time (seconds)
                ${x.getSortButton(0,i,n.paginationTypeSort.timeDesc,`winners_sort_time_desc_button`)}
                ${x.getSortButton(1,i,n.paginationTypeSort.timeAsc,`winners_sort_time_asc_button`)}
              </th>
            </tr>
          </thead>
          ${await x.renderTbody(t)}
        </table>
      </div>
    `},getSortButton(e,t,n,r){return`
      <button
        class="btn btn-sm btn-primary ${e==0?`winners__button_top`:`winners__button_bottom`}"
        id="${r}"
        ${t==n?`disabled`:``}
      >
        ${e==0?`↑`:`↓`}
      </button>
    `},async renderTbody(e){return`
      <tbody>
        ${(await Promise.all(e.map(async e=>{try{let t=await _.getById(e.id);return`
            <tr>
              <td align="right">${e.id}</td>
              <td align="center">${o.render(t.color)}</td>
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
    `},getPage(){return Number(localStorage.getItem(x.localStoragePage)||1)||1},savePage(e){localStorage.setItem(x.localStoragePage,String(e))},fixPage(e,t,n,i){let a=r.getLastPage(n,t);e>a&&(x.savePage(a),x.render(a,t,i)),e<0&&(x.savePage(1),x.render(1,t,i))},async componentDidMount(e,t,r,i){await b.render(e,t,r),x.fixPage(e,t,r,i),document.querySelector(`#winners_sort_id_asc_button`)?.addEventListener(`click`,()=>S.render(e,t,n.paginationTypeSort.idAsc)),document.querySelector(`#winners_sort_id_desc_button`)?.addEventListener(`click`,()=>S.render(e,t,n.paginationTypeSort.idDesc)),document.querySelector(`#winners_sort_wins_asc_button`)?.addEventListener(`click`,()=>S.render(e,t,n.paginationTypeSort.winsAsc)),document.querySelector(`#winners_sort_wins_desc_button`)?.addEventListener(`click`,()=>S.render(e,t,n.paginationTypeSort.winsDesc)),document.querySelector(`#winners_sort_time_asc_button`)?.addEventListener(`click`,()=>S.render(e,t,n.paginationTypeSort.timeAsc)),document.querySelector(`#winners_sort_time_desc_button`)?.addEventListener(`click`,()=>S.render(e,t,n.paginationTypeSort.timeDesc))}},S={async render(e,t,n=0){let r=`#${C.idContent}`,i=document.querySelector(r);if(!i){console.log(`Node is not found: ${r}`);return}try{i.innerHTML=`
        <div id="${x.idContent}"></div>
        <div id="${b.idContainer}"></div>
      `,await x.render(e,t,n)}catch(e){i.innerHTML=`
        <div>${e}</div>
      `}}},C={idRoot:`app`,idContent:`content`,async render(){let t=`#${C.idRoot}`,n=document.querySelector(t);if(!n){console.info(`Node is not found: ${t}`);return}try{n.innerHTML=`
        <div>
          <button class="btn btn-sm btn-primary" id="garage_render">To garage</button>
          <button class="btn btn-sm btn-primary" id="winner_render">To winners</button>
        </div>
        <div id="${C.idContent}"></div>
      `,document.querySelector(`#garage_render`)?.addEventListener(`click`,async()=>y.render(p.getPage(),e.limitCars)),document.querySelector(`#winner_render`)?.addEventListener(`click`,()=>S.render(x.getPage(),e.limitWinners)),await y.render(p.getPage(),e.limitCars)}catch(e){n.innerHTML=`
        <div style='color: red;'>
          ${e}
        </div>
      `}}};try{C.render()}catch(e){console.info(`App is crushed`,e)}