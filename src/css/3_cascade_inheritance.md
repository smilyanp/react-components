# The cascade and inheritance

https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade

CSS stands for Cascading Style Sheets. The cascade the algorithm which resolves multiple conflicts of styles rules that apply to the same HTML element.

It is critical to understand the cascade, because that helps you understand how the browser will resolve these conflicts.

## Stages

There are four separate stages to the cascade deciding which rule from a conflicting set to apply to an element:

1. **Position and order of appearance**: Depending on the order in which the rules appear in your CSS
2. **Specificity**: An algorithm which determines which CSS selector has the most specific (strongest) match
3. **Origin**: Based on where your CSS comes from - default browser style, browser plugin or your own
4. **Importance**: Rules can have extra weight and you can

## Position and order of appearance

When the cascade calculates the resolutions of conflicts it takes into consideration the position of the CSS rules, or the order in which they appear.

A very simple example is, when you have rules that are exactly the same, the one that's last in order gets priority.

Example conflict:

```
p {
  color: red;
}

p {
  color: green;
}
```

One other practical example is how you load the CSS on the page. If you use a `<link>` element and load one file at the top of your HTML document and one at the bottom, the one further down will take priority.

The same is valid if you were to load your CSS via `<style>` tags.

So a style tag defined after a link tag will have priority.

An inline `style` attribute (`<p style="padding-top: 10px">...`) will always override all other CSS, regardless of it's position (as it is the closest to the styled element), unless you apply an `!important` to the other styles.

### Position within a rule

Another situation where position is important is within the rule. For example:

```
button {
    color: purple;
    color: red;
}
```

Even though the colour has be defined twice, the purple rule will be ignored because the red one comes after it in the order.
**This is a commonly utilized feature where you want to create fallbacks for backwards compatibility with older browsers:**

```
button {
  font-size: 2rem;
  font-size: clamp(2rem, 1rem + 3vw, 2rem);
}
```

This works because browser don't throw errors when they don't understand a CSS property, they simply ignore it.

## Specificity

Specificity algorithm figures out which CSS selector is **the most specific**, based on a weighing and scoring system to make those calculations.

When you make a rule more specific according to the algorithm's rules, that rule's properties will be applied over any others, even if they appear later in the CSS in terms of positioning.

For example, if you have a type selector vs a class selector, the class selector will be considered more specific and will be applied:

```
.priority-btn {
    color: blue;
}
button {
    color: red;
}
```

An ID will make the CSS rule even more specific, so styles applied with an ID will override most other styles. This is another reason why it is not a good idea to apply styles with an ID based selector, which can make maintenance and working with that element more difficult in the future.

### Cumulative specificity

Every selector has it's own points, which define how specific it is. When you combine multiple types of selectors the points each of them carries are added together. This can make a very specific selector hard to override, e.g.: `button.primary.anotherclass[type="submit"]:hover`.

This means that is is a best practice to keep your selectors as simple as possible, as general as possible to get the styling you need and nothing more. Doing styling this way can make your CSS more reusable and prevent you from writing even more of it.

There will be situations where using specificity can help you overcome an issue, but always consider the costs and see if you can instead simplify other selectors.

## Origin

The CSS we load and write on a page is not the only one that is applied to the elements on that page. In order to understand which CSS should be used, the cascade algorithm considers the origin of that CSS to determine which is more important.

The order of specificity from least specific to most specific is:

1. **User agent base styles.** These are the styles that your browser applies to HTML elements by default.
2. **Local user styles.** These can come from the operating system level, such as a base font size, or a preference of reduced motion. They can also come from browser extensions, such as a browser extension that allows a user to write their own custom CSS for a webpage.
3. **Authored CSS.** The CSS that you author.
4. **Authored !important.** Any !important that you add to your authored declarations.
5. **Local user styles !important.** Any !important that come from the operating system level, or browser extension level CSS.
6. **User agent !important.** Any !important that are defined in the default CSS, provided by the browser.

https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#cascading_order

