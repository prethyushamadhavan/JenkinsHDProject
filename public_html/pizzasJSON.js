const pizzaSalesListJSON = {
  pizzas: [
    { name: "Americana", numberSold: 7912, userRating: 2.3 },
    { name: "Hawaiian", numberSold: 5499, userRating: 4.3 },
    { name: "Capricciosa", numberSold: 1141, userRating: 3.8 },
    { name: "Margherita", numberSold: 12957, userRating: 2.0 },
    { name: "Vegetarian", numberSold: 2366, userRating: 4.9 },
    { name: "Cheese and Garlic", numberSold: 10090, userRating: 4.3 },
    { name: "Roast Special", numberSold: 4789, userRating: 3.8 },
    { name: "Avocado", numberSold: 223, userRating: 1.5 },
    { name: "Pesto Fetta", numberSold: 5829, userRating: 4.6 },
  ],
};

function salesCategory(userRating) {
  if (userRating < 2.0) {
    return "Below Average";
  } else if (userRating < 3.0) {
    return "Pretty Good";
  } else if (userRating < 4.0) {
    return "Great";
  } else if (userRating < 4.5) {
    return "Fantastic";
  } else {
    return "Outstanding";
  }
}

function generatePizzaSalesTable() {
  const table = document.getElementById("pizzaSalesTable");
  const summaryDiv = document.getElementById("summary");

  table.innerHTML = "";
  summaryDiv.innerHTML = "";
  summaryDiv.style.display = "inline-block";

  const headerRow = table.insertRow(0);
  const headers = [
    "Pizza Name",
    "Number Sold",
    "User Rating",
    "Sales Category",
  ];

  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  pizzaSalesListJSON.pizzas.forEach((pizza) => {
    const row = table.insertRow(-1);

    Object.values(pizza).forEach((value) => {
      const cell = row.insertCell();
      cell.appendChild(document.createTextNode(value));
    });

    const salesCategoryCell = row.insertCell();
    const category = salesCategory(pizza.userRating);
    salesCategoryCell.appendChild(document.createTextNode(category));
  });

  const averageNumberSold = calculateAverage(
    pizzaSalesListJSON.pizzas.map((pizza) => pizza.numberSold)
  );
  const bestSellingPizza = findBestSellingPizza(pizzaSalesListJSON.pizzas);
  const averageUserRating = calculateAverage(
    pizzaSalesListJSON.pizzas.map((pizza) => pizza.userRating)
  );

  summaryDiv.innerHTML = `
    <p>Some statistics on the pizza sold across all types:</p>
    <ul>
        <li>Average Number of Pizzas Sold:<strong> ${averageNumberSold}</strong></li>
        <li>Best selling pizza name: <strong>${
          bestSellingPizza.name
        }</strong> </li>
        <li>Best selling pizza total: <strong>${
          bestSellingPizza.numberSold
        }</strong></li>
        <li>User Rating: <strong>${averageUserRating.toFixed(2)}</strong></li>
    </ul>
    <p> Averages calculated from summing up all the number Soldand user Rating values and dividing each by the total number of pizzas in the list</p>
`;
}

function calculateAverage(values) {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

function findBestSellingPizza(pizzas) {
  return pizzas.reduce(
    (bestSelling, currentPizza) => {
      return currentPizza.numberSold > bestSelling.numberSold
        ? currentPizza
        : bestSelling;
    },
    { numberSold: 0 }
  );
}
