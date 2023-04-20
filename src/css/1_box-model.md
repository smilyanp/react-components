<!-- https://web.dev/learn/css/box-model/ -->
<!-- https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model -->

# Box Model

## Intrinsic

Asking the content how much space it needs - the content can change and the box changes with it. The box looks into itself to figure out what the content is that it holds and determines its size.

When you switch to intrinsic sizing, you are letting the browser make decisions for you, based on the box's content size. It's much more difficult for there to be overflow with intrinsic sizing because our box will resize with its content, rather than try to size the content. It's important to remember that this is the default, flexible behavior of a browser. **Though extrinsic sizing gives more control on the surface, intrinsic sizing provides the most flexibility, most of the time.**

## Extrinsic

200px x 200px - landscape image - Predefined box and you put content inside the box. You can tell the content how to span inside the box

## Parts of the box model

- The content that lives in an element is the first part of the box model.

  - width and height properties apply

- Then is the padding box, which lives inside the element but around the content.

  - The padding box does affect the geometric shape of the element and it's placement on the page

- Then we have the border box, which is around the padding box and can be anything between 1px and a thousand+.

  - The border box does affect the geometric shape of the element and it's placement on the page

- Outline and box shadow are outside of the border box, but they don't affect the size of the element as they are only painted. No matter how big they are, they won't change the size of the element.

- Finally there is the margin box which separates the element from other elements. It pushes it away from them.

- There are also scrollbars which are dynamic. They can take up their own space or can overlay the box. But ultimately they are part of the padding box's space.

By default some elements already have spacing (padding / margin) applied to them (ul, li, etc.). This comes from the user agent stylesheets coming with the specific browser you are using. And they can differ between browsers. You can use the Normalise / Reset CSS stylesheet.

### The gallery painting analogy.

## Standard box model

In the standard model, if you provide width + height, then padding and border are added on top of those to define the size of the element.

The margin does affect the space around the box as usual, but doesn't count towards its size. The box's area stops at the border — it does not extend into the margin.

## Alternate box model

In the alternative box model, any width is the width of the visible box on the page. The content area width is that width minus the width for the padding and border. No need to add up the border and padding to get the real size of the box.

To turn on the alternative model for an element, set box-sizing: border-box on it:

```
.box {
  box-sizing: border-box;
}
```

### Best practice

<!-- https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ -->

Use the alternative box model for all of your elements, and set the box-sizing property on the `<html>` element and set all other elements to inherit that value:

```
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
```

### Test

Add the same width, height, margin, padding and border to two elements. Choose the standard and alternate models for each and compare.

## Margin

Pushes the element away from other elements. It's always added after the size of the visible box.

Margins can be negative, which means it can overlap elements on the page of the side it's negative.

Depending on whether two elements whose margins touch have positive or negative margins, the results will be different:

- Two positive margins will combine to become one margin. Its size **will be equal to the largest individual margin**.
- Two negative margins will collapse and **the smallest (furthest from zero) value will be used**.
- If one margin is negative, its value will be subtracted from the total.

`The main thing to remember is that margin collapsing is a thing that happens if you are creating space with margins and don't get the space you expect.`

### Margin Collapsing

The top and bottom margins of blocks are sometimes combined (collapsed) into a single margin whose size is the largest of the individual margins. **Note that the margins of floating and absolutely positioned elements never collapse.**

<!-- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing -->

## Padding

Pushes the content away from the border. You cannot have negative padding.

## Box types

### Block type

You can use all properties to modify this type of element - width, height, padding, border, margin.

A block type element creates a line break after the element.

### Inline type

Ignores width and height, you can only apply padding, border, margin properties.

An inline element types don't respect **top and bottom, margin and padding.**

An inline type element does not create a line break after the element.

### Inline-block type

The major difference is that inline-block allows to set a width and height on the element compared to an inline element.

An inline-block type element does not create a line break after the element compared to a block element.

Some elements are block by default (`<div>`), other elements are inline by default (`<span>`, `<a>`), but to create an inline-block element you need to specify the `display: inline-block` property in CSS. You can also override the display type on any element, so you can make a `<span>` a block type and a `<div>` an inline or inline-block type.

### Example

You can use the display property to make an `<a>` element into a inline-block type to allow it to have padding so that the link has a larger surface area to click when used in navigation menus.

## Tests

https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Box_Model_Tasks

https://www.vskills.in/practice/css-box-model-questions
