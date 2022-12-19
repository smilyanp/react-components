Catch
- Use try/catch to handle errors for asynchronous functionality (API call)
- You can log the error on catch
- Update the state if there’s an error and render something accordingly

Render in UI - React Error Boundary
- Render UI when an error occurs when a component cannot render
- Use the componentDidCatch to log error to service
- It doesn't handle errors in asynchronous callbacks, on server-side-rendering, or in event-handlers because they're outside the boundary.

react-error-boundary library
- Does the above two at the same time
- Has a callback prop you can set to send the errors to a logging service

Logging
- Console.log is only good while you’re developing (you only see the error in the user’s browser)
- For production use a third-party service for logging, e.g. Sentry
