document.addEventListener("DOMContentLoaded", () => {
  // Exchange rates
  const exchangeRates = {
    RON_TO_EUR: 4.97,
    RON_TO_USD: 4.55,
  }

  // Time constants
  const HOURS_PER_DAY = 8
  const DAYS_PER_MONTH = 21
  const MONTHS_PER_YEAR = 12

  // DOM elements
  const amountInput = document.getElementById("amount")
  const currencySelect = document.getElementById("currency")
  const periodSelect = document.getElementById("period")
  const calculateBtn = document.getElementById("calculate-btn")
  const themeToggleBtn = document.getElementById("theme-toggle-btn")

  // Display exchange rates in the info section
  document.getElementById("ron-to-eur-rate").textContent = exchangeRates.RON_TO_EUR
  document.getElementById("ron-to-usd-rate").textContent = exchangeRates.RON_TO_USD

  // Theme toggle functionality
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")

    // Update icon
    const icon = themeToggleBtn.querySelector("i")
    if (document.body.classList.contains("dark-theme")) {
      icon.classList.remove("fa-moon")
      icon.classList.add("fa-sun")
    } else {
      icon.classList.remove("fa-sun")
      icon.classList.add("fa-moon")
    }
  })

  // Calculate button click event
  calculateBtn.addEventListener("click", calculateSalary)

  // Also calculate when pressing Enter in the amount input
  amountInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      calculateSalary()
    }
  })

  function calculateSalary() {
    // Get input values
    const amount = Number.parseFloat(amountInput.value)

    // Validate input
    if (isNaN(amount) || amount <= 0) {
      alert("Te rog introdu o sumă validă!")
      return
    }

    const currency = currencySelect.value
    const period = periodSelect.value

    // Convert to RON first (base currency)
    let amountInRON

    switch (currency) {
      case "EUR":
        amountInRON = amount * exchangeRates.RON_TO_EUR
        break
      case "USD":
        amountInRON = amount * exchangeRates.RON_TO_USD
        break
      default: // RON
        amountInRON = amount
    }

    // Calculate for different periods (in RON)
    let hourlyRON, monthlyRON, yearlyRON

    switch (period) {
      case "hourly":
        hourlyRON = amountInRON
        monthlyRON = hourlyRON * HOURS_PER_DAY * DAYS_PER_MONTH
        yearlyRON = monthlyRON * MONTHS_PER_YEAR
        break
      case "monthly":
        monthlyRON = amountInRON
        hourlyRON = monthlyRON / (HOURS_PER_DAY * DAYS_PER_MONTH)
        yearlyRON = monthlyRON * MONTHS_PER_YEAR
        break
      case "yearly":
        yearlyRON = amountInRON
        monthlyRON = yearlyRON / MONTHS_PER_YEAR
        hourlyRON = monthlyRON / (HOURS_PER_DAY * DAYS_PER_MONTH)
        break
    }

    // Convert to other currencies
    const hourlyEUR = hourlyRON / exchangeRates.RON_TO_EUR
    const monthlyEUR = monthlyRON / exchangeRates.RON_TO_EUR
    const yearlyEUR = yearlyRON / exchangeRates.RON_TO_EUR

    const hourlyUSD = hourlyRON / exchangeRates.RON_TO_USD
    const monthlyUSD = monthlyRON / exchangeRates.RON_TO_USD
    const yearlyUSD = yearlyRON / exchangeRates.RON_TO_USD

    // Display results
    updateResults("hourly", hourlyRON, hourlyEUR, hourlyUSD)
    updateResults("monthly", monthlyRON, monthlyEUR, monthlyUSD)
    updateResults("yearly", yearlyRON, yearlyEUR, yearlyUSD)

    // Highlight the input period
    highlightResults(period)
  }

  function updateResults(period, ron, eur, usd) {
    document.getElementById(`${period}-ron`).textContent = formatCurrency(ron, "RON")
    document.getElementById(`${period}-eur`).textContent = formatCurrency(eur, "EUR")
    document.getElementById(`${period}-usd`).textContent = formatCurrency(usd, "USD")
  }

  function formatCurrency(amount, currency) {
    return new Intl.NumberFormat("ro-RO", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  function highlightResults(period) {
    // Remove highlight from all result categories
    document.querySelectorAll(".result-category").forEach((category) => {
      category.style.backgroundColor = "rgba(79, 195, 247, 0.1)"
      category.style.borderLeftColor = "var(--accent-color)"
    })

    // Add highlight to the selected period
    const selectedCategory = document.querySelector(
      `.result-category:nth-child(${period === "hourly" ? 1 : period === "monthly" ? 2 : 3})`,
    )

    if (selectedCategory) {
      selectedCategory.style.backgroundColor = "rgba(76, 175, 80, 0.1)"
      selectedCategory.style.borderLeftColor = "var(--success-color)"
    }
  }
})

