# Dawn Theme - Featured Products Section

Custom Shopify theme based on Dawn with a Featured Products section for test assignment.

## 🎯 Features

- ✅ Custom "Featured Products" section with collection selector
- ✅ Products already in cart are automatically hidden
- ✅ Add to cart without page reload (AJAX)
- ✅ Integration with Dawn's cart drawer/notification
- ✅ Section auto-refresh after adding to cart (Section Rendering API)
- ✅ Responsive design (Mobile-first)
- ✅ BEM CSS naming convention
- ✅ SCSS with Gulp build system
- ✅ Custom Web Component (no jQuery)
- ✅ Cross-browser compatible

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm
- Shopify Partner account
- Shopify CLI

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Akirienko/refactorPlus.git
cd refactorPlus
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build SCSS files:**
```bash
npm run build
```

4. **Connect to your Shopify store:**
```bash
shopify theme dev
```

This will start a local development server and sync changes to your store.

## 🛠️ Development

### Available Scripts

- `npm run dev` - Watch SCSS files and compile on change
- `npm run build` - Build SCSS to CSS (production)
- `npm run shopify:dev` - Start Shopify theme development server
- `npm run shopify:push` - Push theme to Shopify

### Project Structure

```
refactorPlus/
├── assets/                 # Compiled CSS, JS, images
│   ├── featured-products.js
│   └── featured-products.min.css
├── sections/              # Shopify sections
│   └── featured-products.liquid
├── src/                   # Source files
│   └── scss/
│       └── featured-products.scss
├── config/                # Theme settings
├── layout/                # Theme layouts
├── locales/               # Translations
├── snippets/              # Reusable code snippets
├── templates/             # Page templates
├── gulpfile.js           # Gulp configuration
└── package.json          # Dependencies
```

## 📦 How to Use

### Adding the Featured Products Section

1. **In Shopify Admin:**
   - Go to Online Store → Themes
   - Click "Customize" on your Dawn theme
   - On the homepage, click "Add section"
   - Select "Featured Products"

2. **Configure the section:**
   - **Heading:** Enter a title (e.g., "Featured Products")
   - **Collection:** Select a collection to display
   - **Products to show:** Choose how many products (2-12)
   - **Padding:** Adjust top/bottom spacing

3. **Save** your changes

### How It Works

1. **Collection Selection:** The section fetches products from the selected collection
2. **Cart Filtering:** On page load, it checks the cart and hides products already added
3. **Add to Cart:** Clicking "Add to cart" button:
   - Adds product via Shopify Cart API
   - Updates Dawn's cart drawer/notification
   - Hides the product from the list
   - Refreshes the section (Section Rendering API)

## 🎨 Customization

### Styling

Edit SCSS files in `src/scss/featured-products.scss`:

```scss
.featured-products {
  // Your custom styles
}
```

Then rebuild:
```bash
npm run build
```

### JavaScript

Edit `assets/featured-products.js` to modify functionality.

### Liquid Template

Edit `sections/featured-products.liquid` to change HTML structure.

## 🏗️ Technical Stack

- **Theme:** Shopify Dawn (v15.4.0)
- **CSS:** SCSS with BEM naming
- **JS:** Vanilla JavaScript (Custom Elements/Web Components)
- **Build Tool:** Gulp 4
- **Package Manager:** npm
- **APIs Used:**
  - Shopify Cart API (`/cart/add.js`, `/cart.js`)
  - Section Rendering API
  - Dawn's cart update events

## 🔧 Build System

### Gulp Tasks

The project uses Gulp for SCSS compilation:

- **SCSS Compilation:** Converts SCSS to CSS
- **Autoprefixer:** Adds vendor prefixes
- **CSS Minification:** Minifies CSS for production
- **Watch Mode:** Auto-compile on file changes

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🧪 Testing

1. **Add products to cart** from other pages
2. **Navigate to homepage** with Featured Products section
3. **Verify** that products in cart are hidden
4. **Click "Add to cart"** on a featured product
5. **Check** that:
   - Cart drawer/notification opens
   - Product disappears from the list
   - Cart count updates

## 🚢 Deployment

1. **Build production assets:**
```bash
npm run build
```

2. **Push to Shopify:**
```bash
npm run shopify:push
```

## 👤 Author

Developed as a test assignment for Shopify Developer position.

---

# Original Dawn Documentation

