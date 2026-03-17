// change theme
function themeToggle() {
  let rootElement = document.documentElement;
  let themeBtn = document.querySelector(".nav #theme");
  let flag = 0;

  themeBtn.addEventListener("click", function () {
    if (flag == 0) {
      rootElement.style.setProperty("--primary1", "#40513B");
      rootElement.style.setProperty("--secondary1", "#628141");
      rootElement.style.setProperty("--secondaryDark1", "#E5D9B6");
      rootElement.style.setProperty("--tri1", "#E67E22");
      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--primary1", "#15173D");
      rootElement.style.setProperty("--secondary1", "#982598");
      rootElement.style.setProperty("--secondaryDark1", "#E491C9");
      rootElement.style.setProperty("--tri1", "#F1E9E9");
      flag = 2;
    } else {
      rootElement.style.setProperty("--primary1", "#F4EEFF");
      rootElement.style.setProperty("--secondary1", "#DCD6F7");
      rootElement.style.setProperty("--secondaryDark1", "#A6B1E1");
      rootElement.style.setProperty("--tri1", "#424874");
      flag = 0;
    }
  });
}
themeToggle();

// weather work
function weather() {
  let temperature = document.querySelector(".weather-deatils #temp");
  let maxTemp = document.querySelector(".weather-deatils #max-temp");
  let feelsLike = document.querySelector(".weather-deatils #feel-like");
  let wind = document.querySelector(".weather-deatils #wind");
  let humidity = document.querySelector(".weather-deatils #humidity");
  

  async function getWeather(city) {
    try {
      let apikey = `9057cd4918adbad4ade8a1fb44873b43`;
      let raw = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`,
      );
      if (!raw.ok) {
        throw new Error("city not found, try something else!");
      }

      let realdata = await raw.json();
      wind.innerHTML = `Wind: ${realdata.wind.speed}km/h`;
      temperature.innerHTML = `${realdata.main.temp}`;
      maxTemp.innerHTML = `${realdata.main.temp_max}`;
      feelsLike.innerHTML = `${realdata.main.feels_like}`;
      humidity.innerHTML = `Humidity: ${realdata.main.humidity} %`;
      

      if (realdata.main.temp < 0) {
        alert(`too cold out there...${realdata.main.temp}^c`);
      }
      if (realdata.main.temp > 40) {
        alert(`too hot out there...${realdata.main.temp}^c`);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  getWeather("lucknow");
}
weather();

// time date manage
function manageTimeDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = document.querySelector(".date-time #day");
  let time = document.querySelector(".date-time #time");
  let date = document.querySelector(".date-time #date");
  let greet = document.querySelector(".date-time #greet");
  let main = document.querySelector('.main');

  function manageCalender() {
    let currentDate = new Date();
    day.innerHTML = `${days[currentDate.getDay()]}`;
    if (currentDate.getHours() > 12) {
      time.innerHTML = `${String(currentDate.getHours() - 12).padStart("2", "0")}:${String(currentDate.getMinutes()).padStart("2", "0")}:${String(currentDate.getSeconds()).padStart("2", "0")} PM`;
    } else {
      time.innerHTML = `${String(currentDate.getHours() - 12).padStart("2", "0")}:${String(currentDate.getMinutes()).padStart("2", "0")}:${String(currentDate.getSeconds()).padStart("2", "0")} AM`;
    }
    date.innerHTML = `${String(currentDate.getDate()).padStart("2", "0")}-${months[currentDate.getMonth()]}-${currentDate.getFullYear()}`;
    if(currentDate.getHours() > 12 && currentDate.getHours() < 18){
      greet.innerHTML = 'Good Afternoon, Sir'
      main.style.backgroundImage = "url('https://images.unsplash.com/photo-1525490829609-d166ddb58678?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VufGVufDB8fDB8fHww')";
    } else  if(currentDate.getHours() >=17 && currentDate.getHours() < 23){
      greet.innerHTML = 'Good Night, Sir'
        main.style.backgroundImage = "url('https://images.unsplash.com/photo-1590418606746-018840f9cd0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHR8ZW58MHx8MHx8fDA%3D')";
    }  else{
      greet.innerHTML = 'Good Morning, Sir'
      main.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1720522196099-ee68ba8ed6c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9ybmluZ3xlbnwwfHwwfHx8MA%3D%3D')";
    }

  } 
  setInterval(() => {
    manageCalender();
  }, 1000);
}
manageTimeDate();

// back button function
function backFunction() {
  let featuer = document.querySelectorAll(".featuer");
  let fullPage = document.querySelectorAll(".fullpage");
  let backBtn = document.querySelectorAll(".fullpage .back");

  featuer.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullPage[elem.id].style.display = "block";
    });
  });

  backBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullPage[back.id].style.display = "none";
    });
  });
}
backFunction();

// todo page
function todoPage() {
  // render task
  var currentTask = [];
  currentTask = JSON.parse(localStorage.getItem("currentTask")) || currentTask;

  let allTasks = document.querySelector(".allTask");
  function renderTask() {
    let sum = "";

    currentTask.forEach(function (elem, idx) {
      let completedClass;
      if (elem.completed) {
        completedClass = "completed";
      } else {
        completedClass = "";
      }

      let buttonText;
      if (elem.completed) {
        buttonText = "Undo";
      } else {
        buttonText = "Complete";
      }

      sum += ` <div class="tasks">
            <button class="delete" id=${idx}>Delete</button>
            <h3 class="${completedClass}">${elem.task} <span id='${elem.check}'>imp</span></h3>
             <button class="complete" id=${idx}>${buttonText}</button>
          </div>`;
    });
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    allTasks.innerHTML = sum;
  }
  renderTask();
  addEventListeners();

  let taskInput = document.querySelector('.addTask form input[type="text"]');
  let form = document.querySelector(".addTask form");
  let details = document.querySelector(".addTask form #details");
  let checkBox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let newTask = {
      task: taskInput.value,
      detail: details.value,
      check: checkBox.checked,
      completed: false,
    };
    if (taskInput.value == "") {
      alert("Enter Task");
    } else {
      currentTask.unshift(newTask);
    }
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    renderTask();
    addEventListeners();
    taskInput.value = "";
    details.value = "";
    checkBox.checked = false;
  });

  function addEventListeners() {
    let deleteBtn = document.querySelectorAll(".tasks .delete");
    let completeBtn = document.querySelectorAll(".tasks .complete");

    deleteBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        localStorage.setItem("currentTask", JSON.stringify(currentTask));
        renderTask();
        addEventListeners();
      });
    });

    completeBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        let idx = btn.id;
        currentTask[idx].completed = !currentTask[idx].completed;
        localStorage.setItem("currentTask", JSON.stringify(currentTask));
        renderTask();
        addEventListeners();
      });
    });
  }

  addEventListeners();
}
todoPage();

// day planner full page
function dailyPlannerPage() {
  let plan = JSON.parse(localStorage.getItem("plan")) || [];
  let planInput = document.querySelectorAll(".plan-time input");
  function renderPlan() {
    planInput.forEach(function (e, idx) {
      if (plan[idx]) {
        e.value = plan[idx];
      }
    });
  }
  renderPlan();

  planInput.forEach(function (val, i) {
    val.addEventListener("input", function () {
      plan[i] = val.value;
      localStorage.setItem("plan", JSON.stringify(plan));
    });
  });
}
dailyPlannerPage();

// motivational quotes
function motivationalQuotes() {
  let quotes = document.querySelector(".quotesContainer .card #quote");
  let author = document.querySelector(".quotesContainer .card #author");

  async function fetchQuote() {
    let rawQuote = await fetch(
      "https://quoteslate.vercel.app/api/quotes/random",
    );
    let quoteData = await rawQuote.json();
    console.log(quoteData);
    quotes.innerHTML = quoteData.quote;
    author.innerHTML = quoteData.author;
  }
  fetchQuote();
}
motivationalQuotes();

// fullpage pomodoro
function fullPagePomodoro() {
  let totalSeconds = 25 * 60;
  var intervalTimer = null;

  var promoTime = document.querySelector(".promo-timer h1");
  var session = document.querySelector(".session");
  var isWork = true;

  function updateTime() {
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;
    promoTime.innerHTML = `${String(min).padStart("2", "0")}:${String(sec).padStart("2", "0")}`;
  }

  function start() {
    clearInterval(intervalTimer);

    if (isWork) {
      intervalTimer = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          session.innerHTML = "Take a Rest";
          session.style.backgroundColor = "var(--blue)";
          promoTime.innerHTML = "05:00";
          totalSeconds = 5 * 60;
          isWork = false;
          clearInterval(intervalTimer);
        }
      }, 1);
    } else {
      intervalTimer = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          promoTime.innerHTML = "25:00";
          totalSeconds = 25 * 60;
          isWork = true;
          clearInterval(intervalTimer);
        }
      }, 1);
    }
  }

  function pause() {
    clearInterval(intervalTimer);
    updateTime();
  }

  function reset() {
    clearInterval(intervalTimer);
    totalSeconds = 25 * 60;
    updateTime();
  }

  var startBtn = document.querySelector(".promo-timer .start-timer");
  var pauseBtn = document.querySelector(".promo-timer .pause-timer");
  var resetBtn = document.querySelector(".promo-timer .reset-timer");

  startBtn.addEventListener("click", start);
  pauseBtn.addEventListener("click", pause);
  resetBtn.addEventListener("click", reset);
}
fullPagePomodoro();
