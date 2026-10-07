import { autoserviceDB } from "./data.js";
import {
  renderOrderRow,
  renderOrderCard,
  renderCarCard,
  renderClientCard,
  formatDateRussian,
  formatCurrency,
  makeStatusBadge,
  statusLabel
} from "./render.js";

const sortState = { key: "createdAt", direction: "desc" };
let previousFocus = null;

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function detailRows(pairs) {
  const list = make("dl", "detail-list");
  pairs.forEach(([label, value]) => {
    const row = make("div", "detail-row");
    row.append(make("dt", "", label));
    const dd = document.createElement("dd");
    if (value instanceof Node) dd.append(value);
    else dd.textContent = value;
    row.append(dd);
    list.append(row);
  });
  return list;
}

function openModal(title, description, pairs) {
  const modal = document.getElementById("detail-modal");
  document.getElementById("modal-title").textContent = title;
  const content = document.getElementById("modal-content");
  content.replaceChildren(make("p", "modal-description", description), detailRows(pairs));
  previousFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-dialog").focus();
}

function closeModal() {
  const modal = document.getElementById("detail-modal");
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
}

function showOrder(order) {
  const priority = order.totalCost >= 15000 ? "Высокий" : (order.status === "new" || order.status === "waiting_parts" ? "Средний" : "Обычный");
  openModal("Заказ-наряд " + order.orderNumber, order.description, [
    ["Номер", order.orderNumber + " · " + order.id],
    ["Работа", order.title],
    ["Дата открытия", formatDateRussian(order.createdAt)],
    ["Мастер", order.master.name],
    ["Специализация", order.master.specialization + " · " + order.master.grade],
    ["Операции", order.services.join(", ")],
    ["Стоимость", formatCurrency(order.totalCost)],
    ["Приоритет", priority],
    ["Статус", makeStatusBadge(order.status)]
  ]);
}

function showCar(car) {
  openModal(car.model, car.description, [
    ["Код автомобиля", car.id],
    ["Госномер", car.specs.plate],
    ["VIN", car.vin],
    ["Владелец", car.owner.name],
    ["Год выпуска", String(car.year)],
    ["Пробег", car.mileage.toLocaleString("ru-RU") + " км"],
    ["Двигатель", car.specs.engine],
    ["Цвет", car.specs.color],
    ["В сервисе с", formatDateRussian(car.registeredAt)],
    ["Состояние", makeStatusBadge(car.status)]
  ]);
}

function showClient(client) {
  openModal(client.fullName, client.notes, [
    ["Код клиента", client.id],
    ["Телефон", client.phone],
    ["Электронная почта", client.email],
    ["Адрес", client.address.city + ", " + client.address.street + " · " + client.address.zip],
    ["Скидка", client.discountRate + "%"],
    ["Клиент с", formatDateRussian(client.registeredAt)],
    ["Статус", makeStatusBadge(client.status)]
  ]);
}

function getSelectedMasters() {
  return Array.from(document.querySelectorAll('#master-filters input[type="checkbox"]:checked'))
    .map((input) => input.value);
}

function getFilteredOrders() {
  const search = document.getElementById("search-orders").value.trim().toLowerCase();
  const status = document.getElementById("status-filter").value;
  const selectedMasters = getSelectedMasters();

  const orders = autoserviceDB.workOrders.filter((order) => {
    const text = [order.orderNumber, order.id, order.title, order.description, order.master.name, order.master.specialization, ...order.services].join(" ").toLowerCase();
    if (search && !text.includes(search)) return false;
    if (status && order.status !== status) return false;
    if (selectedMasters.length && !selectedMasters.includes(order.master.name)) return false;
    return true;
  });

  orders.sort((a, b) => {
    let first = a[sortState.key];
    let second = b[sortState.key];
    if (sortState.key === "createdAt") {
      first = new Date(first).getTime();
      second = new Date(second).getTime();
    } else if (sortState.key === "status") {
      first = statusLabel(first).toLocaleLowerCase("ru");
      second = statusLabel(second).toLocaleLowerCase("ru");
    } else if (typeof first === "string") {
      first = first.toLocaleLowerCase("ru");
      second = second.toLocaleLowerCase("ru");
    }
    if (first < second) return sortState.direction === "asc" ? -1 : 1;
    if (first > second) return sortState.direction === "asc" ? 1 : -1;
    return 0;
  });
  return orders;
}

