function buildPizzaList() {
  const pizzaArray = [
    "Americana",
    "Hawaiian",
    "Capricciosa",
    "Margherita",
    "Vegetarian",
    "Cheese and Garlic",
    "Roast Special",
    "Avocado",
    "Pesto Fetta",
  ];

  const pizzaMenuDiv = document.getElementById("pizza-menu");

  const listPlaceholder = document.getElementById("list_placeholder");
  pizzaMenuDiv.removeChild(listPlaceholder);

  const pizzaList = document.createElement("ul");

  pizzaArray.forEach((pizza) => {
    const listItem = document.createElement("li");
    listItem.textContent = pizza;
    pizzaList.appendChild(listItem);
  });

  pizzaMenuDiv.appendChild(pizzaList);

}
