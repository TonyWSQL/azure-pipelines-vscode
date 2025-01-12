// From https://github.com/microsoft/vscode-extension-samples/blob/main/lsp-sample/client/src/test/helper.ts

import * as vscode from 'vscode';
import * as path from 'path';

export let doc: vscode.TextDocument;
export let editor: vscode.TextEditor;
export let documentEol: string;
export let platformEol: string;

/**
 * Activates the vscode.lsp-sample extension
 */
export async function activate(docUri: vscode.Uri) {
    // The extensionId is `publisher.name` from package.json
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ext = vscode.extensions.getExtension('ms-azure-devops.azure-pipelines')!;
    await ext.activate();
    try {
        doc = await vscode.workspace.openTextDocument(docUri);
        editor = await vscode.window.showTextDocument(doc);
        await sleep(5000); // Wait for server activation
    } catch (e) {
        console.error(e);
    }
}

async function sleep(ms: number) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

export const getDocPath = (p: string) => {
    return path.resolve(__dirname, '../../src/test/workspace', p);
};

export const getDocUri = (p: string) => {
    return vscode.Uri.file(getDocPath(p));
};

export async function setTestContent(content: string): Promise<boolean> {
    const all = new vscode.Range(
        doc.positionAt(0),
        doc.positionAt(doc.getText().length)
    );
    return await editor.edit(eb => {
        eb.replace(all, content)
    });
}
