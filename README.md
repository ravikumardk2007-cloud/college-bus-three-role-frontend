# College Bus Tracking System – Three Role Frontend

A static frontend demonstration with separate Student, Driver and Administrator login/dashboard pages. No backend, database or server-side authentication is included.

## Demo credentials
| Role | Email | Password |
|---|---|---|
| Student | student@demo.com | student123 |
| Driver | driver@demo.com | driver123 |
| Administrator | admin@demo.com | admin123 |

## Run locally
Open `index.html` in a browser, or use the VS Code Live Server extension. Internet is required for the Leaflet map tiles and Google Fonts.

## Deploy on Netlify
1. Extract this ZIP.
2. Visit https://app.netlify.com/drop
3. Drag the extracted project folder (containing `index.html`) onto the page.
4. Use the generated public URL to present the project.

## Deploy on GitHub Pages
Upload all files to the root of a GitHub repository. Open Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.

## Important limitations
- This is frontend-only. Login is a role-based demo check in `login.js`; it is not secure authentication.
- Student bus movement is simulated using sample coordinates in `student.js`.
- Driver controls generate simulated update counts; they do not transmit GPS.
- Admin bus changes exist only in browser memory and reset on refresh.
- Do not use real student information, passwords, or phone numbers.
- To support real users and real-time GPS, add a backend API, database, server-side authentication, HTTPS and role-based authorization.
- The Leaflet map uses OpenStreetMap tiles. Keep attribution visible and follow the OpenStreetMap tile usage policy.
