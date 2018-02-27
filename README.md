### Библиотека для работы с редактором https://github.com/forceuser/remote-wysiwyg


установка

```shell
npm i --save remote-wysiwyg-ctrl
```

пример использования

```js
import wysiwyg from "remote-wysiwyg-ctrl";

wysiwyg.open("", {
	color: "red", // цвет заголовка
	content: "содержимое редактора",
})
.then(content => {
	alert("результат редактирования:\n" + content);
})
```
