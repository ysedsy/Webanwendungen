document.addEventListener("DOMContentLoaded", async () => {
  const includeElements = Array.from(
    document.querySelectorAll("[data-include]"),
  );

  await Promise.all(
    includeElements.map(async (element) => {
      const includePath = element.getAttribute("data-include");
      if (!includePath) {
        return;
      }

      try {
        const response = await fetch(includePath);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        element.innerHTML = await response.text();

        const presetSearchValue = element.getAttribute("data-search-value");
        if (presetSearchValue !== null) {
          const searchInput = element.querySelector(".search-bar");
          if (searchInput) {
            searchInput.value = presetSearchValue;
          }
        }
      } catch (error) {
        console.error(`Include could not be loaded: ${includePath}`, error);
      }
    }),
  );
  headerInit();
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("keyword");
  if (keyword !== null) {
    document.getElementById("search-bar").value = keyword;
  }
});
