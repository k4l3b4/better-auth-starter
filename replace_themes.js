const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src/app/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const replacement = `
:root, [data-theme="terracotta"] {
  --radius: 0.625rem;

  /* Warm cream / ivory backgrounds */
  --background: oklch(0.975 0.008 85);
  --foreground: oklch(0.22 0.02 50);

  --card: oklch(0.99 0.005 85);
  --card-foreground: oklch(0.22 0.02 50);

  --popover: oklch(0.99 0.005 85);
  --popover-foreground: oklch(0.22 0.02 50);

  /* Terracotta / amber primary */
  --primary: oklch(0.55 0.16 45);
  --primary-foreground: oklch(0.98 0.005 85);

  /* Warm beige secondary */
  --secondary: oklch(0.93 0.015 80);
  --secondary-foreground: oklch(0.30 0.03 50);

  --muted: oklch(0.94 0.012 80);
  --muted-foreground: oklch(0.50 0.03 60);

  --accent: oklch(0.92 0.02 75);
  --accent-foreground: oklch(0.30 0.03 50);

  --destructive: oklch(0.637 0.237 25.331);
  --destructive-foreground: oklch(0.637 0.237 25.331);

  --border: oklch(0.90 0.015 75);
  --input: oklch(0.88 0.015 75);
  --ring: oklch(0.55 0.16 45);

  --chart-1: oklch(0.55 0.16 45);
  --chart-2: oklch(0.60 0.12 75);
  --chart-3: oklch(0.50 0.10 30);
  --chart-4: oklch(0.70 0.14 60);
  --chart-5: oklch(0.65 0.10 90);

  --sidebar: oklch(0.97 0.008 85);
  --sidebar-foreground: oklch(0.22 0.02 50);
  --sidebar-primary: oklch(0.55 0.16 45);
  --sidebar-primary-foreground: oklch(0.98 0.005 85);
  --sidebar-accent: oklch(0.93 0.015 80);
  --sidebar-accent-foreground: oklch(0.30 0.03 50);
  --sidebar-border: oklch(0.90 0.015 75);
  --sidebar-ring: oklch(0.55 0.16 45);

  /* Warm palette scale */
  --warm-50: oklch(0.98 0.008 80);
  --warm-100: oklch(0.95 0.015 75);
  --warm-200: oklch(0.90 0.025 70);
  --warm-300: oklch(0.82 0.05 60);
  --warm-400: oklch(0.70 0.10 50);
  --warm-500: oklch(0.60 0.14 45);
  --warm-600: oklch(0.55 0.16 45);
  --warm-700: oklch(0.45 0.13 40);
  --warm-800: oklch(0.35 0.10 38);
  --warm-900: oklch(0.25 0.06 35);
}

.dark, .dark[data-theme="terracotta"] {
  --background: oklch(0.16 0.015 50);
  --foreground: oklch(0.93 0.01 80);

  --card: oklch(0.19 0.018 50);
  --card-foreground: oklch(0.93 0.01 80);

  --popover: oklch(0.19 0.018 50);
  --popover-foreground: oklch(0.93 0.01 80);

  --primary: oklch(0.75 0.15 65);
  --primary-foreground: oklch(0.18 0.02 50);

  --secondary: oklch(0.24 0.02 50);
  --secondary-foreground: oklch(0.90 0.01 80);

  --muted: oklch(0.24 0.018 50);
  --muted-foreground: oklch(0.60 0.03 65);

  --accent: oklch(0.24 0.02 50);
  --accent-foreground: oklch(0.90 0.01 80);

  --destructive: oklch(0.496 0.241 25.723);
  --destructive-foreground: oklch(0.737 0.337 25.331);

  --border: oklch(0.28 0.02 50);
  --input: oklch(0.28 0.02 50);
  --ring: oklch(0.75 0.15 65);

  --chart-1: oklch(0.75 0.15 65);
  --chart-2: oklch(0.65 0.12 80);
  --chart-3: oklch(0.55 0.10 35);
  --chart-4: oklch(0.70 0.16 50);
  --chart-5: oklch(0.60 0.14 90);

  --sidebar: oklch(0.14 0.012 50);
  --sidebar-foreground: oklch(0.93 0.01 80);
  --sidebar-primary: oklch(0.75 0.15 65);
  --sidebar-primary-foreground: oklch(0.18 0.02 50);
  --sidebar-accent: oklch(0.22 0.02 50);
  --sidebar-accent-foreground: oklch(0.90 0.01 80);
  --sidebar-border: oklch(0.28 0.02 50);
  --sidebar-ring: oklch(0.75 0.15 65);

  --warm-50: oklch(0.22 0.02 50);
  --warm-100: oklch(0.26 0.025 50);
  --warm-200: oklch(0.30 0.03 50);
  --warm-300: oklch(0.38 0.05 50);
  --warm-400: oklch(0.50 0.10 55);
  --warm-500: oklch(0.60 0.13 60);
  --warm-600: oklch(0.70 0.15 65);
  --warm-700: oklch(0.78 0.14 70);
  --warm-800: oklch(0.85 0.10 75);
  --warm-900: oklch(0.92 0.06 80);
}

[data-theme="midnight"] {
  --background: oklch(0.97 0.01 270);
  --foreground: oklch(0.20 0.02 270);
  --card: oklch(0.99 0.005 270);
  --card-foreground: oklch(0.20 0.02 270);
  --popover: oklch(0.99 0.005 270);
  --popover-foreground: oklch(0.20 0.02 270);
  --primary: oklch(0.55 0.18 280); 
  --primary-foreground: oklch(0.98 0.01 270);
  --secondary: oklch(0.92 0.02 270);
  --secondary-foreground: oklch(0.30 0.03 270);
  --muted: oklch(0.94 0.02 270);
  --muted-foreground: oklch(0.50 0.03 270);
  --accent: oklch(0.90 0.02 270);
  --accent-foreground: oklch(0.30 0.03 270);
  --border: oklch(0.90 0.02 270);
  --input: oklch(0.88 0.02 270);
  --ring: oklch(0.55 0.18 280);
}
.dark[data-theme="midnight"] {
  --background: oklch(0.13 0.02 270);
  --foreground: oklch(0.95 0.01 270);
  --card: oklch(0.16 0.02 270);
  --card-foreground: oklch(0.95 0.01 270);
  --popover: oklch(0.16 0.02 270);
  --popover-foreground: oklch(0.95 0.01 270);
  --primary: oklch(0.65 0.16 280); 
  --primary-foreground: oklch(0.15 0.02 270);
  --secondary: oklch(0.23 0.03 270);
  --secondary-foreground: oklch(0.90 0.02 270);
  --muted: oklch(0.23 0.03 270);
  --muted-foreground: oklch(0.65 0.03 270);
  --accent: oklch(0.23 0.03 270);
  --accent-foreground: oklch(0.90 0.02 270);
  --border: oklch(0.25 0.03 270);
  --input: oklch(0.25 0.03 270);
  --ring: oklch(0.65 0.16 280);
}

[data-theme="sage"] {
  --background: oklch(0.97 0.01 130);
  --foreground: oklch(0.20 0.02 130);
  --card: oklch(0.99 0.005 130);
  --card-foreground: oklch(0.20 0.02 130);
  --popover: oklch(0.99 0.005 130);
  --popover-foreground: oklch(0.20 0.02 130);
  --primary: oklch(0.50 0.10 140); 
  --primary-foreground: oklch(0.98 0.01 130);
  --secondary: oklch(0.92 0.02 130);
  --secondary-foreground: oklch(0.30 0.03 130);
  --muted: oklch(0.94 0.02 130);
  --muted-foreground: oklch(0.50 0.03 130);
  --accent: oklch(0.90 0.02 130);
  --accent-foreground: oklch(0.30 0.03 130);
  --border: oklch(0.90 0.02 130);
  --input: oklch(0.88 0.02 130);
  --ring: oklch(0.50 0.10 140);
}
.dark[data-theme="sage"] {
  --background: oklch(0.14 0.02 140);
  --foreground: oklch(0.95 0.01 130);
  --card: oklch(0.17 0.02 140);
  --card-foreground: oklch(0.95 0.01 130);
  --popover: oklch(0.17 0.02 140);
  --popover-foreground: oklch(0.95 0.01 130);
  --primary: oklch(0.65 0.10 140);
  --primary-foreground: oklch(0.15 0.02 140);
  --secondary: oklch(0.23 0.03 140);
  --secondary-foreground: oklch(0.90 0.02 130);
  --muted: oklch(0.23 0.03 140);
  --muted-foreground: oklch(0.65 0.03 140);
  --accent: oklch(0.23 0.03 140);
  --accent-foreground: oklch(0.90 0.02 130);
  --border: oklch(0.26 0.03 140);
  --input: oklch(0.26 0.03 140);
  --ring: oklch(0.65 0.10 140);
}

[data-theme="rose"] {
  --background: oklch(0.98 0.01 10);
  --foreground: oklch(0.20 0.02 10);
  --card: oklch(0.99 0.005 10);
  --card-foreground: oklch(0.20 0.02 10);
  --popover: oklch(0.99 0.005 10);
  --popover-foreground: oklch(0.20 0.02 10);
  --primary: oklch(0.55 0.14 10); 
  --primary-foreground: oklch(0.98 0.01 10);
  --secondary: oklch(0.92 0.02 10);
  --secondary-foreground: oklch(0.30 0.03 10);
  --muted: oklch(0.94 0.02 10);
  --muted-foreground: oklch(0.50 0.03 10);
  --accent: oklch(0.90 0.02 10);
  --accent-foreground: oklch(0.30 0.03 10);
  --border: oklch(0.90 0.02 10);
  --input: oklch(0.88 0.02 10);
  --ring: oklch(0.55 0.14 10);
}
.dark[data-theme="rose"] {
  --background: oklch(0.14 0.02 10);
  --foreground: oklch(0.95 0.01 10);
  --card: oklch(0.17 0.02 10);
  --card-foreground: oklch(0.95 0.01 10);
  --popover: oklch(0.17 0.02 10);
  --popover-foreground: oklch(0.95 0.01 10);
  --primary: oklch(0.65 0.14 10);
  --primary-foreground: oklch(0.16 0.02 10);
  --secondary: oklch(0.24 0.03 10);
  --secondary-foreground: oklch(0.90 0.02 10);
  --muted: oklch(0.24 0.03 10);
  --muted-foreground: oklch(0.65 0.03 10);
  --accent: oklch(0.24 0.03 10);
  --accent-foreground: oklch(0.90 0.02 10);
  --border: oklch(0.27 0.03 10);
  --input: oklch(0.27 0.03 10);
  --ring: oklch(0.65 0.14 10);
}

[data-theme="ocean"] {
  --background: oklch(0.97 0.01 220);
  --foreground: oklch(0.20 0.02 220);
  --card: oklch(0.99 0.005 220);
  --card-foreground: oklch(0.20 0.02 220);
  --popover: oklch(0.99 0.005 220);
  --popover-foreground: oklch(0.20 0.02 220);
  --primary: oklch(0.50 0.10 220); 
  --primary-foreground: oklch(0.98 0.01 220);
  --secondary: oklch(0.92 0.02 220);
  --secondary-foreground: oklch(0.30 0.03 220);
  --muted: oklch(0.94 0.02 220);
  --muted-foreground: oklch(0.50 0.03 220);
  --accent: oklch(0.90 0.02 220);
  --accent-foreground: oklch(0.30 0.03 220);
  --border: oklch(0.90 0.02 220);
  --input: oklch(0.88 0.02 220);
  --ring: oklch(0.50 0.10 220);
}
.dark[data-theme="ocean"] {
  --background: oklch(0.13 0.02 230);
  --foreground: oklch(0.95 0.01 220);
  --card: oklch(0.16 0.02 230);
  --card-foreground: oklch(0.95 0.01 220);
  --popover: oklch(0.16 0.02 230);
  --popover-foreground: oklch(0.95 0.01 220);
  --primary: oklch(0.65 0.10 220);
  --primary-foreground: oklch(0.14 0.02 230);
  --secondary: oklch(0.23 0.03 230);
  --secondary-foreground: oklch(0.90 0.02 220);
  --muted: oklch(0.23 0.03 230);
  --muted-foreground: oklch(0.65 0.03 230);
  --accent: oklch(0.23 0.03 230);
  --accent-foreground: oklch(0.90 0.02 220);
  --border: oklch(0.26 0.03 230);
  --input: oklch(0.26 0.03 230);
  --ring: oklch(0.65 0.10 220);
}
`;

const newContent = cssContent.replace(
  /:root \{[\s\S]*?\.dark \{[\s\S]*?\n\}/g,
  replacement
);

fs.writeFileSync(cssPath, newContent);
console.log('Replaced globals.css themes');
