for (const select of document.querySelectorAll("[data-navigate]"))
  select.addEventListener("change", () => location.assign(select.value));
const search = document.querySelector("#search");
search?.addEventListener("input", () => {
  for (const link of document.querySelectorAll("nav a"))
    link.hidden = !link.textContent
      .toLowerCase()
      .includes(search.value.toLowerCase());
});
const script = document.querySelector("script[data-copy]");
for (const pre of document.querySelectorAll("pre")) {
  const button = document.createElement("button");
  button.className = "copy";
  button.textContent = script.dataset.copy;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(
        pre.querySelector("code").textContent,
      );
      button.textContent = script.dataset.copied;
      setTimeout(() => (button.textContent = script.dataset.copy), 1500);
    } catch {
      button.remove();
    }
  });
  pre.append(button);
}
