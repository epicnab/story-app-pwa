var Y=o=>{throw TypeError(o)};var N=(o,e,t)=>e.has(o)||Y("Cannot "+t);var f=(o,e,t)=>(N(o,e,"read from private field"),t?t.call(o):e.get(o)),w=(o,e,t)=>e.has(o)?Y("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t),v=(o,e,t,n)=>(N(o,e,"write to private field"),n?n.call(o,t):e.set(o,t),t),u=(o,e,t)=>(N(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const ke="modulepreload",ve=function(o){return"/story-app-pwa/"+o},Q={},R=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let i=function(l){return Promise.all(l.map(g=>Promise.resolve(g).then($=>({status:"fulfilled",value:$}),$=>({status:"rejected",reason:$}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),c=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=i(t.map(l=>{if(l=ve(l),l in Q)return;Q[l]=!0;const g=l.endsWith(".css"),$=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${$}`))return;const k=document.createElement("link");if(k.rel=g?"stylesheet":ke,g||(k.as="script"),k.crossOrigin="",k.href=l,c&&k.setAttribute("nonce",c),document.head.appendChild(k),g)return new Promise((we,be)=>{k.addEventListener("load",we),k.addEventListener("error",()=>be(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return s.then(i=>{for(const r of i||[])r.status==="rejected"&&a(r.reason);return e().catch(a)})};class Se{async render(){return`
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
    `}async afterRender(){window.lucide&&window.lucide.createIcons();const{initPushNotification:e}=await R(async()=>{const{initPushNotification:a}=await import("./push-notification-DkAG7dWm.js");return{initPushNotification:a}},[]);await e();const{initPWAInstall:t,canInstallPWA:n,showInstallPrompt:s}=await R(async()=>{const{initPWAInstall:a,canInstallPWA:i,showInstallPrompt:r}=await import("./pwa-install-fLW5BgT9.js");return{initPWAInstall:a,canInstallPWA:i,showInstallPrompt:r}},[]);t(),this.initPushNotificationToggle(),this.initPWAInstall()}async initPushNotificationToggle(){const e=document.getElementById("push-toggle-container"),t=document.getElementById("push-notification-toggle"),n=document.getElementById("push-status"),s=document.getElementById("login-required-message");if(!e||!t||!n||!s)return;if(!!!localStorage.getItem("token")){e.style.display="none",s.style.display="block";return}e.style.display="flex",s.style.display="none";const{isPushNotificationEnabled:r,togglePushNotification:c}=await R(async()=>{const{isPushNotificationEnabled:l,togglePushNotification:g}=await import("./push-notification-DkAG7dWm.js");return{isPushNotificationEnabled:l,togglePushNotification:g}},[]);t.checked=await r(),n.textContent=t.checked?"Enabled":"Disabled",t.addEventListener("change",async()=>{try{n.textContent="Processing...",t.disabled=!0;const l=await c();t.checked=l,n.textContent=l?"Enabled":"Disabled",console.log("Push notification toggle successful, enabled:",l)}catch(l){console.error("Failed to toggle push notifications:",l),t.checked=!t.checked;let g="Failed to toggle push notifications.";l.message.includes("VAPID key")?g+=" Please check your internet connection.":l.message.includes("permission")?g+=" Please allow notifications in your browser.":l.message.includes("token")?g+=" Please login again.":g+=" Please try again.",alert(g),n.textContent="Disabled"}finally{t.disabled=!1}})}async initPWAInstall(){const e=document.getElementById("pwa-install-card"),t=document.getElementById("install-button");if(!e||!t)return;const{canInstallPWA:n,showInstallPrompt:s,isPWAInstallable:a}=await R(async()=>{const{canInstallPWA:i,showInstallPrompt:r,isPWAInstallable:c}=await import("./pwa-install-fLW5BgT9.js");return{canInstallPWA:i,showInstallPrompt:r,isPWAInstallable:c}},[]);n()&&(e.style.display="block"),window.addEventListener("pwa-installable",i=>{i.detail.installable&&(e.style.display="block")}),t.addEventListener("click",async()=>{try{await s()&&(e.style.display="none",console.log("PWA installed successfully"))}catch(i){console.error("Failed to install PWA:",i)}}),window.addEventListener("pwa-installed",()=>{e.style.display="none"})}}class Ee{async render(){return`
      <section class="container">
        <h1>About Page</h1>
      </section>
    `}async afterRender(){}}const I={BASE_URL:"https://story-api.dicoding.dev/v1"},y={STORIES:`${I.BASE_URL}/stories`,REGISTER:`${I.BASE_URL}/register`,LOGIN:`${I.BASE_URL}/login`};async function _(){const o={},e=localStorage.getItem("token");e&&(o.Authorization=`Bearer ${e}`);const t=await fetch(y.STORIES,{headers:o}),n=await t.json();if(!t.ok)throw new Error(n.message||"Failed to fetch stories");return n.listStory||[]}async function te(o){const e=localStorage.getItem("token");console.log("API addStory called with token:",!!e);const t=await fetch(y.STORIES,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:o});console.log("API response status:",t.status);let n;try{n=await t.json(),console.log("API response data:",n)}catch(s){throw console.error("Failed to parse API response:",s),new Error("Invalid API response")}if(!t.ok){const s=n.message||`HTTP ${t.status}: ${t.statusText}`;throw console.error("API error:",s),new Error(s)}return n}async function Le(o){console.log(`Attempting to delete story with ID: ${o}`);const e=localStorage.getItem("token");console.log("Auth token present:",!!e);const t=[{url:`${y.STORIES}/${o}`,method:"DELETE",body:null},{url:`${I.BASE_URL}/story/${o}`,method:"DELETE",body:null},{url:`${y.STORIES}/delete/${o}`,method:"DELETE",body:JSON.stringify({id:o})}];for(const{url:n,method:s,body:a}of t)try{console.log(`Trying endpoint: ${s} ${n}`);const i={Authorization:`Bearer ${e}`};(a||s==="POST")&&(i["Content-Type"]="application/json");const r=await fetch(n,{method:s,headers:i,...a&&{body:a}});console.log(`Response status: ${r.status} ${r.statusText}`);let c;try{c=await r.json(),console.log("Response data:",c)}catch{console.log("No JSON response body"),c=null}if(r.ok)return console.log(`✅ Delete successful via ${s} ${n}`),c||{success:!0};console.log(`❌ Delete failed: ${r.status} - ${(c==null?void 0:c.message)||r.statusText}`)}catch(i){console.error(`Network error for ${s} ${n}:`,i)}try{console.log(`Trying POST ${y.STORIES}/delete`);const n=await fetch(`${y.STORIES}/delete`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({id:o})});if(console.log(`POST delete response status: ${n.status}`),n.ok){const s=await n.json();return console.log("POST delete successful:",s),s}else{const s=await n.json().catch(()=>null);console.log("POST delete failed:",s)}}catch(n){console.error("POST delete network error:",n)}throw console.error("All delete attempts failed"),new Error("Delete operation not supported by this API")}async function Ie(o){const e=await fetch(y.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to register");return t}async function Be(o){var n;const e=await fetch(y.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to login");return(n=t.loginResult)!=null&&n.token&&localStorage.setItem("token",t.loginResult.token),t}async function Pe(o){console.log(`Attempting to bookmark story: ${o}`);const e=localStorage.getItem("token");if(!e)throw new Error("No authentication token");const t=[`${y.STORIES}/${o}/bookmark`,`${y.STORIES}/${o}/favorite`,`${I.BASE_URL}/bookmark/${o}`];for(const n of t)try{console.log(`Trying bookmark endpoint: POST ${n}`);const s=await fetch(n,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log(`Bookmark response status: ${s.status}`),s.ok){const a=await s.json().catch(()=>({success:!0}));return console.log(`✅ Bookmark successful via POST ${n}`),a}else{const a=await s.json().catch(()=>null);console.log(`❌ Bookmark failed: ${s.status} - ${(a==null?void 0:a.message)||s.statusText}`)}}catch(s){console.error(`Network error for POST ${n}:`,s)}throw console.warn("All bookmark endpoints failed, using local storage only"),new Error("Bookmark operation not supported by this API")}async function Ae(o){console.log(`Attempting to unbookmark story: ${o}`);const e=localStorage.getItem("token");if(!e)throw new Error("No authentication token");const t=[`${y.STORIES}/${o}/bookmark`,`${y.STORIES}/${o}/favorite`,`${I.BASE_URL}/bookmark/${o}`];for(const n of t)try{console.log(`Trying unbookmark endpoint: DELETE ${n}`);const s=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(console.log(`Unbookmark response status: ${s.status}`),s.ok){const a=await s.json().catch(()=>({success:!0}));return console.log(`✅ Unbookmark successful via DELETE ${n}`),a}else{const a=await s.json().catch(()=>null);console.log(`❌ Unbookmark failed: ${s.status} - ${(a==null?void 0:a.message)||s.statusText}`)}}catch(s){console.error(`Network error for DELETE ${n}:`,s)}throw console.warn("All unbookmark endpoints failed, using local storage only"),new Error("Unbookmark operation not supported by this API")}class $e{async render(){return`
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
    `}async afterRender(){const e=document.getElementById("login-form"),t=document.getElementById("login-message");e.addEventListener("submit",async n=>{n.preventDefault(),t.textContent="Logging in...";const s=new FormData(e),a={email:s.get("email"),password:s.get("password")};try{await Be(a),t.textContent="Login successful! Redirecting...",t.className="message success",setTimeout(()=>{window.location.hash="#/stories"},1e3)}catch(i){t.textContent=i.message,t.className="message error"}})}}class De{async render(){return`
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
    `}async afterRender(){const e=document.getElementById("register-form"),t=document.getElementById("register-message");e.addEventListener("submit",async n=>{n.preventDefault(),t.textContent="Registering...";const s=new FormData(e),a={name:s.get("name"),email:s.get("email"),password:s.get("password")};try{await Ie(a),t.textContent="Registration successful! Please login.",t.className="message success",setTimeout(()=>{window.location.hash="#/login"},2e3)}catch(i){t.textContent=i.message,t.className="message error"}})}}function oe(){if(window.L)return window.L;throw new Error("Leaflet is not loaded. Please ensure the CDN script is included in the HTML.")}const Te=(o,e)=>e.some(t=>o instanceof t);let X,Z;function Oe(){return X||(X=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ce(){return Z||(Z=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ne=new WeakMap,W=new WeakMap,se=new WeakMap,U=new WeakMap,J=new WeakMap;function Re(o){const e=new Promise((t,n)=>{const s=()=>{o.removeEventListener("success",a),o.removeEventListener("error",i)},a=()=>{t(L(o.result)),s()},i=()=>{n(o.error),s()};o.addEventListener("success",a),o.addEventListener("error",i)});return e.then(t=>{t instanceof IDBCursor&&ne.set(t,o)}).catch(()=>{}),J.set(e,o),e}function xe(o){if(W.has(o))return;const e=new Promise((t,n)=>{const s=()=>{o.removeEventListener("complete",a),o.removeEventListener("error",i),o.removeEventListener("abort",i)},a=()=>{t(),s()},i=()=>{n(o.error||new DOMException("AbortError","AbortError")),s()};o.addEventListener("complete",a),o.addEventListener("error",i),o.addEventListener("abort",i)});W.set(o,e)}let q={get(o,e,t){if(o instanceof IDBTransaction){if(e==="done")return W.get(o);if(e==="objectStoreNames")return o.objectStoreNames||se.get(o);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return L(o[e])},set(o,e,t){return o[e]=t,!0},has(o,e){return o instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in o}};function Ne(o){q=o(q)}function Ue(o){return o===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=o.call(M(this),e,...t);return se.set(n,e.sort?e.sort():[e]),L(n)}:Ce().includes(o)?function(...e){return o.apply(M(this),e),L(ne.get(this))}:function(...e){return L(o.apply(M(this),e))}}function Me(o){return typeof o=="function"?Ue(o):(o instanceof IDBTransaction&&xe(o),Te(o,Oe())?new Proxy(o,q):o)}function L(o){if(o instanceof IDBRequest)return Re(o);if(U.has(o))return U.get(o);const e=Me(o);return e!==o&&(U.set(o,e),J.set(e,o)),e}const M=o=>J.get(o);function je(o,e,{blocked:t,upgrade:n,blocking:s,terminated:a}={}){const i=indexedDB.open(o,e),r=L(i);return n&&i.addEventListener("upgradeneeded",c=>{n(L(i.result),c.oldVersion,c.newVersion,L(i.transaction),c)}),t&&i.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),r.then(c=>{a&&c.addEventListener("close",()=>a()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),r}const Fe=["get","getKey","getAll","getAllKeys","count"],_e=["put","add","delete","clear"],j=new Map;function ee(o,e){if(!(o instanceof IDBDatabase&&!(e in o)&&typeof e=="string"))return;if(j.get(e))return j.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=_e.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Fe.includes(t)))return;const a=async function(i,...r){const c=this.transaction(i,s?"readwrite":"readonly");let l=c.store;return n&&(l=l.index(r.shift())),(await Promise.all([l[t](...r),s&&c.done]))[0]};return j.set(e,a),a}Ne(o=>({...o,get:(e,t,n)=>ee(e,t)||o.get(e,t,n),has:(e,t)=>!!ee(e,t)||o.has(e,t)}));const We="story-app-db",qe=1,p="stories";let F=null;async function m(){return F||(F=je(We,qe,{upgrade(o){o.objectStoreNames.contains(p)||o.createObjectStore(p,{keyPath:"id",autoIncrement:!0}).createIndex("synced","synced")}})),F}async function K(o){return(await m()).put(p,{...o,synced:o.synced??!1,createdAt:o.createdAt??new Date().toISOString()})}async function V(){return(await m()).getAll(p)}async function Ve(o){return(await m()).get(p,o)}async function ae(o){console.log(`Deleting story from IndexedDB with ID: ${o}`);const e=await m(),t=await e.get(p,o);console.log("Story exists before delete:",!!t);const n=await e.delete(p,o);console.log(`Delete operation completed for ID: ${o}`);const s=await e.get(p,o);return console.log("Story exists after delete:",!!s),n}async function ie(){return(await(await m()).getAll(p)).filter(t=>t.synced===!1||t.synced===void 0||t.synced===null)}async function He(o){const e=await m(),t=await e.get(p,o);t&&(t.synced=!0,await e.put(p,t))}async function ze(o){const t=await(await m()).get(p,o);return(t==null?void 0:t.bookmarked)===!0}async function Ge(o){const e=await m(),t=await e.get(p,o);return t?(t.bookmarked=!t.bookmarked,await e.put(p,t),t.bookmarked):!1}async function H(){const o=await ie();console.log(`Found ${o.length} unsynced stories to sync`);let e=0;for(const t of o)try{if(console.log(`Syncing story ${t.id}...`),!localStorage.getItem("token")){console.warn(`No auth token found, skipping story ${t.id}`);continue}let s;if(t.photoBlob instanceof Blob)s=new File([t.photoBlob],`story-${t.id}.jpg`,{type:t.photoType||"image/jpeg"}),console.log(`Created file from Blob for story ${t.id}:`,s.name,s.type,s.size);else{console.error(`Invalid photoBlob for story ${t.id}:`,typeof t.photoBlob);continue}const a=new FormData;a.append("description",t.description),a.append("photo",s),a.append("lat",t.lat),a.append("lon",t.lon),console.log(`Sending story ${t.id} to API...`),await te(a),await He(t.id),e++,console.log(`✅ Story ${t.id} synced successfully`)}catch(n){console.error(`❌ Sync failed for story ${t.id}:`,n)}return console.log(`Sync completed: ${e} stories synced successfully`),e}var h,d,D,T,re,ce,le,O,de,ue,fe,ge,pe;class Je{constructor(){w(this,d);w(this,h,[])}async render(){return`
      <section class="stories-section">
        <div class="container">
          <h1>Stories</h1>

          <div class="stories-controls">
            <button id="add-story-btn" class="add-story-button">Add Story</button>
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
    `}async afterRender(){await m(),document.getElementById("add-story-btn").addEventListener("click",()=>{window.location.hash="#/add-story"}),document.getElementById("sync-btn").addEventListener("click",()=>{u(this,d,de).call(this)});const e=document.createElement("button");e.textContent="Test API",e.style.marginLeft="10px",e.onclick=()=>u(this,d,fe).call(this);const t=document.createElement("button");t.textContent="Debug DB",t.style.marginLeft="10px",t.onclick=()=>u(this,d,ge).call(this);const n=document.createElement("button");n.textContent="Clear All",n.style.marginLeft="10px",n.style.backgroundColor="#dc2626",n.onclick=()=>u(this,d,pe).call(this);const s=document.getElementById("sync-btn").parentElement;s.appendChild(e),s.appendChild(t),s.appendChild(n),await u(this,d,ue).call(this),await u(this,d,D).call(this),await u(this,d,T).call(this),u(this,d,O).call(this)}}h=new WeakMap,d=new WeakSet,D=async function(){try{v(this,h,await _())}catch{console.warn("Offline mode → load from IndexedDB"),v(this,h,await V())}},T=async function(){const e=document.getElementById("stories-list");if(!f(this,h)||f(this,h).length===0){e.innerHTML="<p>No stories available</p>";return}const t=await Promise.all(f(this,h).map(async n=>{const s=await ze(n.id);return{...n,isBookmarked:s}}));e.innerHTML=t.map(n=>{let s="";n.photoUrl?s=n.photoUrl:n.photoBlob?s=URL.createObjectURL(n.photoBlob):s="/images/placeholder.png";const a=n.createdAt?new Date(n.createdAt).toLocaleString():"Offline",i=!n.photoUrl;return`
        <article class="story-card">
          <img src="${s}" alt="Story photo" class="story-image" />
          <div class="story-content">
            <div class="story-badges">
              <span class="${i?"badge offline":"badge synced"}">${i?"Offline":"Synced"}</span>
            </div>
            <p class="story-description">${n.description||"No description"}</p>
            <small class="story-date">${a}</small>
            <div class="story-actions">
              <button class="bookmark-btn ${n.isBookmarked?"bookmarked":""}" data-id="${n.id}" title="${n.isBookmarked?"Remove bookmark":"Bookmark story"}">
                <span class="bookmark-icon">${n.isBookmarked?"⭐":"☆"}</span> ${n.isBookmarked?"Bookmarked":"Bookmark"}
              </button>
              <button class="save-offline-btn" data-id="${n.id}" title="Save offline">
                <span class="save-icon">💾</span> Save Offline
              </button>
              <button class="delete-story-btn" data-id="${n.id}" title="Delete story">
                <span class="delete-icon">🗑️</span> Delete
              </button>
            </div>
          </div>
        </article>
      `}).join(""),u(this,d,re).call(this),u(this,d,ce).call(this),u(this,d,le).call(this)},re=function(){document.querySelectorAll(".bookmark-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=e.dataset.id,n=f(this,h).find(s=>s.id==t);if(n)try{let s=!1;if(navigator.onLine&&n.photoUrl)try{n.isBookmarked?(await Ae(t),console.log("Story unbookmarked on API")):(await Pe(t),console.log("Story bookmarked on API")),s=!0}catch(l){console.warn("API bookmark failed:",l)}const a=await Ge(t);console.log(`Bookmark status updated locally: ${a}`);const i=n.isBookmarked;n.isBookmarked=a,e.classList.toggle("bookmarked",a),e.title=a?"Remove bookmark":"Bookmark story";const r=e.querySelector(".bookmark-icon"),c=e.querySelector("span:last-child");r&&(r.textContent=a?"⭐":"☆"),c&&c!==r?c.textContent=a?"Bookmarked":"Bookmark":r||(e.innerHTML=`<span class="bookmark-icon">${a?"⭐":"☆"}</span> ${a?"Bookmarked":"Bookmark"}`),!s&&n.photoUrl&&navigator.onLine&&console.warn("Bookmark updated locally, but API sync may be needed")}catch(s){console.error("Bookmark toggle failed:",s),alert("Failed to update bookmark. Please try again.")}})})},ce=function(){document.querySelectorAll(".save-offline-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=e.dataset.id,n=f(this,h).find(s=>s.id==t);if(n)try{if(await V().then(i=>i.find(r=>r.id==t))){alert("Story is already saved offline");return}let a=null;n.photoUrl&&(a=await(await fetch(n.photoUrl)).blob()),await K({...n,photoBlob:a,synced:!0}),alert("Story saved offline successfully"),console.log("Story saved offline:",n.id)}catch(s){console.error("Save offline failed:",s),alert("Failed to save story offline")}})})},le=function(){document.querySelectorAll(".delete-story-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=e.dataset.id,n=f(this,h).find(s=>s.id==t);if(confirm("Delete this story?")){console.log("Deleting story:",{id:t,story:n});try{await ae(t),console.log("✅ Story deleted from local DB")}catch(s){console.error("❌ Local DB delete failed:",s),alert("Failed to delete story from local storage");return}if(navigator.onLine&&(n!=null&&n.photoUrl))try{await Le(t),console.log("✅ Story also deleted from API")}catch(s){console.warn("API delete failed (this is expected if API doesn't support deletion):",s)}await u(this,d,D).call(this),await u(this,d,T).call(this),u(this,d,O).call(this),console.log("Delete operation completed")}})})},O=function(){const e=document.getElementById("map");if(!e)return;const t=oe(),n=t.map(e).setView([-6.2,106.816666],10);t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(n),f(this,h).forEach(s=>{s.lat&&s.lon&&t.marker([s.lat,s.lon]).addTo(n).bindPopup(`<p>${s.description||"No description"}</p>`)})},de=async function(){const e=document.getElementById("sync-btn"),t=document.getElementById("sync-status");e.disabled=!0,e.textContent="Syncing...",t.textContent="Syncing offline stories...",t.className="sync-status syncing";try{const n=await H();n>0?(t.textContent=`Successfully synced ${n} stories!`,t.className="sync-status success",await u(this,d,D).call(this),await u(this,d,T).call(this),u(this,d,O).call(this)):(t.textContent="No offline stories to sync",t.className="sync-status")}catch(n){console.error("Sync failed:",n),t.textContent="Sync failed. Please try again.",t.className="sync-status error"}finally{e.disabled=!1,e.textContent="Sync Offline Stories",setTimeout(()=>{t.textContent="",t.className="sync-status"},5e3)}},ue=async function(){try{const e=await ie(),t=document.getElementById("sync-status"),n=document.getElementById("sync-btn");e.length>0?(t.textContent=`${e.length} offline stories waiting to sync`,t.className="sync-status warning",n.style.display="inline-block"):(t.textContent="All stories synced",t.className="sync-status success",n.style.display="none")}catch(e){console.warn("Failed to check sync status:",e)}},fe=async function(){console.log("Testing API connection...");try{const e=await _();console.log("✅ API test successful, got",e.length,"stories"),alert(`API test successful! Got ${e.length} stories.`)}catch(e){console.error("❌ API test failed:",e),alert(`API test failed: ${e.message}`)}},ge=async function(){console.log("=== DATABASE DEBUG ===");try{const t=await(await m()).getAll("stories");console.log("All stories in DB:",t),console.log(`Total stories: ${t.length}`);const n=t.filter(i=>i.photoUrl),s=t.filter(i=>!i.photoUrl);console.log(`Online stories: ${n.length}`),console.log(`Offline stories: ${s.length}`);const a=t.filter(i=>!i.synced);console.log(`Unsynced stories: ${a.length}`),alert(`DB Debug:
Total: ${t.length}
Online: ${n.length}
Offline: ${s.length}
Unsynced: ${a.length}`)}catch(e){console.error("DB debug failed:",e),alert("DB debug failed: "+e.message)}},pe=async function(){if(confirm("This will delete ALL stories from local storage. Continue?")){console.log("=== CLEARING ALL STORIES ===");try{const e=await m(),t=await e.getAll("stories");console.log(`Found ${t.length} stories to delete`);for(const n of t)await e.delete("stories",n.id),console.log(`Deleted story ${n.id}`);console.log("All stories cleared"),alert("All stories cleared from local storage"),await u(this,d,D).call(this),await u(this,d,T).call(this),u(this,d,O).call(this)}catch(e){console.error("Clear all failed:",e),alert("Failed to clear stories: "+e.message)}}};var S,E,A,me,he;class Ke{constructor(){w(this,A);w(this,S,null);w(this,E,null)}async render(){return`
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
    `}async afterRender(){await m(),u(this,A,me).call(this),u(this,A,he).call(this)}}S=new WeakMap,E=new WeakMap,A=new WeakSet,me=function(){const e=oe(),t=e.map("map").setView([-6.2,106.816666],10);e.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(t);let n;t.on("click",s=>{v(this,S,s.latlng.lat),v(this,E,s.latlng.lng),n&&t.removeLayer(n),n=e.marker(s.latlng).addTo(t),document.getElementById("coords").textContent=`${f(this,S)}, ${f(this,E)}`})},he=function(){const e=document.querySelector(".story-form"),t=document.querySelector(".message");document.getElementById("cancel-btn").onclick=()=>{window.location.hash="#/stories"},e.onsubmit=async n=>{if(n.preventDefault(),!f(this,S)||!f(this,E)){t.textContent="Please select location",t.classList.add("error"),t.classList.remove("success");return}const s=document.getElementById("photo").files[0],a=document.getElementById("description").value,i=new FormData;i.append("description",a),i.append("photo",s),i.append("lat",f(this,S)),i.append("lon",f(this,E));try{await te(i),t.textContent="Story added successfully",t.classList.add("success"),t.classList.remove("error")}catch{if(await K({description:a,lat:f(this,S),lon:f(this,E),photoBlob:s,photoType:s.type,synced:!1,createdAt:new Date().toISOString()}),t.textContent="Offline: story saved locally",t.classList.add("success"),t.classList.remove("error"),"serviceWorker"in navigator&&"SyncManager"in window){const c=await navigator.serviceWorker.ready;try{await c.sync.register("sync-stories"),console.log("Background sync registered")}catch(l){console.warn("Background sync registration failed",l)}}}setTimeout(()=>{window.location.hash="#/stories"},1200)}};var C,z;class Ye{constructor(){w(this,C)}async render(){return`
      <section>
        <div id="story-detail">
          <p>Loading story...</p>
        </div>
      </section>
    `}async afterRender(){await m();const e=document.getElementById("story-detail"),t=window.location.hash.split("/").pop();try{const s=(await _()).find(a=>a.id===t);if(s){await K({...s,synced:!0}),u(this,C,z).call(this,e,s);return}throw new Error("Not found online")}catch{const s=await Ve(t);s?u(this,C,z).call(this,e,s):e.innerHTML="<p>Story not found</p>"}}}C=new WeakSet,z=function(e,t){e.innerHTML=`
      <article>
        <img src="${t.photoUrl}" alt="${t.name}" />
        <h1>${t.name}</h1>
        <p>${t.description}</p>
        <small>${new Date(t.createdAt).toLocaleString()}</small>
      </article>
    `};class Qe{async render(){return`
      <section class="stories-section">
        <div class="container">
          <h1>Offline Stories</h1>
          <div id="offline-stories-list" class="stories-list">
            <div class="loading">Loading offline stories...</div>
          </div>
        </div>
      </section>
    `}async afterRender(){const e=document.getElementById("offline-stories-list");await this.renderStories(e)}async renderStories(e){try{const t=await V();t.length>0?e.innerHTML=t.map(n=>this.renderStoryCard(n)).join(""):e.innerHTML="<p>No stories saved for offline viewing.</p>",this.addDeleteEventListeners()}catch(t){console.error("Error rendering offline stories:",t),e.innerHTML="<p>Error loading offline stories.</p>"}}renderStoryCard(e){let t="";return e.photoBlob?t=URL.createObjectURL(e.photoBlob):e.photoUrl?t=e.photoUrl:t="/images/placeholder.png",`
      <div class="story-card" id="story-${e.id}">
        <img src="${t}" alt="Story photo" class="story-image">
        <div class="story-content">
          <p class="story-description">${e.description||"No description"}</p>
          <div class="story-meta">
            <time datetime="${e.createdAt}">${new Date(e.createdAt).toLocaleDateString()}</time>
            <button class="delete-button" data-id="${e.id}">Delete</button>
            <button class="save-button" data-id="${e.id}" ${e.synced?"disabled":""}>${e.synced?"Synced":"Save Offline"}</button>
          </div>
        </div>
      </div>
    `}addDeleteEventListeners(){document.querySelectorAll(".delete-button").forEach(t=>{t.addEventListener("click",async n=>{const s=n.target.dataset.id;if(confirm("Are you sure you want to delete this offline story?"))try{await ae(s);const a=document.getElementById(`story-${s}`);a&&a.remove();const i=document.getElementById("offline-stories-list");i.childElementCount===0&&(i.innerHTML="<p>No stories saved for offline viewing.</p>")}catch(a){console.error("Error deleting offline story:",a),alert("Failed to delete offline story.")}})})}}function Xe(o){return class extends o{async render(){return localStorage.getItem("token")?super.render():(setTimeout(()=>{window.location.hash="#/login"},100),`
          <section class="auth-section">
            <div class="auth-container">
              <h1>Access Denied</h1>
              <p>You need to login first to access this page.</p>
              <p>Redirecting to login page...</p>
              <p><a href="#/login">Click here if not redirected</a></p>
            </div>
          </section>
        `)}}}const Ze={"/":new Se,"/about":new Ee,"/login":new $e,"/register":new De,"/stories":new Je,"/add-story":new(Xe(Ke)),"/story/:id":new Ye,"/offline":new Qe};function et(o){const e=o.split("/");return{resource:e[1]||null,id:e[2]||null}}function tt(o){let e="";return o.resource&&(e=e.concat(`/${o.resource}`)),o.id&&(e=e.concat("/:id")),e||"/"}function ot(){return location.hash.replace("#","")||"/"}function nt(){const o=ot(),e=et(o);return tt(e)}var B,P,b,x,ye;class st{constructor({navigationDrawer:e,drawerButton:t,content:n}){w(this,x);w(this,B,null);w(this,P,null);w(this,b,null);v(this,B,n),v(this,P,t),v(this,b,e),u(this,x,ye).call(this)}async renderPage(){const e=nt(),t=Ze[e];"startViewTransition"in document?await document.startViewTransition(async()=>{f(this,B).innerHTML=await t.render(),await t.afterRender()}).finished:(f(this,B).innerHTML=await t.render(),await t.afterRender())}}B=new WeakMap,P=new WeakMap,b=new WeakMap,x=new WeakSet,ye=function(){f(this,P).addEventListener("click",()=>{f(this,b).classList.toggle("open")}),document.body.addEventListener("click",e=>{!f(this,b).contains(e.target)&&!f(this,P).contains(e.target)&&f(this,b).classList.remove("open"),f(this,b).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&f(this,b).classList.remove("open")})})};"serviceWorker"in navigator&&window.addEventListener("load",()=>{const o=window.location.hostname==="epicnab.github.io"?"/story-app-pwa/sw.js":"/sw.js";navigator.serviceWorker.register(o).then(e=>{console.log("ServiceWorker registration successful with scope: ",e.scope),console.log("ServiceWorker registered at:",o)}).catch(e=>{console.log("ServiceWorker registration failed: ",e),console.log("Attempted path:",o)})});function G(){const o=document.getElementById("nav-list"),t=!!localStorage.getItem("token");let n="";if(n+='<li><a href="#/">Beranda</a></li>',n+='<li><a href="#/about">About</a></li>',t?(n+='<li><a href="#/stories">Stories</a></li>',n+='<li><a href="#/add-story">Add Story</a></li>',n+='<li><a href="#/offline">Offline Stories</a></li>',n+='<li><a id="logout-btn" href="#/" style="cursor: pointer; color: #dc2626;">Logout</a></li>'):(n+='<li><a href="#/stories">Stories</a></li>',n+='<li><a href="#/login">Login</a></li>',n+='<li><a href="#/register">Register</a></li>'),o.innerHTML=n,t){const s=document.getElementById("logout-btn");s&&s.addEventListener("click",a=>{a.preventDefault(),localStorage.removeItem("token"),G(),window.location.hash="#/"})}}document.addEventListener("DOMContentLoaded",async()=>{const o=new st({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});G(),await o.renderPage(),window.addEventListener("hashchange",async()=>{await o.renderPage(),G()});let e=navigator.onLine;async function t(s){if(s&&!e){console.log("Network back online, syncing offline stories...");try{const a=await H();a>0&&(console.log(`Successfully synced ${a} stories`),(window.location.hash==="#/stories"||window.location.hash==="#/offline")&&await o.renderPage())}catch(a){console.warn("Auto-sync failed:",a)}}e=s}async function n(){if(navigator.onLine){console.log("Checking for unsynced stories on app load...");try{const s=await H();s>0&&(console.log(`Successfully synced ${s} stories on app load`),(window.location.hash==="#/stories"||window.location.hash==="#/offline")&&await o.renderPage())}catch(s){console.warn("Initial sync failed:",s)}}}window.addEventListener("online",()=>t(!0)),window.addEventListener("offline",()=>t(!1)),document.addEventListener("visibilitychange",()=>{!document.hidden&&navigator.onLine&&!e&&t(!0)}),await n()});export{I as C};
