### Библиотека для работы с редактором https://github.com/forceuser/remote-wysiwyg


установка

```shell
npm i --save remote-wysiwyg-ctrl
```

пример использования

```js
import wysiwyg from "remote-wysiwyg-ctrl";

wysiwyg.open("https://cdn.rawgit.com/forceuser/remote-wysiwyg/1.0.14/", {
	color: "red", // цвет заголовка
	content: "содержимое редактора",
})
.then(content => {
	alert("результат редактирования:\n" + content);
})
```
