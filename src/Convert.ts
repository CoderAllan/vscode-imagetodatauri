import fs = require('fs');
import path = require('path')
import * as vscode from 'vscode';
import { Base64 } from 'js-base64';

export abstract class Convert {
  public static ConvertFileCommandName: string = 'imageToDataUriConvertFile';

  public static ConvertUriCommandName: string = 'imageToDataUriConvertUri';

  public static ConvertUri() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }
    const selection = editor.selection;
    if (selection !== undefined && !selection.isEmpty) {
      const imgSrc = editor.document.getText(selection);
      let filePath = '';
      const uriDecoded = decodeURI(imgSrc.replace(/file:\/+/i, '')).replace(/%3A/i, ':');
      if (this.fileExists(uriDecoded)) {
        filePath = uriDecoded;
      }
      else {
        const workspaceFolder = this.getWorkspaceFolder();
        if (this.fileExists(`${workspaceFolder}/${imgSrc}`)) {
          filePath = `${workspaceFolder}/${imgSrc}`;
        }
      }
      if (filePath) {
        const dataUri = this.createDataUriFromImage(filePath);
        editor.edit(editBuilder => {
          editBuilder.replace(selection, dataUri);
        });
      }
      else {
        vscode.window.showInformationMessage(`File not found: ${imgSrc}`);
      }
    }
    else {
      vscode.window.showInformationMessage(`Nothing is selected. Select the image src in the HTML to inline it as a data uri.`);
    }
  }

  public static ConvertFile(context: any) {
    if (context) {
      const dataUri = this.createDataUriFromImage(context.fsPath);
      vscode.env.clipboard.writeText(dataUri);
      vscode.window.showInformationMessage('Image data uri has been copied to the clipboard.');
    }
  }

  private static createDataUriFromImage(filename: string): string {
    const imageContent = fs.readFileSync(filename);
    const base64EncodeImage = Base64.toBase64(imageContent.toString());
    const extension = path.extname(filename)
    const mimetype = Convert.getMimeTypeFromExtension(extension);
    return `data:${mimetype};base64,${base64EncodeImage}`;
  }

  private static getMimeTypeFromExtension(extension: string): string {
    switch (extension.toLowerCase()) {
      case '.gif':
        return 'image/gif';
      case '.ico':
        return 'image/vnd.microsoft.icon';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.svg':
        return 'image/svg+xml';
      default:
        return '';
    }
  }

  private static fileExists(filename: string): boolean {
    try {
      return fs.lstatSync(filename).isFile();
    } catch {
      return false;
    }
  }
  private static getWorkspaceFolder(): string {
    const folder = vscode.workspace.workspaceFolders;
    let directoryPath: string = '';
    if (folder !== null && folder !== undefined) {
      directoryPath = folder[0].uri.fsPath;
    }
    return directoryPath;
  }
}