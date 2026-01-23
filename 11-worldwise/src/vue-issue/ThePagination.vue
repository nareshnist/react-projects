<template>
  <rh-pagination
    ref="pagination"
    size="sm"
    variant="open"
    @click.capture="onRhPaginationClick"
  >
    <ol>
      <li
        v-for="pageNum in totalPages"
        :key="pageNum"
      >
        <a
          :href="`#${buildHashForPage(pageNum)}`"
          :aria-current="pageNum === activePage ? 'page' : null"
        >{{ pageNum }}</a>
      </li>
    </ol>
  </rh-pagination>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import '@rhds/elements/rh-pagination/rh-pagination.js';

const props = defineProps({
  totalPages: { type: Number, required: true },
  activePage: { type: Number, required: true },
  // Unique key per pagination instance, e.g. "advPage" or "cvePage"
  hashKey: { type: String, required: true },
});

// Define emits
const emit = defineEmits(['page-change']);
let pagination = ref(null);

function getHashParams() {
  const raw = window.location.hash ? window.location.hash.slice(1) : '';
  // Back-compat: ignore plain numeric hashes like "#2"
  // (keyed hash is expected: "#advPage=2&cvePage=3")
  if (raw && !raw.includes('=') && !raw.includes('&')) {
    return new URLSearchParams();
  }
  return new URLSearchParams(raw);
}

function buildHashForPage(pageNum) {
  const params = getHashParams();
  params.set(props.hashKey, String(pageNum));
  return params.toString();
}

function setHashPage(pageNum) {
  // Set hash only on user click; preserve other keys
  window.location.hash = `#${buildHashForPage(pageNum)}`;
}

function getPageForThisInstanceFromHash() {
  const params = getHashParams();
  const raw = params.get(props.hashKey);
  if (!raw) return null; // key missing => ignore (prevents cross-tab updates)
  const p = Number.parseInt(raw, 10);
  return Number.isFinite(p) ? p : null;
}

// Read the hash and emit only for this instance's key
function updateCurrentPageFromHash() {
  const pageNum = getPageForThisInstanceFromHash();
  if (pageNum === null) return;

  const clamped =
    Math.max(1, Math.min(props.totalPages || 1, Number(pageNum) || 1)) || 1;
  emit('page-change', clamped);

  // Encourage RHDS component to re-render if needed
  pagination.value?.requestUpdate?.();
}

function onRhPaginationClick(event) {
  const path = event.composedPath?.() || [];
  const anchor = path.find(
    (el) => el && typeof el === 'object' && el.tagName === 'A'
  );
  if (!anchor) return;

  const href = anchor.getAttribute('href') || '';
  const label = (anchor.getAttribute('aria-label') || '').toLowerCase();
  const text = (anchor.textContent || '').trim();

  let targetPage = null;

  // Numeric click ("1", "2", ...)
  if (/^\d+$/.test(text)) {
    targetPage = Number(text);
  }

  // RHDS controls may use query hrefs like "?page=3"
  if (targetPage === null) {
    const pageMatch = href.match(/(?:\?|&)page=(\d+)/i);
    if (pageMatch?.[1]) targetPage = Number(pageMatch[1]);
  }

  // First/Prev/Next/Last via aria-label fallback
  if (targetPage === null) {
    if (label.includes('first')) targetPage = 1;
    else if (label.includes('previous') || label.includes('prev')) {
      targetPage = Math.max(1, (props.activePage || 1) - 1);
    } else if (label.includes('next')) {
      targetPage = Math.min(props.totalPages, (props.activePage || 1) + 1);
    } else if (label.includes('last')) targetPage = props.totalPages;
  }

  if (targetPage == null) return;

  // Prevent full navigation/refresh (RHDS uses anchors)
  event.preventDefault();
  setHashPage(targetPage);
}

onMounted(() => {
  // Listen for hash changes (browser back/forward during the session)
  window.addEventListener('hashchange', updateCurrentPageFromHash);
  // Sync once on mount (only emits if our key exists in the hash)
  updateCurrentPageFromHash();
});

onBeforeUnmount(() => {
  // Cleanup listener
  window.removeEventListener('hashchange', updateCurrentPageFromHash);
});
</script>

<style scoped>
li a {
  color: #151515;
  --rh-color-text-primary:#151515;
  --rh-font-size-body-text-md:1rem;
  --rh-font-family-heading: 'Red Hat Display';
  font-weight:500;
}

 rh-pagination::part(numeric){
   --rh-font-size-body-text-md:0.875rem;
  font-weight:400;
  }

rh-pagination {
 min-height: 2.375rem;
 width: 100%;
 max-width: 780px;
 margin-left: auto;
 margin-top: 2rem;
}

rh-pagination::part(container){
    justify-content: end;
}

rh-pagination::part(numeric){
 margin: 0;
 color: #151515;
}

@media (max-width: 767px) {
     rh-pagination::part(container){
       justify-content: center;
       flex-wrap: nowrap;
   }

   rh-pagination::part(numeric){
    justify-content: space-evenly;
   }
   rh-pagination {
       margin-top: 1rem;
   }
}
</style>