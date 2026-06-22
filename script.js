const calculateBtn = document.getElementById("calculateBtn");
const copyBtn = document.getElementById("copyBtn");
const themeToggle = document.getElementById("themeToggle");
const errorMessage = document.getElementById("errorMessage");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const weeksEl = document.getElementById("weeks");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const totalDaysEl = document.getElementById("totalDays");
const birthDayEl = document.getElementById("birthDay");

const birthdayCountdownEl = document.getElementById("birthdayCountdown");
const zodiacEl = document.getElementById("zodiac");
const chineseZodiacEl = document.getElementById("chineseZodiac");
const categoryEl = document.getElementById("category");
const lifeProgressEl = document.getElementById("lifeProgress");

const toast = document.getElementById("toast");

// Theme Restore
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// Calculate
calculateBtn.addEventListener("click", calculateAge);

function calculateAge() {
  errorMessage.textContent = "";

  const dobValue = document.getElementById("dob").value;

  if (!dobValue) {
    errorMessage.textContent = "Please select your birth date.";
    return;
  }

  const birthDate = new Date(dobValue);
  const today = new Date();

  if (birthDate > today) {
    errorMessage.textContent = "Future date is not allowed.";
    return;
  }

  // Exact Age
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;

    const prevMonthDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

    days += prevMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Time Difference
  const diff = today - birthDate;

  const totalDays = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  const totalWeeks = Math.floor(
    totalDays / 7
  );

  const totalHours = Math.floor(
    diff / (1000 * 60 * 60)
  );

  const totalMinutes = Math.floor(
    diff / (1000 * 60)
  );

  // Birthday Countdown
  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(
      today.getFullYear() + 1
    );
  }

  const daysUntilBirthday = Math.ceil(
    (nextBirthday - today) /
      (1000 * 60 * 60 * 24)
  );

  // Birth Day
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const birthDay =
    weekDays[birthDate.getDay()];

  // Category
  let category = "";

  if (years < 13) {
    category = "Child";
  } else if (years < 20) {
    category = "Teenager";
  } else if (years < 60) {
    category = "Adult";
  } else {
    category = "Senior Citizen";
  }

  // Life Progress
  const lifeProgress = (
    (years / 80) * 100
  ).toFixed(1);

  // Output
  yearsEl.textContent = years;
  monthsEl.textContent = years * 12 + months;
  daysEl.textContent = days;
  weeksEl.textContent = totalWeeks.toLocaleString();

  hoursEl.textContent =
    totalHours.toLocaleString();

  minutesEl.textContent =
    totalMinutes.toLocaleString();

  totalDaysEl.textContent =
    totalDays.toLocaleString();

  birthDayEl.textContent = birthDay;

  birthdayCountdownEl.textContent =
    `${daysUntilBirthday} Days`;

  zodiacEl.textContent =
    getZodiac(
      birthDate.getDate(),
      birthDate.getMonth() + 1
    );

  chineseZodiacEl.textContent =
    getChineseZodiac(
      birthDate.getFullYear()
    );

  categoryEl.textContent = category;

  lifeProgressEl.textContent =
    `${lifeProgress}%`;
}

// Zodiac
function getZodiac(day, month) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return "Aries ♈";

  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return "Taurus ♉";

  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return "Gemini ♊";

  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return "Cancer ♋";

  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return "Leo ♌";

  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return "Virgo ♍";

  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return "Libra ♎";

  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio ♏";

  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius ♐";

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn ♑";

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius ♒";

  return "Pisces ♓";
}

// Chinese Zodiac
function getChineseZodiac(year) {
  const animals = [
    "Monkey 🐒",
    "Rooster 🐓",
    "Dog 🐕",
    "Pig 🐖",
    "Rat 🐀",
    "Ox 🐂",
    "Tiger 🐅",
    "Rabbit 🐇",
    "Dragon 🐉",
    "Snake 🐍",
    "Horse 🐎",
    "Goat 🐐"
  ];

  return animals[year % 12];
}

// Copy Result
copyBtn.addEventListener("click", () => {

  const resultText = `
Smart Age Calculator Pro

Age: ${yearsEl.textContent} Years
Months: ${monthsEl.textContent}
Total Days: ${totalDaysEl.textContent}
Weeks: ${weeksEl.textContent}
Birth Day: ${birthDayEl.textContent}

Next Birthday: ${birthdayCountdownEl.textContent}
Zodiac: ${zodiacEl.textContent}
Chinese Zodiac: ${chineseZodiacEl.textContent}
Category: ${categoryEl.textContent}
Life Progress: ${lifeProgressEl.textContent}
`;

  navigator.clipboard.writeText(resultText);

  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
});