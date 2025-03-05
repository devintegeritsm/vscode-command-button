# Command Button Extension for VS Code

This extension adds a customizable button to the VS Code status bar that can be bound to any command from the command palette or to any VS Code task.

## Features

- Adds a button to the VS Code status bar
- Allows binding any VS Code command to the button
- Allows binding any VS Code task to the button
- Customize button text, color, and emoji
- Quick commands to configure the button

## Usage

### Binding to a Command

1. Install the extension
2. Run the command "Command Button: Configure Button Command" from the command palette
3. Select a command to bind to the button
4. Click the button in the status bar to execute the command

### Binding to a Task

1. Install the extension
2. Run the command "Command Button: Configure Button Task" from the command palette
3. Select a task to bind to the button
4. Click the button in the status bar to run the task

## Configuration

You can customize the button through VS Code settings:

| Setting | Description | Default |
|---------|-------------|---------|
| `commandButton.actionType` | Type of action ("command" or "task") | "command" |
| `commandButton.command` | Command ID to execute when clicked (for command type) | "" |
| `commandButton.taskName` | Task name to run when clicked (for task type) | "" |
| `commandButton.text` | Text to display on the button | "Command" |
| `commandButton.color` | Color of the button text (CSS color) | "" |
| `commandButton.emoji` | Emoji to display before text | "📎" |

## Examples

### Git Push Button (Command)

1. Open command palette and select "Command Button: Configure Button Command"
2. Search for and select "Git: Push"
3. Update settings:
   ```json
   {
     "commandButton.text": "Push",
     "commandButton.emoji": "⬆️"
   }
   ```

### Format Document Button (Command)

1. Open command palette and select "Command Button: Configure Button Command"
2. Search for and select "Format Document"
3. Update settings:
   ```json
   {
     "commandButton.text": "Format",
     "commandButton.emoji": "✨",
     "commandButton.color": "#7cb342"
   }
   ```

### Build Task Button (Task)

1. Open command palette and select "Command Button: Configure Button Task"
2. Select your "build" task
3. Update settings:
   ```json
   {
     "commandButton.text": "Build",
     "commandButton.emoji": "🔨",
     "commandButton.color": "#f44336"
   }
   ```

### Test Task Button (Task)

1. Open command palette and select "Command Button: Configure Button Task"
2. Select your "test" task
3. Update settings:
   ```json
   {
     "commandButton.text": "Run Tests",
     "commandButton.emoji": "✅",
     "commandButton.color": "#4caf50"
   }
   ```

## Installation

### From VS Code Marketplace

1. Open Extensions in VS Code
2. Search for "Command Button"
3. Click Install

### Manual Installation

1. Download the `.vsix` file from the releases page
2. Run `code --install-extension vscode-command-button-0.1.0.vsix`

## Building the Extension

```bash
# Clone the repository
git clone https://github.com/yourusername/vscode-command-button.git
cd vscode-command-button

# Install dependencies
npm install

# Compile the extension
npm run compile

# Package the extension
npx vsce package
```

# or

```bash
npm install --save-dev @types/vscode@1.60.0 typescript
npx tsc -p ./
npx @vscode/vsce package
```


## License

MIT