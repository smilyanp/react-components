import React, { memo } from 'react';

/*
    JS PURE FUNCTIONS

    Pure components come from the concept of pure functions in JavaScript functional programming.
    With pure functions specific input parameters, we always have a specific output.
    The output is solely dependent on the input parameters and no other external variable.
    Pure functions should not have any side effects and should only interact with their internal scope,
    and return predictable results. The shouldn't:

    - Modifying any external variable or object property
    - Logging data to the console
    - Writing Data to a file
    - Writing data to the network
    - Triggering any external process
    - Calling any other functions with side-effects
    - Making Asynchronous Data Calls

*/

// Impure function - the result it provides is influenced by an external variable,
// hence it's result does not depend solely on the input parameters
const externalScopeValue = 1
export const ImpureFunctionOne = (paramValue: number) => {
    return externalScopeValue + paramValue;
}

// Pure function - the result it provides is always the same as long as the parameters are the same
// Pure functions allow us to cache results and to provide a massive performance benefit
export const PureFunctionOne = (paramValueOne: number, paramValueTwo: number) => {
    return paramValueOne + paramValueTwo;
}

/*
    PURE COMPONENTS

    Do not re-render if the the current state/props are the same as the previous state/props.
    
    *** Thus, they handle the shouldComponentUpdate implicitly. ***

    A pure component renders the same output if it's given the same state and props.
    A pure component performs shallow comparison between previous and current state/props.

    PURE CLASS COMPONENTS
    React.PureComponent - class MyPureComponent extends React.PureComponent {}

    PURE FUNCTIONAL COMPONENTS

    Functional components are useful because we can isolate the state management from the component (to its parent),
    and that's why they are also often called Stateless components. However, they don't have the built in optimisation
    of pure components (handling shouldComponentUpdate implicitly). The way we can bring this benefit to functional components
    is by using React.memo().

    React.memo()

    It is a higher order component, that takes a React components as the first argument and returns a Pure React component.
*/


// PURE FUNCTIONAL COMPONENT
// https://blog.logrocket.com/what-are-react-pure-functional-components/
interface PureComponentProps {
    name: string
}
export const PureComponent = memo((props: PureComponentProps) => {
    return <div>{props.name}</div>
}, (prevProps: any, nextProps: any) => {
    // Can take over custom comparison here
    // This is optional
    return true
});


// PURE CLASS COMPONENT
interface PureClassComponentProps {
    name: string
}
export class PureClassComponent extends React.PureComponent<PureClassComponentProps> {
    render() {
        const { name } = this.props;
        return (<div>{name}</div>);
    }
};

// ================================================
export const MockParentComponent = () => (
    <div>
        <PureComponent name="Lucy" />
        <PureClassComponent name="Ted" />
    </div>
)

/*
    SHALLOW COMPARISON
    https://github.com/rohan-paul/Awesome-JavaScript-Interviews/blob/master/React/Hooks/Shallow-comparison-React-useEffect-compare-array-in-second-argument.md#:~:text=B%3E%20Shallow%20comparison%20is%20when,the%20values%20inside%20that%20object.

    React does a shallow comparison. If you use an object or an array that you mutate,
    React will think nothing changed. Because objects are compared by reference.

    Shallow compare does check for equality. When comparing scalar values (numbers, strings) it compares their values.
    When comparing objects, it does not compare their's attributes - only their references are compared (e.g. "do they point to same object in memory ?).
*/

// user = {
// 	name: "John",
// 	surname: "Doe"
// };

// const user = this.state.user;
// user.name = "Jane";
// console.log(user === this.state.user); // true

// Notice you changed users name. Even with this change objects are equal. They references are exactly same. Meaning no change and no re-render

// By cloning original object you create new copy, with different reference. This will make sure the shallow comparison returns the correct result.
// You can clone an object with:

// Object.assign({}, obj) - Using object assign
// {...obj}, [...arr] - Using the spread operator

