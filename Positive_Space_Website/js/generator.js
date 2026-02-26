(function(){
  const catSel = document.getElementById("category");
  const toneSel = document.getElementById("tone");
  const textEl = document.getElementById("complimentText");
  const genBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const favBtn = document.getElementById("favBtn");
  if (!catSel || !textEl) return;

  catSel.innerHTML = "";
  catSel.appendChild(new Option("All categories", "all"));
  CATEGORIES.forEach(c => catSel.appendChild(new Option(`${c.icon} ${c.name}`, c.id)));

  function applyTone(str){
    const tone = toneSel?.value || "default";
    if (tone==="fun") return str.replace(/\.$/,"!") + " 😄";
    if (tone==="calm") return "Take a breath. " + str;
    return str;
  }
  const rand = (arr)=>arr[Math.floor(Math.random()*arr.length)];

  function generate(){
    let pool=[];
    if (catSel.value==="all"){
      Object.values(COMPLIMENTS).forEach(list => pool = pool.concat(list));
    } else {
      pool = COMPLIMENTS[catSel.value] || [];
    }
    const msg = applyTone(rand(pool.length?pool:["You matter, and you’re doing your best."]));
    textEl.textContent = msg;
    return msg;
  }

  function getFavs(){ try{return JSON.parse(localStorage.getItem("ps_favs")||"[]")}catch{return[]} }
  function setFavs(f){ localStorage.setItem("ps_favs", JSON.stringify(f)); }

  genBtn?.addEventListener("click", generate);
  copyBtn?.addEventListener("click", async ()=>{
    try{ await navigator.clipboard.writeText(textEl.textContent.trim()); copyBtn.textContent="Copied!"; setTimeout(()=>copyBtn.textContent="Copy",900);}catch{}
  });
  favBtn?.addEventListener("click", ()=>{
    const msg=textEl.textContent.trim();
    const favs=getFavs();
    if(!favs.includes(msg)) favs.unshift(msg);
    setFavs(favs.slice(0,50));
    favBtn.textContent="Saved!";
    setTimeout(()=>favBtn.textContent="Save to Favourites",900);
  });

  generate();
})();