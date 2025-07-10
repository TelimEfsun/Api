var namazList = document.getElementById("namazList");
var cityBox = document.getElementById("cityBox");
var yearBox = document.getElementById("yearBox");
var monthBox = document.getElementById("monthBox");


var currentMonth = new Date().getMonth() + 1;  //faktiki olan ayi default olaraq gosterir
monthBox.value=currentMonth;

function getMonth(month) {
  switch (month) {
    case "Monday":
      return "Bazar ertəsi";
      break;
    case "Tuesday":
      return "Çərşənbə axşamı";
      break;
    case "Wednesday":
      return "Çərşənbə";
      break;
    case "Thursday":
      return "Cümə axşamı";
      break;
    case "Friday":
      return "Cümə";
      break;
    case "Saturday":
      return "Şənbə";
      break;
    case "Sunday":
      return "Bazar";
      break;
    default:
      return "";
      break;
  }
}

function fetchData(month, year, city) {
  fetch(`https://api.aladhan.com/v1/calendarByCity?city=${city}&country=AZ&method=3&month=${month}&year=${year}`)
    .then(response => response.json())
    .then(json => {
      console.log(json);

      var html = "";

      json.data.forEach(day => {
        html += `
        <tr>
            <td>${day.date.gregorian.date}</td>
            <td>${day.date.hijri.date}</td>
            <td>${getMonth(day.date.gregorian.weekday.en)}</td>
            <td>${day.timings.Imsak}</td>
            <td>${day.timings.Fajr}</td>
            <td>${day.timings.Sunrise}</td>
            <td>${day.timings.Dhuhr}</td>
            <td>${day.timings.Asr}</td>
            <td>${day.timings.Sunset}</td>
            <td>${day.timings.Maghrib}</td>
            <td>${day.timings.Isha}</td>
            <td>${day.timings.Midnight}</td>            
        </tr>
      `;
      });

      namazList.innerHTML = html;
    });
}

fetchData(new Date().getMonth() + 1, new Date().getFullYear(), "Baku");

cityBox.addEventListener("change", function () {
  fetchData(monthBox.value, yearBox.value, this.value)
})

monthBox.addEventListener("change", function () {
  fetchData(this.value, yearBox.value, cityBox.value)
})


