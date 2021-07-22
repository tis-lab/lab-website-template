// on 404, redirect if path matches any entry in redirects tsv map
const list =
  "https://storage.googleapis.com/tislab-redirects/tislab.org-redirects.tsv";
const redirect = async () => {
  const tsv = await (await fetch(list)).text();
  const rows = tsv.split("\n").map((line) => line.split("\t"));
  const path = window.location.pathname.slice(1);
  const match = rows.find(([from]) => from === path);
  if (!match) return;
  const [from, to] = match;
  console.log(`Redirecting from ${from} to ${to}`);
  window.location.href = to;
};

redirect();
