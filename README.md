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

1. Clone the repository: `git clone https://github.com/MarcoMaz/wa11y-ui.git`
2. Install dependencies: `npm install`
3. Build the library: `npm run build`

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

#### Steps to follow

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

### Tailwind CSS

Wa11y components can be styled using Tailwind CSS, offering a utility-first approach similar to CSS Modules. Follow the steps below to integrate Tailwind CSS and style the **wa-checkbox** component.

#### Example in a React Application

**1. Install Tailwind CSS**

Follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation) to set up Tailwind in your project.

**2. Define Your Class Map**

Create a class map with Tailwind CSS utility classes:

```
const classMap = {
  label: "text-gray-700 font-medium",
  input: "form-checkbox h-4 w-4 text-blue-600",
  span: "ml-2 text-sm"
};
```

**3. Use the Component**

Apply the class map to the **wa-checkbox** component:

```
import React from 'react';
import 'wa11y-ui/wa-checkbox';

function App() {
  const classMap = {
    label: "text-gray-700 font-medium",
    input: "form-checkbox h-4 w-4 text-blue-600",
    span: "ml-2 text-sm"
  };

  return (
    <>
      <wa-checkbox classMap={JSON.stringify(classMap)}></wa-checkbox>
    </>
  );
}

export default App;
```

### Bootstrap CSS

Wa11y components can be styled using Bootstrap CSS. Follow the steps below to integrate Bootstrap CSS and style the **wa-button** component.

#### Example in a React Application

**1: Install Bootstrap**

First, install Bootstrap and its dependencies in your React project:

```
npm install bootstrap
```

**2: Import Bootstrap CSS**

Place the `<link>` tag in the `<head>` for our CSS, and the `<script>` tag before the closing `</body>`.

```
<!doctype html>
<html lang="en">
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  </body>
</html>
```

**3. Define Your Class Map**

Create a class map with Bootstrap CSS classes:

```
const classMap = {
  button: "btn btn-primary",
};
```

**4. Use the Component**

Apply the class map to the **wa-button** component:

```
import React from 'react';
import 'wa11y-ui/wa-button';

function App() {
  const classMap = {
    button: "btn btn-primary",
  };

  return (
    <>
      <wa-button classMap={JSON.stringify(classMap)}></wa-button>
    </>
  );
}

export default App;
```
### Styled Components

Wa11y components can be styled using styled components. Follow the steps below to integrate styled components and style the **wa-button** component.

#### Example in a React Application

**1: Install Styled Components**

First, install Styled Components and its dependencies in your React project:

```
npm install styled-components
```

**2: Import Your Web Component and Styled Components**

Assuming you have your **wa-button** Web Component available and imported into your React application, you can integrate it with Styled Components.


```
import styled from 'styled-components'
import 'wa11y-ui/wa-button'

const StyledWaButton = styled('wa-button')`
  display: flex;
  align-items: center;

  button {
    background: blue;
    border: 0;
    border-radius: 0.5rem;
    color: white;
    padding: 1rem;
  }
`

function App() {
  return (
    <>
      <StyledWaButton label="Hello World"></StyledWaButton>
    </>
  )
}

export default App
```