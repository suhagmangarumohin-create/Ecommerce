# EEcommerce Platform

A dummy ecommerce project used by SupportAI demos.

## What is included

- `public/` multi-page storefront experience
- `server.js` Express backend API
- `cart.json` and `parttime.json` as file-based persistence
- defect notes and enterprise-style support artifacts for future ServiceNow/Jira work

## Core ecommerce functionality

- browse products
- add products to cart
- update or remove cart items
- review checkout totals
- login page and order history page
- save/remove temporary items

## Run locally

```bash
npm start
```

Then open:

- `http://localhost:3000`

Backend stack:

- Node.js + Express
- file-based JSON persistence
- browser-based multi-page frontend

## API endpoints

- `GET /api/products`
- `GET /api/cart`
- `POST /api/cart/add`
- `POST /api/cart/update`
- `POST /api/cart/remove`
- `GET /api/checkout`
- `GET /api/parttime`
- `POST /api/parttime/add`
- `POST /api/parttime/remove`

## Intentional support-demo defects kept in the repo

1. Shipping is incorrectly waived for carts spanning multiple categories.
2. Cart quantity validation allows invalid updates in some client flows.
3. Search and recommendation behavior needs better stock-awareness rules.
