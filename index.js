
export default function open (url, data, iframe) {
	return new Promise((resolve, reject) => {
		const ident = btoa(Math.random()).replace(/\=/ig, "");
		const href = `${url}?init=${ident}`;
		let wnd;
		if (iframe) {
			iframe.src = href;
			wnd = iframe.contentWindow;
		}
		else {
			wnd = window.open(href, ident);
		}

		window.addEventListener("message", event => {
			if (event.data) {
				const evdata = JSON.parse(event.data);
				const {type, id} = evdata;

				if (id === ident) {
					switch (type) {
						case "init":
						{
							event.source.postMessage(JSON.stringify({
								type: "init",
								id,
								data: Object.assign({}, data, {callbackId: id}),
							}), "*");
							break;
						}
						case "save":
						{
							resolve(evdata.content);
							if (evdata.close) {
								event.source.close();
							}
							break;
						}
						case "cancel":
						{
							reject("cancel");
							break;
						}
					}
				}
			}
		});

		return {
			save () {
				wnd.postMessage(JSON.stringify({
					type: "save",
					id: ident,
				}), "*");
			},
			cancel () {
				wnd.postMessage(JSON.stringify({
					type: "cancel",
					id: ident,
				}), "*");
			},
			changemode (mode) {
				wnd.postMessage(JSON.stringify({
					type: "changemode",
					id: ident,
					mode,
				}), "*");
			},
		};
	});
}
