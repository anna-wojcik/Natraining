const filterForm = document.querySelector(".filters-form");

if (filterForm) {
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const trainingType = document.getElementById("trainingType").value;
    const level = document.getElementById("level").value;
    const price = document.getElementById("price").value;
    const name = document.getElementById("name").value;

    const url = new URL("/", window.location.origin);

    if (trainingType !== "all")
      url.searchParams.append("trainingType", trainingType);
    if (level !== "all") url.searchParams.append("level", level);
    if (name) url.searchParams.append("name", name);

    if (price !== "all") {
      const parts = price.split(",");

      parts.forEach((part) => {
        const [operator, value] = part.split("=");
        url.searchParams.append(`price${operator}`, value);
      });
    }

    window.location.href = url.toString();
  });
}
