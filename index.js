
export default function open (url, data, iframe) {
	return new Promise((resolve, reject) => {
		const ident = btoa(Math.random()).replace(/\=/ig, "");
		const href = `${url}?init=${ident}`;
		let wnd;
		let timetoinit;
		if (iframe) {
			iframe.src = href;
			wnd = iframe.contentWindow;
			timetoinit = setInterval(() => {
				if (!iframe.parentNode) {
					reject();
					clearInterval(timetoinit);
				}
			}, 500);
		}
		else {
			wnd = window.open(href, ident);
		}

		const ctrl = {
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
			settings (data) {
				wnd.postMessage(JSON.stringify({
					type: "settings",
					id: ident,
					data,
				}), "*");
			},
		};

		window.addEventListener("message", event => {
			if (event.data) {
				const evdata = JSON.parse(event.data);
				const {type, id} = evdata;

				if (id === ident) {
					switch (type) {
						case "preinit":
						{
							event.source.postMessage(JSON.stringify({
								type: "init",
								id,
								data: Object.assign({}, data, {callbackId: id}),
							}), "*");
							break;
						}
						case "initialized":
						{
							clearInterval(timetoinit);
							resolve(ctrl);
							break;
						}
						case "save":
						{
							ctrl.onSave && ctrl.onSave(evdata.content);
							if (evdata.close) {
								event.source.close();
							}
							break;
						}
						case "cancel":
						{
							ctrl.onCancel && ctrl.onCancel();
							break;
						}
					}
				}
			}
		});
	});
}
