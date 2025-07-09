# 🌐 Ayush Dahal Portfolio

> A personal portfolio website designed using **HTML, CSS, JavaScript, and Turf.js**, fully deployed using  **Vercel**  for seamless design iteration and hosting.



---

## 🔗 Live Deployment

👉 Visit: **[ayush-dahal-portfolio.vercel.app](https://vercel.com/ayushdahal2060-1793s-projects/v0-ayush-dahal-portfolio)**  


---

## 📦 Features

### ✅ General Portfolio Features

- **Home Page**: Personal intro, professional tagline, and photo.
- **About Me**: Brief biography, academic and career journey.
- **Projects**: Showcasing geospatial apps and coding work.
- **Contact**: Social media links and direct email section.
- **Responsive Design**: Works across desktop, tablet, and mobile.

### 🧭 Geospatial Intelligence with Turf.js

This portfolio integrates **[Turf.js](https://turfjs.org/)**

- ➕ **Point creation and distance computation**
- 🗺️ **Interactive spatial operations like buffering and centroiding**
- 📍 **Visualization of coordinates and area calculations**
- 📏 **Real-time geospatial feature manipulation in-browser**

Turf.js examples are embedded as interactive JS snippets to show your proficiency in:

```js
// Example: Calculating distance between two points
const from = turf.point([85.324, 27.7172]); // Kathmandu
const to = turf.point([85.4288, 27.6710]); // Dhulikhel
const options = { units: 'kilometers' };
const distance = turf.distance(from, to, options);
