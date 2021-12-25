<ul>
<li>Meta slider</li>
<li>Посмотреть можно https://galiamuslimova.github.io/Slider/</li>
<li>Команда для запуска приложений локально <b>npm start</b></li>
<li>Команда для запуска тестов <b>npm test</b></li>
<li>Controller получает корневой элемент слайдера, строит слои Model View. Model отвечает за логику приложения. View строит дополнительные элементы слайдера и настройки</li>
<li>Чтобы подключить слайдер к элементу используйте element.slider(options)</li>
<li>В options можно задать следующие параметры options{    
    min: 0, минимальное значение
    max: 15, максимальное значение
    step: 10, шаг
    from: 10, начальное значение
    to: 70, конечное значение
    vertical: true, включить вертикальный вид или отключить
    tip: true, включить подсказки или отключить
    range: true, включить два значения или отключить
  }</li>
  <li>npm install git+https://github.com/galiaMuslimova/Slider.git </li>

</ul>

<ul>
  <li>node-modules/types/jquery/misc.d.ts изменила 'const jquery' на 'var jquery', чтобы сделать область видимости переменной глобальной</li>
  <li>использовался jquery версии 3.6.0, node версии 14.16.0</li>
</ul>


<ul>
  <li>версии использованных плагинов</li>
  <li>"@babel/preset-typescript": "^7.16.0",
  "@types/jquery": "^3.5.8",
  "@types/jsdom": "^16.2.13",
  "@typescript-eslint/eslint-plugin": "^5.0.0",
  "@typescript-eslint/parser": "^5.0.0",
  "babel-core": "^6.26.3",
  "babel-loader": "^8.2.3",
  "babel-preset-env": "^1.7.0",
  "chai": "^4.3.4",
  "eslint": "^8.2.0",
  "eslint-config-airbnb-base": "^15.0.0",
  "eslint-config-airbnb-typescript": "^16.1.0",
  "eslint-plugin-import": "^2.25.2",
  "ignore-styles": "^5.0.1",
  "jsdom": "19.0.0",
  "jsdom-global": "3.0.2",
  "mocha": "^9.1.3",
  "mocha-webpack": "^1.1.0",
  "ts-loader": "^9.2.6",
  "ts-node": "^10.4.0",
  "typescript": "^4.5.2",
  "webpack": "^5.64.4",
  "webpack-cli": "^4.9.1"</li>
</ul>

