const settings = {
    serverUrl: "https://x51801h5-3000.asse.devtunnels.ms",
    fetchInterval: 10,
}

async function main() {
    const alert = new Alert();
    alert.title = "Fetch and Run"
    alert.message = "Press reload when you ready"
    alert.addAction("Reload")
    alert.addCancelAction("Cancel")
    let yes = alert.presentAlert();
    if (yes === 0) {
        let content = await fetchContent();
        writeScript(content);
        new CallbackURL('scriptable:///run/dev-helper-temp')
    }
}

async function fetchHash() {
    const req = new Request(settings.serverUrl + '/hash');
    return await req.loadString()
}

async function fetchContent() {
    const req = new Request(settings.serverUrl + '/content');
    return await req.loadString()
}

function writeScript(content) {
    const fm = FileManager.iCloud();
    fm.writeString('dev-helper-temp.js', content)
}

main();