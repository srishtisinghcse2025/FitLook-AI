# FitLook AI — Mini Project Prototype

## Open the website
1. Download and extract the ZIP.
2. Keep `index.html`, `style.css`, and `script.js` in the same folder.
3. Double-click `index.html` to open it in Chrome.
4. An internet connection is needed for Google Fonts and remote product photos. The core interface and interactions run locally.

## Pages included
- Home
- Explore product catalog
- Virtual try-on (photo preview + sample outfit selection)
- AI stylist (rule-based sample recommendations)
- Price comparison (fictional demo prices)
- Personal fashion profile

## Real working features in this prototype
- Page navigation
- Product search and category filters
- Upload a photo and preview it locally in the browser
- Save profile fields and selected looks in browser localStorage
- Paste a URL and validate its format
- Upload a product image
- Generate sample recommendations from the local product list and chosen budget
- Display a sample price comparison table

## Mock / not connected yet
- The uploaded photo is NOT transformed into a generated AI avatar. It is shown as a local photo preview only.
- No AI virtual clothing try-on is connected.
- Product URLs are NOT fetched. Retailer pages may block automated access; production integration needs authorized APIs/product feeds or manual image/details fallback.
- Size recommendation is not implemented yet.
- Stylist recommendations use simple local rules, not an AI model.
- Product catalog and prices are illustrative sample data. Price comparison values are fictional, not live offers.
- No real user authentication or cloud database. `localStorage` stores demo data in this browser only.

## Privacy note
The selected photo is previewed locally and, if the user checks the consent box and saves the profile, stored in this browser's localStorage. It is not uploaded to a server by this prototype. Avoid using sensitive or private photos in a demo. Clear the profile using the button on the profile page.

## Suggested next development stages
1. Backend API and real account authentication.
2. Secure profile/photo storage with deletion controls.
3. Product URL parsing using authorized retailer sources, plus manual fallback.
4. Product-specific size charts and measurement-based size guidance.
5. Integrate a suitable pretrained virtual try-on model/API and test identity consistency.
6. Integrate authorized price/product feeds and robust exact-vs-similar product matching.
