function formatDateRussian(isoString) {
  const dateObj = new Date(isoString);
  return dateObj.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function formatCurrency(amount) {
  return amount.toLocaleString("ru-RU") + " ₽";
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

function makeBadge(status) {
  const badgeConfig = getStatusBadgeConfig(status);
  const statusSpan = document.createElement("span");
  statusSpan.className = badgeConfig.className;
  statusSpan.textContent = badgeConfig.label;
  return statusSpan;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function getPriority(order) {
  if (order.status === "cancelled" || order.status === "done") {
    return { text: "Низкий", cls: "priority priority--low" };
  }
  if (order.status === "waiting_parts" || order.totalCost >= 15000) {
    return { text: "Высокий", cls: "priority priority--high" };
  }
  if (order.status === "new" || order.status === "in_progress") {
    return { text: "Средний", cls: "priority priority--mid" };
  }
  return { text: "Низкий", cls: "priority priority--low" };
}

function fillCell(td, label, node) {
  td.setAttribute("data-label", label);
  td.append(node);
  return td;
}

function renderOrderRow(order) {
  const tr = document.createElement("tr");
  tr.tabIndex = 0;
  const priority = getPriority(order);

  const tdNumber = document.createElement("td");
  const numWrap = el("div");
  numWrap.append(el("strong", "", order.orderNumber));
  numWrap.append(el("span", "cell-sub", order.id));
  fillCell(tdNumber, "Номер наряда", numWrap);

  const tdDate = document.createElement("td");
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", order.createdAt);
  timeEl.textContent = formatDateRussian(order.createdAt);
  fillCell(tdDate, "Дата открытия", timeEl);

  const tdTitle = document.createElement("td");
  const titleWrap = el("div");
  titleWrap.append(document.createTextNode(order.title));
  const sub = el("span", "cell-sub");
  sub.append(el("span", priority.cls, priority.text));
  titleWrap.append(sub);
  fillCell(tdTitle, "Наименование работ", titleWrap);

  const tdMaster = document.createElement("td");
  tdMaster.textContent = order.master.name + " (" + order.master.specialization + ")";
  tdMaster.setAttribute("data-label", "Ответственный мастер");

  const tdServices = document.createElement("td");
  tdServices.textContent = order.services.join(", ");
  tdServices.setAttribute("data-label", "Список операций");

  const tdCost = document.createElement("td");
  fillCell(tdCost, "Сумма (руб.)", document.createTextNode(formatCurrency(order.totalCost)));

  const tdStatus = document.createElement("td");
  fillCell(tdStatus, "Текущий статус", makeBadge(order.status));

  tr.append(tdNumber, tdDate, tdTitle, tdMaster, tdServices, tdCost, tdStatus);
  tr.addEventListener("click", function () { openOrderModal(order); });
  tr.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openOrderModal(order);
    }
  });
  return tr;
}

function renderOrderCard(order) {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "order-card";
  const priority = getPriority(order);

  const head = el("div", "card-head");
  head.append(el("span", "card-id", order.id + " · " + order.orderNumber));
  head.append(makeBadge(order.status));

  const title = el("h3", "order-title", order.title);
  const desc = el("p", "order-desc", order.description);

  const meta = el("p", "card-meta");
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", order.createdAt);
  timeEl.textContent = formatDateRussian(order.createdAt);
  meta.append(timeEl, document.createTextNode(" · " + order.master.name));

  const tags = el("div", "tag-row");
  tags.append(el("span", "tag", order.master.specialization));
  tags.append(el("span", "tag", order.master.grade));

  btn.append(head, title, desc, meta, tags, el("span", priority.cls, "Приоритет: " + priority.text), el("p", "card-sum", formatCurrency(order.totalCost)));
  btn.addEventListener("click", function () { openOrderModal(order); });
  li.append(btn);
  return li;
}

function renderCarCard(car) {
  const li = document.createElement("li");
  const article = document.createElement("button");
  article.type = "button";
  article.className = "car-card";

  const head = el("div", "card-head");
  head.append(el("span", "card-id", car.id));
  head.append(makeBadge(car.status));

  const h3 = el("h3", "car-title", car.model + " [" + car.specs.plate + "]");
  const pDesc = el("p", "car-desc", car.description);
  const pOwner = el("p", "car-meta", "Владелец: " + car.owner.name + " · ответственный: приёмка");

  const pSpecs = el("p", "car-meta", car.year + " г. • Пробег: " + car.mileage.toLocaleString("ru-RU") + " км • " + car.specs.engine);

  const pDate = el("p", "car-meta", "В сервисе с: ");
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", car.registeredAt);
  timeEl.textContent = formatDateRussian(car.registeredAt);
  pDate.append(timeEl);

  const tags = el("div", "tag-row");
  tags.append(el("span", "tag", car.specs.color));
  tags.append(el("span", "tag", car.specs.plate));
  tags.append(el("span", "tag", "VIN " + car.vin.slice(-6)));

  article.append(head, h3, pDesc, pOwner, pSpecs, pDate, tags);
  article.addEventListener("click", function () { openCarModal(car); });
  li.append(article);
  return li;
}

function renderClientCard(client) {
  const li = document.createElement("li");
  const article = document.createElement("button");
  article.type = "button";
  article.className = "client-card";

  const head = el("div", "card-head");
  head.append(el("span", "card-id", client.id));
  head.append(makeBadge(client.status));

  const h3 = el("h3", "client-name", client.fullName);
  const pNotes = el("p", "client-text", client.notes);
  const pContacts = el("p", "client-text", "Тел: " + client.phone + " • Скидка: " + client.discountRate + "%");
  const pAddress = el("p", "client-text", client.address.city + ", " + client.address.street);

  const pDate = el("p", "card-meta", "Клиент с: ");
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", client.registeredAt);
  timeEl.textContent = formatDateRussian(client.registeredAt);
  pDate.append(timeEl);
  pDate.append(document.createTextNode(" · менеджер: приёмка"));

  const tags = el("div", "tag-row");
  tags.append(el("span", "tag", "скидка " + client.discountRate + "%"));
  tags.append(el("span", "tag", client.address.city));

  article.append(head, h3, pNotes, pContacts, pAddress, pDate, tags);
  article.addEventListener("click", function () { openClientModal(client); });
  li.append(article);
  return li;
}
