/**
 * js/app.js
 * Точка входа: фильтры, сортировка таблицы и модальное окно.
 */

const orders = autoserviceDB.workOrders;

const ui = {
  tableBody: document.getElementById("orders-table-body"),
  cards: document.getElementById("orders-cards"),
  tableWrap: document.getElementById("orders-table-wrap"),
  empty: document.getElementById("orders-empty"),
  count: document.getElementById("orders-count"),
  form: document.getElementById("order-filters"),
  search: document.getElementById("search-input"),
  status: document.getElementById("status-select"),
  carsGrid: document.getElementById("cars-grid"),
  clientsStack: document.getElementById("clients-stack"),
  modal: document.getElementById("detail-modal"),
  dialog: document.querySelector(".modal-dialog"),
  modalTitle: document.getElementById("modal-title"),
  modalKicker: document.getElementById("modal-kicker"),
  modalBody: document.getElementById("modal-body"),
  modalClose: document.getElementById("modal-close"),
  modalPrint: document.getElementById("modal-print"),
  menuBtn: document.getElementById("menu-toggle"),
  overlay: document.getElementById("nav-overlay"),
  sidebar: document.getElementById("app-sidebar")
};

const sortState = { key: null, dir: "asc" };
let lastFocus = null;

function readFilters() {
  const priorities = Array.from(
    ui.form.querySelectorAll('input[name="priority"]:checked')
  ).map((input) => input.value);
  const view = ui.form.querySelector('input[name="view"]:checked').value;
  return {
    query: ui.search.value.trim().toLowerCase(),
    status: ui.status.value,
    priorities,
    view
  };
}

function matchesQuery(order, query) {
  if (!query) return true;
  const haystack = [
    order.id,
    order.orderNumber,
    order.title,
    order.description,
    order.master.name,
    order.services.join(" ")
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function getFilteredOrders() {
  const filters = readFilters();
  let list = orders.filter((order) => {
    if (filters.status !== "all" && order.status !== filters.status) return false;
    if (!filters.priorities.includes(order.priority)) return false;
    return matchesQuery(order, filters.query);
  });

  if (sortState.key) {
    const dir = sortState.dir === "asc" ? 1 : -1;
    list = list.slice().sort((a, b) => {
      const left = sortValue(a, sortState.key);
      const right = sortValue(b, sortState.key);
      if (left < right) return -1 * dir;
      if (left > right) return 1 * dir;
      return 0;
    });
  }

  return { list, view: filters.view };
}

function sortValue(order, key) {
  if (key === "master") return order.master.name;
  if (key === "createdAt") return new Date(order.createdAt).getTime();
  if (key === "totalCost") return order.totalCost;
  return String(order[key] || "").toLowerCase();
}

function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function renderOrders() {
  const { list, view } = getFilteredOrders();
  clearNode(ui.tableBody);
  clearNode(ui.cards);

  ui.count.textContent = `Показано нарядов: ${list.length} из ${orders.length}`;
  ui.empty.hidden = list.length !== 0;

  const isTable = view === "table";
  ui.tableWrap.hidden = !isTable;
  ui.cards.hidden = isTable;

  list.forEach((order) => {
    if (isTable) {
      ui.tableBody.append(renderOrderRow(order, openOrder));
    } else {
      ui.cards.append(renderOrderCard(order, openOrder));
    }
  });
}

function updateSortIndicators() {
  ui.tableWrap.querySelectorAll("th[aria-sort]").forEach((th) => {
    const button = th.querySelector("[data-sort]");
    if (!button) return;
    if (button.dataset.sort === sortState.key) {
      th.setAttribute("aria-sort", sortState.dir === "asc" ? "ascending" : "descending");
    } else {
      th.setAttribute("aria-sort", "none");
    }
  });
}

function onSortClick(event) {
  const button = event.target.closest("[data-sort]");
  if (!button) return;
  const key = button.dataset.sort;
  if (sortState.key === key) {
    sortState.dir = sortState.dir === "asc" ? "desc" : "asc";
  } else {
    sortState.key = key;
    sortState.dir = "asc";
  }
  updateSortIndicators();
  renderOrders();
}

function getFocusable(root) {
  return Array.from(
    root.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])')
  ).filter((el) => el.offsetParent !== null || el === ui.dialog);
}

function openModal(kicker, title, fill) {
  lastFocus = document.activeElement;
  ui.modalKicker.textContent = kicker;
  ui.modalTitle.textContent = title;
  clearNode(ui.modalBody);
  fill(ui.modalBody);
  ui.modal.hidden = false;
  document.body.classList.add("modal-open");
  ui.dialog.focus();
}

function closeModal() {
  if (ui.modal.hidden) return;
  ui.modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocus && typeof lastFocus.focus === "function") {
    lastFocus.focus();
  }
}

function openOrder(order) {
  openModal("Заказ-наряд", order.title, (body) => fillOrderDetails(body, order));
}

function openCar(car) {
  openModal("Автомобиль", car.model, (body) => fillCarDetails(body, car));
}

function openClient(client) {
  openModal("Клиент", client.fullName, (body) => fillClientDetails(body, client));
}

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  ui.menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  ui.menuBtn.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
}

function onModalKeydown(event) {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    setMenu(false);
    ui.menuBtn.focus();
    if (ui.modal.hidden) return;
  }

  if (ui.modal.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = getFocusable(ui.dialog);
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function mountStaticLists() {
  autoserviceDB.cars.forEach((car) => {
    ui.carsGrid.append(renderCarCard(car, openCar));
  });
  autoserviceDB.clients.forEach((client) => {
    ui.clientsStack.append(renderClientCard(client, openClient));
  });
}

function initDashboard() {
  mountStaticLists();
  renderOrders();

  ui.form.addEventListener("input", renderOrders);
  ui.form.addEventListener("change", renderOrders);
  ui.form.addEventListener("reset", () => {
    window.setTimeout(renderOrders, 0);
  });

  ui.tableWrap.addEventListener("click", onSortClick);

  ui.modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close]")) closeModal();
  });
  ui.modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", onModalKeydown);

  ui.modalPrint.addEventListener("click", () => {
    window.print();
  });

  ui.menuBtn.addEventListener("click", () => {
    const opened = document.body.classList.contains("menu-open");
    setMenu(!opened);
  });
  ui.overlay.addEventListener("click", () => setMenu(false));
  ui.sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setMenu(false);
  });
}

// Скрипт стоит в конце body, разметка уже есть — рисуем сразу.
initDashboard();
