React component library

## Installation

```bash
# With npm
npm install @luminx/core
```

## Usage

### Important: CSS Loading

There are multiple ways to ensure the CSS styles are loaded:

#### Option 1: Import the CSS file directly (recommended)

```jsx
// In your main entry file (e.g., index.js, App.js)
import "@luminx/core/dist/style.css";

// Then use components
import { Button, Card, Text } from "@luminx/core";
```

#### Option 2: Call the loadStyles function

```jsx
import { loadStyles } from "@luminx/core/dist/styles";

// Call this once in your app's entry point
loadStyles();
```

### Component Usage

```jsx
import { Button, Card, Text } from "@luminx/core";

function App() {
    return (
        <div>
            <Card withBorder>
                <Text>Hello World</Text>
                <Button>Click me</Button>
            </Card>
        </div>
    );
}
```

## Tailwind CSS Integration

This library uses Tailwind CSS internally and exposes utility classes that you can use in your application. The CSS is pre-built and included in the package, so you don't need to configure Tailwind in your application to use these components.

### Using with Your Application's Tailwind CSS

If your application already uses Tailwind CSS, you can extend your Tailwind configuration to include the library's custom colors and utilities:

1. Add the library's theme variables to your `tailwind.config.js`:

```js
// Your application's tailwind.config.js
module.exports = {
    // Your other config
    theme: {
        extend: {
            colors: {
                "lumin-background": "var(--lumin-background)",
                "lumin-primary": "var(--lumin-primary)",
                "lumin-secondary": "var(--lumin-secondary)"
                // Add other colors as needed
            }
        }
    },
    // Make sure to include the library's components in your content
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@luminx/core/**/*.{js,jsx,ts,tsx}"
    ]
};
```

## CSS Variables for Theming

You can override the default variables by defining your own in your CSS:

```css
:root {
    /* Override colors */
    --lumin-primary: #your-primary-color;
    --lumin-text: #your-text-color;
    /* Override other variables as needed */
}
```

### Tailwind Utility Classes

The library provides Tailwind utility classes using the CSS variables:

```jsx
// Background colors
<div className="bg-lumin-primary">Primary background</div>
<div className="bg-lumin-background">Default background</div>

// Text colors
<div className="text-lumin-text">Default text</div>
<div className="text-lumin-primary">Primary text</div>

// Border colors
<div className="border border-lumin-primary">Primary border</div>

// Hover states
<div className="hover:bg-lumin-primary-hover">Hover me</div>
<div className="hover:text-lumin-primary-hover">Hover text</div>
```
