# слайдер MetaSlider 
Посмотреть демо страницу можно по ссылке https://galiamuslimova.github.io/Slider/

## Установка приложения
Установите с помощью
`npm install git+https://github.com/galiaMuslimova/Slider.git`
Затем, для подключения на страницу 
```
  import MetaSlider from 'meta-slider'
  import 'meta-slider/dist/index.css'
```
затем для добавления слайдера на элемент
`new MetaSlider(element, {})`
где element это jquery элемент слайдера, а {} содержит необходимые опции. Например

или 

`element.MetaSlider(options)`
```
let element = $(".mySlider")
new MetaSlider(element, {
  min: 5,
  max: 16
})
```
чтобы изменить или добавить новые опции используйте метод
`setOptions()`
Например, 
```
slider.setOptions(options)
```
или
```
slider.setOptions({min: 5, step: 2})
```
чтобы получить опции слайдера
`getOptions()`
Например, 
```
const options = slider.getOptions()
```
чтобы получить згачения слайдера
`getValues()`
Например, 
```
const values = slider.getValues()
```
чтобы получить значения в реальном времени добавьте в опции функцию onChange()
Например, 
```
slider.setOptions({
  onChange: function (values) {        
    alert(values)
  }}
)
```

## Параметры слайдера
В options можно задать следующие параметры: 
|  | min | max | step | from | to | isVertical | hasTip | withRange | 
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | 
| Тип | number | number | number | number | number | boolean | boolean | boolean | 
| Дефолтное значение | 10 | 40 | 4 | 8 | 24 | false | true | true | 
| Обязательное | нет | нет | нет | нет | нет | нет | нет | нет | 
   
+ min - минимальное значение
+ max - максимальное значение
+ step - шаг
+ from - начальное значение
+ to - конечное значение
+ isVertical - вертикальный вид или нет
+ hasTip - есть подсказки или нет
+ withRange - два значения или одно


## Тесты
Команда для запуска тестов **npm test**
Команда для запуска приложений локально **npm start**

## Линтер
Команды для запуска линтера **npm run eslint**, **npm run eslint-fix**

## Совместимость
Использованы jquery version 3.6.0, node version 14.16.0, typescript version 4.5.5, pug version 3.0.2.

## UML-диаграмма
![alt UML-диаграмма](https://github.com/galiaMuslimova/Slider/blob/master/Diagram.jpg)

## Описание слоев
***Presenter*** принимает в качестве параметра корневой элемент слайдера *root* и пользовательские опции *option*. Создает класс *View*.  
***View*** создает DOM-элемент слайдера.  
***Presenter*** берет из *View* значения ширины и начала созданного слайдера, и с этими параметрами создает класс *Model*.  
***Model*** Корректирует пользовательские опции. Формирует массив значений шкалы и их позиций. Формирует параметры для бегунков.  
***Presenter*** берет значения из *Model* и передает в соответствующие функции *View*.  
***View*** создает класс *Track* для основной линии слайдера, класс *Handle* для бегунков, класс *hasTip* для подсказок, класс *Interval* для интервала и класс *Scale* для шкалы. Каждый из этих классов добавляет свой DOM-элемент. Также *View* создает класс *Panel*, который устанавливает значения для панеля конфигурации.

***Panel*** при изменение значений конфигурации уведомляет *Observer*.  
***View*** регистрирует такие события, как клик по шкале и движение бегунка. И также уведомляет *Observer*.  
***Observer*** в свою очередь передает эти данные подписчику контроллеру.  
***Presenter*** корректирует полученные данные в *Model* и передает *View*.  
***View*** передает дальше элементам, в соответствующие классы.  



  


