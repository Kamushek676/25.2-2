/**
 * js/render.js
 * Чистые функции рендера DOM-элементов без innerHTML
 */

// 1. Вспомогательные функции форматирования
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
    // Статусы заказ-нарядов
    new: { label: "Новый", className: "status-badge status-badge--info" },
    in_progress: { label: "В работе", className: "status-badge status-badge--warning" },
    waiting_parts: { label: "Ждёт запчасти", className: "status-badge status-badge--warning" },
    done: { label: "Завершён", className: "status-badge status-badge--success" },
    cancelled: { label: "Отменён", className: "status-badge status-badge--error" },

    // Статусы автомобилей
    in_repair: { label: "В ремонте", className: "status-badge status-badge--warning" },
    ready: { label: "Готов к выдаче", className: "status-badge status-badge--success" },
    diagnostics: { label: "Диагностика", className: "status-badge status-badge--info" },
    waiting_queue: { label: "В очереди", className: "status-badge status-badge--info" },
    delivered: { label: "Выдан владельцу", className: "status-badge status-badge--success" },

    // Статусы клиентов
    active: { label: "Постоянный", className: "status-badge status-badge--success" },
    vip: { label: "VIP-клиент", className: "status-badge status-badge--warning" },
    corporate: { label: "Корпоративный", className: "status-badge status-badge--info" },
    new_client: { label: "Новый клиент", className: "status-badge status-badge--info" },
    inactive: { label: "Неактивен", className: "status-badge status-badge--error" }
  };

  return configs[status] || { label: status, className: "status-badge status-badge--info" };
}

// 2. Рендер строки таблицы заказ-наряда (возвращает HTMLTableRowElement)
export function renderOrderRow(order) {
  const tr = document.createElement("tr");

  // Ячейка 1: Номер наряда
  const tdNumber = document.createElement("td");
  const strongNumber = document.createElement("strong");
  strongNumber.textContent = `${order.orderNumber} (${order.id})`;
  tdNumber.append(strongNumber);

  // Ячейка 2: Дата открытия
  const tdDate = document.createElement("td");
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", order.createdAt);
  timeEl.textContent = formatDateRussian(order.createdAt);
  tdDate.append(timeEl);

  // Ячейка 3: Наименование работ
  const tdTitle = document.createElement("td");
  tdTitle.textContent = order.title;

  // Ячейка 4: Ответственный мастер
  const tdMaster = document.createElement("td");
  tdMaster.textContent = `${order.master.name} (${order.master.specialization})`;

  // Ячейка 5: Список операций
  const tdServices = document.createElement("td");
  tdServices.textContent = order.services.join(", ");

  // Ячейка 6: Стоимость
  const tdCost = document.createElement("td");
  tdCost.textContent = formatCurrency(order.totalCost);

  // Ячейка 7: Статус
  const tdStatus = document.createElement("td");
  const badgeConfig = getStatusBadgeConfig(order.status);
  const statusSpan = document.createElement("span");
  statusSpan.className = badgeConfig.className;
  statusSpan.textContent = badgeConfig.label;
  tdStatus.append(statusSpan);

  tr.append(tdNumber, tdDate, tdTitle, tdMaster, tdServices, tdCost, tdStatus);
  return tr;
}

// 3. Рендер карточки автомобиля (возвращает HTMLLIElement с вложенным article)
export function renderCarCard(car) {
  const li = document.createElement("li");
  const article = document.createElement("article");
  article.className = "car-card";

  // Заголовок карточки
  const h3 = document.createElement("h3");
  h3.className = "car-title";
  h3.textContent = `${car.model} [${car.specs.plate}]`;

  // Описание автомобиля
  const pDesc = document.createElement("p");
  pDesc.className = "car-desc";
  pDesc.textContent = car.description;

  // Владелец
  const pOwner = document.createElement("p");
  pOwner.className = "car-meta";
  pOwner.textContent = `Владелец: ${car.owner.name}`;

  // Технические данные (год, пробег, двигатель)
  const pSpecs = document.createElement("p");
  pSpecs.className = "car-meta";
  pSpecs.textContent = `${car.year} г. • Пробег: ${car.mileage.toLocaleString("ru-RU")} км • ${car.specs.engine}`;

  // Дата постановки на учёт
  const pDate = document.createElement("p");
  pDate.className = "car-meta";
  pDate.textContent = "В сервисе с: ";
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", car.registeredAt);
  timeEl.textContent = formatDateRussian(car.registeredAt);
  pDate.append(timeEl);

  // Бейдж статуса
  const badgeConfig = getStatusBadgeConfig(car.status);
  const statusSpan = document.createElement("span");
  statusSpan.className = badgeConfig.className;
  statusSpan.textContent = badgeConfig.label;

  article.append(h3, pDesc, pOwner, pSpecs, pDate, statusSpan);
  li.append(article);
  return li;
}

// 4. Рендер карточки клиента (возвращает HTMLLIElement с вложенным article)
export function renderClientCard(client) {
  const li = document.createElement("li");
  const article = document.createElement("article");
  article.className = "client-card";

  // ФИО клиента и ID
  const h3 = document.createElement("h3");
  h3.className = "client-name";
  h3.textContent = `${client.fullName} (${client.id})`;

  // Заметки
  const pNotes = document.createElement("p");
  pNotes.className = "client-text";
  pNotes.textContent = client.notes;

  // Контакты и скидка
  const pContacts = document.createElement("p");
  pContacts.className = "client-text";
  pContacts.textContent = `Тел: ${client.phone} • Скидка: ${client.discountRate}%`;

  // Адрес
  const pAddress = document.createElement("p");
  pAddress.className = "client-text";
  pAddress.textContent = `Адрес: ${client.address.city}, ${client.address.street}`;

  // Дата регистрации
  const pDate = document.createElement("p");
  pDate.className = "client-text";
  pDate.textContent = "Клиент с: ";
  const timeEl = document.createElement("time");
  timeEl.setAttribute("datetime", client.registeredAt);
  timeEl.textContent = formatDateRussian(client.registeredAt);
  pDate.append(timeEl);

  // Бейдж статуса клиента
  const badgeConfig = getStatusBadgeConfig(client.status);
  const statusSpan = document.createElement("span");
  statusSpan.className = badgeConfig.className;
  statusSpan.textContent = badgeConfig.label;

  article.append(h3, pNotes, pContacts, pAddress, pDate, statusSpan);
  li.append(article);
  return li;
}