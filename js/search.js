// search plugin
// filters components on page based on url or search box
// syntax: term1 term2 "full phrase 1" "full phrase 2" "tag: tag 1"

// components to filter
<<<<<<< HEAD
const componentQuery = ".card, .citation, .post_excerpt";
// search box element
const boxQuery = ".search_box";
// results info element
const infoQuery = ".search_info";
// show info only if some items filtered or tags searched
const smartInfo = true;

// normalize tag string to lower-case, single-space-separated, trimmed, etc
const cleanTag = (tag) =>
  tag
    .toLowerCase()
    .split(/\s|-|,|tag:/g)
    .map((w) => w.trim())
    .filter((w) => w)
    .join(" ");
=======
const componentSelector = ".card, .citation, .post_excerpt";
// search box element
const boxSelector = ".search_box";
// results info element
const infoSelector = ".search_info";
// tags element
const tagSelector = ".tag";
>>>>>>> template/main

// split search query into terms, phrases, and tags
const splitQuery = (query) => {
  // split into parts by spaces but preserve quoted sub-strings
<<<<<<< HEAD
  const parts = (query.match(/(".*?"|[^"\s]+)(?=\s*|\s*$)/g) || [])
    .map((string) => string.trim().toLowerCase())
    .filter((string) => string);
=======
  const parts = query.match(/(".*?"|[^"\s]+)(?=\s*|\s*$)/g) || [];
>>>>>>> template/main

  // bins
  const terms = [];
  const phrases = [];
  const tags = [];

  // put parts into bins
  for (let part of parts) {
    if (part.includes('"')) {
<<<<<<< HEAD
      part = part.split('"').join("");
      if (part.indexOf("tag:") === 0) tags.push(cleanTag(part));
      else phrases.push(part);
    } else {
      terms.push(part);
=======
      part = normalizeString(part);
      if (part.indexOf("tag:") === 0) tags.push(part.replace(/tag:\s*/, ""));
      else phrases.push(part);
    } else {
      terms.push(normalizeString(part));
>>>>>>> template/main
    }
  }

  return { terms, phrases, tags };
};

// determine if component should show up in results based on query
const componentMatches = (component, { terms, phrases, tags }) => {
  // tag elements within component
  const componentTags = Array.from(component.querySelectorAll(".tag"));

  // check if text content exists in component
  const hasText = (string) =>
<<<<<<< HEAD
    component.innerText.toLowerCase().includes(string);
  // check if text matches a tag in component
  const hasTag = (string) =>
    componentTags.some((tag) => cleanTag(tag.innerText) === string);
=======
    normalizeString(component.innerText).includes(string);
  // check if text matches a tag in component
  const hasTag = (string) =>
    componentTags.some((tag) => normalizeString(tag.innerText) === string);
>>>>>>> template/main

  // show component if it has:
  // all terms AND at least one phrase AND at least one tag
  return (
    (terms.every(hasText) || !terms.length) &&
    (phrases.some(hasText) || !phrases.length) &&
    (tags.some(hasTag) || !tags.length)
  );
};

// loop through components, hide/show based on query, and return results info
const filterComponents = (parts) => {
<<<<<<< HEAD
  let components = document.querySelectorAll(componentQuery);
=======
  let components = document.querySelectorAll(componentSelector);
>>>>>>> template/main

  // results info
  let x = 0;
  let n = components.length;
<<<<<<< HEAD
  let t = parts.tags;
=======
  let tags = parts.tags;
>>>>>>> template/main

  // filter components
  for (const component of components) {
    if (componentMatches(component, parts)) {
      component.dataset.hide = false;
      x++;
      highlightTerms(component, parts);
    } else {
      component.dataset.hide = true;
    }
  }

<<<<<<< HEAD
  return [x, n, t];
=======
  return [x, n, tags];
>>>>>>> template/main
};

// reset highlights
const resetHighlights = () => {
  // make sure Mark library available
  if (typeof Mark === "undefined") return;

  new Mark(document.body).unmark();
};

// highlight search terms in component
const highlightTerms = (component, { terms, phrases }) => {
  // make sure Mark library available
  if (typeof Mark === "undefined") return;

  // highlight terms
  // to avoid slowdown, only highlight if more than a few letters searched
  for (const term of terms)
    if (term.length > 2)
      new Mark(component).mark(term, { separateWordSearch: true });

  // highlight phrases
  for (const phrase of phrases)
    if (phrase.length > 2)
      new Mark(component).mark(phrase, { separateWordSearch: false });
};

// update search box
<<<<<<< HEAD
const updateBox = (query) => {
  const boxes = document.querySelectorAll(boxQuery);
=======
const updateBox = (query = "") => {
  const boxes = document.querySelectorAll(boxSelector);
>>>>>>> template/main
  for (const box of boxes) {
    const input = box.querySelector("input");
    const button = box.querySelector("button");
    const icon = box.querySelector("button i");
    input.value = query;
    icon.className = input.value.length ? "fas fa-times" : "fas fa-search";
    button.disabled = input.value.length ? false : true;
  }
};

// update search results info
<<<<<<< HEAD
const updateInfo = (x, n, t) => {
  // hide all info boxes
  window.trueHide(infoQuery);

  // smart hide/show info
  if (smartInfo && !(x < n || t.length)) return;

  // show
  window.trueShow(infoQuery);

  // info template
  let info = "";
  info += `Showing ${x.toLocaleString()} of ${n.toLocaleString()}<br>`;
  if (t.length) {
    const s = t.length > 1 ? "s" : "";
    t = t.map((tag) => `"${tag}"`).join(", ");
    info += `With tag${s} ${t}`;
  }

  // set info HTML string
  document.querySelectorAll(infoQuery).forEach((el) => (el.innerHTML = info));
};

// util func to debounce search
const debounce = (func, delay) => (...args) => {
  window.clearTimeout(window.searchTimer);
  window.searchTimer = window.setTimeout(() => func(...args), delay);
};

// search and filter components
const searchComponents = debounce((query) => {
  resetHighlights();
  const parts = splitQuery(query);
  const [x, n, t] = filterComponents(parts);
  updateBox(query);
  updateInfo(x, n, t);
}, 200);

// search based on url param
const urlSearch = () => {
  const query = new URLSearchParams(window.location.search).get("search") || "";
  searchComponents(query.trim());
=======
const updateInfo = (query, x, n) => {
  // hide all info boxes
  window.trueHide(infoSelector);

  // hide info if nothing searched
  if (!query.trim()) return;

  // show
  window.trueShow(infoSelector);

  // info template
  let info = "";
  info += `Showing ${x.toLocaleString()} of ${n.toLocaleString()} results<br>`;
  info += "<a href='./'>Clear search</a>";

  // set info HTML string
  document
    .querySelectorAll(infoSelector)
    .forEach((el) => (el.innerHTML = info));
};

// update tag active color
const updateTags = (query) => {
  const { tags } = splitQuery(query);
  document
    .querySelectorAll(tagSelector)
    .forEach(
      (tag) =>
        (tag.dataset.active = tags.includes(normalizeString(tag.innerText)))
    );
};

// search and filter components
const searchComponents = (query = "") => {
  resetHighlights();
  const parts = splitQuery(query);
  const [x, n] = filterComponents(parts);
  updateBox(query);
  updateInfo(query, x, n);
  updateTags(query);
};

// update url from search
const updateUrl = (query = "") => {
  const { origin, pathname } = window.location;
  const url = origin + pathname + (query ? "?search=" + query : "");
  window.history.replaceState(null, null, url);
};

// search based on url param
const searchFromUrl = () => {
  const query = new URLSearchParams(window.location.search).get("search") || "";
  searchComponents(query);
>>>>>>> template/main
};

// when user types into search box
const onSearchInput = (target) => {
<<<<<<< HEAD
  searchComponents(target.value);
=======
  debounce(() => searchComponents(target.value), 200, "searchDebounce");
  debounce(() => updateUrl(target.value), 500, "urlDebounce");
>>>>>>> template/main
};

// when user clears search box with button
const onSearchClear = () => {
<<<<<<< HEAD
  searchComponents("");
};

// start script and add triggers
window.addEventListener("load", urlSearch);
window.addEventListener("load", () => updateBox(""));
window.addEventListener("tagsfetched", urlSearch);
=======
  debounce(searchComponents, 100, "searchDebounce");
  debounce(updateUrl, 100, "urlDebounce");
};

// start script and add triggers
window.addEventListener("load", searchFromUrl);
window.addEventListener("tagsfetched", searchFromUrl);
>>>>>>> template/main
