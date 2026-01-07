var ie=n=>{throw TypeError(n)};var q=(n,e,t)=>e.has(n)||ie("Cannot "+t);var c=(n,e,t)=>(q(n,e,"read from private field"),t?t.call(n):e.get(n)),y=(n,e,t)=>e.has(n)?ie("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),g=(n,e,t,o)=>(q(n,e,"write to private field"),o?o.call(n,t):e.set(n,t),t),f=(n,e,t)=>(q(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Me="modulepreload",We=function(n){return"/story-app-pwa/"+n},ae={},_=function(e,t,o){let s=Promise.resolve();if(t&&t.length>0){let a=function(l){return Promise.all(l.map(p=>Promise.resolve(p).then(S=>({status:"fulfilled",value:S}),S=>({status:"rejected",reason:S}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),d=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=a(t.map(l=>{if(l=We(l),l in ae)return;ae[l]=!0;const p=l.endsWith(".css"),S=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${S}`))return;const m=document.createElement("link");if(m.rel=p?"stylesheet":Me,p||(m.as="script"),m.crossOrigin="",m.href=l,d&&m.setAttribute("nonce",d),document.head.appendChild(m),p)return new Promise((N,_e)=>{m.addEventListener("load",N),m.addEventListener("error",()=>_e(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return s.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return e().catch(i)})};class Ue{async render(){return`
      <section class="hero-section">
        <div class="container">
          <h1>Welcome to Story App</h1>
          <p>Share your travel stories and discover amazing places around the world.</p>
          <div class="hero-actions">
            <a href="#/stories" class="cta-button">View Stories</a>
            <a href="#/login" class="cta-button secondary" id="login-link">Login</a>
            <a href="#/register" class="cta-button secondary" id="register-link">Register</a>
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
                <label for="push-notification-toggle">Enable Push Notifications</label>
                <label class="switch" for="push-notification-toggle">
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
    `}async afterRender(){window.lucide&&window.lucide.createIcons();const t=!!localStorage.getItem("token"),o=document.getElementById("login-link"),s=document.getElementById("register-link");o&&s&&(t?(o.style.display="none",s.style.display="none"):(o.style.display="inline-block",s.style.display="inline-block"));const{initPushNotification:i}=await _(async()=>{const{initPushNotification:l}=await import("./push-notification-DhzAnOUs.js");return{initPushNotification:l}},[]);await i();const{initPWAInstall:a,canInstallPWA:r,showInstallPrompt:d}=await _(async()=>{const{initPWAInstall:l,canInstallPWA:p,showInstallPrompt:S}=await Promise.resolve().then(()=>pe);return{initPWAInstall:l,canInstallPWA:p,showInstallPrompt:S}},void 0);a(),this.initPushNotificationToggle(),this.initPWAInstall()}async initPushNotificationToggle(){const e=document.getElementById("push-toggle-container"),t=document.getElementById("push-notification-toggle"),o=document.getElementById("push-status"),s=document.getElementById("login-required-message");if(!e||!t||!o||!s)return;if(!!!localStorage.getItem("token")){e.style.display="none",s.style.display="block";return}e.style.display="flex",s.style.display="none";const{isPushNotificationEnabled:r,togglePushNotification:d}=await _(async()=>{const{isPushNotificationEnabled:l,togglePushNotification:p}=await import("./push-notification-DhzAnOUs.js");return{isPushNotificationEnabled:l,togglePushNotification:p}},[]);t.checked=await r(),o.textContent=t.checked?"Enabled":"Disabled",t.addEventListener("change",async()=>{try{o.textContent="Processing...",t.disabled=!0;const l=await d();t.checked=l,o.textContent=l?"Enabled":"Disabled",console.log("Push notification toggle successful, enabled:",l)}catch(l){console.error("Failed to toggle push notifications:",l),t.checked=!t.checked;let p="Failed to toggle push notifications.";l.message.includes("VAPID key")?p+=" Please check your internet connection.":l.message.includes("permission")?p+=" Please allow notifications in your browser.":l.message.includes("token")?p+=" Please login again.":p+=" Please try again.",alert(p),o.textContent="Disabled"}finally{t.disabled=!1}})}async initPWAInstall(){const e=document.getElementById("pwa-install-card"),t=document.getElementById("install-button");if(!e||!t)return;const{canInstallPWA:o,showInstallPrompt:s,isPWAInstallable:i}=await _(async()=>{const{canInstallPWA:a,showInstallPrompt:r,isPWAInstallable:d}=await Promise.resolve().then(()=>pe);return{canInstallPWA:a,showInstallPrompt:r,isPWAInstallable:d}},void 0);o()&&(e.style.display="block"),window.addEventListener("pwa-installable",a=>{a.detail.installable&&(e.style.display="block")}),t.addEventListener("click",async()=>{try{await s()&&(e.style.display="none",console.log("PWA installed successfully"))}catch(a){console.error("Failed to install PWA:",a)}}),window.addEventListener("pwa-installed",()=>{e.style.display="none"})}}class je{async render(){return`
      <section class="about-section container">
        <div class="about-header">
          <h1>About Story App</h1>
          <p class="about-subtitle">
            Your personal corner on the web to share and discover stories from every corner of the globe.
          </p>
        </div>

        <div class="about-content">
          <p>
            <strong>Story App</strong> is more than just an application; it's a community of explorers, adventurers, and storytellers. We believe that every journey has a story worth sharing. Our mission is to provide a beautiful and intuitive platform for you to document your travels, share your experiences, and connect with others through the power of storytelling.
          </p>
          <p>
            Whether you're climbing a mountain, exploring a new city, or just enjoying a local spot, Story App is your companion to capture the moment.
          </p>
        </div>

        <div class="features-section" style="padding: 40px 0; background: none;">
          <h2 style="text-align: left; margin-bottom: 30px;">Key Features</h2>
          <div class="features-grid about-features-grid">
            <div class="feature-card">
              <h3><i data-lucide="map-pin" class="feature-icon"></i> Location Stories</h3>
              <p>Share your stories with location data and see them on an interactive map.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="camera" class="feature-icon"></i> Photo Uploads</h3>
              <p>Upload photos from your gallery or capture them directly with your camera.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="map" class="feature-icon"></i> Interactive Map</h3>
              <p>Explore stories from around the world on an interactive and easy-to-use map.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="smartphone" class="feature-icon"></i> Responsive Design</h3>
              <p>Access your stories seamlessly on any device, whether it's a desktop, tablet, or phone.</p>
            </div>
             <div class="feature-card">
              <h3><i data-lucide="cloud-off" class="feature-icon"></i> Offline Access</h3>
              <p>Save stories for offline viewing and sync them when you're back online.</p>
            </div>
             <div class="feature-card">
              <h3><i data-lucide="bell" class="feature-icon"></i> Push Notifications</h3>
              <p>Get notified about new stories and updates to stay in the loop.</p>
            </div>
          </div>
        </div>

        <div class="about-footer">
          <p>Join our community today and start your storytelling journey!</p>
          <a href="#/register" class="cta-button">Get Started</a>
        </div>
      </section>
    `}async afterRender(){window.lucide&&window.lucide.createIcons()}}const M={BASE_URL:"https://story-api.dicoding.dev/v1"},F={STORIES:`${M.BASE_URL}/stories`,REGISTER:`${M.BASE_URL}/register`,LOGIN:`${M.BASE_URL}/login`,SUBSCRIBE_NOTIFICATIONS:`${M.BASE_URL}/notifications/subscribe`};async function ge(){const n={},e=localStorage.getItem("token");e&&(n.Authorization=`Bearer ${e}`);const t=await fetch(F.STORIES,{headers:n}),o=await t.json();if(!t.ok)throw new Error(o.message||"Failed to fetch stories");return o.listStory||[]}async function ye(n){const e=localStorage.getItem("token");console.log("API addStory called with token:",!!e);const t=await fetch(F.STORIES,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:n});console.log("API response status:",t.status);let o;try{o=await t.json(),console.log("API response data:",o)}catch(s){throw console.error("Failed to parse API response:",s),new Error("Invalid API response")}if(!t.ok){const s=o.message||`HTTP ${t.status}: ${t.statusText}`;throw console.error("API error:",s),new Error(s)}return o}async function Fe(n){const e=await fetch(F.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to register");return t}async function qe(n){var o;const e=await fetch(F.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to login");return(o=t.loginResult)!=null&&o.token&&localStorage.setItem("token",t.loginResult.token),t}class Ve{async render(){return`
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
    `}async afterRender(){const e=document.getElementById("login-form"),t=document.getElementById("login-message");e.addEventListener("submit",async o=>{o.preventDefault(),t.textContent="Logging in...";const s=new FormData(e),i={email:s.get("email"),password:s.get("password")};try{await qe(i),t.textContent="Login successful! Redirecting...",t.className="message success",setTimeout(()=>{window.location.hash="#/stories"},1e3)}catch(a){t.textContent=a.message,t.className="message error"}})}}class He{async render(){return`
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
    `}async afterRender(){const e=document.getElementById("register-form"),t=document.getElementById("register-message");e.addEventListener("submit",async o=>{o.preventDefault(),t.textContent="Registering...";const s=new FormData(e),i={name:s.get("name"),email:s.get("email"),password:s.get("password")};try{await Fe(i),t.textContent="Registration successful! Please login.",t.className="message success",setTimeout(()=>{window.location.hash="#/login"},2e3)}catch(a){t.textContent=a.message,t.className="message error"}})}}function ne(){if(window.L)return window.L;throw new Error("Leaflet is not loaded. Please ensure the CDN script is included in the HTML.")}const G=(n,e)=>e.some(t=>n instanceof t);let re,le;const K=new WeakMap,V=new WeakMap,U=new WeakMap;let J={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return K.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return D(n[e])},set:(n,e,t)=>(n[e]=t,!0),has:(n,e)=>n instanceof IDBTransaction&&(e==="done"||e==="store")||e in n};function he(n){J=n(J)}function ze(n){return(le||(le=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(n)?function(...e){return n.apply(Y(this),e),D(this.request)}:function(...e){return D(n.apply(Y(this),e))}}function Ge(n){return typeof n=="function"?ze(n):(n instanceof IDBTransaction&&function(e){if(K.has(e))return;const t=new Promise((o,s)=>{const i=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",r),e.removeEventListener("abort",r)},a=()=>{o(),i()},r=()=>{s(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",a),e.addEventListener("error",r),e.addEventListener("abort",r)});K.set(e,t)}(n),G(n,re||(re=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(n,J):n)}function D(n){if(n instanceof IDBRequest)return function(t){const o=new Promise((s,i)=>{const a=()=>{t.removeEventListener("success",r),t.removeEventListener("error",d)},r=()=>{s(D(t.result)),a()},d=()=>{i(t.error),a()};t.addEventListener("success",r),t.addEventListener("error",d)});return U.set(o,t),o}(n);if(V.has(n))return V.get(n);const e=Ge(n);return e!==n&&(V.set(n,e),U.set(e,n)),e}const Y=n=>U.get(n);function Ke(n,e,{blocked:t,upgrade:o,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),r=D(a);return o&&a.addEventListener("upgradeneeded",d=>{o(D(a.result),d.oldVersion,d.newVersion,D(a.transaction),d)}),t&&a.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),r.then(d=>{i&&d.addEventListener("close",()=>i()),s&&d.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),r}const Je=["get","getKey","getAll","getAllKeys","count"],Ye=["put","add","delete","clear"],H=new Map;function ce(n,e){if(!(n instanceof IDBDatabase)||e in n||typeof e!="string")return;if(H.get(e))return H.get(e);const t=e.replace(/FromIndex$/,""),o=e!==t,s=Ye.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!s&&!Je.includes(t))return;const i=async function(a,...r){const d=this.transaction(a,s?"readwrite":"readonly");let l=d.store;return o&&(l=l.index(r.shift())),(await Promise.all([l[t](...r),s&&d.done]))[0]};return H.set(e,i),i}he(n=>({...n,get:(e,t,o)=>ce(e,t)||n.get(e,t,o),has:(e,t)=>!!ce(e,t)||n.has(e,t)}));const Qe=["continue","continuePrimaryKey","advance"],de={},Q=new WeakMap,me=new WeakMap,Xe={get(n,e){if(!Qe.includes(e))return n[e];let t=de[e];return t||(t=de[e]=function(...o){Q.set(this,me.get(this)[e](...o))}),t}};async function*Ze(...n){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...n)),!e)return;const t=new Proxy(e,Xe);for(me.set(t,e),U.set(t,Y(e));e;)yield t,e=await(Q.get(t)||e.continue()),Q.delete(t)}function ue(n,e){return e===Symbol.asyncIterator&&G(n,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&G(n,[IDBIndex,IDBObjectStore])}he(n=>({...n,get:(e,t,o)=>ue(e,t)?Ze:n.get(e,t,o),has:(e,t)=>ue(e,t)||n.has(e,t)}));const et="story-app-db",tt=1,w="stories";let z=null;async function b(){return z||(z=Ke(et,tt,{upgrade(n){n.objectStoreNames.contains(w)||n.createObjectStore(w,{keyPath:"id",autoIncrement:!0}).createIndex("synced","synced")}})),z}async function oe(n){return(await b()).put(w,{...n,synced:n.synced??!1,createdAt:n.createdAt??new Date().toISOString()})}async function X(){return(await b()).getAll(w)}async function fe(n){return(await b()).get(w,n)}async function se(n){console.log(`Deleting story from IndexedDB with ID: ${n}`);const e=await b(),t=await e.get(w,n);console.log("Story exists before delete:",!!t);const o=await e.delete(w,n);console.log(`Delete operation completed for ID: ${n}`);const s=await e.get(w,n);return console.log("Story exists after delete:",!!s),o}async function ve(){return(await(await b()).getAll(w)).filter(t=>t.synced===!1||t.synced===void 0||t.synced===null)}async function nt(n){const e=await b(),t=await e.get(w,n);t&&(t.synced=!0,await e.put(w,t))}async function Z(){const n=await ve();console.log(`Found ${n.length} unsynced stories to sync`);let e=0;for(const t of n)try{if(console.log(`Syncing story ${t.id}...`),!localStorage.getItem("token")){console.warn(`No auth token found, skipping story ${t.id}`);continue}let s;if(t.photoBlob instanceof Blob)s=new File([t.photoBlob],`story-${t.id}.jpg`,{type:t.photoType||"image/jpeg"}),console.log(`Created file from Blob for story ${t.id}:`,s.name,s.type,s.size);else{console.error(`Invalid photoBlob for story ${t.id}:`,typeof t.photoBlob);continue}const i=new FormData;i.append("description",t.description),i.append("photo",s),i.append("lat",t.lat),i.append("lon",t.lon),console.log(`Sending story ${t.id} to API...`),await ye(i),await nt(t.id),e++,console.log(`✅ Story ${t.id} synced successfully`)}catch(o){console.error(`❌ Sync failed for story ${t.id}:`,o)}return console.log(`Sync completed: ${e} stories synced successfully`),e}var h,k,C,u,ee,we,W,be,Se,Ie,Ee,Le,Pe,te;class ot{constructor(){y(this,u);y(this,h,[]);y(this,k,[]);y(this,C,null);g(this,h,[]),g(this,k,[]),g(this,C,null)}async render(){return`
      <section class="stories-section">
        <div class="container">
          <h1>Stories</h1>

          <div class="stories-controls">
            <a href="#/add-story" class="add-story-button">Add Story</a>
            <a href="#/offline" class="add-story-button secondary">View Offline Stories</a>
            <div class="stories-filters">
              <div class="search-box">
                <label for="search-input">Search Stories</label>
                <input type="text" id="search-input" placeholder="Search stories...">
                <button id="clear-search-btn" class="clear-search-btn" aria-label="Clear search">✕</button>
              </div>
              <div class="sync-controls">
                <button id="sync-btn" class="sync-button">Sync Offline Stories</button>
                <div id="sync-status" class="sync-status"></div>
              </div>
            </div>
          </div>

          <div id="stories-list">Loading...</div>

          <div id="map" style="height:400px; margin-top:20px"></div>
        </div>
      </section>
    `}async afterRender(){await b(),document.getElementById("sync-btn").addEventListener("click",()=>{f(this,u,Pe).call(this)});const e=document.getElementById("search-input"),t=document.getElementById("clear-search-btn");e&&t&&(e.addEventListener("input",f(this,u,Ie).call(this,o=>{f(this,u,be).call(this,o.target.value)},300)),t.addEventListener("click",()=>{f(this,u,Se).call(this)})),await f(this,u,te).call(this),await f(this,u,ee).call(this)}}h=new WeakMap,k=new WeakMap,C=new WeakMap,u=new WeakSet,ee=async function(){await f(this,u,we).call(this),f(this,u,W).call(this,c(this,h)),f(this,u,Le).call(this,c(this,h))},we=async function(){try{g(this,h,await ge())}catch{console.warn("Offline mode → load from IndexedDB"),g(this,h,await X())}},W=async function(e=c(this,h)){const t=document.getElementById("stories-list");if(!e||e.length===0){t.innerHTML="<p>No stories available</p>";return}const o=await X(),s=new Set(o.map(i=>i.id));t.innerHTML=e.map(i=>{var m,N;const a=s.has(i.id);let r=i.photoUrl;!r&&i.photoBlob?r=URL.createObjectURL(i.photoBlob):r||(r="/images/placeholder.png");const d=i.createdAt?new Date(i.createdAt).toLocaleString():"Just now",l=(N=(m=i.id).startsWith)==null?void 0:N.call(m,"offline_"),p=l?"badge offline":"badge synced",S=l?"Waiting for Sync":"Synced";return`
        <article class="story-card" id="story-${i.id}">
          <img src="${r}" alt="Story photo" class="story-image" loading="lazy" />
          <div class="story-content">
            <a href="#/story/${i.id}" class="story-link">
              <div class="story-badges">
                <span class="${p}">${S}</span>
              </div>
              <p class="story-description">${i.description||"No description"}</p>
              <small class="story-date">${d}</small>
            </a>
            <div class="story-actions">
              <button class="save-toggle-btn cta-button" data-id="${i.id}">
                ${a?"Remove from Offline":"Save for Offline"}
              </button>
            </div>
          </div>
        </article>
      `}).join(""),f(this,u,Ee).call(this)},be=function(e){const t=e.toLowerCase();g(this,k,c(this,h).filter(o=>o.description.toLowerCase().includes(t)||o.name&&o.name.toLowerCase().includes(t))),f(this,u,W).call(this,c(this,k))},Se=function(){const e=document.getElementById("search-input");e&&(e.value=""),g(this,k,[]),f(this,u,W).call(this,c(this,h))},Ie=function(e,t){return(...o)=>{clearTimeout(c(this,C)),g(this,C,setTimeout(()=>e(...o),t))}},Ee=function(){document.querySelectorAll(".save-toggle-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=e.dataset.id,o=c(this,h).find(i=>i.id==t);if(!o)return;e.disabled=!0,e.textContent="Processing...";const s=e.textContent.includes("Remove");try{if(s)await se(t),e.textContent="Save for Offline",alert("Story removed from offline storage.");else{let i={...o};if(o.photoUrl&&!o.photoBlob){const a=await fetch(o.photoUrl);i.photoBlob=await a.blob()}await oe(i),e.textContent="Remove from Offline",alert("Story saved for offline access.")}}catch(i){console.error("Failed to toggle save state:",i),alert("Operation failed. Please try again."),e.textContent=s?"Remove from Offline":"Save for Offline"}finally{e.disabled=!1}})})},Le=function(e=c(this,h)){const t=document.getElementById("map");if(!t)return;const o=ne();if(!o)return;const s=o.map(t).setView([-6.2,106.816666],10);o.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(s),e.forEach(i=>{i.lat&&i.lon&&o.marker([i.lat,i.lon]).addTo(s).bindPopup(`<p><a href="#/story/${i.id}">${i.description||"Story"}</a></p>`)})},Pe=async function(){const e=document.getElementById("sync-btn"),t=document.getElementById("sync-status");e.disabled=!0,e.textContent="Syncing...",t.textContent="Syncing offline stories...",t.className="sync-status syncing";try{const o=await Z();o>0?(t.textContent=`Successfully synced ${o} stories!`,t.className="sync-status success",await f(this,u,ee).call(this)):(t.textContent="No offline stories to sync",t.className="sync-status")}catch(o){console.error("Sync failed:",o),t.textContent="Sync failed. Please try again.",t.className="sync-status error"}finally{e.disabled=!1,e.textContent="Sync Offline Stories",await f(this,u,te).call(this),setTimeout(()=>{t.textContent="",t.className="sync-status"},5e3)}},te=async function(){try{const e=await ve(),t=document.getElementById("sync-status"),o=document.getElementById("sync-btn");e.length>0?(t.textContent=`${e.length} stories waiting to sync`,t.className="sync-status warning",o.style.display="inline-block"):(o.style.display="none",t.textContent="")}catch(e){console.warn("Failed to check sync status:",e)}};var L,P,R,Be,Ae;class st{constructor(){y(this,R);y(this,L,null);y(this,P,null)}async render(){return`
      <section class="add-story-section">
        <h1>Add Story</h1>

        <form class="story-form">
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              placeholder="Story description"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="photo">Photo:</label>
            <input type="file" id="photo" accept="image/*" required />
          </div>

          <div id="map" class="location-map"></div>
          <div id="coords" class="coordinates-display">No location selected</div>

          <button type="submit" class="submit-button">Submit</button>
          <button type="button" id="cancel-btn" class="cancel-button">Cancel</button>
        </form>

        <div id="message" class="message"></div>
      </section>
    `}async afterRender(){await b(),f(this,R,Be).call(this),f(this,R,Ae).call(this)}}L=new WeakMap,P=new WeakMap,R=new WeakSet,Be=function(){const e=ne(),t=e.map("map").setView([-6.2,106.816666],10);e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(t);let o;t.on("click",s=>{g(this,L,s.latlng.lat),g(this,P,s.latlng.lng),o&&t.removeLayer(o),o=e.marker(s.latlng).addTo(t),document.getElementById("coords").textContent=`${c(this,L)}, ${c(this,P)}`})},Ae=function(){const e=document.querySelector(".story-form"),t=document.querySelector(".message");document.getElementById("cancel-btn").onclick=()=>{window.location.hash="#/stories"},e.onsubmit=async o=>{if(o.preventDefault(),!c(this,L)||!c(this,P)){t.textContent="Please select location",t.classList.add("error"),t.classList.remove("success");return}const s=document.getElementById("photo").files[0],i=document.getElementById("description").value,a=new FormData;a.append("description",i),a.append("photo",s),a.append("lat",c(this,L)),a.append("lon",c(this,P));try{await ye(a),t.textContent="Story added successfully",t.classList.add("success"),t.classList.remove("error")}catch{if(await oe({description:i,lat:c(this,L),lon:c(this,P),photoBlob:s,photoType:s.type,synced:!1,createdAt:new Date().toISOString()}),t.textContent="Offline: story saved locally",t.classList.add("success"),t.classList.remove("error"),"serviceWorker"in navigator&&"SyncManager"in window){const d=await navigator.serviceWorker.ready;try{await d.sync.register("sync-stories"),console.log("Background sync registered")}catch(l){console.warn("Background sync registration failed",l)}}}setTimeout(()=>{window.location.hash="#/stories"},1200)}};var v,I,B,ke,De,xe;class it{constructor(){y(this,B);y(this,v,null);y(this,I,!1)}async render(){return`
      <section class="story-detail-section">
        <div id="story-detail-container" class="container">
          <p>Loading story...</p>
        </div>
      </section>
    `}async afterRender(){await b();const e=window.location.hash.split("/").pop();let t=null;try{if(t=(await ge()).find(s=>s.id===e),!t)throw new Error("Story not found in API response")}catch(o){console.warn("Could not fetch story from API, trying IndexedDB...",o.message)}if(t||(t=await fe(e)),t){g(this,v,t);const o=await fe(e);g(this,I,!!o),f(this,B,ke).call(this),f(this,B,De).call(this)}else document.getElementById("story-detail-container").innerHTML="<p>Story not found anywhere.</p>"}}v=new WeakMap,I=new WeakMap,B=new WeakSet,ke=function(){const e=document.getElementById("story-detail-container");if(!c(this,v)){e.innerHTML="<p>Story not found.</p>";return}const{name:t,description:o,photoUrl:s,createdAt:i,lat:a,lon:r}=c(this,v);let d=s;!d&&c(this,v).photoBlob&&(d=URL.createObjectURL(c(this,v).photoBlob)),e.innerHTML=`
      <article class="story-detail-card">
        <img src="${d}" alt="Story photo for ${t}" class="story-detail-image" />
        <div class="story-detail-content">
          <h1 class="story-detail-title">${t}</h1>
          <p class="story-detail-description">${o}</p>
          <small class="story-detail-date">Posted on: ${new Date(i).toLocaleString()}</small>
          
          <div class="story-detail-actions">
            <button id="save-toggle-btn" class="cta-button">
              ${c(this,I)?"Remove from Offline":"Save for Offline"}
            </button>
          </div>
        </div>
      </article>
      ${a&&r?'<div id="story-map" style="height:300px; margin-top: 20px;"></div>':""}
    `,a&&r&&f(this,B,xe).call(this,a,r)},De=function(){const e=document.getElementById("save-toggle-btn");e&&e.addEventListener("click",async()=>{e.disabled=!0,e.textContent="Processing...";try{if(c(this,I))await se(c(this,v).id),g(this,I,!1),e.textContent="Save for Offline",alert("Story removed from offline storage.");else{let t={...c(this,v)};if(t.photoUrl&&!t.photoBlob){const s=await(await fetch(t.photoUrl)).blob();t.photoBlob=s}await oe(t),g(this,I,!0),e.textContent="Remove from Offline",alert("Story saved for offline access.")}}catch(t){console.error("Failed to toggle save state:",t),alert("Operation failed. Please try again."),e.textContent=c(this,I)?"Remove from Offline":"Save for Offline"}finally{e.disabled=!1}})},xe=function(e,t){const o=ne();if(!o)return;const s=document.getElementById("story-map");if(!s)return;const i=o.map(s).setView([e,t],13);o.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(i),o.marker([e,t]).addTo(i).bindPopup(c(this,v).name).openPopup()};var A,Ce,Oe,Te;class at{constructor(){y(this,A)}async render(){return`
      <section class="stories-section">
        <div class="container">
          <h1>Offline Stories</h1>
          <p>These are the stories you have saved for offline access.</p>
          <div id="offline-stories-list" class="stories-list">
            <div class="loading">Loading offline stories...</div>
          </div>
        </div>
      </section>
    `}async afterRender(){await b();const e=document.getElementById("offline-stories-list");await f(this,A,Ce).call(this,e)}}A=new WeakSet,Ce=async function(e){try{const t=await X();t.length>0?(e.innerHTML=t.map(o=>f(this,A,Oe).call(this,o)).join(""),f(this,A,Te).call(this)):e.innerHTML='<p class="empty-message">No stories saved for offline viewing yet.</p>'}catch(t){console.error("Error rendering offline stories:",t),e.innerHTML='<p class="error-message">Error loading offline stories. Please try again.</p>'}},Oe=function(e){var r,d;let t="";e.photoBlob?t=URL.createObjectURL(e.photoBlob):e.photoUrl?t=e.photoUrl:t="/images/placeholder.png";const o=e.createdAt?new Date(e.createdAt).toLocaleString():"Unknown date",s=(d=(r=e.id).startsWith)==null?void 0:d.call(r,"offline_"),i=s?"badge offline":"badge synced",a=s?"Waiting for Sync":"Saved Online Story";return`
      <article class="story-card" id="story-${e.id}">
        <img src="${t}" alt="Story photo" class="story-image" loading="lazy">
        <div class="story-content">
          <a href="#/story/${e.id}" class="story-link">
            <div class="story-badges">
              <span class="${i}">${a}</span>
            </div>
            <p class="story-description">${e.description||"No description"}</p>
            <small class="story-date">${o}</small>
          </a>
          <div class="story-actions">
            <button class="remove-offline-btn cta-button" data-id="${e.id}">
              Remove from Offline
            </button>
          </div>
        </div>
      </article>
    `},Te=function(){document.querySelectorAll(".remove-offline-btn").forEach(e=>{e.addEventListener("click",async t=>{const o=t.target.dataset.id;if(confirm("Are you sure you want to remove this story from your offline storage?"))try{await se(o);const s=document.getElementById(`story-${o}`);s&&s.remove();const i=document.getElementById("offline-stories-list");i.childElementCount===0&&(i.innerHTML='<p class="empty-message">No stories saved for offline viewing yet.</p>')}catch(s){console.error("Error deleting offline story:",s),alert("Failed to delete offline story.")}})})};function rt(n){return class extends n{async render(){return localStorage.getItem("token")?super.render():(setTimeout(()=>{window.location.hash="#/login"},100),`
          <section class="auth-section">
            <div class="auth-container">
              <h1>Access Denied</h1>
              <p>You need to login first to access this page.</p>
              <p>Redirecting to login page...</p>
              <p><a href="#/login">Click here if not redirected</a></p>
            </div>
          </section>
        `)}}}const lt={"/":new Ue,"/about":new je,"/login":new Ve,"/register":new He,"/stories":new ot,"/add-story":new(rt(st)),"/story/:id":new it,"/offline":new at};function ct(n){const e=n.split("/");return{resource:e[1]||null,id:e[2]||null}}function dt(n){let e="";return n.resource&&(e=e.concat(`/${n.resource}`)),n.id&&(e=e.concat("/:id")),e||"/"}function ut(){return location.hash.replace("#","")||"/"}function ft(){const n=ut(),e=ct(n);return dt(e)}const pt={"/":"Home | Story App","/about":"About Us | Story App","/login":"Login | Story App","/register":"Register | Story App","/stories":"All Stories | Story App","/add-story":"Add a New Story | Story App","/story/:id":"Story Details | Story App","/offline":"Offline Stories | Story App"};var O,T,E,j,Re;class gt{constructor({navigationDrawer:e,drawerButton:t,content:o}){y(this,j);y(this,O,null);y(this,T,null);y(this,E,null);g(this,O,o),g(this,T,t),g(this,E,e),f(this,j,Re).call(this)}async renderPage(){const e=ft(),t=lt[e];document.title=pt[e]||"Story App","startViewTransition"in document?await document.startViewTransition(async()=>{c(this,O).innerHTML=await t.render(),await t.afterRender()}).finished:(c(this,O).innerHTML=await t.render(),await t.afterRender())}}O=new WeakMap,T=new WeakMap,E=new WeakMap,j=new WeakSet,Re=function(){c(this,T).addEventListener("click",()=>{c(this,E).classList.toggle("open")}),document.body.addEventListener("click",e=>{!c(this,E).contains(e.target)&&!c(this,T).contains(e.target)&&c(this,E).classList.remove("open"),c(this,E).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&c(this,E).classList.remove("open")})})};let x=null,$=!1;function $e(){window.addEventListener("beforeinstallprompt",n=>{x=n,$=!0,window.dispatchEvent(new CustomEvent("pwa-installable",{detail:{installable:!0}}))}),window.addEventListener("appinstalled",n=>{console.log("PWA was installed successfully"),x=null,$=!1,window.dispatchEvent(new CustomEvent("pwa-installed"))})}function yt(){return $}async function Ne(){if(!x)return console.warn("Install prompt not available"),!1;x.prompt();const{outcome:n}=await x.userChoice;return x=null,$=!1,window.dispatchEvent(new CustomEvent("pwa-install-choice",{detail:{outcome:n}})),n==="accepted"}function ht(){return window.matchMedia("(display-mode: standalone)").matches?!1:/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?navigator.standalone===!1:$}const pe=Object.freeze(Object.defineProperty({__proto__:null,canInstallPWA:ht,initPWAInstall:$e,isPWAInstallable:yt,showInstallPrompt:Ne},Symbol.toStringTag,{value:"Module"}));window.updateNavigation=function(){const n=document.getElementById("nav-list"),t=!!localStorage.getItem("token");let o="";if(o+='<li><a href="#/">Beranda</a></li>',o+='<li><a href="#/about">About</a></li>',t?(o+='<li><a href="#/stories">Stories</a></li>',o+='<li><a href="#/add-story">Add Story</a></li>',o+='<li><a href="#/offline">Offline Stories</a></li>',o+='<li><a id="logout-btn" href="#/" style="cursor: pointer; color: #dc2626;">Logout</a></li>'):(o+='<li><a href="#/stories">Stories</a></li>',o+='<li><a href="#/login">Login</a></li>',o+='<li><a href="#/register">Register</a></li>'),o+='<li><a id="install-btn" href="#" style="display: none; background-color: #007bff; color: white; padding: 8px 12px; border-radius: 4px;">Install App</a></li>',n.innerHTML=o,t){const s=document.getElementById("logout-btn");s&&s.addEventListener("click",i=>{i.preventDefault(),localStorage.removeItem("token"),updateNavigation(),window.location.hash="#/"})}};document.addEventListener("DOMContentLoaded",async()=>{if("serviceWorker"in navigator)try{const s=await navigator.serviceWorker.register("/sw.js",{scope:"/"});console.log("Service Worker registered successfully:",s)}catch(s){console.log("Service Worker registration failed:",s)}const n=new gt({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});updateNavigation(),$e(),window.addEventListener("pwa-installable",s=>{const i=document.getElementById("install-btn");i&&s.detail.installable&&(i.style.display="block",i.addEventListener("click",a=>{a.preventDefault(),Ne()}))}),await n.renderPage(),window.addEventListener("hashchange",async()=>{await n.renderPage(),updateNavigation()});let e=navigator.onLine;async function t(s){if(s&&!e){console.log("Network back online, syncing offline stories...");try{const i=await Z();i>0&&(console.log(`Successfully synced ${i} stories`),(window.location.hash==="#/stories"||window.location.hash==="#/offline")&&await n.renderPage())}catch(i){console.warn("Auto-sync failed:",i)}}e=s}async function o(){if(navigator.onLine){console.log("Checking for unsynced stories on app load...");try{const s=await Z();s>0&&(console.log(`Successfully synced ${s} stories on app load`),(window.location.hash==="#/stories"||window.location.hash==="#/offline")&&await n.renderPage())}catch(s){console.warn("Initial sync failed:",s)}}}window.addEventListener("online",()=>t(!0)),window.addEventListener("offline",()=>t(!1)),document.addEventListener("visibilitychange",()=>{!document.hidden&&navigator.onLine&&!e&&t(!0)}),await o()});export{F as E};
