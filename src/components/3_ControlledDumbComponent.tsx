import { useState } from 'react';

/*
  A controlled component is a component that renders FORM elements and controls them by keeping the form data in the component's state.
  In a controlled component, the form element's data is handled by the React component (not DOM) and kept in the component's state.
  A controlled component overrides the default behavior of the HTML form elements.
  A controlled component is created by connecting the respective form element to the state,
  by setting its attribute value and the onChange event.
*/
export const ControlledDumbComponent = () => {
  const [name, setName] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return <input type="text" value={name} onChange={handleInput} />;
}