function updateSortLabels() {
  document.querySelectorAll(".sort-button").forEach((button) => {
    const th = button.closest("th");
    if (button.dataset.sort === sortState.key) {
      th.setAttribute("aria-sort", sortState.direction === "asc" ? "ascending" : "descending");
    } else {
      th.setAttribute("aria-sort", "none");
    }
  });
}

function renderOrders() {
  const orders = getFilteredOrders();
  const tbody = document.getElementById("orders-table-body");
  const cards = document.getElementById("orders-cards");
  const tableWrap = document.getElementById("orders-table-wrap");
  const empty = document.getElementById("orders-empty");
  const view = document.querySelector('input[name="view"]:checked').value;

  tbody.replaceChildren();
  cards.replaceChildren();
  orders.forEach((order) => {
    const open = () => showOrder(order);
    tbody.append(renderOrderRow(order, open));
    cards.append(renderOrderCard(order, open));
  });
  const cardView = view === "cards";
  cards.hidden = !cardView;
  tableWrap.hidden = cardView;
  empty.hidden = orders.length > 0;
  document.getElementById("result-count").textContent = "Показано " + orders.length + " из " + autoserviceDB.workOrders.length + " заказ-нарядов";
  document.getElementById("orders-total").textContent = orders.length + " записей";
  updateSortLabels();
}

function makeFilterOptions() {
  const statusSelect = document.getElementById("status-filter");
  const statuses = [...new Set(autoserviceDB.workOrders.map((order) => order.status))];
  statuses.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = statusLabel(status);
    statusSelect.append(option);
  });

  const masters = [...new Set(autoserviceDB.workOrders.map((order) => order.master.name))];
  const list = document.getElementById("master-filters");
  masters.forEach((master, index) => {
    const label = make("label", "choice checkbox");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = master;
    input.id = "master-" + index;
    const text = make("span", "", master);
    label.htmlFor = input.id;
    label.append(input, text);
    list.append(label);
  });
}

function renderCars() {
  const grid = document.getElementById("cars-grid");
  grid.replaceChildren();
  autoserviceDB.cars.forEach((car) => grid.append(renderCarCard(car, () => showCar(car))));
  document.getElementById("cars-total").textContent = autoserviceDB.cars.length + " автомобилей";
}

function renderClients() {
  const stack = document.getElementById("clients-stack");
  stack.replaceChildren();
  autoserviceDB.clients.forEach((client) => stack.append(renderClientCard(client, () => showClient(client))));
}

function renderStats() {
  document.getElementById("stat-orders").textContent = autoserviceDB.workOrders.length;
  document.getElementById("stat-active").textContent = autoserviceDB.workOrders.filter((order) => ["new", "in_progress", "waiting_parts"].includes(order.status)).length;
  document.getElementById("stat-cars").textContent = autoserviceDB.cars.length;
  document.getElementById("stat-clients").textContent = autoserviceDB.clients.length;
}

function focusableItems(container) {
  return Array.from(container.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'))
    .filter((item) => item.offsetParent !== null);
}

function initModal() {
  const modal = document.getElementById("detail-modal");
  document.getElementById("modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-modal-close")) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    const dialog = modal.querySelector(".modal-dialog");
    const items = focusableItems(dialog);
    if (!items.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function initDashboard() {
  makeFilterOptions();
  renderStats();
  renderOrders();
  renderCars();
  renderClients();
  initModal();

  const form = document.getElementById("order-filters");
  form.addEventListener("input", renderOrders);
  form.addEventListener("change", renderOrders);
  form.addEventListener("reset", () => setTimeout(renderOrders, 0));

  document.querySelectorAll(".sort-button").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.sort;
      if (sortState.key === key) sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
      else {
        sortState.key = key;
        sortState.direction = "asc";
      }
      renderOrders();
    });
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initDashboard);
else initDashboard();
