(function(){
  const grid = document.getElementById("categoryGrid");
  const search = document.getElementById("catSearch");
  if (!grid) return;

  function render(list){
    grid.innerHTML = "";
    list.forEach(c=>{
      const el = document.createElement("a");
      el.className = "tile";
      el.href = `category.html?cat=${encodeURIComponent(c.id)}`;
      el.innerHTML = `
        <div class="title">${c.icon} ${c.name}</div>
        <div class="meta">${c.desc}</div>
      `;
      grid.appendChild(el);
    });
  }

  render(CATEGORIES);

  search?.addEventListener("input", ()=>{
    const q = (search.value||"").toLowerCase().trim();
    render(CATEGORIES.filter(c => (c.name+c.desc+c.id).toLowerCase().includes(q)));
  });
})();