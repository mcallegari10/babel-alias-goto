// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')

const getAliases = babelPlugins =>
  babelPlugins.map(plugin => plugin[0] === 'module-resolver' ? plugin[1] : undefined)
              .filter(result => result !== undefined)[0]

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.sayHello', function () {

    const babelConfigPath = `${vscode.workspace.workspaceFolders[0].uri.fsPath}/.babelrc`

    vscode.workspace.openTextDocument(babelConfigPath).then(document => {
      const aliasPlugin = getAliases(JSON.parse(document.getText()).plugins)
    },
      error => vscode.window.showErrorMessage(error)
    )
  })

  context.subscriptions.push(disposable)
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate
