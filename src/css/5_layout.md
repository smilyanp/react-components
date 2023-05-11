# Layout

<!-- https://web.dev/learn/css/layout/ -->

At the beginning most of the web was simple HTML text documents. When it came to building more complex layouts that had multiple columns, the only way to do it was to use `<table>` elements.

CSS made it possible to change how a website looks without touching the HTML document. Here's an article that goes over how the evolution of CSS has allowed us to build more complex layouts over time: https://24ways.org/2019/a-history-of-css-through-15-years-of-24-ways/

![](https://web-dev.imgix.net/image/VbAJIREinuYvovrBzzvEyZOpw5w1/vDDoFFoPVgJEuEaqcP4H.svg)

# A high level look

## The `display` property

1. Determines if the box acts as an `inline` or a `block`
2. Determines how box's children should behave

**Inline elements**

- Sit next to each other
- They preserve surrounding whitespace
- You cannot set explicit width / height
- Block level padding and margin will be ignored

**Block elements**

- Don't sit next to each other - they create a new line
- Unless changed they expand to the size of the inline dimension (full width in a horizontal mode)
- Margins will be respected on all sides

An example for managing children and their behavior is setting a `display: flex` - all the children of that box will convert to flex items and will accept the respective alignment and flow properties.

## Float

The `float:` property instructs the element to float in the specified direction. This allows the siblings of that element to wrap around it. This is commonly used to position an image and float it within a block of text (https://codepen.io/web-dot-dev/pen/VwPaLMg).

When you float an element, any elements that following that element might have their layout changed. To prevent this, use the `clear: both` property on an element **that follows the floating element** or use `display: flow-root` on the parent element.

This is a common problem with floats the above solves, which is when you have a box with a floated element inside it, and the floated element is taller than the other content inside the box. Default behavior is that the box will not clear the float, and anything that comes afterwards will also wrap the floated item.

Demo: https://jsfiddle.net/eubpoq1w/6/

https://rachelandrew.co.uk/archives/2017/01/24/the-end-of-the-clearfix-hack/

Float used to be the second way of creating layouts past the use of tables and it brought a revolution to the world of web design. But it did come with a lot of issues, quirks and hacks you had to know how to go around:

http://www.java2s.com/example/html-css/css-layout/float-index.html

### Example layout

Example multi-column layout using floats: https://jsfiddle.net/m4je2wv0/5/

## Flexbox

High level overview. Flexbox is one of the two main modern mechanisms for creating layouts.

Flexbox is design for **one-dimensional layouts**. This means it creates the layout on a single axis - either horizontally (by default) or vertically. By default it will

- align all the children next to each other in an inline fashion and
- stretch them so they all have the same height
- they will run on the same axis and not wrap when there's no more space - they will either overflow or squash to fit in the available space
- converts child elements to be flex items - it allows us to write rules specific to those types of elements and how they behave in the flex container

## Grid

High level overview. Grid is the second of the two main modern mechanisms for creating layouts.

Grid is designed for a **multi-axis** layouts (both vertical and horizontal). Grid is enabled with `display: grid` and provides some primitive functions such as `repeat()`. It has a unit called a fraction `fr` which refers to the fraction of remaining space. An example 12 column layout can be achieved:

```
.grid-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1em;
}
```

This creates a single axis layout, much like what flexbox allows us to do. However, flexbox would treat all of these items as a single group (on that 1 row), whereas grid allows us to modify the position of each of these elements in two dimensions. So, for example, it allows us to stretch the first element on two rows and multiple columns:

```
.grid layout :first-child {
  grid-row: 1/3; /* span to the third row */
  grid-column: 1/4; /* span to the fourth column */
}
```

## Positioning

Positioning is another tool when it comes to making layouts. The `position:` property changes how an element behaves in the flow of the document and how it relates to other elements.

The value of this property can be:

- relative
- absolute
- fixed
- sticky
- static

### Relative

The element retains it's space in the flow of the document and can be moved **relative to that initial position** in any direction. It is positioned relative to itself.

### Absolute

When you position an element absolutely it breaks the element out of the current document flow. This means you can

- Position the element anywhere in relation to its nearest relative parent (window, etc.)
- All the content surrounding the absolutely positioned element reflows to fill that remaining space

Imagine as if you had a set of blocks and you lifted one of them up above the others and the rest can now occupy that space.

Since we take the element out of the document's flow, it no longer affects the layout of its container element. So the container element does not take into account its height, so if there's nothing else to set the height, then the container will be zero height.

### Relative + Absolute

Since an absolutely positioned element moves in relation to its nearest relative parent, it is a common technique to give a parent element that's closer `position: relative` because it retains it's position in the document flow. Then the child of that element can receive `position: absolute`, which allows it to move more accurately in relation to it's original position, but without occupying any of the space a `position: relative` would.

https://jsfiddle.net/c5x20hLs/49/

### Fixed

A fixed position makes an element behave similarly to how the absolute position works. However, it always uses the `<html>` to position itself relative to. It also makes the element stay anchored from the top-left of the document based on the positioning values specified.

### Sticky

You can achieve a more predictable document flow with similar aspects as the `relative` position, when you use `sticky`. This makes the element stay anchored as the viewport scrolls past it, always anchored relative to the viewport based on the positioning values specified.

### Static

HTML elements are positioned `static` by default and are thus not affected by the top, bottom, left, right properties. Static elements are positioned according to the normal flow of the page.

## Useful

https://csslayout.io/
