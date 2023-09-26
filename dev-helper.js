const settings = {
    serverUrl: "http://192.168.1.217:3000",
    fetchInterval: 10,
}

async function main() {
    const alert = new Alert();
    alert.title = "Fetch and Run"
    alert.message = "Press reload when you ready"
    alert.addAction("Reload")
    alert.addCancelAction("Cancel")
    let yes = await alert.presentAlert();
	log(yes);
    if (yes == 0) {
        let content = await fetchContent();
        writeScript(content);
		let t = new Timer();
		t.timeInterval = 530;
		await (new Promise(r => t.schedule(r)))
        let cb = new CallbackURL('scriptable:///run/dev-helper-temp');
		//cb.addParameter('scriptName','dev-helper-temp');
		cb.addParameter('openEditor','true');
		cb.open();
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
	let dir = fm.documentsDirectory()
	let path = fm.joinPath(dir, 'dev-helper-temp.js')
    fm.writeString(path, content)
}

main();