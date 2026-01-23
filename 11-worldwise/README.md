# React Router – Complete README Guide

This document provides a **complete, copy‑paste‑ready guide** to React Router (v6+). It covers setup, routing concepts, navigation, nested routes, dynamic routes, query parameters, and best practices with real examples.

---

## 📌 What is React Router?

React Router is a **client‑side routing library** for React applications. It allows you to navigate between pages **without reloading the browser**, creating a Single Page Application (SPA) experience.

---

## 📦 Installation

```bash
npm install react-router-dom
```

or

```bash
yarn add react-router-dom
```

---

## 🚀 Basic Router Setup

Wrap your application with `BrowserRouter` and define routes using `Routes` and `Route`.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 🔹 Key Points

* `BrowserRouter` enables routing using the browser history API
* `Routes` replaces `Switch` (React Router v6+)
* `index` route acts as the default route

---

## 🧭 Navigation Components

### 1️⃣ `<Link />`

Used to navigate between pages.

```jsx
import { Link } from "react-router-dom";

<Link to="/pricing">Pricing</Link>
```

* Prevents full page reload
* No active styling

---

### 2️⃣ `<NavLink />`

Similar to `Link`, but provides **active styles**.

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/product">Product</NavLink>
```

You can style active links:

```jsx
<NavLink
  to="/product"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  Product
</NavLink>
```

---

## 🪜 Nested Routes & `<Outlet />`

Nested routes allow rendering child routes inside a parent layout.

### Parent Layout

```jsx
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
```

### Route Configuration

```jsx
<Route path="app" element={<AppLayout />}>
  <Route index element={<Navigate replace to="cities" />} />
  <Route path="cities" element={<CityList />} />
  <Route path="cities/:id" element={<City />} />
  <Route path="countries" element={<CountryList />} />
  <Route path="form" element={<Form />} />
</Route>
```

### 🔹 Key Points

* `<Outlet />` is mandatory for nested routes
* Child routes render inside the parent layout
* `Navigate` is used for redirection

---

## 🔀 Redirects using `<Navigate />`

```jsx
import { Navigate } from "react-router-dom";

<Route index element={<Navigate replace to="/login" />} />
```

* `replace` avoids adding an extra entry in browser history

---

## 🧩 Dynamic Routes (URL Params)

Dynamic routes store values in the URL.

```jsx
<Route path="cities/:id" element={<City />} />
```

### Reading Route Params

```jsx
import { useParams } from "react-router-dom";

const { id } = useParams();
```

### ✅ Benefits

* Avoid prop drilling
* Shareable URLs
* Bookmark support

---

## 🔍 Query Parameters (Search Params)

Used for filters, pagination, sorting, etc.

Example URL:

```
/cities?page=2&sort=asc
```

### Reading Query Params

```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams, setSearchParams] = useSearchParams();
const page = searchParams.get("page");
```

### Updating Query Params

```jsx
setSearchParams({ page: 3, sort: "desc" });
```

* Returns a `URLSearchParams` object

---

## 🧠 Programmatic Navigation

Navigate using code instead of links.

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate("/pricing");
navigate(-1); // go back
```

---

## ❌ 404 Page (Not Found Route)

```jsx
<Route path="*" element={<NotFound />} />
```

Catches all undefined routes.

---

## 🧪 Common Interview Questions

### Q: Difference between `Link` and `NavLink`?

* `NavLink` provides active state styling
* `Link` is simple navigation

### Q: Why use dynamic routes?

* Store state in URL
* Avoid props
* Enable bookmarking

### Q: Purpose of `<Outlet />`?

* Renders child routes inside a parent layout

---

## ✅ Best Practices

* Use layouts with `Outlet`
* Keep URLs meaningful
* Prefer URL params over props for global state
* Use query params for filters & pagination
* Always add a 404 route

---

## 🎯 Final Summary

| Feature          | Hook / Component |
| ---------------- | ---------------- |
| Routing          | BrowserRouter    |
| Define Routes    | Routes, Route    |
| Navigation       | Link, NavLink    |
| Nested Routes    | Outlet           |
| Redirect         | Navigate         |
| URL Params       | useParams        |
| Query Params     | useSearchParams  |
| Programmatic Nav | useNavigate      |

---

✨ This README is designed to be **copy‑paste ready**, interview‑friendly, and beginner‑to‑intermediate complete.
