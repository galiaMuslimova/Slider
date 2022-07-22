# слайдер MetaSlider

Посмотреть демо страницу можно по ссылке https://galiamuslimova.github.io/Slider/

## Установка приложения

Установите с помощью
`npm install git+https://github.com/galiaMuslimova/Slider.git#dist --save`
Затем, для подключения на страницу

```
  import "meta-slider/dist/index.js";
  import "meta-slider/dist/index.css";
```

затем для добавления слайдера на элемент
`element.MetaSlider()`
где element это jquery элемент слайдера

```
let element = $(".mySlider")
element.MetaSlider()
```

чтобы изменить или добавить новые опции используйте метод
`setOptions()`
Например,

```
element.MetaSlider("setOptions", {
    min: 5,
    max: 10,
    step: 1,
  })
```

чтобы получить опции слайдера или значения
`getOptions()`
Например,

```
const options = element.MetaSlider("getOptions")
```

чтобы получить значения в реальном времени добавьте в опции функцию onChange()
Например,

```
element.MetaSlider('setOptions', {
  onChange: (options) => {
    showValues(options);
  },
});
```

## Параметры слайдера

В options можно задать следующие параметры:
| | min | max | step | from | to | isVertical | hasTip | withRange |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Тип | number | number | number | number | number | boolean | boolean | boolean |
| Дефолтное значение | 10 | 40 | 4 | 8 | 24 | false | true | true |
| Обязательное | нет | нет | нет | нет | нет | нет | нет | нет |

- min - минимальное значение
- max - максимальное значение
- step - шаг
- from - начальное значение
- to - конечное значение
- isVertical - вертикальный вид или нет
- hasTip - есть подсказки или нет
- withRange - два значения или одно

## Тесты

Команда для запуска тестов **npm test**
Команда для запуска приложений локально **npm start**

## Линтер

Команды для запуска линтера **npm run lint**, **npm run lint-fix**

## Совместимость

Использованы jquery version 3.6.0, node version 14.16.0, typescript version 4.5.5, pug version 3.0.2.

## UML-диаграмма

![alt UML-диаграмма](https://github.com/galiaMuslimova/Slider/blob/master/Diagram.jpg)

## Описание слоев

**_Presenter_** принимает в качестве параметра корневой элемент слайдера _root_ и пользовательские опции _option_. Создает класс _View_.  
**_View_** создает DOM-элемент слайдера.  
**_Presenter_** берет из _View_ значения ширины и начала созданного слайдера, и с этими параметрами создает класс _Model_.  
**_Model_** Корректирует пользовательские опции. Формирует массив значений шкалы и их позиций. Формирует параметры для бегунков.  
**_Presenter_** берет значения из _Model_ и передает в соответствующие функции _View_.  
**_View_** создает класс _Track_ для основной линии слайдера, класс _Handle_ для бегунков, класс _hasTip_ для подсказок, класс _Interval_ для интервала и класс _Scale_ для шкалы. Каждый из этих классов добавляет свой DOM-элемент. Также _View_ создает класс _Panel_, который устанавливает значения для панеля конфигурации.

**_Panel_** при изменение значений конфигурации уведомляет _Observer_.  
**_View_** регистрирует такие события, как клик по шкале и движение бегунка. И также уведомляет _Observer_.  
**_Observer_** в свою очередь передает эти данные подписчику контроллеру.  
**_Presenter_** корректирует полученные данные в _Model_ и передает _View_.  
**_View_** передает дальше элементам, в соответствующие классы.
