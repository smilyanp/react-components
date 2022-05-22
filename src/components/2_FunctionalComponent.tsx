import { useState } from "react";

/*
   REACT FUNCTIONAL COMPONENTS

   Functional components in React are just Javascript Functions that
   accept props return a React component.

   Functional components don't support setState() the same as Class components.
   Instead, they need to use hooks to add state functionality. Previously (before React 16),
   you would have had to re-write the component into a class component to support state and
   to make it "stateful".

   There are no render method, lifecycle methods, constrictor available in a functional component.
*/

// A basic, minimal react functional component
// This is the most simple component you can create in React
export const ExampleFunctionalComponent = () => {
    return <div>Functional component one</div>;
}

// A react functional component with state and props
type ComponentProps = {};

export const FunctionalComponent = (props: ComponentProps) => {
    const [count, setCount] = useState(0);
  
    const increase = () => {
        setCount(count+1);
    }
  
    return (
        <div>
            <h1>Functional component</h1>
            <h3>Counter: {count}</h3>
            <button onClick={increase}>Add</button>
        </div>
    )
}  