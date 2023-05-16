// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { resolve } from 'path';
import { text } from 'stream/consumers';
import * as vscode from 'vscode';
import { setTimeout } from 'timers/promises';

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

	let editor = vscode.window.activeTextEditor;
	let document = editor?.document;
	let curPos: vscode.Position | undefined = editor?.selection.active;
	//console.log(curPos);
	const start = async () => {
	if (curPos && document) {
		//console.log(document?.offsetAt(curPos));
		const pos = document.offsetAt(curPos);
		//console.log("pos->", pos, pos !== undefined);
		if (pos !== undefined) {
			const line = editor?.document.lineAt?.(curPos);
			if (line) {
				const rangeEnd = line.range.end;
				for (let i = 0; i < line.text.length; i++) {
					let end = new vscode.Position(line.lineNumber, i+1);
					const decoration = { range: new vscode.Range(curPos, end) };
					editor?.setDecorations(decorationType, [decoration]);
					await setTimeout(5);
				}
				await setTimeout(800);
				console.log("dispose!");
				decorationType.dispose();
				editor!.setDecorations(decorationType, []);
			}
		}
	}};	
	start();
}