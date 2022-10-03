# physics

A WebWorker based physics system..

```html
<a-scene physics="workerUrl:./oimoWorker.js; gravity:0 -5 0;">
  <a-box body="type:dynamic" position="-1 2.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
  <a-sphere body="type:dynamic" position="0 2.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
  <a-cylinder body="type:dynamic" position="1 2.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
  <a-box body="type:static" position="0 0 -4" rotation="-90 0 0" width="4" height="4" depth="0.0625" color="#7BC8A4"></a-box>
  <a-sphere body="type:kinematic" position="-4 1 -4" animation="property:position; to:4 1 -4; dir:alternate; loop:true; easing:linear; dur:10000;"></a-sphere>
  <a-sky color="#ECECEC"></a-sky>
</a-scene>
```


## Properties

| Property  | Description          | Default  |
| --------- | -------------------- | -------- |
| workerUrl | URL of worker script |          |
| gravity   | Gravity vector       | 0 -10 0 |


## Methods

| Method           | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| eval(expression) | Evaluate an expression in the worker, where `world` refers to the physics world. |

Note: the `eval` method depends on the specific physics engine that the worker is based on..


## Related components

 - [body](./physics/body.md)
 - [shape](./physics/shape.md)
 - [joint](./physics/joint.md)
