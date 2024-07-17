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

## Usage with frameworks

To integrate wa11y-ui components into your framework, follow these common steps:

**1. Install the library:**

- Using npm:

```
npm install wa11y-ui
``` 

- Using yarn:

```
yarn add wa11y-ui
```

**2. Import a component (E.g. wa-button):**

- **React (inside the wrapper using it):**

```
import 'wa11y-ui/wa-button';
```

- **Vue (inside the component's `script` tag ):**

```
<script setup lang="ts">
  import 'wa11y-ui/wa-button';
</script>
```
- **Angular (inside main.ts):**
```
import 'wa11y-ui/wa-button';
```

**3. Use the component:**

-  **React:**

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
**Note:** In React, use React-compatible props (**label**, **onClick**, etc.) directly within <wa-button> tags instead of web component syntax (**.label**, **@click**) for proper integration and functionality.

- **Vue:**

```
<script setup lang="ts">
  import 'wa11y-ui/wa-button';
</script>

<template>
  <wa-button label="hello world"></wa-button>
</template>

<style scoped>
</style>
```

- **Angular:**
```
<main class="main">
  <wa-button label="Hello world"></wa-button>
</main>
```

**4. Add declarations:**

- **React:** Create a **declarations.d.ts** file in your **src** directory

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
- **Vue:** Modify **vite.config.ts** (or equivalent for your build setup)

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // @ts-ignore
          isCustomElement: (tag) => ['wa-button'].includes(tag),
        },
      },
    }),
  ],
});
```

- **Angular:** Add the schemas in **add.component.ts**

```
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

```

## Styling

### Overview
Wa11y-UI is designed to provide maximum flexibility in styling your web components. 

This is achieved by the components utilizing the **Light DOM** and the **classMap** attribute, which allows for the dynamic application of CSS classes to internal elements within a component.


## Why the Light DOM?

- **External Styling Flexibility:** By using the Light DOM, Wa11y-UI components allow external stylesheets and styles to directly affect their internal elements. This openness facilitates easier customization and integration with various styling frameworks and methodologies.

- **Selector Compatibility:** Unlike Shadow DOM, which restricts chaining certain selectors like **:has** and **::part**, the Light DOM enables it and makes it possible to style nested elements effectively. This flexibility is crucial for complex styling requirements and maintaining consistency across components.

### What is `classMap`?

The **`classMap`** attribute is an object where:

- **Keys** represent the names of internal elements within the component.
- **Values** are the corresponding CSS class names to be applied to those elements.

This attribute ensures that you can define the appearance of each part of the component without modifying its internal structure. When the **`classMap`** attribute is updated, the component ensures that the specified classes are applied to the correct elements, allowing for dynamic and responsive styling.

**Notes:**

Currently, Wa11y-UI implements the **classMap** logic primarily on atomic elements. This decision stems from the encapsulation of components at the outer level, which limits the potential for external overrides.

### How to Use `classMap`

To use the **`classMap`** attribute, simply define the class mappings in your component and pass them as an attribute. 

Here are some examples:

**Example 1: Styling a Checkbox Component in React with Tailwind CSS**

```
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
```

**Example 2: Styling a Button Component in Vue with Bootstrap**

```
<script setup lang="ts">
  import 'wa11y-ui/wa-button';
  const classMap = {
    button: "btn btn-primary"
  };
</script>

<template>
  <wa-button label="hello world" :classMap="classMap"></wa-button>
</template>
```

### Documentation

For details on the specific elements and how they can be exposed and styled, refer to the documentation for each element within the [library's storybook](https://wa11y-storybook.netlify.app/?path=/story/atoms-button--button-with-default-label).

The documentation provides comprehensive information on the internal elements that can be targeted and styled using the **`classMap`** attribute.

### Styling Methods Supported

Wa11y-UI supports a wide range of styling methods, providing you with the flexibility to choose the best approach for your project. 
The supported methods include:

1. CSS
2. SCSS
3. Tailwind CSS
4. Bootstrap and similar libraries
5. CSS Modules (Except for Angular)
6. Styled Components (Except for Angular)

### Styling with CSS

**Steps Common for Each Framework**

1. **Define Your Styles:** Create CSS rules for your components in a **.css** file. Ensure the CSS file name follows the naming conventions specific to your framework.

**- React Usage**

**WaButton.css:**
```
wa-button button {
  background: blue;
  color: white;
}
```

**App.tsx:**
```
import './WaButton.css';

function App() {
  return (
    <wa-button></wa-button>
  );
}
```
**- Vue Usage**

**App.vue:**
```
<template>
  <wa-button></wa-button>
</template>

<style>
wa-button button {
  background: blue;
  color: white;
}
</style>
```
**- Angular Usage**

**app.component.css:**
```
wa-button button {
  background: blue;
  color: white;
}
```

**app.component.ts:**
```
@Component({
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
}]
```

**app.component.html:**
```
<main>
  <wa-button></wa-button>
