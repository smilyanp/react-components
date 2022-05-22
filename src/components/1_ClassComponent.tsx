import React from "react";

/*
    REACT CLASS COMPONENTS

    A class component requires that you extend React.Component and
    you must use the render() method to return JSX, a react component.
    
    Class components are stateful components, because they support setState() by default.

    You can access lifecycle methods (componentDidMount, etc.) directly in a class component.

    Hooks are not supported in class components.
*/

// Basic, minimal class component
export class ExampleClassComponent extends React.Component {
    render() {
      return <h2>Hi, I am a Car!</h2>;
    }
}

// An example class component with state and props
type ComponentProps = {};
type ComponentState = { count: number };

export class ClassComponent extends React.Component<ComponentProps, ComponentState> {
    constructor (props: any) {
        super(props);
        this.state = {
            count: 0
        };
        this.increase = this.increase.bind(this);
    }
      
   increase(){
       this.setState({
           count: this.state.count + 1
       });
   }
  
    render(){
        return (
            <div style={{margin:'50px'}}>
               <h1>Class component</h1>
               <h3>Counter: {this.state.count}</h3>  
               <button onClick={this.increase}> Add</button>
            </div>
        )
    }
}