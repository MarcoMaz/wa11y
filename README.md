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

