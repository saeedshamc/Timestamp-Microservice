const form = document.getElementById("tester");
const input = document.getElementById("date-input");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = input.value.trim();
  try {
    const response = await fetch("/api/" + encodeURIComponent(value));
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    result.textContent = "Couldn't reach the server. Try again.";
  }
});