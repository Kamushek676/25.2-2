*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

body, h1, h2, h3, p, figure, dl, dd, ul, ol, fieldset {
  margin: 0;
}

ul, ol {
  padding: 0;
  list-style: none;
}

button, input, select {
  font: inherit;
}

body {
  min-height: 100vh;
  font-family: var(--font-family-base);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: var(--lh-normal);
}

img {
  max-width: 100%;
  display: block;
}

table {
  border-collapse: collapse;
  width: 100%;
}

:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

:root {
  --font-family-base: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;

  --lh-tight: 1.25;
  --lh-normal: 1.5;
  --ls-tight: -0.015em;
  --ls-normal: 0;
  --ls-wide: 0.03em;

  --bg-primary: #f1f5f9;
  --bg-surface: #ffffff;
  --bg-secondary: #e2e8f0;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;

  --border-light: #e2e8f0;
  --border-dark: #cbd5e1;

  --color-accent: #2563eb;

  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-danger: #dc2626;
  --color-info: #0284c7;

  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 16px;
  --spacing-4: 24px;
  --spacing-5: 32px;
  --spacing-6: 48px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header extra"
    "sidebar main   extra"
    "sidebar footer extra";
  min-height: 100vh;
}

.sidebar-nav {
  grid-area: sidebar;
  background-color: var(--bg-surface);
  border-right: 1px solid var(--border-light);
  padding: var(--spacing-4) var(--spacing-3);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-5);
}

.brand-mark {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  background-color: var(--color-accent);
  color: #fff;
  font-size: var(--font-size-xs);
  font-weight: 700;
  display: grid;
  place-items: center;
}

.brand-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  letter-spacing: var(--ls-tight);
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.nav-item {
  display: block;
  padding: var(--spacing-2) var(--spacing-3);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 500;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.nav-item:hover {
  background-color: var(--bg-primary);
  color: var(--color-accent);
}

.nav-item:active {
  transform: scale(0.98);
  background-color: var(--bg-secondary);
}

.nav-item.active {
  background-color: var(--bg-primary);
  color: var(--color-accent);
  border-color: var(--border-light);
}

.dashboard-header {
  grid-area: header;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-light);
  padding: var(--spacing-3) var(--spacing-4);
}

.header-heading {
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: var(--ls-tight);
  line-height: var(--lh-tight);
}

.header-sub {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-top: var(--spacing-1);
}

.dashboard-main {
  grid-area: main;
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  min-width: 0;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-3);
}

.stat-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3);
  box-shadow: var(--shadow-sm);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-top: var(--spacing-1);
  letter-spacing: var(--ls-tight);
}

.stat-note {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-top: var(--spacing-1);
}

.content-block {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-sm);
}

.block-header {
  margin-bottom: var(--spacing-3);
  padding-bottom: var(--spacing-2);
  border-bottom: 1px solid var(--border-light);
}

.block-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  letter-spacing: var(--ls-tight);
}

.block-note {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-top: var(--spacing-1);
}

.filter-panel {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  align-items: flex-end;
  margin-bottom: var(--spacing-3);
  padding: var(--spacing-3);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  min-width: 160px;
  border: 0;
  padding: 0;
}

.filter-field--grow {
  flex: 1 1 220px;
}

.filter-field label,
.filter-field legend {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--text-secondary);
}

.filter-field input[type="search"],
.filter-field select {
  width: 100%;
  height: 38px;
  padding: 0 var(--spacing-3);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  background-color: var(--bg-surface);
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.filter-field select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--text-secondary) 50%),
    linear-gradient(135deg, var(--text-secondary) 50%, transparent 50%);
  background-position: calc(100% - 16px) 16px, calc(100% - 11px) 16px;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  padding-right: 28px;
}

.filter-field input[type="search"]:hover,
.filter-field select:hover {
  border-color: var(--color-accent);
}

.filter-field input[type="search"]:focus,
.filter-field select:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 1px;
  border-color: var(--color-accent);
}

.filter-field input:disabled,
.filter-field select:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background-color: var(--bg-secondary);
}

.check-row,
.radio-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2) var(--spacing-3);
  min-height: 38px;
  align-items: center;
}

.check,
.radio {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
}

.check input,
.radio input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.check span,
.radio span {
  position: relative;
  padding-left: 24px;
  line-height: 20px;
}

.check span::before,
.radio span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--border-dark);
  background-color: var(--bg-surface);
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.check span::before {
  border-radius: var(--radius-sm);
}

.radio span::before {
  border-radius: 50%;
}

.check span::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform 0.15s ease;
}

.radio span::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  transform: scale(0);
  transition: transform 0.15s ease;
}

