// This extension allows users to add a button to the VS Code status bar
// that can be bound to any command from the command palette or a VS Code task

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
    
    // Register the execute command to run the bound command or task
    let executeCommand = vscode.commands.registerCommand('commandButton.execute', async () => {
        const config = vscode.workspace.getConfiguration('commandButton');
        const actionType = config.get<string>('actionType') || 'command';
        
        if (actionType === 'command') {
            const command = config.get<string>('command');
            if (command) {
                vscode.commands.executeCommand(command);
            } else {
                vscode.window.showInformationMessage('No command bound to the button. Use settings to configure.');
            }
        } else if (actionType === 'task') {
            const taskName = config.get<string>('taskName');
            if (taskName) {
                const tasks = await vscode.tasks.fetchTasks();
                const task = tasks.find(t => t.name === taskName);
                
                if (task) {
                    await vscode.tasks.executeTask(task);
                } else {
                    vscode.window.showErrorMessage(`Task "${taskName}" not found.`);
                }
            } else {
                vscode.window.showInformationMessage('No task bound to the button. Use settings to configure.');
            }
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
            await vscode.workspace.getConfiguration('commandButton').update('actionType', 'command', true);
            await vscode.workspace.getConfiguration('commandButton').update('command', selectedCommand, true);
            await vscode.workspace.getConfiguration('commandButton').update('text', selectedCommand, true);
            
            // Refresh the button
            updateCommandButton(commandButton);
            
            vscode.window.showInformationMessage(`Command button now bound to: ${selectedCommand}`);
        }
    });
    
    // Register the set task command
    let setTask = vscode.commands.registerCommand('commandButton.setTask', async () => {
        const tasks = await vscode.tasks.fetchTasks();
        
        if (tasks.length === 0) {
            vscode.window.showInformationMessage('No tasks found in the workspace.');
            return;
        }
        
        const taskItems = tasks.map(task => ({
            label: task.name,
            description: task.source
        }));
        
        const selectedTask = await vscode.window.showQuickPick(taskItems, {
            placeHolder: 'Select a task to bind to the status bar button'
        });
        
        if (selectedTask) {
            // Update the configuration
            await vscode.workspace.getConfiguration('commandButton').update('actionType', 'task', true);
            await vscode.workspace.getConfiguration('commandButton').update('taskName', selectedTask.label, true);
            await vscode.workspace.getConfiguration('commandButton').update('text', `Task: ${selectedTask.label}`, true);
            
            // Refresh the button
            updateCommandButton(commandButton);
            
            vscode.window.showInformationMessage(`Command button now bound to task: ${selectedTask.label}`);
        }
    });
    
    // Add disposables to context
    context.subscriptions.push(commandButton);
    context.subscriptions.push(refreshCommand);
    context.subscriptions.push(executeCommand);
    context.subscriptions.push(setCommand);
    context.subscriptions.push(setTask);
    
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
    const actionType = config.get<string>('actionType') || 'command';
    const command = config.get<string>('command');
    const taskName = config.get<string>('taskName');
    const color = config.get<string>('color');
    const emoji = config.get<string>('emoji') || '';
    
    // Update button properties
    button.text = emoji ? `${emoji} ${text}` : text;
    button.command = 'commandButton.execute';
    
    if (actionType === 'command') {
        button.tooltip = command ? `Execute command: ${command}` : 'No command bound';
    } else if (actionType === 'task') {
        button.tooltip = taskName ? `Run task: ${taskName}` : 'No task bound';
    }
    
    if (color) {
        button.color = color;
    }
    
    // Show the button
    button.show();
}

export function deactivate() {
    // This function is called when the extension is deactivated
}