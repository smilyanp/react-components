# Selectors

Training game: https://flukeout.github.io/

## The parts of a selector rule

- Selector
- Declaration property
- Declaration value

![](https://web-dev.imgix.net/image/VbAJIREinuYvovrBzzvEyZOpw5w1/hFR4OOwyH5zWc5XUIcyu.svg)

## Simple selectors

These are the simplest and include using the HTML element itself, its attributes, classes or IDs

### Universal

Match any element - wildcard

```
* {
  font-size: 16px;
}
```

### Type

Match based on the HTML element's type directly

```
p {
    padding: 1.5em 2em;
}
```

### Class

The class selector matches any element on the page that has that class. An HTML element can have multiple classes applied.

```
.rounded-corners {
  border-radius: 5px;
}
```

The `.` dot is only used in CSS and not in the HTML definition. CSS commonly uses special characters in its selectors to mean different things.

In this case CSS looks for `one of many` classes on an element, rather than an exact match (the element only has one class).

```
<input class="rounded-corners" />
<div class="rounded-corners"></div>
<p class="rounded-corners"></p>
```

### ID

There should only ever be one single element on a page with a given ID.

```
#submit-button {
    color: red;
}
```

The ID selector in CSS is defined by a `#`.

```
<button id="submit-button">Submit</button>
```

### Attribute

You can select elements that have an HTML attribute or have an attribute with a specific value.

```
[data-type='primary'] {
  color: red;
}
```

```
<button data-type="primary">Click me</button>
```

Or if you want to be more general in the selector, you can omit the value and just select all elements with that attribute.

```
[data-type] {
  color: red;
}
```

```
<button data-type="secondary">Click me</button>
<button data-type="primary">Click me</button>
<button data-type="tertiary">Click me</button>
```

You can also match only portions of the strings in attributes

```
/* A href that contains "example.com" */
[href*='example.com'] {
  color: red;
}

/* A href that starts with https */
[href^='https'] {
  color: green;
}

/* A href that ends with .com */
[href$='.com'] {
  color: blue;
}
```

### Grouping

As we saw at the beginning a rule has 2 parts - a selector and a declaration. You can apply the same declaration to multiple selectors by grouping them together.

```
p,
.my-section,
#user-creation-form,
[name="user"] {
    padding: 2em 1em;
}
```

---

## Pseudo-classes and pseudo-elements

CSS lets you select elements based on

- state (hover, focus)
- internal tructures
- parts of an element

### Pseudo-classes

Pseudo classes let you select elements that are in a certain state, often because they have been interacted with.

https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

(Browser dev tools example of hover)

```
/* The link is hovered */
a:hover {
  outline: 3px solid blue;
}

/* All odd paragraphs must be pink */
p:nth-child(odd) {
  background: pink;
}
```

### Pseudo-elements

Pseudo elements are an amazing addition to CSS. They act differently to pseudo classes, because where pseudo classes select an element based on state, pseudo elements **create additional elements using CSS**.
They are also syntactically different. Pseudo classes use `:` and pseudo elements use `::`.

```
.prefixed-element::before {
  content: 'Prefix - ';
}
.suffixed-element::after {
  content: '- Suffix';
}
```

You can use pseudo elements to insert content at the start or at the end of an element. However, they are not limited to just that.

You can also use them select a part of an element, for example:

```
div::selection {
  background: pink;
  color: red;
}
```

Style the selected text in every div.

---

## Complex selectors

All the selectors so far have been extremely powerful, but mostly very generic, for wide brush strokes of capturing many elements together. However, sometimes we need much more fine-grained selection and this is where complex selectors come in hand.

It's worth pointing that these selectors can only cascade and select downwards, but not upwards (their parents).

### Combinators

Combinators sit **between** two selectors and help you narrow them down. They help you select elements based on **where they are positioned in the document**.
E.g. `p > b`.

#### Descendant combinator

https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator

The descendant combinator allows us to select a child inside of a parent. A child is an element enclosed in another.

```
<p>I am not ready to be a child yet</p>
<div>
    <p>I am a child</p>
    <section>
        <p>I am also a child of the div, just more deeply nested</p>
    </section>
</div>
```

In this case the `div` is the parent and the `p` is the child.

To select the p (the is specifically a child of the div) we can see CSS

```
div p {
    color: red
}
```

The space ` ` here is what lets the browser know we are trying to select a descendant.

# Next sibling combinator

https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator

You can select an element that immediately follows another element (in the DOM tree) by using the `+` character in the selector.

```
div + p {
    color: red
}

```

The above selects all paragraphs that come immediately after a div:

```
<p>I won't be selected</p>
<div>
    Some irrelevant functionality
</div>
<p>I come after a div, so I will be selected</p>
```

#### Child combinator

A child combinator, or a direct descendant selector is allows you to have more control over the recursion that comes with selectors. When you use the `>` combinator, your selector applies only to the **direct descendants**, or "one level deep" elements of your element.

```
div > p {
    color: red
}

```

```
<p>I won't be selected</p>
<div>
    <p>I will be selected</p>
    <div>
        <p>I won't be selected</p>
    </div>
<div>
```

#### Subsequent sibling combinator

`TODO`

### Compound selectors

You can combine selectors to increase specificity and readability. For example, target all paragraphs with a specific class

```
p.bold-font {
    font-size: bold
}
```

```
<p>Won't be selected</p>
<p class="bold-font">Will be selected</p>
```