.check input:checked + span::before,
.radio input:checked + span::before {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.check input:checked + span::after,
.radio input:checked + span::after {
  transform: rotate(45deg) scale(1);
}

.radio input:checked + span::after {
  transform: scale(1);
}

.check:hover span::before,
.radio:hover span::before {
  border-color: var(--color-accent);
}

.check input:focus-visible + span::before,
.radio input:focus-visible + span::before {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.check input:active + span::before,
.radio input:active + span::before {
  transform: scale(0.92);
}

.check input:disabled + span,
.radio input:disabled + span {
  opacity: 0.5;
  cursor: not-allowed;
}

.filter-actions {
  display: flex;
  align-items: flex-end;
}

.btn {
  height: 38px;
  padding: 0 var(--spacing-3);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.1s ease, opacity 0.2s ease;
}

.btn:hover {
  background-color: var(--bg-secondary);
}

.btn:active {
  transform: scale(0.97);
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

.btn--ghost {
  background-color: var(--bg-surface);
  border-color: var(--border-dark);
  color: var(--text-primary);
}

.btn--ghost:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn--primary {
  background-color: var(--color-accent);
  color: #fff;
}

.btn--primary:hover {
  background-color: #1d4ed8;
}

.result-count,
.empty-note {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2);
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.table-caption {
  caption-side: top;
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  text-align: left;
  padding: var(--spacing-2) var(--spacing-3);
}

.data-table th,
.data-table td {
  padding: var(--spacing-2) var(--spacing-3);
  text-align: left;
  font-size: var(--font-size-sm);
  border-bottom: 1px solid var(--border-light);
  vertical-align: top;
}

.data-table th {
  background-color: var(--bg-primary);
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

.data-table tbody tr {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.data-table tbody tr:hover {
  background-color: #e0f2fe;
}

.data-table tbody tr:active {
  background-color: #bae6fd;
}

.sort-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.sort-btn:hover {
  color: var(--color-accent);
}

.sort-btn:active {
  transform: scale(0.97);
}

.sort-arrow::before {
  content: "↕";
  font-size: 12px;
  color: var(--text-muted);
}

th[aria-sort="ascending"] .sort-arrow::before {
  content: "↑";
  color: var(--color-accent);
}

th[aria-sort="descending"] .sort-arrow::before {
  content: "↓";
  color: var(--color-accent);
}

.cell-sub {
  display: block;
  margin-top: 2px;
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.priority {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.priority::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--text-muted);
}

.priority--high {
  color: var(--color-danger);
}

.priority--high::before {
  background-color: var(--color-danger);
}

.priority--mid {
  color: var(--color-warning);
}

.priority--mid::before {
  background-color: var(--color-warning);
}

.priority--low {
  color: var(--color-success);
}

.priority--low::before {
  background-color: var(--color-success);
}

.order-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-3);
}

.order-card,
.product-card,
.return-item {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  text-align: left;
  width: 100%;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease, background-color 0.2s ease;
}

.order-card:hover,
.product-card:hover,
.return-item:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  background-color: #fff;
}

.order-card:active,
.product-card:active,
.return-item:active {
  transform: scale(0.985);
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-2);
}

.card-id {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: 600;
}

.product-card-title,
.return-item-title,
.order-card-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.product-card-desc,
.return-item-desc {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.product-card-meta,
.card-meta {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-1);
}

.tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
}

.product-card-price {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-accent);
  margin-top: auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-3);
}

.extra-panel {
  grid-area: extra;
  background-color: var(--bg-surface);
  border-left: 1px solid var(--border-light);
  padding: var(--spacing-4) var(--spacing-3);
  overflow-y: auto;
}

.extra-header {
  margin-bottom: var(--spacing-3);
}

.extra-title {
  font-size: var(--font-size-md);
  font-weight: 600;
}

.returns-stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: var(--font-size-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.status-badge--success { background-color: #dcfce7; color: var(--color-success); }
.status-badge--warning { background-color: #fef3c7; color: var(--color-warning); }
.status-badge--danger  { background-color: #fee2e2; color: var(--color-danger); }
.status-badge--info    { background-color: #e0f2fe; color: var(--color-info); }

.dashboard-footer {
  grid-area: footer;
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-light);
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.footer-info {
  font-style: normal;
  margin-bottom: var(--spacing-1);
}

.modal[hidden] {
  display: none;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: var(--spacing-4);
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.45);
}

.modal-dialog {
  position: relative;
  width: min(560px, 100%);
  max-height: calc(100vh - 48px);
  overflow: auto;
  background-color: var(--bg-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
}

.modal-header {
  border-bottom: 1px solid var(--border-light);
}

.modal-footer {
  border-top: 1px solid var(--border-light);
  justify-content: flex-end;
}

.modal-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.modal-body {
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
}

.modal-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: var(--spacing-2);
}

.modal-row dt {
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
}

.icon-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: var(--text-secondary);
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease;
}

.icon-btn:hover {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.icon-btn:active {
  transform: scale(0.94);
}

body.modal-open {
  overflow: hidden;
}

@media (max-width: 1100px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "sidebar"
      "main"
      "extra"
      "footer";
  }

  .sidebar-nav {
    border-right: 0;
    border-bottom: 1px solid var(--border-light);
  }

  .nav-menu {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .extra-panel {
    border-left: 0;
    border-top: 1px solid var(--border-light);
  }

  .stats-row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .stats-row {
    grid-template-columns: 1fr;
  }

  .dashboard-main,
  .dashboard-header,
  .dashboard-footer {
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
  }

  .data-table thead {
    display: none;
  }

  .data-table,
  .data-table tbody,
  .data-table tr,
  .data-table td {
    display: block;
    width: 100%;
  }

  .data-table tr {
    border-bottom: 1px solid var(--border-light);
    padding: var(--spacing-2) 0;
  }

  .data-table td {
    border: 0;
    padding: 4px var(--spacing-3);
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-2);
  }

  .data-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--text-secondary);
    flex: 0 0 110px;
  }

  .modal-row {
    grid-template-columns: 1fr;
  }
}