![](https://web-dev.imgix.net/image/VbAJIREinuYvovrBzzvEyZOpw5w1/zPdaZ6G11oYrgJ78EfF7.svg)

## Importance

Not all rules have the same importance as well and they don't all have the same specificity. The **order of importance**, from the least important to the most important is:

1. normal rule type, such as font-size, background or color
2. animation rule type
3. !important rule type (following the same order as origin)
4. transition rule type

Active transition and animation rules have higher importance than normal rules. Transitions have higher importance than even rules containing `!important`. The reason is, because transitions and animations that are active are expected to change the visual state of the element and must be able to override any default states.

## DevTools

In the browser dev tools, when you select an element you can see all the CSS that applies to that element in the order in which it is loaded, which origin it comes from and you can see conflicting rules overridden based on the cascade algorithm.

If you can't find the CSS you wrote in the list for that element, it means that the selector you used doesn't match that element.

## Tests / questions

https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_tasks

# Inheritance

When an element doesn't have certain properties specified for them, they inherit them instead.

For example, if you want to make an element with a class look like a button:

```
.my-button {
  display: inline-block;
  padding: 1rem 2rem;
  text-decoration: none;
  background: pink;
  font: inherit;
  text-align: center;
}
```

```
<article>
    <a href="#" class="my-button">I am a button link</a>
</article>
```

but you see that in your code using the class the button doesn't have the right text colour. In this case the link colour was inherited from the colour of a different CSS rule, and because the button class didn't specify its colour property explicitly it still used the property inherited from the parent:

```
article a {
  color: red;
}
```

This is because CSS tries to inherit as much as possible to style an element based on its context, to help you write less CSS in order to achieve a consistent look.

## Inheritance flow

Here is how inheritance works. Example HTML:

```
<html>
  <body>
    <article>
      <p>Lorem ipsum dolor sit amet.</p>
    </article>
  </body>
</html>
```

The `html` element won't inherit anything because it is the first element in the document. As soon as you add CSS to that root element, it starts to cascade down the tree:

```
html {
    color: red;
}
```

The `color` property will be inherited by the other elements on the page. All other elements on the page will have that color property value.

```
body {
  font-size: 1.2em;
}
```

Now because we went wont level down in the tree structure and applied the font size to the body, the `html` element will have its original font size value (user agent), but all other elements inside of the body will inherit the font size from it.

**Inheritance only cascades downwards.**

```
p {
  font-style: italic;
}
```

In this case, since the `p` is the lowest in the tree structure, it is the only element that will have italics style.

## Properties that can be inherited

https://developer.mozilla.org/en-US/docs/Web/CSS/Inheritance#inherited_properties

- azimuth
- border-collapse
- border-spacing
- caption-side
- color
- cursor
- direction
- empty-cells
- font-family
- font-size
- font-style
- font-variant
- font-weight
- font
- letter-spacing
- line-height
- list-style-image
- list-style-position
- list-style-type
- list-style
- orphans
- quotes
- text-align
- text-indent
- text-transform
- visibility
- white-space
- widows
- word-spacing

## How it works

Every element has every **CSS property** defined by default with an **initial value**. That initial value is a property that is not inherited and shows as a default when the cascade cannot calculate the value for that element.

Properties that **can** be inherited, cascade downwards. So child elements will get a computed value which represents their parent's value for that property.

This means that a children of a parent with a `font-weight: bold` will all be bold, unless they override tha value themselves or the user agent has overridden that value.

## Controlling inheritance

### `inherit` keyword

You can force an element to inherit a property from it's parent's computed value with the `inherit` keyword specified for that property.

One good way of using this approach is to create exceptions.

- Have a general rule
- Then create an exception where that rule inherits from its parent dynamically (this way you avoid having to keep changing it as the parent changes)

```
strong {
  font-weight: 900;
}
```

```
.my-component {
  font-weight: 500;
}
```

```
.my-component strong {
  font-weight: inherit;
}
```

### `initial` keyword

Sometimes inheriting values can create problems. So using the `initial` keyword allows you to reset the inherited value.

Because every property in CSS has a default value, the `initial` keyword allows you to reset that property's value to that initial state.

```
aside strong {
  font-weight: initial;
}
```

This rule will override the strong and reset it back to being `bold` vs `900`.

### `unset` keyword

The `unset` keyword will act differently depending on whether a property is inheritable or not.

If a property is inheritable, `unset` will have the same effect as `inherit`.

If a property is **not** inheritable, `unset` will be equal to `initial`.

Because it is difficult to remember which properties are inheritable and which ones aren't, `unset` fits the bill in allowing us to reset values more easily:

```
/* Global color styles for paragraph in authored CSS */
p {
  margin-top: 2em;
  color: goldenrod;
}

/* The p needs to be reset in asides, so you can use unset */
aside p {
  margin: unset;
  color: unset;
}
```

This will remove the margin and set the color back to being inherited from its parent.

If you want to make sure that all properties are reset, you can use the `all` property on an element:

```
aside p {
    all: unset;
}
```
