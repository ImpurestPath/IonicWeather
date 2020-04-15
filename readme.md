# Сервис прогноза погоды

Сервис призван помогать пользователю быстро определить погоду в своем населенном пункте.

Для реализации данного проекта в виде веб-приложения был использован фреймворк Ionic с использованием Angular. Используемые языки - TypeScript, HTML.

При использовании данного сервиса пользователь попадает на главную страницу с прогнозом погоды города Москва. Если нужно изменить город, то в правом верхнем углу находится кнопка, перенаправляющая на страницу выбора места. В форме ввода используются подсказки места. После выбора города показывается страница с прогнозом. В прогнозе показывается текущая температура, ощущаемая температура, погодные условия и скорость ветра в виде списка.

## Процесс работы программы

При загрузке приложения происходит получение данных от API Яндекс.Погода для стандартного города (Сейчас это Москва). Если пользователь хочет изменить город, то открывается страница с полем поиска с функцией автодополнения места от Google.Maps. При выборе города приложение запрашивает координаты выбранного места из Google Maps API. Запрос на получение погоды содержит данные координаты. После выбора города пользователь возвращается на страницу погоды с обновленной информацией.

## Установка

Необходим установленный Node.js

```sh
npm install 
```


## Использование

Для запуска необходимо запустить следующую команду из директории проекта

```sh
ionic serve
```


