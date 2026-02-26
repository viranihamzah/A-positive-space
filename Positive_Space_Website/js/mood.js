(function(){
  const buttons = Array.from(document.querySelectorAll(".mood-btn"));
  const note = document.getElementById("moodNote");
  const save = document.getElementById("saveMoodBtn");
  const saved = document.getElementById("moodSaved");
  const suggest = document.getElementById("suggestText");
  let current = null;

  const setActive = (m)=>{
    current = m;
    buttons.forEach(b=>b.classList.toggle("active", b.dataset.mood===m));
  };

  buttons.forEach(b=>b.addEventListener("click", ()=>setActive(b.dataset.mood)));

  const suggestionFor = (m)=>{
    if(m==="Happy") return "Nice! Share positivity on the Appreciation Wall.";
    if(m==="Neutral") return "Try a quick compliment to boost your mood.";
    if(m==="Anxious") return "Browse categories and pick an encouraging message.";
    if(m==="Stressed") return "Generate an encouragement compliment, then take a short break.";
    return "Save a mood to get a suggestion.";
  };

  save.addEventListener("click", ()=>{
    if(!current){ saved.textContent="Please select a mood first."; return; }
    const entry={mood:current,note:(note.value||"").trim(),time:new Date().toLocaleString()};
    localStorage.setItem("ps_last_mood", JSON.stringify(entry));
    saved.textContent = `Thanks for checking in Your mood (“${entry.mood}”) has been saved.`;
    suggest.textContent = suggestionFor(entry.mood);
  });

  try{
    const last=JSON.parse(localStorage.getItem("ps_last_mood")||"null");
    if(last){
      setActive(last.mood);
      note.value = last.note || "";
      saved.textContent = `Last saved: ${last.mood} • ${last.time}`;
      suggest.textContent = suggestionFor(last.mood);
    }
  }catch{}
})();