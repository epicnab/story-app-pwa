var te=o=>{throw TypeError(o)};var W=(o,e,t)=>e.has(o)||te("Cannot "+t);var d=(o,e,t)=>(W(o,e,"read from private field"),t?t.call(o):e.get(o)),y=(o,e,t)=>e.has(o)?te("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t),g=(o,e,t,s)=>(W(o,e,"write to private field"),s?s.call(o,t):e.set(o,t),t),u=(o,e,t)=>(W(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const Re="modulepreload",Te=function(o){return"/story-app-pwa/"+o},oe={},T=function(e,t,s){let n=Promise.resolve();if(t&&t.length>0){let a=function(l){return Promise.all(l.map(f=>Promise.resolve(f).then(w=>({status:"fulfilled",value:w}),w=>({status:"rejected",reason:w}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),c=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));n=a(t.map(l=>{if(l=Te(l),l in oe)return;oe[l]=!0;const f=l.endsWith(".css"),w=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${w}`))return;const h=document.createElement("link");if(h.rel=f?"stylesheet":Re,f||(h.as="script"),h.crossOrigin="",h.href=l,c&&h.setAttribute("nonce",c),document.head.appendChild(h),f)return new Promise((Oe,Ce)=>{h.addEventListener("load",Oe),h.addEventListener("error",()=>Ce(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return n.then(a=>{for(const r of a||[])r.status==="rejected"&&i(r.reason);return e().catch(i)})};class $e{async render(){return`
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
                <label class="switch" for="push-notification-toggle">
                  <span class="sr-only">Enable Push Notifications</span>
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
    `}async afterRender(){window.lucide&&window.lucide.createIcons();const t=!!localStorage.getItem("token"),s=document.getElementById("login-link"),n=document.getElementById("register-link");s&&n&&(t?(s.style.display="none",n.style.display="none"):(s.style.display="inline-block",n.style.display="inline-block"));const{initPushNotification:i}=await T(async()=>{const{initPushNotification:l}=await import("./push-notification-BoThzHwr.js");return{initPushNotification:l}},[]);await i();const{initPWAInstall:a,canInstallPWA:r,showInstallPrompt:c}=await T(async()=>{const{initPWAInstall:l,canInstallPWA:f,showInstallPrompt:w}=await Promise.resolve().then(()=>ce);return{initPWAInstall:l,canInstallPWA:f,showInstallPrompt:w}},void 0);a(),this.initPushNotificationToggle(),this.initPWAInstall()}async initPushNotificationToggle(){const e=document.getElementById("push-toggle-container"),t=document.getElementById("push-notification-toggle"),s=document.getElementById("push-status"),n=document.getElementById("login-required-message");if(!e||!t||!s||!n)return;if(!!!localStorage.getItem("token")){e.style.display="none",n.style.display="block";return}e.style.display="flex",n.style.display="none";const{isPushNotificationEnabled:r,togglePushNotification:c}=await T(async()=>{const{isPushNotificationEnabled:l,togglePushNotification:f}=await import("./push-notification-BoThzHwr.js");return{isPushNotificationEnabled:l,togglePushNotification:f}},[]);t.checked=await r(),s.textContent=t.checked?"Enabled":"Disabled",t.addEventListener("change",async()=>{try{s.textContent="Processing...",t.disabled=!0;const l=await c();t.checked=l,s.textContent=l?"Enabled":"Disabled",console.log("Push notification toggle successful, enabled:",l)}catch(l){console.error("Failed to toggle push notifications:",l),t.checked=!t.checked;let f="Failed to toggle push notifications.";l.message.includes("VAPID key")?f+=" Please check your internet connection.":l.message.includes("permission")?f+=" Please allow notifications in your browser.":l.message.includes("token")?f+=" Please login again.":f+=" Please try again.",alert(f),s.textContent="Disabled"}finally{t.disabled=!1}})}async initPWAInstall(){const e=document.getElementById("pwa-install-card"),t=document.getElementById("install-button");if(!e||!t)return;const{canInstallPWA:s,showInstallPrompt:n,isPWAInstallable:i}=await T(async()=>{const{canInstallPWA:a,showInstallPrompt:r,isPWAInstallable:c}=await Promise.resolve().then(()=>ce);return{canInstallPWA:a,showInstallPrompt:r,isPWAInstallable:c}},void 0);s()&&(e.style.display="block"),window.addEventListener("pwa-installable",a=>{a.detail.installable&&(e.style.display="block")}),t.addEventListener("click",async()=>{try{await n()&&(e.style.display="none",console.log("PWA installed successfully"))}catch(a){console.error("Failed to install PWA:",a)}}),window.addEventListener("pwa-installed",()=>{e.style.display="none"})}}class Ne{async render(){return`
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
    `}async afterRender(){window.lucide&&window.lucide.createIcons()}}const $={BASE_URL:"https://story-api.dicoding.dev/v1"},M={STORIES:`${$.BASE_URL}/stories`,REGISTER:`${$.BASE_URL}/register`,LOGIN:`${$.BASE_URL}/login`,SUBSCRIBE_NOTIFICATIONS:`${$.BASE_URL}/notifications/subscribe`};async function de(){const o={},e=localStorage.getItem("token");e&&(o.Authorization=`Bearer ${e}`);const t=await fetch(M.STORIES,{headers:o}),s=await t.json();if(!t.ok)throw new Error(s.message||"Failed to fetch stories");return s.listStory||[]}async function ue(o){const e=localStorage.getItem("token");console.log("API addStory called with token:",!!e);const t=await fetch(M.STORIES,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:o});console.log("API response status:",t.status);let s;try{s=await t.json(),console.log("API response data:",s)}catch(n){throw console.error("Failed to parse API response:",n),new Error("Invalid API response")}if(!t.ok){const n=s.message||`HTTP ${t.status}: ${t.statusText}`;throw console.error("API error:",n),new Error(n)}return s}async function _e(o){const e=await fetch(M.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to register");return t}async function Me(o){var s;const e=await fetch(M.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to login");return(s=t.loginResult)!=null&&s.token&&localStorage.setItem("token",t.loginResult.token),t}class We{async render(){return`
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
    `}async afterRender(){const e=document.getElementById("login-form"),t=document.getElementById("login-message");e.addEventListener("submit",async s=>{s.preventDefault(),t.textContent="Logging in...";const n=new FormData(e),i={email:n.get("email"),password:n.get("password")};try{await Me(i),t.textContent="Login successful! Redirecting...",t.className="message success",setTimeout(()=>{window.location.hash="#/stories"},1e3)}catch(a){t.textContent=a.message,t.className="message error"}})}}class Ue{async render(){return`
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
    `}async afterRender(){const e=document.getElementById("register-form"),t=document.getElementById("register-message");e.addEventListener("submit",async s=>{s.preventDefault(),t.textContent="Registering...";const n=new FormData(e),i={name:n.get("name"),email:n.get("email"),password:n.get("password")};try{await _e(i),t.textContent="Registration successful! Please login.",t.className="message success",setTimeout(()=>{window.location.hash="#/login"},2e3)}catch(a){t.textContent=a.message,t.className="message error"}})}}function X(){if(window.L)return window.L;throw new Error("Leaflet is not loaded. Please ensure the CDN script is included in the HTML.")}const q=(o,e)=>e.some(t=>o instanceof t);let ne,se;const V=new WeakMap,U=new WeakMap,N=new WeakMap;let H={get(o,e,t){if(o instanceof IDBTransaction){if(e==="done")return V.get(o);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return k(o[e])},set:(o,e,t)=>(o[e]=t,!0),has:(o,e)=>o instanceof IDBTransaction&&(e==="done"||e==="store")||e in o};function fe(o){H=o(H)}function je(o){return(se||(se=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(o)?function(...e){return o.apply(z(this),e),k(this.request)}:function(...e){return k(o.apply(z(this),e))}}function Fe(o){return typeof o=="function"?je(o):(o instanceof IDBTransaction&&function(e){if(V.has(e))return;const t=new Promise((s,n)=>{const i=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",r),e.removeEventListener("abort",r)},a=()=>{s(),i()},r=()=>{n(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",a),e.addEventListener("error",r),e.addEventListener("abort",r)});V.set(e,t)}(o),q(o,ne||(ne=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(o,H):o)}function k(o){if(o instanceof IDBRequest)return function(t){const s=new Promise((n,i)=>{const a=()=>{t.removeEventListener("success",r),t.removeEventListener("error",c)},r=()=>{n(k(t.result)),a()},c=()=>{i(t.error),a()};t.addEventListener("success",r),t.addEventListener("error",c)});return N.set(s,t),s}(o);if(U.has(o))return U.get(o);const e=Fe(o);return e!==o&&(U.set(o,e),N.set(e,o)),e}const z=o=>N.get(o);function qe(o,e,{blocked:t,upgrade:s,blocking:n,terminated:i}={}){const a=indexedDB.open(o,e),r=k(a);return s&&a.addEventListener("upgradeneeded",c=>{s(k(a.result),c.oldVersion,c.newVersion,k(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),r.then(c=>{i&&c.addEventListener("close",()=>i()),n&&c.addEventListener("versionchange",l=>n(l.oldVersion,l.newVersion,l))}).catch(()=>{}),r}const Ve=["get","getKey","getAll","getAllKeys","count"],He=["put","add","delete","clear"],j=new Map;function ie(o,e){if(!(o instanceof IDBDatabase)||e in o||typeof e!="string")return;if(j.get(e))return j.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,n=He.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!n&&!Ve.includes(t))return;const i=async function(a,...r){const c=this.transaction(a,n?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(r.shift())),(await Promise.all([l[t](...r),n&&c.done]))[0]};return j.set(e,i),i}fe(o=>({...o,get:(e,t,s)=>ie(e,t)||o.get(e,t,s),has:(e,t)=>!!ie(e,t)||o.has(e,t)}));const ze=["continue","continuePrimaryKey","advance"],ae={},G=new WeakMap,pe=new WeakMap,Ge={get(o,e){if(!ze.includes(e))return o[e];let t=ae[e];return t||(t=ae[e]=function(...s){G.set(this,pe.get(this)[e](...s))}),t}};async function*Ke(...o){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...o)),!e)return;const t=new Proxy(e,Ge);for(pe.set(t,e),N.set(t,z(e));e;)yield t,e=await(G.get(t)||e.continue()),G.delete(t)}function re(o,e){return e===Symbol.asyncIterator&&q(o,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&q(o,[IDBIndex,IDBObjectStore])}fe(o=>({...o,get:(e,t,s)=>re(e,t)?Ke:o.get(e,t,s),has:(e,t)=>re(e,t)||o.has(e,t)}));const Je="story-app-db",Ye=1,v="stories";let F=null;async function S(){return F||(F=qe(Je,Ye,{upgrade(o){o.objectStoreNames.contains(v)||o.createObjectStore(v,{keyPath:"id",autoIncrement:!0}).createIndex("synced","synced")}})),F}async function Z(o){return(await S()).put(v,{...o,synced:o.synced??!1,createdAt:o.createdAt??new Date().toISOString()})}async function K(){return(await S()).getAll(v)}async function le(o){return(await S()).get(v,o)}async function ee(o){console.log(`Deleting story from IndexedDB with ID: ${o}`);const e=await S(),t=await e.get(v,o);console.log("Story exists before delete:",!!t);const s=await e.delete(v,o);console.log(`Delete operation completed for ID: ${o}`);const n=await e.get(v,o);return console.log("Story exists after delete:",!!n),s}async function ye(){return(await(await S()).getAll(v)).filter(t=>t.synced===!1||t.synced===void 0||t.synced===null)}async function Qe(o){const e=await S(),t=await e.get(v,o);t&&(t.synced=!0,await e.put(v,t))}async function J(){const o=await ye();console.log(`Found ${o.length} unsynced stories to sync`);let e=0;for(const t of o)try{if(console.log(`Syncing story ${t.id}...`),!localStorage.getItem("token")){console.warn(`No auth token found, skipping story ${t.id}`);continue}let n;if(t.photoBlob instanceof Blob)n=new File([t.photoBlob],`story-${t.id}.jpg`,{type:t.photoType||"image/jpeg"}),console.log(`Created file from Blob for story ${t.id}:`,n.name,n.type,n.size);else{console.error(`Invalid photoBlob for story ${t.id}:`,typeof t.photoBlob);continue}const i=new FormData;i.append("description",t.description),i.append("photo",n),i.append("lat",t.lat),i.append("lon",t.lon),console.log(`Sending story ${t.id} to API...`),await ue(i),await Qe(t.id),e++,console.log(`✅ Story ${t.id} synced successfully`)}catch(s){console.error(`❌ Sync failed for story ${t.id}:`,s)}return console.log(`Sync completed: ${e} stories synced successfully`),e}var b,p,Y,ge,he,me,ve,we,Q;class Xe{constructor(){y(this,p);y(this,b,[])}async render(){return`
      <section class="stories-section">
        <div class="container">
          <h1>Stories</h1>

          <div class="stories-controls">
            <a href="#/add-story" class="add-story-button">Add Story</a>
            <a href="#/offline" class="add-story-button secondary">View Offline Stories</a>
            <div class="stories-filters">
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
    `}async afterRender(){await S(),document.getElementById("sync-btn").addEventListener("click",()=>{u(this,p,we).call(this)}),await u(this,p,Q).call(this),await u(this,p,Y).call(this)}}b=new WeakMap,p=new WeakSet,Y=async function(){await u(this,p,ge).call(this),await u(this,p,he).call(this),u(this,p,ve).call(this)},ge=async function(){try{g(this,b,await de())}catch{console.warn("Offline mode → load from IndexedDB"),g(this,b,await K())}},he=async function(){const e=document.getElementById("stories-list");if(!d(this,b)||d(this,b).length===0){e.innerHTML="<p>No stories available</p>";return}const t=await K(),s=new Set(t.map(n=>n.id));e.innerHTML=d(this,b).map(n=>{var w,h;const i=s.has(n.id);let a=n.photoUrl;!a&&n.photoBlob?a=URL.createObjectURL(n.photoBlob):a||(a="/images/placeholder.png");const r=n.createdAt?new Date(n.createdAt).toLocaleString():"Just now",c=(h=(w=n.id).startsWith)==null?void 0:h.call(w,"offline_"),l=c?"badge offline":"badge synced",f=c?"Waiting for Sync":"Synced";return`
        <article class="story-card" id="story-${n.id}">
          <img src="${a}" alt="Story photo" class="story-image" loading="lazy" />
          <div class="story-content">
            <a href="#/story/${n.id}" class="story-link">
              <div class="story-badges">
                <span class="${l}">${f}</span>
              </div>
              <p class="story-description">${n.description||"No description"}</p>
              <small class="story-date">${r}</small>
            </a>
            <div class="story-actions">
              <button class="save-toggle-btn cta-button" data-id="${n.id}">
                ${i?"Remove from Offline":"Save for Offline"}
              </button>
            </div>
          </div>
        </article>
      `}).join(""),u(this,p,me).call(this)},me=function(){document.querySelectorAll(".save-toggle-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=e.dataset.id,s=d(this,b).find(i=>i.id==t);if(!s)return;e.disabled=!0,e.textContent="Processing...";const n=e.textContent.includes("Remove");try{if(n)await ee(t),e.textContent="Save for Offline",alert("Story removed from offline storage.");else{let i={...s};if(s.photoUrl&&!s.photoBlob){const a=await fetch(s.photoUrl);i.photoBlob=await a.blob()}await Z(i),e.textContent="Remove from Offline",alert("Story saved for offline access.")}}catch(i){console.error("Failed to toggle save state:",i),alert("Operation failed. Please try again."),e.textContent=n?"Remove from Offline":"Save for Offline"}finally{e.disabled=!1}})})},ve=function(){const e=document.getElementById("map");if(!e)return;const t=X();if(!t)return;const s=t.map(e).setView([-6.2,106.816666],10);t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(s),d(this,b).forEach(n=>{n.lat&&n.lon&&t.marker([n.lat,n.lon]).addTo(s).bindPopup(`<p><a href="#/story/${n.id}">${n.description||"Story"}</a></p>`)})},we=async function(){const e=document.getElementById("sync-btn"),t=document.getElementById("sync-status");e.disabled=!0,e.textContent="Syncing...",t.textContent="Syncing offline stories...",t.className="sync-status syncing";try{const s=await J();s>0?(t.textContent=`Successfully synced ${s} stories!`,t.className="sync-status success",await u(this,p,Y).call(this)):(t.textContent="No offline stories to sync",t.className="sync-status")}catch(s){console.error("Sync failed:",s),t.textContent="Sync failed. Please try again.",t.className="sync-status error"}finally{e.disabled=!1,e.textContent="Sync Offline Stories",await u(this,p,Q).call(this),setTimeout(()=>{t.textContent="",t.className="sync-status"},5e3)}},Q=async function(){try{const e=await ye(),t=document.getElementById("sync-status"),s=document.getElementById("sync-btn");e.length>0?(t.textContent=`${e.length} stories waiting to sync`,t.className="sync-status warning",s.style.display="inline-block"):(s.style.display="none",t.textContent="")}catch(e){console.warn("Failed to check sync status:",e)}};var L,P,C,be,Se;class Ze{constructor(){y(this,C);y(this,L,null);y(this,P,null)}async render(){return`
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
    `}async afterRender(){await S(),u(this,C,be).call(this),u(this,C,Se).call(this)}}L=new WeakMap,P=new WeakMap,C=new WeakSet,be=function(){const e=X(),t=e.map("map").setView([-6.2,106.816666],10);e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(t);let s;t.on("click",n=>{g(this,L,n.latlng.lat),g(this,P,n.latlng.lng),s&&t.removeLayer(s),s=e.marker(n.latlng).addTo(t),document.getElementById("coords").textContent=`${d(this,L)}, ${d(this,P)}`})},Se=function(){const e=document.querySelector(".story-form"),t=document.querySelector(".message");document.getElementById("cancel-btn").onclick=()=>{window.location.hash="#/stories"},e.onsubmit=async s=>{if(s.preventDefault(),!d(this,L)||!d(this,P)){t.textContent="Please select location",t.classList.add("error"),t.classList.remove("success");return}const n=document.getElementById("photo").files[0],i=document.getElementById("description").value,a=new FormData;a.append("description",i),a.append("photo",n),a.append("lat",d(this,L)),a.append("lon",d(this,P));try{await ue(a),t.textContent="Story added successfully",t.classList.add("success"),t.classList.remove("error")}catch{if(await Z({description:i,lat:d(this,L),lon:d(this,P),photoBlob:n,photoType:n.type,synced:!1,createdAt:new Date().toISOString()}),t.textContent="Offline: story saved locally",t.classList.add("success"),t.classList.remove("error"),"serviceWorker"in navigator&&"SyncManager"in window){const c=await navigator.serviceWorker.ready;try{await c.sync.register("sync-stories"),console.log("Background sync registered")}catch(l){console.warn("Background sync registration failed",l)}}}setTimeout(()=>{window.location.hash="#/stories"},1200)}};var m,I,B,Ie,Ee,Le;class et{constructor(){y(this,B);y(this,m,null);y(this,I,!1)}async render(){return`
      <section class="story-detail-section">
        <div id="story-detail-container" class="container">
          <p>Loading story...</p>
        </div>
      </section>
    `}async afterRender(){await S();const e=window.location.hash.split("/").pop();let t=null;try{if(t=(await de()).find(n=>n.id===e),!t)throw new Error("Story not found in API response")}catch(s){console.warn("Could not fetch story from API, trying IndexedDB...",s.message)}if(t||(t=await le(e)),t){g(this,m,t);const s=await le(e);g(this,I,!!s),u(this,B,Ie).call(this),u(this,B,Ee).call(this)}else document.getElementById("story-detail-container").innerHTML="<p>Story not found anywhere.</p>"}}m=new WeakMap,I=new WeakMap,B=new WeakSet,Ie=function(){const e=document.getElementById("story-detail-container");if(!d(this,m)){e.innerHTML="<p>Story not found.</p>";return}const{name:t,description:s,photoUrl:n,createdAt:i,lat:a,lon:r}=d(this,m);let c=n;!c&&d(this,m).photoBlob&&(c=URL.createObjectURL(d(this,m).photoBlob)),e.innerHTML=`
      <article class="story-detail-card">
        <img src="${c}" alt="Story photo for ${t}" class="story-detail-image" />
        <div class="story-detail-content">
          <h1 class="story-detail-title">${t}</h1>
          <p class="story-detail-description">${s}</p>
          <small class="story-detail-date">Posted on: ${new Date(i).toLocaleString()}</small>
          
          <div class="story-detail-actions">
            <button id="save-toggle-btn" class="cta-button">
              ${d(this,I)?"Remove from Offline":"Save for Offline"}
            </button>
          </div>
        </div>
      </article>
      ${a&&r?'<div id="story-map" style="height:300px; margin-top: 20px;"></div>':""}
    `,a&&r&&u(this,B,Le).call(this,a,r)},Ee=function(){const e=document.getElementById("save-toggle-btn");e&&e.addEventListener("click",async()=>{e.disabled=!0,e.textContent="Processing...";try{if(d(this,I))await ee(d(this,m).id),g(this,I,!1),e.textContent="Save for Offline",alert("Story removed from offline storage.");else{let t={...d(this,m)};if(t.photoUrl&&!t.photoBlob){const n=await(await fetch(t.photoUrl)).blob();t.photoBlob=n}await Z(t),g(this,I,!0),e.textContent="Remove from Offline",alert("Story saved for offline access.")}}catch(t){console.error("Failed to toggle save state:",t),alert("Operation failed. Please try again."),e.textContent=d(this,I)?"Remove from Offline":"Save for Offline"}finally{e.disabled=!1}})},Le=function(e,t){const s=X();if(!s)return;const n=document.getElementById("story-map");if(!n)return;const i=s.map(n).setView([e,t],13);s.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(i),s.marker([e,t]).addTo(i).bindPopup(d(this,m).name).openPopup()};var A,Pe,Be,Ae;class tt{constructor(){y(this,A)}async render(){return`
      <section class="stories-section">
        <div class="container">
          <h1>Offline Stories</h1>
          <p>These are the stories you have saved for offline access.</p>
          <div id="offline-stories-list" class="stories-list">
            <div class="loading">Loading offline stories...</div>
          </div>
        </div>
      </section>
    `}async afterRender(){await S();const e=document.getElementById("offline-stories-list");await u(this,A,Pe).call(this,e)}}A=new WeakSet,Pe=async function(e){try{const t=await K();t.length>0?(e.innerHTML=t.map(s=>u(this,A,Be).call(this,s)).join(""),u(this,A,Ae).call(this)):e.innerHTML='<p class="empty-message">No stories saved for offline viewing yet.</p>'}catch(t){console.error("Error rendering offline stories:",t),e.innerHTML='<p class="error-message">Error loading offline stories. Please try again.</p>'}},Be=function(e){var r,c;let t="";e.photoBlob?t=URL.createObjectURL(e.photoBlob):e.photoUrl?t=e.photoUrl:t="/images/placeholder.png";const s=e.createdAt?new Date(e.createdAt).toLocaleString():"Unknown date",n=(c=(r=e.id).startsWith)==null?void 0:c.call(r,"offline_"),i=n?"badge offline":"badge synced",a=n?"Waiting for Sync":"Saved Online Story";return`
      <article class="story-card" id="story-${e.id}">
        <img src="${t}" alt="Story photo" class="story-image" loading="lazy">
        <div class="story-content">
          <a href="#/story/${e.id}" class="story-link">
            <div class="story-badges">
              <span class="${i}">${a}</span>
            </div>
            <p class="story-description">${e.description||"No description"}</p>
            <small class="story-date">${s}</small>
          </a>
          <div class="story-actions">
            <button class="remove-offline-btn cta-button" data-id="${e.id}">
              Remove from Offline
            </button>
          </div>
        </div>
      </article>
    `},Ae=function(){document.querySelectorAll(".remove-offline-btn").forEach(e=>{e.addEventListener("click",async t=>{const s=t.target.dataset.id;if(confirm("Are you sure you want to remove this story from your offline storage?"))try{await ee(s);const n=document.getElementById(`story-${s}`);n&&n.remove();const i=document.getElementById("offline-stories-list");i.childElementCount===0&&(i.innerHTML='<p class="empty-message">No stories saved for offline viewing yet.</p>')}catch(n){console.error("Error deleting offline story:",n),alert("Failed to delete offline story.")}})})};function ot(o){return class extends o{async render(){return localStorage.getItem("token")?super.render():(setTimeout(()=>{window.location.hash="#/login"},100),`
          <section class="auth-section">
            <div class="auth-container">
              <h1>Access Denied</h1>
              <p>You need to login first to access this page.</p>
              <p>Redirecting to login page...</p>
              <p><a href="#/login">Click here if not redirected</a></p>
            </div>
          </section>
        `)}}}const nt={"/":new $e,"/about":new Ne,"/login":new We,"/register":new Ue,"/stories":new Xe,"/add-story":new(ot(Ze)),"/story/:id":new et,"/offline":new tt};function st(o){const e=o.split("/");return{resource:e[1]||null,id:e[2]||null}}function it(o){let e="";return o.resource&&(e=e.concat(`/${o.resource}`)),o.id&&(e=e.concat("/:id")),e||"/"}function at(){return location.hash.replace("#","")||"/"}function rt(){const o=at(),e=st(o);return it(e)}const lt={"/":"Home | Story App","/about":"About Us | Story App","/login":"Login | Story App","/register":"Register | Story App","/stories":"All Stories | Story App","/add-story":"Add a New Story | Story App","/story/:id":"Story Details | Story App","/offline":"Offline Stories | Story App"};var x,O,E,_,ke;class ct{constructor({navigationDrawer:e,drawerButton:t,content:s}){y(this,_);y(this,x,null);y(this,O,null);y(this,E,null);g(this,x,s),g(this,O,t),g(this,E,e),u(this,_,ke).call(this)}async renderPage(){const e=rt(),t=nt[e];document.title=lt[e]||"Story App","startViewTransition"in document?await document.startViewTransition(async()=>{d(this,x).innerHTML=await t.render(),await t.afterRender()}).finished:(d(this,x).innerHTML=await t.render(),await t.afterRender())}}x=new WeakMap,O=new WeakMap,E=new WeakMap,_=new WeakSet,ke=function(){d(this,O).addEventListener("click",()=>{d(this,E).classList.toggle("open")}),document.body.addEventListener("click",e=>{!d(this,E).contains(e.target)&&!d(this,O).contains(e.target)&&d(this,E).classList.remove("open"),d(this,E).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&d(this,E).classList.remove("open")})})};let D=null,R=!1;function De(){window.addEventListener("beforeinstallprompt",o=>{D=o,R=!0,window.dispatchEvent(new CustomEvent("pwa-installable",{detail:{installable:!0}}))}),window.addEventListener("appinstalled",o=>{console.log("PWA was installed successfully"),D=null,R=!1,window.dispatchEvent(new CustomEvent("pwa-installed"))})}function dt(){return R}async function xe(){if(!D)return console.warn("Install prompt not available"),!1;D.prompt();const{outcome:o}=await D.userChoice;return D=null,R=!1,window.dispatchEvent(new CustomEvent("pwa-install-choice",{detail:{outcome:o}})),o==="accepted"}function ut(){return window.matchMedia("(display-mode: standalone)").matches?!1:/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?navigator.standalone===!1:R}const ce=Object.freeze(Object.defineProperty({__proto__:null,canInstallPWA:ut,initPWAInstall:De,isPWAInstallable:dt,showInstallPrompt:xe},Symbol.toStringTag,{value:"Module"}));window.updateNavigation=function(){const o=document.getElementById("nav-list"),t=!!localStorage.getItem("token");let s="";if(s+='<li><a href="#/">Beranda</a></li>',s+='<li><a href="#/about">About</a></li>',t?(s+='<li><a href="#/stories">Stories</a></li>',s+='<li><a href="#/add-story">Add Story</a></li>',s+='<li><a href="#/offline">Offline Stories</a></li>',s+='<li><a id="logout-btn" href="#/" style="cursor: pointer; color: #dc2626;">Logout</a></li>'):(s+='<li><a href="#/stories">Stories</a></li>',s+='<li><a href="#/login">Login</a></li>',s+='<li><a href="#/register">Register</a></li>'),s+='<li><a id="install-btn" href="#" style="display: none; background-color: #007bff; color: white; padding: 8px 12px; border-radius: 4px;">Install App</a></li>',o.innerHTML=s,t){const n=document.getElementById("logout-btn");n&&n.addEventListener("click",i=>{i.preventDefault(),localStorage.removeItem("token"),updateNavigation(),window.location.hash="#/"})}};document.addEventListener("DOMContentLoaded",async()=>{if("serviceWorker"in navigator)try{const n=await navigator.serviceWorker.register("/sw.js",{scope:"/"});console.log("Service Worker registered successfully:",n)}catch(n){console.log("Service Worker registration failed:",n)}const o=new ct({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});updateNavigation(),De(),window.addEventListener("pwa-installable",n=>{const i=document.getElementById("install-btn");i&&n.detail.installable&&(i.style.display="block",i.addEventListener("click",a=>{a.preventDefault(),xe()}))}),await o.renderPage(),window.addEventListener("hashchange",async()=>{await o.renderPage(),updateNavigation()});let e=navigator.onLine;async function t(n){if(n&&!e){console.log("Network back online, syncing offline stories...");try{const i=await J();i>0&&(console.log(`Successfully synced ${i} stories`),(window.location.hash==="#/stories"||window.location.hash==="#/offline")&&await o.renderPage())}catch(i){console.warn("Auto-sync failed:",i)}}e=n}async function s(){if(navigator.onLine){console.log("Checking for unsynced stories on app load...");try{const n=await J();n>0&&(console.log(`Successfully synced ${n} stories on app load`),(window.location.hash==="#/stories"||window.location.hash==="#/offline")&&await o.renderPage())}catch(n){console.warn("Initial sync failed:",n)}}}window.addEventListener("online",()=>t(!0)),window.addEventListener("offline",()=>t(!1)),document.addEventListener("visibilitychange",()=>{!document.hidden&&navigator.onLine&&!e&&t(!0)}),await s()});export{M as E};