</main>
```
### Styling with SCSS

**Steps Common for Each Framework**

1. **Install the SCSS Compiler:** 

Begin by installing the SCSS compiler using npm or yarn:

```
npm install sass
```
or

```
yarn add sass
```

2. Rename your CSS files to **.scss** files and update all references accordingly throughout your project.
3. Incorporate your SCSS files into your framework's component or style management system as you would with standard CSS files.

**- React Usage**

**WaButton.scss:**
```
$colorWhite: white;

wa-button button {
  background: blue;
  color: $colorWhite;
}
```
**- Vue Usage**

**App.vue:**
```
<style lang="scss">
$colorWhite: white;

wa-button button {
  background: blue;
  color: $colorWhite;
}
</style>
```
**- Angular Usage**
**app.component.scss:**
```
$colorWhite: white;

wa-button button {
  background: blue;
  color: $colorWhite;
}
```

### Styling with Tailwind

**Steps Common for Each Framework**

1. **Install Tailwind:** Follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation) to set up Tailwind in your project.

**- React Usage**

**App.tsx:**
```
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
**- Vue Usage**

**App.vue:**
```
<script setup lang="ts">
const classMap = {
  label: "text-gray-700 font-medium",
  input: "form-checkbox h-4 w-4 text-blue-600",
  span: "ml-2 text-sm"
};
</script>

<template>
  <wa-checkbox :classMap="classMap"></wa-checkbox>
</template>
```
**- Angular Usage**

**app.component.ts:**
```
export class AppComponent {
  classMap = {
    label: "text-gray-700 font-medium",
    input: "form-checkbox h-4 w-4 text-blue-600",
    span: "ml-2 text-sm"  
  }
}
```
**app.component.html:**
```
<wa-checkbox [classMap]="classMap"></wa-checkbox>
```
### Styling with Bootstrap (or similar libraries)

**Steps Common for Each Framework**

1. **Install Bootstrap:** 

First, install Bootstrap and its dependencies in your React project:

```
npm install bootstrap
```
or
```
yarn add bootstrap
```

2. **Import Bootstrap CSS:**

Place the `<link>` tag in the `<head>` for our CSS, and the `<script>` tag before the closing `</body>`.

**index.html:**
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
**- React Usage**

**App.tsx:**
```
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
**- Vue Usage**

**App.vue:**
```
<script setup lang="ts">
const classMap = {
  button: "btn btn-primary"
};
</script>

<template>
  <wa-button :classMap="classMap"></wa-button>
</template>
```

**- Angular Usage**

**app.component.ts:**
```
export class AppComponent {
  classMap = {
    button: 'btn btn-primary'
  }
}
```
**app.component.html:**
```
<wa-button [classMap]="classMap"></wa-button>
```

### Styling with CSS Modules

**Steps Common for React and Vue**

1. **Import Your Component Styles:**

Create a CSS module file with your styles:

**example.module.css:**
```
.button {
  background: blue;
  color: white;
}
```
**- React Usage**

**App.tsx:**
```
import styles from "./example.module.css";

function App() {
  const classMap = {
    button: styles.button
  };

  return (
    <>
      <wa-button classMap={JSON.stringify(classMap)}></wa-button>
    </>
  );
}

export default App;
```
**- Vue Usage**

**App.vue:**
```
<script setup lang="ts">
import styles from "./example.module.css";

const classMap = {
  button: styles.button
};
</script>

<template>
  <wa-button :classMap="classMap"></wa-button>
</template>
```
**- Angular Usage**

**Note:** Angular does not natively support scoped styles like some other frameworks do. 

However, you can achieve a similar effect by following these steps:

**1. Add a class to the component to scope its styles:**
```
<wa-button class="wa-button"></wa-button>
```
**2. use the classmap attribute:**

**app.component.ts:**
```
export class AppComponent {
  classMap = {
    button: "button"
  }
}
```
**app.component.html:**
```
<wa-button [classMap]="classMap" class="wa-button"></wa-button>
```

**3. style Using CSS or SCSS Techniques:**

**app.component.css:**
```
.wa-button .button {
  background: blue;
  color: white;
}
```

### Styling with Styled Components

**Steps Common for React and Vue (Angular is not supported)**

1. **Install Styled Components:**

First, install Styled Components and its dependencies in your project:

```
npm install styled-components
```
or
```
yarn add styled-components
```
**- React Usage**

**App.tsx:**
```
import styled from 'styled-components'
import 'wa11y-ui/wa-button'

const StyledWaButton = styled('wa-button')`
  button {
    background: blue;
    color: white;
  }
`

function App() {
  return (
    <>
      <StyledWaButton></StyledWaButton>
    </>
  )
}

export default App
```

**- Vue Usage**

**App.vue:**
```
<script setup lang="ts">
import 'wa11y-ui/wa-button';
import styled from 'styled-components';

const StyledWaButton = styled('wa-button')`
  button {
    background: blue;
    color: white;
  }
`
</script>

<template>
  <StyledWaButton></StyledWaButton>
</template>
```