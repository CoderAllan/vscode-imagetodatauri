import * as vscode from 'vscode';
import { Convert } from './Convert';

export function activate(context: vscode.ExtensionContext) {
  const cmdPrefix = 'vscode-imagetodatauri';

  const commands = [
    vscode.commands.registerCommand(`${cmdPrefix}.${Convert.ConvertFileCommandName}`,(context) => { Convert.ConvertFile(context); }),
    vscode.commands.registerCommand(`${cmdPrefix}.${Convert.ConvertUriCommandName}`, () => { Convert.ConvertUri(); }),
  ];
  commands.forEach(command => context.subscriptions.push(command));
}

export function deactivate() {}
