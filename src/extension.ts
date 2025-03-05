// This extension allows users to add a button to the VS Code status bar
// that can be bound to any command from the command palette

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Command Button extension is now active');
    
    // Create a status bar item
    const commandButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    
    // Register the refresh command to update the button
    let refreshCommand = vscode.commands.registerCommand('commandButton.refresh', () => {
        updateCommandButton(commandButton);
    });
    
    // Register the execute command to run the bound command
    let executeCommand = vscode.commands.registerCommand('commandButton.execute', () => {
        const command = vscode.workspace.getConfiguration('commandButton').get<string>('command');
        if (command) {
            vscode.commands.executeCommand(command);
        } else {
            vscode.window.showInformationMessage('No command bound to the button. Use settings to configure.');
        }
    });
    
    // Register the set command to interactively choose a command
    let setCommand = vscode.commands.registerCommand('commandButton.setCommand', async () => {
        const commands = await vscode.commands.getCommands(true);
        // Filter out some internal commands
        const filteredCommands = commands.filter(cmd => 
            !cmd.startsWith('_') && 
            !cmd.startsWith('commandButton.') &&
            cmd !== 'workbench.action.showCommands'
        );
        
        const selectedCommand = await vscode.window.showQuickPick(filteredCommands.sort(), {
            placeHolder: 'Select a command to bind to the status bar button'
        });
        
        if (selectedCommand) {
            // Update the configuration
            await vscode.workspace.getConfiguration('commandButton').update('command', selectedCommand, true);
            await vscode.workspace.getConfiguration('commandButton').update('text', selectedCommand, true);
            
            // Refresh the button
            updateCommandButton(commandButton);
            
            vscode.window.showInformationMessage(`Command button now bound to: ${selectedCommand}`);
        }
    });
    
    // Add disposables to context
    context.subscriptions.push(commandButton);
    context.subscriptions.push(refreshCommand);
    context.subscriptions.push(executeCommand);
    context.subscriptions.push(setCommand);
    
    // Listen for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('commandButton')) {
                updateCommandButton(commandButton);
            }
        })
    );
    
    // Initialize the button
    updateCommandButton(commandButton);
}

function updateCommandButton(button: vscode.StatusBarItem) {
    const config = vscode.workspace.getConfiguration('commandButton');
    const text = config.get<string>('text') || 'Command';
    const command = config.get<string>('command');
    const color = config.get<string>('color');
    const emoji = config.get<string>('emoji') || '';
    
    // Update button properties
    button.text = emoji ? `${emoji} ${text}` : text;
    button.command = 'commandButton.execute';
    button.tooltip = command ? `Execute: ${command}` : 'No command bound';
    
    if (color) {
        button.color = color;
    }
    
    // Show the button
    button.show();
}

export function deactivate() {
    // This function is called when the extension is deactivated
}
