(function(){
  const btn=document.getElementById("resetLocal");
  btn?.addEventListener("click", ()=>{
    if(!confirm("Reset local data on this device? This cannot be undone.")) return;
    Object.keys(localStorage).forEach(k=>{ if(k.startsWith("ps_")) localStorage.removeItem(k); });
    alert("Local data cleared.");
  });
})();