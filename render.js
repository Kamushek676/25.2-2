/**
 * js/render.js
 * Чистые функции рендера DOM-элементов без innerHTML
 */

function formatDateRussian(isoString) {
  const dateObj = new Date(isoString);
  return dateObj.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function formatCurrency(amount) {
  return `${amount.toLocaleString("ru-RU")} ₽`;
}

function getStatusBadgeConfig(status) {
  const configs = {
    new: { label: "Новый", className: "status-badge status-badge--info" },
    in_progress: { label: "В работе", className: "status-badge status-badge--warning" },
    waiting_parts: { label: "Ждёт запчасти", className: "status-badge status-badge--warning" },
    done: { label: "Завершён", className: "status-badge status-badge--success" },
    cancelled: { label: "Отменён", className: "status-badge status-badge--error" },

    in_repair: { label: "В ремонте", className: "status-badge status-badge--warning" },
    ready: { label: "Готов к выдаче", className: "status-badge status-badge--success" },
    diagnostics: { label: "Диагностика", className: "status-badge status-badge--info" },
    waiting_queue: { label: "В очереди", className: "status-badge status-badge--info" },
    delivered: { label: "Выдан владельцу", className: "status-badge status-badge--success" },

    active: { label: "Постоянный", className: "status-badge status-badge--success" },
    vip: { label: "VIP-клиент", className: "status-badge status-badge--warning" },
    corporate: { label: "Корпоративный", className: "status-badge status-badge--info" },
    new_client: { label: "Новый клиент", className: "status-badge status-badge--info" },
    inactive: { label: "Неактивен", className: "status-badge status-badge--error" }
  };

  return configs[status] || { label: status, className: "status-badge status-badge--info" };
}

function getPriorityConfig(priority) {
  const configs = {
    high: { label: "Высокий", className: "priority priority--high" },
    normal: { label: "Обычный", className: "priority priority--normal" },
    low: { label: "Низкий", className: "priority priority--low" }
  };
  return configs[priority] || configs.normal;
}

function makeBadge(status) {
  const badgeConfig = getStatusBadgeConfig(status);
  const statusSpan = document.createElement("span");
  statusSpan.className = badgeConfig.className;
  statusSpan.textContent = badgeConfig.label;
  return statusSpan;
}

function makePriority(priority) {
  const config = getPriorityConfig(priority);
  const span = document.createElement("span");
  span.className = config.className;
  span.textContent = config.label;
  return span;
}

function makeTags(items) {
  const row = document.createElement("div");
  row.className = "tag-row";
  items.forEach((item) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item;
    row.append(tag);
  });
  return row;
}

function renderOrderRow(order, onOpen) {
  const tr = document.createElement("tr");

  const tdNumber = document.createElement("td");
  const numberBtn = document.createElement("button");
  numberBtn.type = "button";
  numberBtn.className = "row-btn";
  numberBtn.textContent = order.orderNumber;
  numberBtn.addEventListener("click", () => onOpen(order));
  const idNote = document.createElement("span");
  idNote.className = "cell-muted";
  idNote.textContent = order.id;
  tdNumber.append(numberBtn, idNote);

  const tdDate = document.createElement("td");
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", order.createdAt);
  timeEl.textContent = formatDateRussian(order.createdAt);
  tdDate.append(timeEl);

  const tdTitle = document.createElement("td");
  const titleStrong = document.createElement("span");
  titleStrong.className = "cell-title";
  titleStrong.textContent = order.title;
  tdTitle.append(titleStrong);

  const tdMaster = document.createElement("td");
  tdMaster.textContent = order.master.name;
  const masterNote = document.createElement("span");
  masterNote.className = "cell-muted";
  masterNote.textContent = `${order.master.specialization}, ${order.master.grade}`;
  tdMaster.append(masterNote);

  const tdServices = document.createElement("td");
  tdServices.className = "cell-services";
  tdServices.textContent = order.services.join(", ");

  const tdCost = document.createElement("td");
  tdCost.textContent = formatCurrency(order.totalCost);

  const tdPriority = document.createElement("td");
  tdPriority.append(makePriority(order.priority));

  const tdStatus = document.createElement("td");
  tdStatus.append(makeBadge(order.status));

  tr.append(tdNumber, tdDate, tdTitle, tdMaster, tdServices, tdCost, tdPriority, tdStatus);

  const labels = [
    "Номер наряда",
    "Дата открытия",
    "Наименование работ",
    "Ответственный мастер",
    "Список операций",
    "Сумма (руб.)",
    "Приоритет",
    "Текущий статус"
  ];
  Array.from(tr.children).forEach((cell, index) => {
    cell.dataset.label = labels[index];
  });

  return tr;
}

function renderOrderCard(order, onOpen) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "order-card";
  button.addEventListener("click", () => onOpen(order));

  const head = document.createElement("div");
  head.className = "card-head";
  const id = document.createElement("span");
  id.className = "card-id";
  id.textContent = `${order.orderNumber} · ${order.id}`;
  head.append(id, makeBadge(order.status));

  const title = document.createElement("h3");
  title.className = "order-card-title";
  title.textContent = order.title;

  const desc = document.createElement("p");
  desc.className = "order-card-text";
  desc.textContent = order.description;

  const meta = document.createElement("p");
  meta.className = "card-meta";
  meta.textContent = `${formatDateRussian(order.createdAt)} · ${order.master.name} · ${formatCurrency(order.totalCost)}`;

  button.append(head, title, desc, makePriority(order.priority), makeTags(order.services), meta);
  li.append(button);
  return li;
}

