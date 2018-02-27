
export default function open (url, data) {
	return new Promise((resolve, reject) => {
		const ident = btoa(Math.random()).replace(/\=/ig, "");
		window.open(`${url}?init=${ident}`, ident);
		window.addEventListener("message", event => {
			if (event.data) {
				const data = JSON.parse(event.data);
				const {type, id} = data;

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
							resolve(data.content);
							event.source.close();
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
	});
}
