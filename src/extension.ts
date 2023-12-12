import vscode from "vscode";
import axios from "axios";

export function activate(context: vscode.ExtensionContext) {
  const cmd = vscode.commands.registerCommand(
    "vscode.contextmenu.sendslack",
    () => {
      //アクティブなエディタのドキュメントを取得
      const activeEditor = vscode.window.activeTextEditor;
      const doc = activeEditor && activeEditor.document;
      //選択範囲を取得
      const ref = activeEditor?.selection;
      sendSlack(doc?.getText(ref));
    }
  );

  context.subscriptions.push(cmd);
}

function sendSlack(message?: string) {
  const slackWebhookUrl = vscode.workspace
    .getConfiguration("sendslack")
    .get("sendSlackURL", "");
  axios.post(
    slackWebhookUrl,
    {
      username: "VSCode",
      icon_emoji: ":ghost:",
      text: message,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function deactivate() {}
