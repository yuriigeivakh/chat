* Реализовано все части функциональности, включая адаптивность, библиотека работает на мобильных устройствах

* Разработка велась на Mac OS, в редакторе Visual Studio Code

* Этот проект был загружен с помощью [Create React App](https://github.com/facebookincubator/create-react-app)

* Для реализации данного задания был выбран React JS - одна из самых популярных библиотек для создания сложных Frontend-приложений. Для компиляции были использованы Babel, Rollup.
Для стилизации компонентов был использован препроцессор SCSS.
Реализовано реальную отсылку сообщений без кода на стороне сервера, поскольку мы разрешим API Chatkit обрабатывать back end.
Чтобы получать сообщения извлечения, нам нужно подключиться к API Chatkit. И для этого нужно было получить ключи API.

* Инструкции для пользователей библиотеки мессенджера по встраиванию мессенджера в вебсайт
1 Устанавливаем npm i node на ваш компьютер глобально(npm install -g, скачиваем  node: https://nodejs.org/en/download/)
(Если пакеты установлены, пропускаем этот шаг)
2 Для простоты будем использовать create-react-app:
Введите в терминале последовательно команды
    npx create-react-app my-app
    cd my-app
    npm start
3 Устанавливаем библиотеку для чата
    npm i chat-for-test
Встраиваем в наше приложение 
4 Заменяем содержимое файла src/App.js на этот кусок кода
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from 'chat-for-test-beta'
import 'chat-for-test-beta/src/styles/App.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Chat>
</Chat>, document.getElementById('root'));
registerServiceWorker();
```
5 Готово!
