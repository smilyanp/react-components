import { useEffect, useState } from "react";
/* 
    HIGHER ORDER FUNCTIONS
    Higher order functions take a function or two as a parameter and return a new function

    Examples of higher order functions:

    .forEach()
    This iterates over every element in an array with the same code, but does not change or mutate the array, and it returns undefined.
    
    .map()
    This method transforms an array by applying a function to all of its elements, and then building a new array from the returned values.
    
    .reduce()
    This method executes a provided function for each value of the array (from left to right).
    
    .filter()
    This checks every single element in an array to see whether it meets certain criteria as specified in the filter method, and then it returns a new array with the elements that match the criteria.
*/

// Creating a custom higher order function
export const ExampleHOF = (name: string) => {
    return (age: number) => ({
        name,
        age
    })
}
const getData = ExampleHOF('Smith');
const result = getData(30);
// result:
// {
//    name: 'Smith',
//    age: 16
// }

/*
    HIGHER ORDER COMPONENT
    Higher order components are not a specific React component. They are a technique for re-using logic similar to higher order functions.
    They embrace the concept of composition. They are an implementation of the DRY (don't-repeat-yourself) principle.
    
    Higher order components are simply components that take one or more components as a props and return a new component.
    This way the logic that they hold can be re-used

    https://stackoverflow.com/questions/57852370/hoc-functional-component
*/

const getUsernames = async () => { };

export const WithUsernames = ({ WrappedComponent }: any) => {
    const [usernames, setUsernames] = useState([])
    useEffect(() => {
        getUsernames().then((response: any) => {
            setUsernames(response.data)
        })
    }, [])

    if (usernames) {
        return <WrappedComponent data={usernames} />
    }
}

// <WithUsernames WrappedComponent={...}  />

export const withData = (data: any) => {
    return (WrappedComponent: any) => <WrappedComponent data={data} />
}

// const PopulatedComponent = withData(data)(WrappedComponent)
// <PopulatedComponent />

// Cases
// - Pass data / state to a component
// - Show loading state
// - Conditionally render (check user is logged in, a permission is enabled, etc.)
// - Provide styling