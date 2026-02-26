(function(){
  const list = document.getElementById("wallList");
  const search = document.getElementById("wallSearch");
  const openBtn = document.getElementById("openWallPost");
  const modal = document.getElementById("wallModal");
  const closeBtn = document.getElementById("closeWallPost");
  const saveBtn = document.getElementById("saveWallPost");
  const tpl = document.getElementById("tpl");
  const addon = document.getElementById("addon");

  const getWall = ()=>{ try{return JSON.parse(localStorage.getItem("ps_wall")||"[]")}catch{return[]} };
  const setWall = (arr)=> localStorage.setItem("ps_wall", JSON.stringify(arr));
  const getFavs = ()=>{ try{return JSON.parse(localStorage.getItem("ps_favs")||"[]")}catch{return[]} };
  const esc = (s)=> (s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");

  function render(){
    const q=(search.value||"").toLowerCase().trim();
    list.innerHTML="";

    const favs=getFavs().slice(0,6);
    if(favs.length){
      const box=document.createElement("div");
      box.className="soft-panel";
      box.innerHTML=`<div style="font-family:Nunito,system-ui,sans-serif;font-weight:900;margin-bottom:8px">Favourites</div>`;
      favs.forEach(m=>{
        const p=document.createElement("div");
        p.className="post";
        p.innerHTML = `<div class="head"><div class="small">Saved compliment</div><div></div></div><div class="msg">${esc(m)}</div>`;
        box.appendChild(p);
      });
      list.appendChild(box);
      const sp=document.createElement("div"); sp.style.height="12px"; list.appendChild(sp);
    }

    const wall=getWall().filter(p => (p.msg||"").toLowerCase().includes(q));
    if(!wall.length){
      const empty=document.createElement("div");
      empty.className="notice";
      empty.textContent="No posts yet — add one using New Post.";
      list.appendChild(empty);
      return;
    }
    wall.forEach(p=>{
      const el=document.createElement("div");
      el.className="post";
      el.innerHTML = `<div class="head"><div class="small">Appreciation</div=<div class="msg">${esc(p.msg)}</div><div class="time">${esc(p.time)}</div>`;
      list.appendChild(el);
    });
  }

  openBtn.addEventListener("click", ()=>{ modal.style.display="block"; addon.value=""; });
  closeBtn.addEventListener("click", ()=>{ modal.style.display="none"; });
  modal.addEventListener("click", (e)=>{ if(e.target===modal) modal.style.display="none"; });

  saveBtn.addEventListener("click", ()=>{
    const base=(tpl.value||"").trim();
    const add=(addon.value||"").trim();
    const msg = add ? `${base} — ${add}` : base;
    const wall=getWall();
    wall.unshift({msg,time:new Date().toLocaleString()});
    setWall(wall.slice(0,60));
    modal.style.display="none";
    render();
  });

  search.addEventListener("input", render);
  render();
})();