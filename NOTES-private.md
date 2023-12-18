# Notes

TODO:

- Mobile design.
- Rules click outside to close.
- Refactor and cleanup
- A way to clear the score (clear local storage)

NOTE: If I run into too much trouble, it might be easier to just use React.

## Helpful Link

A helpful example:

- [Some help](https://aalekhpatel07.github.io/rpsls/)
- [The repo - uses svelte though!](https://github.com/aalekhpatel07/frontend-mentor-rpsls/tree/master)

Ripple effect example from chatGPT: [ripple.html](./ripple.html)

## What I Learnt

### JavaScript script tag placement

Put script tag at the end of the body section if the javaScript relies on the css being loaded first. Otherwise its fine to put it in the head section with defer attribute.

### Clicked elements id

Using `this.id` will give the id of the element the eventListener is attached to, whereas using `event.target.id` will give the id of specific elements that are clicked within the element the listener is attached to.

This means `this.id` is the much better option in my use case.

Note: when using `this.id` use `function () {}` rather than arrow functions for the eventListener's callback or it doesn't work.

### Click outside to close

The rulesCard element is inside the rulesOverlay element.

```js
rulesOverlay.addEventListener("click", (event) => {
  if (!rulesCard.contains(event.target)) {
    rulesOverlay.style.visibility = "hidden";
  }
});
```

### Center absolute element

Why use transform? Because the top/left placement refers to the corner of the element. Using transform will make it so the center is the focal point instead.

```css
.rules {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

NOTE: I ended up using flex to center the rules inside an absolute overlay.
