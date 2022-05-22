import { useRef } from 'react';

/*
    An uncontrolled component is a component that renders form elements,
    where the form element's data is handled by the DOM (default DOM behavior).
    To access the input's DOM node and extract its value you can use a ref.
    To listen to events, you can listen directly to the DOM element using vanilla JS.
*/
export const UncontrolledComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Access the input value with:
  // inputRef.current?.value
    
  return <input type="text" defaultValue="Smith" ref={inputRef} />
}