(function () {
  const map = {
    "index.html": "nav-home",
    "generator.html": "nav-generator",
    "categories.html": "nav-categories",
    "category.html": "nav-categories",
    "mood.html": "nav-mood",
    "wall.html": "nav-wall",
    "about.html": "nav-about",
  };
  const path = (location.pathname.split("/").pop() || "index.html");
  const id = map[path];
  if (id) document.getElementById(id)?.classList.add("active");
})();