# Mobile Store

## Overview

Mobile Store is an **Angular 19** web application that allows users to browse
mobile devices, add them to a shopping cart, and complete a purchase. The
application integrates with an API for product data and simulates order
processing.

## Features

- **Product Listing (PLP)**: Displays a grid of products with a search function.
- **Product Details (PDP)**: Provides specifications and options for color and
  storage.
- **Shopping Cart**: Persisted in the store for improved performance, with a
  dropdown preview.
- **Checkout Process**: Includes a confirmation modal with simulated order
  processing.
- **Dark Mode**: Users can switch between light and dark themes.

## Installation

Clone the repository:

```
git clone https://github.com/JordiKing10/phone-shop.git
cd mobile-store
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm start
```

The application will be available at **http://localhost:4200**.

## API Endpoints

The application integrates with an API to retrieve products and simulate adding
items to the cart.

### Get Product List

```
GET /api/product
Response: [{ id: string, brand: string, model: string, price: number, ... }]
```

### Get Product Details

```
GET /api/product/:id
Response: { id: string, brand: string, model: string, price: number, colors: [], storages: [] }
```

### Add to Cart

```
POST /api/cart
Payload: { id: string, colorCode: string, storageCode: string }
Response: { count: number }
```

The **cart is managed in the store**, reducing API calls and ensuring immediate
updates.

## Technologies

- Angular 19
- Angular Material
- TypeScript
- RxJS & Signals
- Responsive Design

## Notes

- The cart persists locally for **faster updates** and **fewer backend
  requests**.
- The checkout process includes a **modal confirmation** with a **loading
  animation**.
- The UI follows **Material Design** principles for a clean and modern
  experience.

## License

This project is licensed under the **MIT License**.
