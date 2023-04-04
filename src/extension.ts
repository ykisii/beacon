// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { text } from 'stream/consumers';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveTextEditor(ediror => {
		console.log("onDidChangeActiveTextEditor");
		textChanged();
	}, null, context.subscriptions);
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "beacon" is now active!');


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('beacon.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from beacon!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function textChanged() {
	const decorationType = vscode.window.createTextEditorDecorationType({
			backgroundColor: 'red'
		});
		let editor = vscode.window.activeTextEditor;
		let document = editor?.document;
		let curPos: vscode.Position | undefined = editor?.selection.active;
		//console.log(curPos);
		if (curPos) {
			//console.log(document?.offsetAt(curPos));
			const pos = document?.offsetAt(curPos);
			//console.log("pos->", pos, pos !== undefined);
			if (pos !== undefined) {
				const line = editor?.document.lineAt?.(curPos);
				if (line) {
					const decoration = { range: new vscode.Range(line.range.start, line.range.end), hovermessage: "hooooo"};
					editor?.setDecorations(decorationType, [decoration]);
				}
			}
		}	
}