Dawn represents a HTML-first, JavaScript-only-as-needed approach to theme development. It's Shopify's first source available theme with performance, flexibility, and [Online Store 2.0 features](https://www.shopify.com/partners/blog/shopify-online-store) built-in and acts as a reference for building Shopify themes.

* **Web-native in its purest form:** Themes run on the [evergreen web](https://www.w3.org/2001/tag/doc/evergreen-web/). We leverage the latest web browsers to their fullest, while maintaining support for the older ones through progressive enhancement—not polyfills.
* **Lean, fast, and reliable:** Functionality and design defaults to “no” until it meets this requirement. Code ships on quality. Themes must be built with purpose. They shouldn’t support each and every feature in Shopify.
* **Server-rendered:** HTML must be rendered by Shopify servers using Liquid. Business logic and platform primitives such as translations and money formatting don’t belong on the client. Async and on-demand rendering of parts of the page is OK, but we do it sparingly as a progressive enhancement.
* **Functional, not pixel-perfect:** The Web doesn’t require each page to be rendered pixel-perfect by each browser engine. Using semantic markup, progressive enhancement, and clever design, we ensure that themes remain functional regardless of the browser.

You can find a more detailed version of our theme code principles in the [contribution guide](https://github.com/Shopify/dawn/blob/main/.github/CONTRIBUTING.md#theme-code-principles).

## Getting started
We recommend using Dawn as a starting point for theme development. [Learn more on Shopify.dev](https://shopify.dev/themes/getting-started/create).

> If you're building a theme for the Shopify Theme Store, then you can use Dawn as a starting point. However, the theme that you submit needs to be [substantively different from Dawn](https://shopify.dev/themes/store/requirements#uniqueness) so that it provides added value for merchants. Learn about the [ways that you can use Dawn](https://shopify.dev/themes/tools/dawn#ways-to-use-dawn).

Please note that the main branch may include code for features not yet released. The "stable" version of Dawn is available in the theme store.

## Staying up to date with Dawn changes

Say you're building a new theme off Dawn but you still want to be able to pull in the latest changes, you can add a remote `upstream` pointing to this Dawn repository.

1. Navigate to your local theme folder.
2. Verify the list of remotes and validate that you have both an `origin` and `upstream`:
```sh
git remote -v
```
3. If you don't see an `upstream`, you can add one that points to Shopify's Dawn repository:
```sh
git remote add upstream https://github.com/Shopify/dawn.git
```
4. Pull in the latest Dawn changes into your repository:
```sh
git fetch upstream
git pull upstream main
```

## Developer tools

There are a number of really useful tools that the Shopify Themes team uses during development. Dawn is already set up to work with these tools.

### Shopify CLI

[Shopify CLI](https://github.com/Shopify/shopify-cli) helps you build Shopify themes faster and is used to automate and enhance your local development workflow. It comes bundled with a suite of commands for developing Shopify themes—everything from working with themes on a Shopify store (e.g. creating, publishing, deleting themes) or launching a development server for local theme development.

You can follow this [quick start guide for theme developers](https://shopify.dev/docs/themes/tools/cli) to get started.

### Theme Check

We recommend using [Theme Check](https://github.com/shopify/theme-check) as a way to validate and lint your Shopify themes.

We've added Theme Check to Dawn's [list of VS Code extensions](/.vscode/extensions.json) so if you're using Visual Studio Code as your code editor of choice, you'll be prompted to install the [Theme Check VS Code](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension upon opening VS Code after you've forked and cloned Dawn.

You can also run it from a terminal with the following Shopify CLI command:

```bash
shopify theme check
```

### Continuous Integration

Dawn uses [GitHub Actions](https://github.com/features/actions) to maintain the quality of the theme. [This is a starting point](https://github.com/Shopify/dawn/blob/main/.github/workflows/ci.yml) and what we suggest to use in order to ensure you're building better themes. Feel free to build off of it!

#### Shopify/lighthouse-ci-action

We love fast websites! Which is why we created [Shopify/lighthouse-ci-action](https://github.com/Shopify/lighthouse-ci-action). This runs a series of [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) audits for the home, product and collections pages on a store to ensure code that gets added doesn't degrade storefront performance over time.

#### Shopify/theme-check-action

Dawn runs [Theme Check](#Theme-Check) on every commit via [Shopify/theme-check-action](https://github.com/Shopify/theme-check-action).

## Contributing

Want to make commerce better for everyone by contributing to Dawn? We'd love your help! Please read our [contributing guide](https://github.com/Shopify/dawn/blob/main/.github/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build for Dawn.

## Code of conduct

All developers who wish to contribute through code or issues, please first read our [Code of Conduct](https://github.com/Shopify/dawn/blob/main/.github/CODE_OF_CONDUCT.md).

## Theme Store submission

The [Shopify Theme Store](https://themes.shopify.com/) is the place where Shopify merchants find the themes that they'll use to showcase and support their business. As a theme partner, you can create themes for the Shopify Theme Store and reach an international audience of an ever-growing number of entrepreneurs.

Ensure that you follow the list of [theme store requirements](https://shopify.dev/themes/store/requirements) if you're interested in becoming a [Shopify Theme Partner](https://themes.shopify.com/services/themes/guidelines) and building themes for the Shopify platform.

## License

Copyright (c) 2021-present Shopify Inc. See [LICENSE](/LICENSE.md) for further details.
