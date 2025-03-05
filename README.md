# Command Button Extension for VS Code

This extension adds a customizable button to the VS Code status bar that can be bound to any command from the command palette.

## Features

- Adds a button to the VS Code status bar
- Allows binding any VS Code command to the button
- Customize button text, color, and emoji
- Quick command to configure the button

## Usage

1. Install the extension
2. Run the command "Command Button: Configure Button Command" from the command palette
3. Select a command to bind to the button
4. Click the button in the status bar to execute the command

## Configuration

You can customize the button through VS Code settings:

| Setting | Description | Default |
|---------|-------------|---------|
| `commandButton.command` | Command ID to execute when clicked | "" |
| `commandButton.text` | Text to display on the button | "Command" |
| `commandButton.color` | Color of the button text (CSS color) | "" |
| `commandButton.emoji` | Emoji to display before text | "📎" |

## Examples

### Git Push Button

1. Open command palette and select "Command Button: Configure Button Command"
2. Search for and select "Git: Push"
3. Update settings:
   ```json
   {
     "commandButton.text": "Push",
     "commandButton.emoji": "⬆️"
   }
   ```

### Format Document Button

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

## License

MIT
