      function createTable() {
        var maxValueInput = document.getElementById("maxValue");
        var divisorInput = document.getElementById("divisor");

        var maxValue = parseInt(maxValueInput.value);
        var divisor = parseInt(divisorInput.value);

        if (isNaN(maxValue) || maxValue < 0 || maxValue > 500) {
          window.alert(
            "Warning! Must be between 1 and 500. Setting to default value of 100."
          );
          maxValue = 100;
          maxValueInput.value = maxValue;
        }

        if (isNaN(divisor) || divisor <= 0) {
          window.alert(
            "Warning! Divisor cannot be 0. Setting to default value of 1."
          );
          divisor = 1;
          divisorInput.value = divisor;
        }

        var outputTable = document.getElementById("outputTable");
        outputTable.innerHTML = "";

        let tbl = document.createElement("table");
        tbl.classList.add("table");

        for (var i = 0; i < maxValue; i++) {
          if (i % 10 === 0) {
            var row = document.createElement("tr");
          }

          var cell = document.createElement("td");
          var cellValue = i;

          if (isDivisible(cellValue, divisor)) {
            cell.textContent = cellValue;
            cell.className = "highlight";
          } else {
            cell.textContent = cellValue;
          }

          row.appendChild(cell);

          if (i % 10 === 9 || i === maxValue - 1) {
            tbl.appendChild(row);
          }
        }

        outputTable.appendChild(tbl);
      }

      function isDivisible(number, divisor) {
        return number % divisor === 0;
      }
