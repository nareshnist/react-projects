# Hash‑Based Pagination Isolation (RHDS + Vue)

## Overview

This document explains **why** pagination was breaking between tabs (Advisories & CVE Database) and **how** the hash‑based solution fixes it. The goal is to make the concept easy to understand so you can confidently maintain or extend this logic later.

---

## Problem Statement

The application contains **two tabs**, each with its own pagination:

* **Advisories tab**
* **CVE Database tab**

### Expected Behavior

* Clicking pagination in **Advisories** should update **only Advisories**
* Clicking pagination in **CVE Database** should update **only CVE Database**

### Actual Behavior (Bug)

* Clicking a page number in one tab was **also updating the other tab**
* Both paginations were reacting at the same time

### Why This Happened

* Pagination state was **not uniquely scoped**
* URL hash or shared state was interpreted by **both paginations**
* No way to identify *which pagination instance* triggered the update

---

## Why Not Just Use Stores?

A simple store-based approach like:

* `advisoriesStore.setActivePage(page)`
* `cveDatabaseStore.setActivePage(page)`

works **only if UI interactions are perfectly isolated**.

But this breaks when:

* Pagination uses **anchors (`<a>`)** (RHDS behavior)
* Browser **back / forward navigation** is used
* URL state needs to be preserved or shared

So we need **URL‑level isolation**, not just store isolation.

---

## Chosen Solution: Hash‑Key Based Pagination

We store pagination state in the URL hash using **named keys**.

### Example Hash

```
#advPage=2&cvePage=4
```

* `advPage` → Advisories pagination
* `cvePage` → CVE Database pagination

Each pagination component:

* Reads **only its own key**
* Ignores other keys

---

## Key Design Principle

> **One pagination instance = one unique hash key**

This ensures:

* No cross‑tab updates
* Clean separation of state
* Safe browser navigation support

---

## Component API

```js
props: {
  totalPages: Number,
  activePage: Number,
  hashKey: String // e.g. 'advPage' or 'cvePage'
}
```

The `hashKey` uniquely identifies which pagination instance the component represents.

---

## How the Solution Works (Step by Step)

### 1️⃣ User Clicks a Page Number

* RHDS `<rh-pagination>` renders anchors (`<a>`)
* Click is captured using `@click.capture`

### 2️⃣ Extract Target Page

The click handler determines:

* Page number (`1`, `2`, `Next`, `Prev`, etc.)
* Prevents default navigation

### 3️⃣ Update Only This Pagination’s Hash Key

```js
#advPage=3&cvePage=4
```

* Existing hash keys are preserved
* Only the relevant key is updated

### 4️⃣ Hash Change Event Fires

```js
window.addEventListener('hashchange', updateCurrentPageFromHash)
```

* **All paginations hear the event**
* But only **one reacts**

### 5️⃣ Pagination Reads Its Own Hash Key

```js
params.get(props.hashKey)
```

* If key is missing → ignore
* If key exists → update page

### 6️⃣ Emit Page Change

```js
emit('page-change', page)
```

* Parent updates the correct store
* No other pagination is affected

---

## Why This Prevents Cross‑Tab Updates

| Scenario                    | Result                 |
| --------------------------- | ---------------------- |
| Advisories page clicked     | Only `advPage` changes |
| CVE page clicked            | Only `cvePage` changes |
| Hash contains unrelated key | Component ignores it   |
| Browser back/forward        | Correct page restored  |

---

## Backward Compatibility

* Old hashes like `#2` are ignored
* Component waits for keyed hashes only
* Prevents accidental page jumps

---

## Why Hash (Not Query Params)

| Reason             | Explanation                    |
| ------------------ | ------------------------------ |
| No reload          | Hash updates don’t reload page |
| SPA friendly       | Works naturally in Vue         |
| RHDS compatible    | RHDS already uses anchors      |
| Browser navigation | Back/forward supported         |

---

## Example Usage

```vue
<Pagination
  :total-pages="advTotal"
  :active-page="advPage"
  hash-key="advPage"
  @page-change="advisoriesStore.setActivePage"
/>

<Pagination
  :total-pages="cveTotal"
  :active-page="cvePage"
  hash-key="cvePage"
  @page-change="cveDatabaseStore.setActivePage"
/>
```

---

## Final Outcome

✅ Pagination state is fully isolated

✅ No cross‑tab interference

✅ Browser navigation supported

✅ Scalable to more tabs in future

---

## Mental Model (Remember This)

> **Hash = Global**
>
> **Hash Key = Local Ownership**

If the key is not mine → **ignore it**.

---

## Notes

* This solution was implemented with guidance from Cursor AI
* Final logic reviewed and stabilized manually

---

## Future Improvements (Optional)

* Sync default hash on first load
* Persist page size in hash
* Add analytics on pagination navigation

---

**End of document**
