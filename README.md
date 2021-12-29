# слайдер MetaSlider 
Посмотреть демо страницу можно по ссылке https://galiamuslimova.github.io/Slider/

## Установка приложения
Установите с помощью
`npm install git+https://galiamuslimova.github.io/Slider.git`
или
`npm install meta-slider`
Затем, для подключения на страницу 
```
  import MetaSlider from 'meta-slider
  import 'meta-slider/dist/index.css'
```
затем для добавления слайдера на элемент
`new MetaSlider(element, {})`
где element это jquery элемент слайдера, а {} содержит необходимые опции. Например
```
let element = $(".mySlider")
new MetaSlider(element, {
  min: 5,
  max: 16
})
```

## Параметры слайдера
В options можно задать следующие параметры:    
+ min: 0, минимальное значение
+ max: 15, максимальное значение
+ step: 10, шаг
+ from: 10, начальное значение
+ to: 70, конечное значение
+ vertical: true, включить вертикальный вид или отключить
+ tip: true, включить подсказки или отключить
+ range: true, включить два значения или отключить


## Тесты
Команда для запуска тестов **npm test**
Команда для запуска приложений локально **npm start**

## Совместимость
Использованы jquery version 3.6.0, node version 14.16.0

