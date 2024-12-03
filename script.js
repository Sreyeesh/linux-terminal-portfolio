const output = document.getElementById("output");
const commandInput = document.getElementById("command-input");
const terminal = document.getElementById("terminal");

// Commands object
const commands = {
  help: `
Available commands:
  help      - List available commands
  about     - Display information about this terminal
  clear     - Clear the terminal
  date      - Show the current date and time
  theme     - Toggle terminal themes (light and dark)
  `,

  about: `
Welcome to the Minimal Terminal Portfolio!
This site is designed to simulate a Linux terminal environment.
  `,
};

// Track the current theme (default to dark mode)
let isDarkTheme = true;

// Display a welcome message
function displayWelcomeMessage() {
  const welcomeMessage = `
Welcome to the Minimal Terminal!
Type 'help' to see the list of available commands.
  `;
  output.innerHTML += `<div>${welcomeMessage}</div><br>`;
}

// Auto-focus the input field
function autoFocusInput() {
  commandInput.focus();
}

// Handle user commands
function handleCommand(input) {
  const prompt = `guest@terminal:~$ ${input}`;
  let response;

  if (input === "clear") {
    output.innerHTML = ""; // Clear the terminal
    return;
  } else if (input === "date") {
    response = new Date().toString();
  } else if (input === "theme") {
    toggleTheme();
    response = `Theme switched to ${isDarkTheme ? "dark" : "light"} mode.`;
  } else if (commands[input]) {
    response = commands[input];
  } else {
    response = `Command not found: ${input}. Type 'help' for a list of commands.`;
  }

  // Display command and response
  output.innerHTML += `<div>${prompt}</div><div>${response}</div><br>`;
  terminal.scrollTop = terminal.scrollHeight;
}

// Listen for Enter key
commandInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = commandInput.value.trim();
    if (input) handleCommand(input);
    commandInput.value = ""; // Clear the input
  }
});

// Toggle theme
function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle("dark-theme", isDarkTheme);
  document.body.classList.toggle("light-theme", !isDarkTheme);

  commandInput.classList.toggle("dark-theme", isDarkTheme);
  commandInput.classList.toggle("light-theme", !isDarkTheme);
}

// Initialize the terminal
document.addEventListener("DOMContentLoaded", () => {
  displayWelcomeMessage();
  autoFocusInput();
  commandInput.addEventListener("click", autoFocusInput); // Ensure the cursor remains aligned
});
