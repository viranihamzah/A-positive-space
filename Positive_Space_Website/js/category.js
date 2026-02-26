(function(){
  const params = new URLSearchParams(location.search);
  const catId = params.get("cat") || "confidence";
  const cat = CATEGORIES.find(c=>c.id===catId) || CATEGORIES[0];

  const title = document.getElementById("catTitle");
  const desc = document.getElementById("catDesc");
  const list = document.getElementById("postList");
  const modal = document.getElementById("modal");
  const newBtn = document.getElementById("newPostBtn");
  const saveBtn = document.getElementById("savePostBtn");
  const cancelBtn = document.getElementById("cancelPostBtn");
  const msgInput = document.getElementById("newMsg");

  title.textContent = `${cat.icon} ${cat.name}`;
  desc.textContent = "Compliments within a category are displayed as stacked cards. A “New Post” button allows adding a positive message locally.";

  const key = `ps_cat_extra_${cat.id}`;
  const getExtra = ()=>{ try{return JSON.parse(localStorage.getItem(key)||"[]")}catch{return[]} };
  const setExtra = (arr)=> localStorage.setItem(key, JSON.stringify(arr));
  const getFavs = ()=>{ try{return JSON.parse(localStorage.getItem("ps_favs")||"[]")}catch{return[]} };

  const esc = (s)=> (s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");

  function render(){
    list.innerHTML = "";
    const base = (COMPLIMENTS[cat.id]||[]).map(m=>({msg:m,time:"Preset"}));
    const extra = getExtra().map(x=>({msg:x.msg,time:x.time}));
    const items = extra.concat(base);

    items.forEach(it=>{
      const el=document.createElement("div");
      el.className="post";
      el.innerHTML = `
        <div class="head"><div class="small"> ${cat.name}</div><div></div></div>
        <div class="msg">${esc(it.msg)}</div>
        <div class="time">${esc(it.time)}</div>
        <div class="btn-row">
          <button class="btn ghost" data-copy="${encodeURIComponent(it.msg)}" type="button">Copy</button>
          <button class="btn primary" data-fav="${encodeURIComponent(it.msg)}" type="button">Favourite</button>
        </div>
      `;
      list.appendChild(el);
    });

    list.querySelectorAll("button[data-copy]").forEach(b=>{
      b.addEventListener("click", async ()=>{
        const msg=decodeURIComponent(b.dataset.copy);
        try{ await navigator.clipboard.writeText(msg); b.textContent="Copied!"; setTimeout(()=>b.textContent="Copy",800);}catch{}
      });
    });
    list.querySelectorAll("button[data-fav]").forEach(b=>{
      b.addEventListener("click", ()=>{
        const msg=decodeURIComponent(b.dataset.fav);
        const favs=getFavs();
        if(!favs.includes(msg)) favs.unshift(msg);
        localStorage.setItem("ps_favs", JSON.stringify(favs.slice(0,50)));
        b.textContent="Saved!";
        setTimeout(()=>b.textContent="Favourite",800);
      });
    });
  }

  newBtn.addEventListener("click", ()=>{ modal.style.display="block"; msgInput.value=""; msgInput.focus(); });
  cancelBtn.addEventListener("click", ()=>{ modal.style.display="none"; });
  modal.addEventListener("click", (e)=>{ if(e.target===modal) modal.style.display="none"; });

  saveBtn.addEventListener("click", ()=>{
    const msg=(msgInput.value||"").trim();
    if(!msg) return;
    const extra=getExtra();
    extra.unshift({msg,time:new Date().toLocaleString()});
    setExtra(extra.slice(0,25));
    modal.style.display="none";
    render();
  });

  render();
})();