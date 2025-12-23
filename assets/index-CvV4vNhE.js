var V=a=>{throw TypeError(a)};var R=(a,e,t)=>e.has(a)||V("Cannot "+t);var d=(a,e,t)=>(R(a,e,"read from private field"),t?t.call(a):e.get(a)),f=(a,e,t)=>e.has(a)?V("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,t),v=(a,e,t,o)=>(R(a,e,"write to private field"),o?o.call(a,t):e.set(a,t),t),m=(a,e,t)=>(R(a,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const ie="modulepreload",re=function(a){return"/story-app-pwa/"+a},W={},_=function(e,t,o){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),r=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(t.map(c=>{if(c=re(c),c in W)return;W[c]=!0;const l=c.endsWith(".css"),p=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const y=document.createElement("link");if(y.rel=l?"stylesheet":ie,l||(y.as="script"),y.crossOrigin="",y.href=c,r&&y.setAttribute("nonce",r),document.head.appendChild(y),l)return new Promise((L,h)=>{y.addEventListener("load",L),y.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return s.then(i=>{for(const r of i||[])r.status==="rejected"&&n(r.reason);return e().catch(n)})};class ce{async render(){return`
      <section class="hero-section">
        <div class="container">
          <h1>Welcome to Story App</h1>
          <p>Share your travel stories and discover amazing places around the world.</p>
          <div class="hero-actions">
            <a href="#/stories" class="cta-button">View Stories</a>
            <a href="#/login" class="cta-button secondary">Login</a>
            <a href="#/register" class="cta-button secondary">Register</a>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="container">
          <h2>App Settings</h2>
          <div class="settings-grid">
            <div class="setting-card" id="push-notification-card">
              <h3><i data-lucide="bell" class="setting-icon"></i> Push Notifications</h3>
              <p id="push-description">Receive notifications when new stories are added.</p>
              <div class="setting-toggle" id="push-toggle-container">
                <label class="switch">
                  <input type="checkbox" id="push-notification-toggle">
                  <span class="slider round"></span>
                </label>
                <span class="toggle-status" id="push-status">Disabled</span>
              </div>
              <div class="login-required" id="login-required-message" style="display: none;">
                <p class="login-prompt">Please <a href="#/login">login</a> first to enable push notifications.</p>
              </div>
            </div>
            <div class="setting-card" id="pwa-install-card" style="display: none;">
              <h3><i data-lucide="download" class="setting-icon"></i> Install App</h3>
              <p>Install this app on your device for a better experience.</p>
              <button class="install-button" id="install-button">
                <i data-lucide="smartphone" class="button-icon"></i>
                Install App
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <h2>Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <h3><i data-lucide="map-pin" class="feature-icon"></i> Location Stories</h3>
              <p>Share your stories with location data and see them on an interactive map.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="camera" class="feature-icon"></i> <span class="title-text">Photo<br>Upload</span></h3>
              <p>Upload photos from your gallery or capture directly with your camera.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="map" class="feature-icon"></i> Interactive Maps</h3>
              <p>Explore stories on an interactive map with multiple view options.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="smartphone" class="feature-icon"></i> Responsive Design</h3>
              <p>Access your stories seamlessly across all devices.</p>
            </div>
          </div>
        </div>
      </section>
    `}async afterRender(){window.lucide&&window.lucide.createIcons();const{initPushNotification:e}=await _(async()=>{const{initPushNotification:n}=await import("./push-notification-DHMInCx7.js");return{initPushNotification:n}},[]);await e();const{initPWAInstall:t,canInstallPWA:o,showInstallPrompt:s}=await _(async()=>{const{initPWAInstall:n,canInstallPWA:i,showInstallPrompt:r}=await import("./pwa-install-0YDuBu7B.js");return{initPWAInstall:n,canInstallPWA:i,showInstallPrompt:r}},[]);t(),this.initPushNotificationToggle(),this.initPWAInstall()}async initPushNotificationToggle(){const e=document.getElementById("push-toggle-container"),t=document.getElementById("push-notification-toggle"),o=document.getElementById("push-status"),s=document.getElementById("login-required-message");if(!e||!t||!o||!s)return;if(!!!localStorage.getItem("token")){e.style.display="none",s.style.display="block";return}e.style.display="flex",s.style.display="none";const{isPushNotificationEnabled:r,togglePushNotification:c}=await _(async()=>{const{isPushNotificationEnabled:l,togglePushNotification:p}=await import("./push-notification-DHMInCx7.js");return{isPushNotificationEnabled:l,togglePushNotification:p}},[]);t.checked=r(),o.textContent=t.checked?"Enabled":"Disabled",t.addEventListener("change",async()=>{try{o.textContent="Processing...",t.disabled=!0;const l=await c();t.checked=l,o.textContent=l?"Enabled":"Disabled",console.log("Push notification toggle successful, enabled:",l)}catch(l){console.error("Failed to toggle push notifications:",l),t.checked=!t.checked;let p="Failed to toggle push notifications.";l.message.includes("VAPID key")?p+=" Please check your internet connection.":l.message.includes("permission")?p+=" Please allow notifications in your browser.":l.message.includes("token")?p+=" Please login again.":p+=" Please try again.",alert(p),o.textContent="Disabled"}finally{t.disabled=!1}})}async initPWAInstall(){const e=document.getElementById("pwa-install-card"),t=document.getElementById("install-button");if(!e||!t)return;const{canInstallPWA:o,showInstallPrompt:s,isPWAInstallable:n}=await _(async()=>{const{canInstallPWA:i,showInstallPrompt:r,isPWAInstallable:c}=await import("./pwa-install-0YDuBu7B.js");return{canInstallPWA:i,showInstallPrompt:r,isPWAInstallable:c}},[]);o()&&(e.style.display="block"),window.addEventListener("pwa-installable",i=>{i.detail.installable&&(e.style.display="block")}),t.addEventListener("click",async()=>{try{await s()&&(e.style.display="none",console.log("PWA installed successfully"))}catch(i){console.error("Failed to install PWA:",i)}}),window.addEventListener("pwa-installed",()=>{e.style.display="none"})}}class le{async render(){return`
      <section class="container">
        <h1>About Page</h1>
      </section>
    `}async afterRender(){}}const T={BASE_URL:"https://story-api.dicoding.dev/v1"},I={STORIES:`${T.BASE_URL}/stories`,REGISTER:`${T.BASE_URL}/register`,LOGIN:`${T.BASE_URL}/login`};async function H(){const a={},e=localStorage.getItem("token");e&&(a.Authorization=`Bearer ${e}`);const t=await fetch(I.STORIES,{headers:a}),o=await t.json();if(!t.ok)throw new Error(o.message||"Failed to fetch stories");return o.listStory||[]}async function Z(a){const e=await fetch(I.STORIES,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:a}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to add story");return t}async function de(a){const e=[`${I.STORIES}/${a}`,`${T.BASE_URL}/story/${a}`,`${I.STORIES}/delete/${a}`];for(const t of e)try{const o=await fetch(t,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`,"Content-Type":"application/json"},body:JSON.stringify({id:a})});if(o.ok)return await o.json()}catch{}try{const t=await fetch(`${I.STORIES}/delete`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`,"Content-Type":"application/json"},body:JSON.stringify({id:a})});if(t.ok)return await t.json()}catch{}throw new Error("Delete operation not supported by this API")}async function ue(a){const e=await fetch(I.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to register");return t}async function me(a){var o;const e=await fetch(I.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to login");return(o=t.loginResult)!=null&&o.token&&localStorage.setItem("token",t.loginResult.token),t}class pe{async render(){return`
      <section class="auth-section">
        <div class="auth-container">
          <h1>Login</h1>
          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="auth-button">Login</button>
            <p class="auth-link">Don't have an account? <a href="#/register">Register</a></p>
          </form>
          <div id="login-message" class="message" role="alert" aria-live="polite"></div>
        </div>
      </section>
    `}async afterRender(){const e=document.getElementById("login-form"),t=document.getElementById("login-message");e.addEventListener("submit",async o=>{o.preventDefault(),t.textContent="Logging in...";const s=new FormData(e),n={email:s.get("email"),password:s.get("password")};try{await me(n),t.textContent="Login successful! Redirecting...",t.className="message success",setTimeout(()=>{window.location.hash="#/stories"},1e3)}catch(i){t.textContent=i.message,t.className="message error"}})}}class ye{async render(){return`
      <section class="auth-section">
        <div class="auth-container">
          <h1>Register</h1>
          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required minlength="8">
            </div>
            <button type="submit" class="auth-button">Register</button>
            <p class="auth-link">Already have an account? <a href="#/login">Login</a></p>
          </form>
          <div id="register-message" class="message" role="alert" aria-live="polite"></div>
        </div>
      </section>
    `}async afterRender(){const e=document.getElementById("register-form"),t=document.getElementById("register-message");e.addEventListener("submit",async o=>{o.preventDefault(),t.textContent="Registering...";const s=new FormData(e),n={name:s.get("name"),email:s.get("email"),password:s.get("password")};try{await ue(n),t.textContent="Registration successful! Please login.",t.className="message success",setTimeout(()=>{window.location.hash="#/login"},2e3)}catch(i){t.textContent=i.message,t.className="message error"}})}}function U(){if(window.L)return window.L;throw new Error("Leaflet is not loaded. Please ensure the CDN script is included in the HTML.")}const ge="StoryAppDB",he=1,g="stories",G="syncQueue";async function j(){return new Promise((a,e)=>{const t=indexedDB.open(ge,he);t.onerror=()=>{console.error("IndexedDB error:",t.error),e(t.error)},t.onsuccess=()=>{console.log("IndexedDB initialized successfully"),a(t.result)},t.onupgradeneeded=o=>{const s=o.target.result;if(!s.objectStoreNames.contains(g)){const n=s.createObjectStore(g,{keyPath:"id"});n.createIndex("synced","synced",{unique:!1}),n.createIndex("createdAt","createdAt",{unique:!1})}if(!s.objectStoreNames.contains(G)){const n=s.createObjectStore(G,{keyPath:"id",autoIncrement:!0});n.createIndex("type","type",{unique:!1}),n.createIndex("timestamp","timestamp",{unique:!1})}}})}async function A(){if(!window.indexedDB)throw new Error("IndexedDB is not supported");return await j()}async function J(a){try{const o=(await A()).transaction([g],"readwrite").objectStore(g),s={...a,id:a.id||`offline_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,synced:!1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return new Promise((n,i)=>{const r=o.add(s);r.onsuccess=()=>{console.log("Story added to IndexedDB:",s.id),n(s)},r.onerror=()=>{console.error("Failed to add story to IndexedDB:",r.error),i(r.error)}})}catch(e){throw console.error("Error adding story to DB:",e),e}}async function N(){try{const t=(await A()).transaction([g],"readonly").objectStore(g);return new Promise((o,s)=>{const n=t.getAll();n.onsuccess=()=>{const i=n.result||[];console.log("Retrieved stories from IndexedDB:",i.length),o(i)},n.onerror=()=>{console.error("Failed to get stories from IndexedDB:",n.error),s(n.error)}})}catch(a){throw console.error("Error getting stories from DB:",a),a}}async function F(a){try{const o=(await A()).transaction([g],"readonly").objectStore(g);return new Promise((s,n)=>{const i=o.get(a);i.onsuccess=()=>{s(i.result)},i.onerror=()=>{console.error("Failed to get story from IndexedDB:",i.error),n(i.error)}})}catch(e){throw console.error("Error getting story from DB:",e),e}}async function fe(a,e){try{const s=(await A()).transaction([g],"readwrite").objectStore(g),n=await F(a);if(!n)throw new Error("Story not found");const i={...n,...e,updatedAt:new Date().toISOString()};return new Promise((r,c)=>{const l=s.put(i);l.onsuccess=()=>{console.log("Story updated in IndexedDB:",a),r(i)},l.onerror=()=>{console.error("Failed to update story in IndexedDB:",l.error),c(l.error)}})}catch(t){throw console.error("Error updating story in DB:",t),t}}async function q(a){try{const o=(await A()).transaction([g],"readwrite").objectStore(g);return new Promise((s,n)=>{const i=o.delete(a);i.onsuccess=()=>{console.log("Story deleted from IndexedDB:",a),s(!0)},i.onerror=()=>{console.error("Failed to delete story from IndexedDB:",i.error),n(i.error)}})}catch(e){throw console.error("Error deleting story from DB:",e),e}}async function K(a){try{return await fe(a,{synced:!0})}catch(e){throw console.error("Error marking story as synced:",e),e}}async function Q(){try{const o=(await A()).transaction([g],"readonly").objectStore(g).index("synced");return new Promise((s,n)=>{const i=IDBKeyRange.only(!1),r=o.getAll(i);r.onsuccess=()=>{const c=r.result||[];console.log("Retrieved unsynced stories:",c.length),s(c)},r.onerror=()=>{console.error("Failed to get unsynced stories:",r.error),n(r.error)}})}catch(a){throw console.error("Error getting unsynced stories:",a),a}}var w,C,x,B,S,u,O,E,X,Y,ee,te;class ve{constructor(){f(this,u);f(this,w,[]);f(this,C,[]);f(this,x,"newest");f(this,B,"all");f(this,S,"")}async render(){return`
      <section class="stories-section">
        <div class="container">
          <h1>Stories</h1>
          <div class="stories-controls">
            <button id="add-story-btn" class="add-story-button">Add New Story</button>
            <div class="view-toggle">
              <button id="list-view-btn" class="view-button active">List View</button>
              <button id="map-view-btn" class="view-button">Map View</button>
            </div>
          </div>

          <div class="stories-filters">
            <div class="filter-controls">
              <div class="search-box">
                <label for="search-input" class="sr-only">Search stories</label>
                <input type="text" id="search-input" placeholder="Search stories..." aria-label="Search stories">
                <button id="clear-search" class="clear-search-btn" aria-label="Clear search">×</button>
              </div>
              <select id="filter-select" aria-label="Filter stories">
                <option value="all">All Stories</option>
                <option value="synced">Synced Online</option>
                <option value="offline">Offline Only</option>
              </select>
              <select id="sort-select" aria-label="Sort stories">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name</option>
              </select>
              <button id="sync-btn" class="sync-button">Sync Offline Data</button>
            </div>
            <div id="sync-status" class="sync-status"></div>
          </div>

          <div id="list-view" class="stories-list">
            <div id="loading" class="loading">Loading stories...</div>
          </div>

          <div id="map-view" class="stories-map" style="display: none;">
            <div id="map" class="map-container"></div>
          </div>
        </div>
      </section>
    `}async afterRender(){try{await j()}catch(h){console.error("Failed to initialize IndexedDB:",h)}const e=document.getElementById("add-story-btn"),t=document.getElementById("list-view-btn"),o=document.getElementById("map-view-btn"),s=document.getElementById("list-view"),n=document.getElementById("map-view"),i=document.getElementById("loading"),r=document.getElementById("search-input"),c=document.getElementById("clear-search"),l=document.getElementById("filter-select"),p=document.getElementById("sort-select"),y=document.getElementById("sync-btn"),L=document.getElementById("sync-status");e.addEventListener("click",()=>{window.location.hash="#/add-story"}),t.addEventListener("click",()=>{s.style.display="block",n.style.display="none",t.classList.add("active"),o.classList.remove("active")}),o.addEventListener("click",()=>{s.style.display="none",n.style.display="block",o.classList.add("active"),t.classList.remove("active"),m(this,u,te).call(this)}),r.addEventListener("input",h=>{v(this,S,h.target.value.toLowerCase()),m(this,u,E).call(this)}),c.addEventListener("click",()=>{r.value="",v(this,S,""),m(this,u,E).call(this)}),l.addEventListener("change",h=>{v(this,B,h.target.value),m(this,u,E).call(this)}),p.addEventListener("change",h=>{v(this,x,h.target.value),m(this,u,E).call(this)}),y.addEventListener("click",async()=>{await m(this,u,Y).call(this,L)});try{await m(this,u,O).call(this)}catch(h){i.textContent=`Error loading stories: ${h.message}`,i.className="error"}window.addEventListener("syncCompleted",h=>{const{syncedCount:ae,errorCount:Ce}=h.detail;ae>0&&m(this,u,O).call(this)})}}w=new WeakMap,C=new WeakMap,x=new WeakMap,B=new WeakMap,S=new WeakMap,u=new WeakSet,O=async function(){const e=document.getElementById("loading");try{const t=await H(),o=await N(),s=new Map;o.forEach(n=>{s.set(n.id,{...n,source:"offline"})}),t.forEach(n=>{s.set(n.id,{...n,source:"online",synced:!0})}),v(this,w,Array.from(s.values())),m(this,u,E).call(this)}catch(t){console.error("Error loading stories:",t);try{v(this,w,await N()),m(this,u,E).call(this)}catch{e.textContent=`Error loading stories: ${t.message}`,e.className="error"}}},E=function(){let e=[...d(this,w)];d(this,S)&&(e=e.filter(t=>t.name.toLowerCase().includes(d(this,S))||t.description.toLowerCase().includes(d(this,S)))),d(this,B)==="synced"?e=e.filter(t=>t.synced===!0):d(this,B)==="offline"&&(e=e.filter(t=>t.synced===!1)),e.sort((t,o)=>{switch(d(this,x)){case"oldest":return new Date(t.createdAt)-new Date(o.createdAt);case"name":return t.name.localeCompare(o.name);case"newest":default:return new Date(o.createdAt)-new Date(t.createdAt)}}),v(this,C,e),m(this,u,X).call(this)},X=function(){const e=document.getElementById("list-view"),t=d(this,C).map(o=>`
      <article class="story-card" data-story-id="${o.id}">
        <img src="${o.photoUrl}" alt="${o.name}'s story" class="story-image">
        <div class="story-content">
          <div class="story-header">
            <h2>${o.name}</h2>
            <div class="story-badges">
              ${o.synced===!1?'<span class="badge offline">Offline</span>':'<span class="badge synced">Synced</span>'}
            </div>
            <button class="delete-story-btn" data-story-id="${o.id}" aria-label="Delete story">
              <i data-lucide="trash-2" class="delete-icon"></i>
            </button>
          </div>
          <p class="story-description">${o.description}</p>
          <time datetime="${o.createdAt}" class="story-date">
            ${new Date(o.createdAt).toLocaleDateString()}
          </time>
        </div>
      </article>
    `).join("");e.innerHTML=t||"<p>No stories found.</p>",m(this,u,ee).call(this)},Y=async function(e){try{e.textContent="Syncing offline data...",e.className="sync-status syncing";const t=await Q();if(t.length===0){e.textContent="All data is already synced!",e.className="sync-status success",setTimeout(()=>{e.textContent="",e.className="sync-status"},3e3);return}let o=0,s=0;for(const n of t)try{await K(n.id),o++}catch(i){console.error("Failed to sync story:",n.id,i),s++}o>0&&await m(this,u,O).call(this),e.textContent=`Synced ${o} stories${s>0?` (${s} failed)`:""}`,e.className=s===0?"sync-status success":"sync-status warning",setTimeout(()=>{e.textContent="",e.className="sync-status"},5e3)}catch(t){console.error("Sync failed:",t),e.textContent="Sync failed. Please try again.",e.className="sync-status error",setTimeout(()=>{e.textContent="",e.className="sync-status"},5e3)}},ee=function(){document.querySelectorAll(".delete-story-btn").forEach(t=>{t.addEventListener("click",async o=>{o.preventDefault();const s=t.dataset.storyId;if(confirm("Are you sure you want to delete this story? This action cannot be undone."))try{await de(s),await q(s),v(this,w,d(this,w).filter(n=>n.id!==s)),m(this,u,E).call(this)}catch(n){alert(`Failed to delete story: ${n.message}`)}})}),window.lucide&&window.lucide.createIcons()},te=async function(){const e=document.getElementById("map");if(!(!e||e._leaflet_id))try{const t=U(),o=t.map("map").setView([-6.2,106.816666],10),s=t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}),n=t.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"© Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",maxZoom:19}),i=t.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:"© OpenTopoMap contributors",maxZoom:17}),r={OpenStreetMap:s,Satellite:n,Terrain:i};if(s.addTo(o),t.control.layers(r).addTo(o),d(this,w).forEach(c=>{c.lat&&c.lon&&t.marker([c.lat,c.lon]).addTo(o).bindPopup(`
            <div class="popup-content">
              <img src="${c.photoUrl}" alt="${c.name}'s story" class="popup-image">
              <h3>${c.name}</h3>
              <p>${c.description}</p>
            </div>
          `)}),d(this,w).length>0){const c=d(this,w).filter(l=>l.lat&&l.lon).map(l=>[l.lat,l.lon]);c.length>0&&o.fitBounds(c)}setTimeout(()=>{o.invalidateSize()},100)}catch(t){console.error("Error initializing map:",t),e.innerHTML="<p>Error loading map. Please try again.</p>"}};class we{constructor(){this._map=null,this._selectedLat=null,this._selectedLon=null,this._stream=null}async render(){return`
      <section class="add-story-section">
        <div class="container">
          <h1>Add New Story</h1>
          <form id="add-story-form" class="story-form" enctype="multipart/form-data">
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea id="description" name="description" required rows="4"></textarea>
            </div>

            <div class="form-group">
              <label for="photo">Photo:</label>
              <div class="photo-options">
                <input type="file" id="photo" name="photo" accept="image/*" required>
                <button type="button" id="camera-btn" class="camera-button">Use Camera</button>
              </div>
              <div id="camera-container" class="camera-container" style="display: none;">
                <video id="camera-video" autoplay playsinline></video>
                <canvas id="camera-canvas" style="display: none;"></canvas>
                <div class="camera-controls">
                  <button type="button" id="capture-btn">Capture</button>
                  <button type="button" id="cancel-camera-btn">Cancel</button>
                </div>
              </div>
              <img id="photo-preview" class="photo-preview" style="display: none;" alt="Photo preview">
            </div>

            <div class="form-group">
              <label for="location-map">Location (Click on map to select):</label>
              <div id="location-map" class="location-map" tabindex="0" role="img" aria-label="Interactive map for selecting location coordinates"></div>
              <div id="coordinates-display" class="coordinates-display">
                Selected: <span id="coords">None</span>
              </div>
              <p class="map-instruction">Click anywhere on the map to select coordinates for your story location.</p>
            </div>

            <button type="submit" class="submit-button">Add Story</button>
            <button type="button" id="cancel-btn" class="cancel-button">Cancel</button>
          </form>
          <div id="form-message" class="message" role="alert" aria-live="polite"></div>
        </div>
      </section>
    `}async afterRender(){try{await j()}catch(e){console.error("Failed to initialize IndexedDB:",e)}this._initializeMap(),this._setupFormValidation(),this._setupCamera(),this._setupFormSubmission()}_initializeMap(){const e=document.getElementById("location-map");if(!e){console.error("Map element not found");return}e.style.height="300px",e.style.width="100%",this._map&&this._map.remove();try{const t=U();this._map=t.map("location-map",{center:[-6.2,106.816666],zoom:10,zoomControl:!0,attributionControl:!0});const o=t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}),s=t.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"© Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",maxZoom:19});o.addTo(this._map);let n=null;this._map.on("click",i=>{console.log("Map clicked:",i.latlng);const{lat:r,lng:c}=i.latlng;this._selectedLat=r,this._selectedLon=c,n&&this._map.removeLayer(n),n=t.marker([r,c]).addTo(this._map);const l=document.getElementById("coords");l&&(l.textContent=`${r.toFixed(6)}, ${c.toFixed(6)}`)}),setTimeout(()=>{this._map.invalidateSize()},100)}catch(t){console.error("Failed to initialize map:",t),e.innerHTML="<p>Map could not be loaded. Please refresh the page.</p>";return}}_setupFormValidation(){const e=document.getElementById("description"),t=document.getElementById("photo"),o=document.getElementById("photo-preview");e.addEventListener("input",()=>{e.value.trim().length<10?e.setCustomValidity("Description must be at least 10 characters long"):e.setCustomValidity("")}),t.addEventListener("change",s=>{const n=s.target.files[0];if(n){if(!n.type.startsWith("image/")){t.setCustomValidity("Please select an image file");return}if(n.size>1024*1024){t.setCustomValidity("File size must be less than 1MB");return}t.setCustomValidity("");const i=new FileReader;i.onload=r=>{o.src=r.target.result,o.style.display="block"},i.readAsDataURL(n)}})}_setupCamera(){const e=document.getElementById("camera-btn"),t=document.getElementById("camera-container"),o=document.getElementById("camera-video"),s=document.getElementById("camera-canvas"),n=document.getElementById("capture-btn"),i=document.getElementById("cancel-camera-btn"),r=document.getElementById("photo"),c=document.getElementById("photo-preview");e.addEventListener("click",async()=>{try{this._stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),o.srcObject=this._stream,t.style.display="block",r.style.display="none",e.style.display="none"}catch{alert("Camera access denied or not available")}}),n.addEventListener("click",()=>{const l=s.getContext("2d");s.width=o.videoWidth,s.height=o.videoHeight,l.drawImage(o,0,0),s.toBlob(p=>{const y=new File([p],"camera-photo.jpg",{type:"image/jpeg"}),L=new DataTransfer;L.items.add(y),r.files=L.files,c.src=s.toDataURL("image/jpeg"),c.style.display="block",this._stopCamera()},"image/jpeg")}),i.addEventListener("click",()=>{this._stopCamera()})}_stopCamera(){this._stream&&(this._stream.getTracks().forEach(e=>e.stop()),this._stream=null),document.getElementById("camera-container").style.display="none",document.getElementById("photo").style.display="block",document.getElementById("camera-btn").style.display="inline-block"}_setupFormSubmission(){const e=document.getElementById("add-story-form"),t=document.getElementById("cancel-btn"),o=document.getElementById("form-message");t.addEventListener("click",()=>{window.location.hash="#/stories"}),e.addEventListener("submit",async s=>{if(s.preventDefault(),!this._selectedLat||!this._selectedLon){o.textContent="Please select a location on the map",o.className="message error";return}o.textContent="Adding story...",o.className="message";const n=new FormData(e);n.append("lat",this._selectedLat),n.append("lon",this._selectedLon);try{await Z(n),o.textContent="Story added successfully!",o.className="message success",setTimeout(()=>{window.location.hash="#/stories"},1e3)}catch(i){console.error("Failed to add story online:",i);try{o.textContent="Connection failed. Saving offline...",o.className="message";const r=n.get("photo"),c=new FileReader;c.onload=async l=>{const p={name:"Offline User",description:n.get("description"),photoUrl:l.target.result,createdAt:new Date().toISOString(),lat:this._selectedLat,lon:this._selectedLon};try{await J(p),o.textContent="Story saved offline! It will sync when you're back online.",o.className="message success",setTimeout(()=>{window.location.hash="#/stories"},2e3)}catch(y){console.error("Failed to save story offline:",y),o.textContent="Failed to save story both online and offline. Please try again.",o.className="message error"}},c.onerror=()=>{o.textContent="Failed to process image. Please try again.",o.className="message error"},c.readAsDataURL(r)}catch(r){console.error("Offline fallback failed:",r),o.textContent="Failed to save story. Please check your connection and try again.",o.className="message error"}}})}}var P,oe,ne;class be{constructor(){f(this,P);this.storyId=null,this.story=null}async render(){const t=window.location.hash.match(/#\/story\/([^\/]+)/);return t?(this.storyId=t[1],`
      <section class="story-detail-section">
        <div class="container">
          <div class="detail-actions">
            <button id="back-btn" class="back-button">← Back to Stories</button>
            <button id="save-offline-btn" class="save-button" style="display: none;">Save for Offline</button>
            <button id="delete-offline-btn" class="delete-button" style="display: none;">Delete Offline Story</button>
          </div>
          <div id="story-content" class="story-content">
            <div class="loading">Loading story...</div>
          </div>
        </div>
      </section>
    `):"<p>Invalid story URL</p>"}async afterRender(){const e=document.getElementById("back-btn"),t=document.getElementById("story-content"),o=document.getElementById("save-offline-btn"),s=document.getElementById("delete-offline-btn");e.addEventListener("click",()=>{window.location.hash="#/stories"});try{try{const n=await H();this.story=n.find(i=>i.id===this.storyId)}catch{console.log("API not available, trying IndexedDB")}this.story||(this.story=await F(this.storyId)),this.story?(t.innerHTML=m(this,P,oe).call(this,this.story),m(this,P,ne).call(this,this.story),await F(this.story.id)?(s.style.display="block",o.style.display="none"):(o.style.display="block",s.style.display="none")):t.innerHTML="<p>Story not found</p>"}catch(n){console.error("Error loading story:",n),t.innerHTML="<p>Error loading story</p>"}o.addEventListener("click",async()=>{if(this.story)try{await J(this.story),alert("Story saved for offline viewing!"),s.style.display="block",o.style.display="none"}catch(n){console.error("Error saving story offline:",n),alert("Failed to save story offline.")}}),s.addEventListener("click",async()=>{if(this.story)try{await q(this.story.id),alert("Offline story deleted."),o.style.display="block",s.style.display="none"}catch(n){console.error("Error deleting offline story:",n),alert("Failed to delete offline story.")}})}}P=new WeakSet,oe=function(e){return`
      <article class="story-detail">
        <header class="story-header">
          <h1>${e.name}</h1>
          <div class="story-meta">
            <time datetime="${e.createdAt}">${new Date(e.createdAt).toLocaleDateString()}</time>
            ${e.synced===!1?'<span class="badge offline">Offline</span>':""}
          </div>
        </header>

        <div class="story-image-container">
          <img src="${e.photoUrl}" alt="${e.name}'s story" class="story-detail-image">
        </div>

        <div class="story-description">
          <p>${e.description}</p>
        </div>

        ${e.lat&&e.lon?`
          <div class="story-location">
            <h3>Location</h3>
            <div id="story-map" class="story-map"></div>
            <p class="coordinates">Coordinates: ${e.lat}, ${e.lon}</p>
          </div>
        `:""}
      </article>
    `},ne=async function(e){if(!e.lat||!e.lon)return;const t=document.getElementById("story-map");if(t){t.style.height="300px",t.style.width="100%";try{const o=U(),s=o.map("story-map").setView([e.lat,e.lon],15);o.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}).addTo(s),o.marker([e.lat,e.lon]).addTo(s).bindPopup(`<strong>${e.name}</strong><br>${e.description}`),setTimeout(()=>{s.invalidateSize()},100)}catch(o){console.error("Error initializing map:",o),t.innerHTML="<p>Error loading map</p>"}}};class Ee{async render(){return`
      <section class="stories-section">
        <div class="container">
          <h1>Offline Stories</h1>
          <div id="offline-stories-list" class="stories-list">
            <div class="loading">Loading offline stories...</div>
          </div>
        </div>
      </section>
    `}async afterRender(){const e=document.getElementById("offline-stories-list");await this.renderStories(e)}async renderStories(e){try{const t=await N();t.length>0?e.innerHTML=t.map(o=>this.renderStoryCard(o)).join(""):e.innerHTML="<p>No stories saved for offline viewing.</p>",this.addDeleteEventListeners()}catch(t){console.error("Error rendering offline stories:",t),e.innerHTML="<p>Error loading offline stories.</p>"}}renderStoryCard(e){return`
      <div class="story-card" id="story-${e.id}">
        <img src="${e.photoUrl}" alt="${e.name}'s story" class="story-image">
        <div class="story-content">
          <h2>${e.name}</h2>
          <p class="story-description">${e.description.substring(0,100)}...</p>
          <div class="story-meta">
            <time datetime="${e.createdAt}">${new Date(e.createdAt).toLocaleDateString()}</time>
            <button class="delete-button" data-id="${e.id}">Delete</button>
          </div>
        </div>
      </div>
    `}addDeleteEventListeners(){document.querySelectorAll(".delete-button").forEach(t=>{t.addEventListener("click",async o=>{const s=o.target.dataset.id;if(confirm("Are you sure you want to delete this offline story?"))try{await q(s);const n=document.getElementById(`story-${s}`);n&&n.remove();const i=document.getElementById("offline-stories-list");i.childElementCount===0&&(i.innerHTML="<p>No stories saved for offline viewing.</p>")}catch(n){console.error("Error deleting offline story:",n),alert("Failed to delete offline story.")}})})}}function Se(a){return class extends a{async render(){return localStorage.getItem("token")?super.render():(setTimeout(()=>{window.location.hash="#/login"},100),`
          <section class="auth-section">
            <div class="auth-container">
              <h1>Access Denied</h1>
              <p>You need to login first to access this page.</p>
              <p>Redirecting to login page...</p>
              <p><a href="#/login">Click here if not redirected</a></p>
            </div>
          </section>
        `)}}}const Ie={"/":new ce,"/about":new le,"/login":new pe,"/register":new ye,"/stories":new ve,"/add-story":Se(we),"/story/:id":new be,"/offline":new Ee};function Le(a){const e=a.split("/");return{resource:e[1]||null,id:e[2]||null}}function Be(a){let e="";return a.resource&&(e=e.concat(`/${a.resource}`)),a.id&&(e=e.concat("/:id")),e||"/"}function De(){return location.hash.replace("#","")||"/"}function ke(){const a=De(),e=Le(a);return Be(e)}var D,k,b,$,se;class Pe{constructor({navigationDrawer:e,drawerButton:t,content:o}){f(this,$);f(this,D,null);f(this,k,null);f(this,b,null);v(this,D,o),v(this,k,t),v(this,b,e),m(this,$,se).call(this)}async renderPage(){const e=ke(),t=Ie[e];"startViewTransition"in document?await document.startViewTransition(async()=>{d(this,D).innerHTML=await t.render(),await t.afterRender()}).finished:(d(this,D).innerHTML=await t.render(),await t.afterRender())}}D=new WeakMap,k=new WeakMap,b=new WeakMap,$=new WeakSet,se=function(){d(this,k).addEventListener("click",()=>{d(this,b).classList.toggle("open")}),document.body.addEventListener("click",e=>{!d(this,b).contains(e.target)&&!d(this,k).contains(e.target)&&d(this,b).classList.remove("open"),d(this,b).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&d(this,b).classList.remove("open")})})};let z=navigator.onLine;window.addEventListener("online",()=>{z=!0,console.log("Network is online"),Ae()});window.addEventListener("offline",()=>{z=!1,console.log("Network is offline")});async function Ae(){if(!z){console.log("Skipping sync - offline");return}try{console.log("Starting automatic sync of offline data");const a=await Q();if(a.length===0){console.log("No unsynced stories to sync");return}let e=0,t=0;for(const o of a)try{const n=await(await fetch(o.photoUrl)).blob(),i=new File([n],"story-photo.jpg",{type:"image/jpeg"}),r=new FormData;r.append("description",o.description),r.append("photo",i),r.append("lat",o.lat),r.append("lon",o.lon),await Z(r),await K(o.id),e++,console.log(`Synced story: ${o.id}`)}catch(s){console.error(`Failed to sync story ${o.id}:`,s),t++}console.log(`Sync completed: ${e} synced, ${t} failed`),window.dispatchEvent(new CustomEvent("syncCompleted",{detail:{syncedCount:e,errorCount:t}}))}catch(a){console.error("Sync failed:",a)}}"serviceWorker"in navigator&&window.addEventListener("load",()=>{const a=window.location.hostname==="epicnab.github.io"?"/story-app-pwa/sw.js":"/sw.js";navigator.serviceWorker.register(a).then(e=>{console.log("ServiceWorker registration successful with scope: ",e.scope),console.log("ServiceWorker registered at:",a)}).catch(e=>{console.log("ServiceWorker registration failed: ",e),console.log("Attempted path:",a)})});function M(){const a=document.getElementById("nav-list"),t=!!localStorage.getItem("token");let o="";if(o+='<li><a href="#/">Beranda</a></li>',o+='<li><a href="#/about">About</a></li>',t?(o+='<li><a href="#/stories">Stories</a></li>',o+='<li><a href="#/add-story">Add Story</a></li>',o+='<li><a href="#/offline">Offline Stories</a></li>',o+='<li><a id="logout-btn" href="#/" style="cursor: pointer; color: #dc2626;">Logout</a></li>'):(o+='<li><a href="#/stories">Stories</a></li>',o+='<li><a href="#/login">Login</a></li>',o+='<li><a href="#/register">Register</a></li>'),a.innerHTML=o,t){const s=document.getElementById("logout-btn");s&&s.addEventListener("click",n=>{n.preventDefault(),localStorage.removeItem("token"),M(),window.location.hash="#/"})}}document.addEventListener("DOMContentLoaded",async()=>{const a=new Pe({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});M(),await a.renderPage(),window.addEventListener("hashchange",async()=>{await a.renderPage(),M()})});export{T as C};
