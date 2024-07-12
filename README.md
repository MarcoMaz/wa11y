# Description
Unstyled UI library of Web Components (Lit).

[LIVE Storybook Link](https://wa11y-storybook.netlify.app/?path=/story/atoms-button--button-with-default-label)


## Features
- **Web Components:** Utilizes Lit to create lightweight, encapsulated components.
- **Customizable:** Designed to be unstyled by default, allowing developers full control over styling.
- **Reusable:** Each component is modular and can be used across different projects.
- **Easy Integration:** Simple to incorporate into existing web applications or projects.
- **Documentation:** Comprehensive documentation for each component's usage and properties.

## Installation
To install and start using the library, follow these steps:

1. Clone the repository: ```git clone https://github.com/MarcoMaz/wa11y-ui.git```
2. Install dependencies: ```npm install```
3. Build the library: ```npm run build```

## Why Light DOM?
Using the Light DOM allows these components to:

1. **Open Up to External Styling:** Since the components are unstyled by default, they are meant to be styled by the parent application. The Light DOM makes it easier to apply global styles or CSS frameworks directly to the components without the encapsulation restrictions of the Shadow DOM.
2. **Consistency with Global Styles:** The Light DOM ensures that components naturally inherit and respect global CSS styles defined in the parent application. This avoids issues where styles need to be duplicated inside shadow roots, making the styling process simpler and more maintainable.
3. **Flexibility in Theming:** By using the Light DOM, components can be easily themed using existing CSS variables, utility classes, and CSS-in-JS solutions available in the parent application, providing a unified and consistent look across the entire application.

## Frameworks

### React

To use components from the wa11y-ui library in your React application, follow these steps:

1. Install the library

`npm install wa11y-ui` or `yarn add wa11y-ui`

2. Import the component

For example, to use the **wa-button** component:

`import 'wa11y-ui/wa-button'`

3. Use the component

```
import React from 'react';
import 'wa11y-ui/wa-button';

function App() {
  return (
    <>
      <wa-button label="hello world!"></wa-button>
    </>
  );
}

export default App;
```

4. Add TypeScript declarations (First time only!)

To ensure TypeScript correctly recognizes the custom elements, you need to add a declarations file. Create a file named `declarations.d.ts` in your `src` directory and add the following code:

```
/* eslint-disable @typescript-eslint/no-namespace */
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: `wa-${string}`]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [key: string]: string | number | boolean;
        },
        HTMLElement
      >;
    }
  }
}
```

## Styling

### CSS Modules

#### How to Use

Wa11y supports CSS Modules, allowing you to scope CSS by automatically creating unique class names. This ensures styles are scoped to the component and do not affect other parts of your application.


#### Steps to Use Components with CSS Modules

**1. Import Your Component Styles**

Create a CSS module file (e.g., **Component.module.css**) with your styles:

```
.className {
  background-color: purple;
}
```

Import this CSS module in your component file:

```
import styles from './Component.module.css';
```

**2. Define Your Class Map**

Map your CSS module class names to the component's class names:

```
const classMap = {
  className: styles.className
};
```
**Note:**

You can include more properties in the **classMap** object as needed. Available properties and their usage are documented in each component's documentation. This allows for more flexible and granular control over the component's styling.


**3. Pass the Class Map to the Component**

Use the classMap prop to pass the class mapping to your component:

```
<your-component classMap={JSON.stringify(classMap)}></your-component>
```
**Note:** 

If you are using React, use **JSON.stringify** to pass the class map as a string. Other frameworks do not require this step.


