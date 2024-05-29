function submitFeedback() {
    var customerName = document.getElementById("Name").value;
    var feedbackMessage = document.getElementById("feedbackMessage").value;
    var rating = document.getElementById("rating").value;

    var tableBody;
    if (rating === "Excellent" || rating === "Good") {
      tableBody = document.getElementById("positiveTableBody");
    } else {
      tableBody = document.getElementById("negativeTableBody");
    }

    var row = tableBody.insertRow(tableBody.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = customerName;
    cell2.innerHTML = feedbackMessage;
    cell3.innerHTML = rating;

    document.getElementById("Name").value = "";
    document.getElementById("feedbackMessage").value = "";
    document.getElementById("rating").value = "Excellent";
  }