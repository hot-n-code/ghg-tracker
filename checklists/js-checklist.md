# Javascript and ESLint Checklist

Best practices for Javascript and ESLint.

## Javascript

### JS-01: Name constructs appropriately.

Do variables/functions/modules conform to our naming standards? (Consistent casing, descriptive names, etc.)

### JS-03: Use the spread operator when appropriate.

Can you use the spread operator?

### JS-04: Use object deconstruction when appropriate.

Can you use object deconstruction?

### JS-05: Use arrow functions when appropriate.

Can you use arrow functions? Note that arrow functions are normally better, except in Mocha tests.

### JS-06: Avoid lodash or underscore map, filter, etc.

ES6 includes many of the lodash or underscore functions. Use the built-in function rather than the lodash or underscore version when possible.

### JS-07: Avoid console.logs

Get rid of console.log.

### JS-08: Use JSDoc comments appropriately.

When a comment starts with '/**', it will be processed by JSDoc. Please ensure those comments are appropriate for inclusion.

## ESLint

### ESLINT-01: No errors, avoid warnings.

Are there ESLint errors or warnings that should be removed?

### ESLINT-02: Consider modifying our standards.

Based upon your review of code, should we be modifying the set of ESLint rules?


