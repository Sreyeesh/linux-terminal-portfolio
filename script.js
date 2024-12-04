// Get terminal container
const terminal = document.getElementById("terminal");

// Mock filesystem
const fileSystem = {
    "/": {
        "resume.txt": "This is Sreyeesh Garimella's resume. Use the 'download' command to download the PDF.",
        "projects.txt": "1. Terminal Portfolio\n2. Web Scraper\n3. API Server",
        "about.txt": "Sreyeesh Garimella is a software engineer passionate about building efficient systems.",
    },
};
let currentPath = "/";

// Commands
function pwd() {
    return currentPath;
}

function ls() {
    const contents = fileSystem[currentPath];
    if (contents) {
        return Object.keys(contents).join("  ");
    }
    return `ls: cannot access '${currentPath}': No such file or directory`;
}

function cd(args) {
    if (!args[0]) return "cd: missing operand";
    const targetPath = args[0] === ".."
        ? currentPath.split("/").slice(0, -1).join("/") || "/"
        : `${currentPath}/${args[0]}`;
    if (fileSystem[targetPath]) {
        currentPath = targetPath;
        return "";
    }
    return `cd: ${args[0]}: No such file or directory`;
}

function cat(args) {
    if (!args[0]) return "cat: missing operand";
    const file = fileSystem[currentPath]?.[args[0]];
    if (file) {
        return file;
    }
    return `cat: ${args[0]}: No such file`;
}

function download() {
    const link = document.createElement("a");
    link.href = "https://example.com/sreyeesh_resume.pdf"; // Replace with your resume URL
    link.download = "Sreyeesh_Garimella_Resume.pdf";
    link.click();
    return "Downloading resume...";
}

function clear() {
    terminal.innerHTML = "";
    return "";
}

// Command handler
function handleCommand(command) {
    const [cmd, ...args] = command.split(" ");
    switch (cmd) {
        case "pwd":
            return pwd();
        case "ls":
            return ls();
        case "cd":
            return cd(args);
        case "cat":
            return cat(args);
        case "download":
            return download();
        case "help":
            return "Available commands: help, ls, cd, pwd, cat, download, clear, exit";
        case "clear":
            return clear();
        case "exit":
            window.close();
            return "Exiting...";
        default:
            return `${cmd}: command not found`;
    }
}

// Add a new line to the terminal
function appendLine(content) {
    const line = document.createElement("div");
    line.className = "output-line";
    line.textContent = content;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

// Create a new command prompt
function createPrompt() {
    const commandLine = document.createElement("div");
    commandLine.className = "command-line";

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = `guest@sreyeesh-portfolio:${currentPath}$`;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "input";
    input.autocomplete = "off";

    commandLine.appendChild(prompt);
    commandLine.appendChild(input);
    terminal.appendChild(commandLine);

    input.focus();

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = input.value.trim();
            terminal.removeChild(commandLine);
            appendLine(`${prompt.textContent} ${command}`);
            const result = handleCommand(command);
            if (result) appendLine(result);
            createPrompt();
        }
    });
}

// Welcome message
appendLine("Welcome to Sreyeesh Garimella's portfolio! Type 'help' for available commands.");
createPrompt();
