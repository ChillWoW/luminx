# React Component Library

A modern, customizable UI library built with React and Tailwind CSS.

## Installation

```bash
# With npm
npm install @luminx/core
```

## Getting Started

Before using any components, wrap your application with the LuminXProvider. This sets up theming and global styles required by the library to work properly.

```jsx
import { LuminXProvider } from "@luminx/core";

function RootLayout({ children }) {
    return <LuminXProvider>{children}</LuminXProvider>;
}
```

## Usage Example

```jsx
import { Button, Card, Text } from "@luminx/core";

function App() {
    return (
        <Card withBorder>
            <Text>Hello World</Text>
            <Button>Click me</Button>
        </Card>
    );
}
```

## Documentation

Full documentation, guides and examples are available at:
👉[ui.chillwow.org](https://ui.chillwow.org)
