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
		textChanged();
	}, null, context.subscriptions);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function textChanged() {
	const decorationType = vscode.window.createTextEditorDecorationType({
			backgroundColor: 'darkgray',
			color: 'gray',
		});

	let editor = vscode.window.activeTextEditor;
	let document = editor?.document;
	let curPos: vscode.Position | undefined = editor?.selection.active;
	if (editor === undefined || document === undefined || curPos === undefined) {
		return;
	}
	const start = async () => {
		const pos = document!.offsetAt(curPos!);
		if (pos !== undefined) {
			const line = editor?.document.lineAt?.(curPos!);
			if (line) {
				const rangeEnd = line.range.end;
				for (let i = 0; i < line.text.length; i++) {
					let end = new vscode.Position(line.lineNumber, i+1);
					const effectRange = { range: new vscode.Range(line.range.start, end) };
					editor?.setDecorations(decorationType, [effectRange]);
					await setTimeout(1);
				}
				await setTimeout(450);
				decorationType.dispose();
				editor!.setDecorations(decorationType, []);
			}
		}
	};	
	start();
}