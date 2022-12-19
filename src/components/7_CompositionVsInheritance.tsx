/*
    INHERITANCE - The gorilla / banana problem
    https://www.johndcook.com/blog/2011/07/19/you-wanted-banana/

    When inheriting from one class and another, you inherit all the methods and properties set on them.
    This slowly leads to the problem that when you just one simple little thing, you extend a class and
    you receive the whole toolbox of methods and properties, even though you don't need them.

*/

/*
    COMPOSITION - Small re-usable blocks that compose what you want to build
    Atomic design - https://bradfrost.com/blog/post/atomic-web-design/

    With composition, we create small functional blocks that have only one concern.
    Then we can bring all these building blocks together and create a component that
    has some or all of the necessary functionality.

    -----
    https://reactjs.org/docs/composition-vs-inheritance.html
    
    In React, this is also achieved by composition, where a more “specific” component renders a more “generic” one and configures it with props:

    Props and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way.
    Remember that components may accept arbitrary props, including primitive values, React elements, or functions.

    If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module.
    The components may import it and use that function, object, or a class, without extending it.
*/

export const Test = () => <div></div>