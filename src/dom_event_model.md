# Dom event model

## level 0

html
```
  <div onclick="doSomething()">div</div>
```

js
```
  div.onclick = doSomething;
```

Dom level 0 的触发是先捕获后冒泡

## level 2

document.addEventListener(eventName, handler, useCapture = false)

支持指定是捕获还是冒泡，默认是冒泡