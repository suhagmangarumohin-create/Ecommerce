# ECommerce Enterprise Suite

A dummy enterprise-grade ecommerce project used by SupportAI demos.

## What is included

- `frontend/` for the storefront UI
- `backend/` for the Java API and JSON persistence
- `backend/data/db.json` as the file database
- enterprise-style support docs, defect notes, and product modules for SupportAI indexing

## Core ecommerce functionality

- browse products
- add products to cart
- update or remove cart items
- preview checkout totals
- place order
- make payment
- view order history

## Run locally

```bash
npm start
```

Then open:

- `http://localhost:4500`

Backend stack:

- Java 8 HTTP server
- JSON file database
- browser-based frontend

## API endpoints

- `GET /api/products`
- `GET /api/cart?cartId=<id>`
- `POST /api/cart/items`
- `PATCH /api/cart/items/:productId`
- `DELETE /api/cart/items/:productId?cartId=<id>`
- `POST /api/checkout/preview`
- `POST /api/orders`
- `POST /api/payments`
- `GET /api/orders`
- `GET /api/orders/:id`

## Intentional support-demo defects kept in the repo

1. Checkout tax logic defect in legacy portfolio code paths
2. Search can return out-of-stock products in legacy discover logic
3. Deleted users may still appear in admin search
4. Campaign date-window logic can shift around midnight
