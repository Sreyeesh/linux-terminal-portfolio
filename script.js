const output = document.getElementById("output");
const commandInput = document.getElementById("command-input");

const commands = {
  help: "Available commands: help, about, projects, contact, clear",
  about: "Hi! I'm [Your Name]. I'm a [Your Role].",
  projects: "Check out my projects: <a href='https://github.com/yourusername' target='_blank'>GitHub</a>",
  contact: "Email me at: <a href='mailto:your.email@example.com'>your.email@example.com</a>",
  clear: "",
};

commandInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const input = commandInput.value.trim();
    handleCommand(input);
    commandInput.value = ""; // Clear input
  }
});

function handleCommand(input) {
  const prompt = `guest@portfolio:~$ ${input}`;
  const response = commands[input] || `Command not found: ${input}. Type 'help' for a list of commands.`;

  // Append to output
  output.innerHTML += `${prompt}\n${response}\n\n`;

  // Auto-scroll to the bottom
  const terminal = document.getElementById("terminal");
  terminal.scrollTop = terminal.scrollHeight;

  // Clear output for 'clear' command
  if (input === "clear") {
    output.innerHTML = "";
  }
}
