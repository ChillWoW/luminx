# Notification Handler

A quick and easy to use handler for notifications with React and Tailwind CSS.

## Installation

```bash
# With npm
npm install @luminx/core @luminx/notifications
```

## Getting Started

Before trying to use anything, wrap your application with NotificationsProvider. This makes sure the library knows where to put the notifications.

```jsx
import { NotificationsProvider } from "@luminx/notifications";

function RootLayout({ children }) {
    return <NotificationsProvider>{children}</NotificationsProvider>;
}
```

## Usage

```tsx
import { Button } from "@luminx/core";
import { notifications } from "@luminx/notifications";

function Demo() {
    return (
        <Button
            onClick={() =>
                notifications.show({
                    title: "Default notification",
                    message: "Hello from Luminx notifications! 🌟"
                })
            }
        >
            Show notification
        </Button>
    );
}
```

## Documentation

Full documentation, guides and examples are available at:
👉[ui.chillwow.org](https://ui.chillwow.org)
