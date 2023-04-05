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
}

// This method is called when your extension is deactivated
export function deactivate() {}

function textChanged() {
	const decorationType = vscode.window.createTextEditorDecorationType({
			backgroundColor: 'red'
		});
	const preDecoration = vscode.window.createTextEditorDecorationType({
			backgroundColor: ''
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
				const decoration = { range: new vscode.Range(line.range.start, line.range.end) };
				editor?.setDecorations(decorationType, [decoration]);

				setTimeout(() => {
					console.log("expired");
					decorationType.dispose();
					editor!.setDecorations(decorationType, []);
					}, 1500);
				}
			}
		}	
}