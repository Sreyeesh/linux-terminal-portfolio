const output = document.getElementById("output");
const commandInput = document.getElementById("command-input");
const terminal = document.getElementById("terminal");

const commands = {
  help: `
Available commands:
  help      - List available commands
  about     - Display information about me
  projects  - Show my GitHub projects
  contact   - Display contact information
  skills    - List my technical skills
  socials   - Display my social media links
  theme     - Toggle light/dark terminal theme
  clear     - Clear the terminal
  `,
  about: "Hi! I'm [Your Name], a [Your Role]. I specialize in building awesome web applications.",
  projects: "Check out my GitHub: <a href='https://github.com/yourusername' target='_blank'>GitHub Profile</a>",
  contact: "Email me at: <a href='mailto:your.email@example.com'>your.email@example.com</a>",
  skills: `
My technical skills:
  - JavaScript, HTML, CSS
  - React, Node.js, Express
  - Python, Django
  - Git, Docker, Linux
  `,
  socials: `
Find me online:
  - LinkedIn: <a href='https://linkedin.com/in/yourusername' target='_blank'>LinkedIn</a>
  - GitHub: <a href='https://github.com/yourusername' target='_blank'>GitHub</a>
  - Twitter: <a href='https://twitter.com/yourusername' target='_blank'>Twitter</a>
  `,
  theme: "Toggled terminal theme!",
  clear: "",
};

// Add a welcome message on load
function displayWelcomeMessage() {
  const welcomeMessage = `
Welcome to my Linux terminal-themed portfolio!
Type 'help' to get started.
`;
  output.innerHTML += `${welcomeMessage}\n`;
}

// Command handling logic
commandInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const input = commandInput.value.trim();
    handleCommand(input);
    commandInput.value = ""; // Clear the input field
  }
});

function handleCommand(input) {
  const prompt = `guest@portfolio:~$ ${input}`;
  const response = commands[input] || `<span class="error">Command not found: ${input}. Type 'help' for a list of commands.</span>`;

  // Append the command and response to the output
  output.innerHTML += `${prompt}\n${response}\n\n`;

  // Handle special commands
  if (input === "clear") {
    output.innerHTML = ""; // Clear the terminal
  } else if (input === "theme") {
    toggleTheme();
  }

  // Auto-scroll to the bottom
  terminal.scrollTop = terminal.scrollHeight;
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark-theme");

  if (isDark) {
    // Switch to light theme
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  } else {
    // Switch to dark theme
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  }
}

// Initialize the terminal with a welcome message
displayWelcomeMessage();
