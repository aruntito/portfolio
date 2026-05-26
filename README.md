# ⚡ Premium Personal Portfolio Website

A stunning, responsive, and high-performance **Personal Portfolio Website** built entirely with modern **Vanilla HTML5, CSS3, and ES6+ JavaScript**. Designed with a premium Apple/Stripe-like glassmorphic aesthetic, OKLCH/HSL design system tokens, and cutting-edge native CSS scroll-driven animations.

---

## 🎨 Visual Preview

### Profile Avatar & Dashboard Mockups
<p align="center">
  <img src="assets/avatar.png" width="220" alt="Developer Avatar" style="border-radius: 50%; margin: 10px;" />
</p>

<p align="center">
  <img src="assets/project-1.png" width="280" alt="Quantum Analytics Mockup" style="border-radius: 12px; margin: 5px;" />
  <img src="assets/project-2.png" width="280" alt="TaskFlow Canvas Mockup" style="border-radius: 12px; margin: 5px;" />
  <img src="assets/project-3.png" width="280" alt="HomeIQ Control Hub Mockup" style="border-radius: 12px; margin: 5px;" />
</p>

---

## 🚀 Key Features

* **💎 Apple-Grade Aesthetics**: Modern glassmorphic cards (`backdrop-filter`), slow-floating ambient neon glow spheres, premium typography, and subtle micro-animations for interactive engagement.
* **🌓 Dual-State Theme System**: A physical sliding sun/moon theme selector that syncs with `localStorage` and listens live to system `prefers-color-scheme` overrides.
* **⚡ FOUC Prevention**: Inline blocking theme parser in `<head>` completely eliminates the Flash of Unstyled Content (FOUC), ensuring a seamless dark/light page load.
* **🌀 CSS Scroll-Driven Animations**: Leverages native CSS `@keyframes` bound to anonymous `view()` timelines for high-performance scroll port entrance scaling and reveals.
* **🍂 Progressive Observer Fallback**: Automatically feature-detects scroll timeline support via `CSS.supports()`. Browsers lacking support (older Safari/Firefox) degrade gracefully using a fast `IntersectionObserver` script.
* **🧭 Real-Time Nav Tracking**: Intersection observers track your page scrolls to dynamically highlight links on the sticky glassmorphic navigation header in real-time.
* **📝 Floating Contact Form**: Features sliding animated label inputs, native CSS `:user-invalid` validations, submitting spinner states, and simulated Formspree response toasts.
* **📄 Downloadable Resume**: Out-of-the-box support for resume downloads with a pre-packaged standard-compliant PDF document.

---

## 📂 Project Structure

```text
personal-portfolio/
├── assets/
│   ├── avatar.png       # High-fidelity developer profile illustration
│   ├── project-1.png    # E-commerce Dashboard mockup
│   ├── project-2.png    # SaaS Kanban Board mockup
│   ├── project-3.png    # Smart Home UI mockup
│   └── resume.pdf       # Professional PDF resume document
├── index.html           # Highly accessible semantic HTML5 architecture
├── styles.css           # Modern design system & viewport fluid typography
├── script.js            # Light/Dark controller, observers, & Form handler
└── README.md            # Repository documentation
```

---

## 🛠️ Local Development

Getting the portfolio running on your local machine is extremely simple since it doesn't require complex bundlers or build steps.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aruntito/portfolio.git
   cd portfolio
   ```

2. **Run a static local server**:
   You can use standard tooling like Python, Node, or simply open `index.html` in your favorite web browser.
   
   *Using Node.js (`http-server`)*:
   ```bash
   npx http-server ./
   ```
   
   *Using Python 3*:
   ```bash
   python3 -m http.server 8080
   ```

3. Open **`http://localhost:8080`** in your browser.

---

## 🌐 Production Deployment

Since this project consists of static files, it is **incredibly fast** and can be hosted for **free** on any static hosting provider.

### GitHub Pages
1. Go to your repository settings on GitHub.
2. Navigate to **Pages** under the "Code and automation" section.
3. Set the build source to **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then click **Save**.

### Vercel / Netlify
1. Connect your GitHub account to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Import the `portfolio` repository.
3. Click **Deploy** (no build commands or output directory settings are required).