function renderCarCard(car, onOpen) {
  const li = document.createElement("li");
  const article = document.createElement("button");
  article.type = "button";
  article.className = "car-card";
  article.addEventListener("click", () => onOpen(car));

  const head = document.createElement("div");
  head.className = "card-head";
  const id = document.createElement("span");
  id.className = "card-id";
  id.textContent = car.id;
  head.append(id, makeBadge(car.status));

  const h3 = document.createElement("h3");
  h3.className = "car-title";
  h3.textContent = `${car.model} [${car.specs.plate}]`;

  const pDesc = document.createElement("p");
  pDesc.className = "car-desc";
  pDesc.textContent = car.description;

  const pOwner = document.createElement("p");
  pOwner.className = "car-meta";
  pOwner.textContent = `Владелец: ${car.owner.name}`;

  const pSpecs = document.createElement("p");
  pSpecs.className = "car-meta";
  pSpecs.textContent = `${car.year} г. • Пробег: ${car.mileage.toLocaleString("ru-RU")} км • ${car.specs.engine}`;

  const pDate = document.createElement("p");
  pDate.className = "car-meta";
  pDate.textContent = "В сервисе с: ";
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", car.registeredAt);
  timeEl.textContent = formatDateRussian(car.registeredAt);
  pDate.append(timeEl);

  article.append(head, h3, pDesc, pOwner, pSpecs, makeTags([car.specs.color, car.specs.plate]), pDate);
  li.append(article);
  return li;
}

function renderClientCard(client, onOpen) {
  const li = document.createElement("li");
  const article = document.createElement("button");
  article.type = "button";
  article.className = "client-card";
  article.addEventListener("click", () => onOpen(client));

  const head = document.createElement("div");
  head.className = "card-head";
  const id = document.createElement("span");
  id.className = "card-id";
  id.textContent = client.id;
  head.append(id, makeBadge(client.status));

  const h3 = document.createElement("h3");
  h3.className = "client-name";
  h3.textContent = client.fullName;

  const pNotes = document.createElement("p");
  pNotes.className = "client-text";
  pNotes.textContent = client.notes;

  const pContacts = document.createElement("p");
  pContacts.className = "client-text";
  pContacts.textContent = `Тел: ${client.phone} • Скидка: ${client.discountRate}%`;

  const pAddress = document.createElement("p");
  pAddress.className = "client-text";
  pAddress.textContent = `Адрес: ${client.address.city}, ${client.address.street}`;

  const pDate = document.createElement("p");
  pDate.className = "card-meta";
  pDate.textContent = "Клиент с: ";
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", client.registeredAt);
  timeEl.textContent = formatDateRussian(client.registeredAt);
  pDate.append(timeEl);

  article.append(head, h3, pNotes, pContacts, pAddress, pDate);
  li.append(article);
  return li;
}

function addDetail(parent, label, valueNode) {
  const item = document.createElement("div");
  item.className = "detail-item";
  const caption = document.createElement("span");
  caption.className = "detail-label";
  caption.textContent = label;
  const value = document.createElement("div");
  value.className = "detail-value";
  if (typeof valueNode === "string") {
    value.textContent = valueNode;
  } else {
    value.append(valueNode);
  }
  item.append(caption, value);
  parent.append(item);
}

function fillOrderDetails(body, order) {
  const lead = document.createElement("p");
  lead.className = "detail-lead";
  lead.textContent = order.description;
  const grid = document.createElement("div");
  grid.className = "detail-grid";
  addDetail(grid, "Номер", `${order.orderNumber} (${order.id})`);
  addDetail(grid, "Открыт", formatDateRussian(order.createdAt));
  addDetail(grid, "Мастер", `${order.master.name}, ${order.master.specialization}`);
  addDetail(grid, "Разряд", order.master.grade);
  addDetail(grid, "Сумма", formatCurrency(order.totalCost));
  addDetail(grid, "Статус", makeBadge(order.status));
  addDetail(grid, "Приоритет", makePriority(order.priority));
  body.append(lead, grid, makeTags(order.services));
}

function fillCarDetails(body, car) {
  const lead = document.createElement("p");
  lead.className = "detail-lead";
  lead.textContent = car.description;
  const grid = document.createElement("div");
  grid.className = "detail-grid";
  addDetail(grid, "Карточка", car.id);
  addDetail(grid, "VIN", car.vin);
  addDetail(grid, "Год", String(car.year));
  addDetail(grid, "Пробег", `${car.mileage.toLocaleString("ru-RU")} км`);
  addDetail(grid, "Двигатель", car.specs.engine);
  addDetail(grid, "Госномер", car.specs.plate);
  addDetail(grid, "Цвет", car.specs.color);
  addDetail(grid, "Владелец", car.owner.name);
  addDetail(grid, "На учёте с", formatDateRussian(car.registeredAt));
  addDetail(grid, "Статус", makeBadge(car.status));
  body.append(lead, grid);
}

function fillClientDetails(body, client) {
  const lead = document.createElement("p");
  lead.className = "detail-lead";
  lead.textContent = client.notes;
  const grid = document.createElement("div");
  grid.className = "detail-grid";
  addDetail(grid, "Карточка", client.id);
  addDetail(grid, "Телефон", client.phone);
  addDetail(grid, "Почта", client.email);
  addDetail(grid, "Скидка", `${client.discountRate}%`);
  addDetail(grid, "Город", client.address.city);
  addDetail(grid, "Улица", client.address.street);
  addDetail(grid, "Индекс", client.address.zip);
  addDetail(grid, "В базе с", formatDateRussian(client.registeredAt));
  addDetail(grid, "Статус", makeBadge(client.status));
  body.append(lead, grid);
}
