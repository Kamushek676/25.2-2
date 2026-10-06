/**
 * js/app.js
 * Точка входа приложения. Инициализация и монтирование данных в DOM.
 */

import { autoserviceDB } from "data.js";
import { renderOrderRow, renderCarCard, renderClientCard } from "render.js";

function mountCollection(containerElement, itemsArray, renderFunction) {
  if (!containerElement) {
    return;
  }
  itemsArray.forEach((item) => {
    const renderedNode = renderFunction(item);
    containerElement.append(renderedNode);
  });
}

function initDashboard() {
  // 1. Монтирование заказ-нарядов в тело таблицы
  const ordersTableBody = document.getElementById("orders-table-body");
  mountCollection(ordersTableBody, autoserviceDB.workOrders, renderOrderRow);

  // 2. Монтирование карточек автомобилей в сетку
  const carsGrid = document.getElementById("cars-grid");
  mountCollection(carsGrid, autoserviceDB.cars, renderCarCard);

  // 3. Монтирование клиентов в дополнительную боковую панель
  const clientsStack = document.getElementById("clients-stack");
  mountCollection(clientsStack, autoserviceDB.clients, renderClientCard);
}

// Запуск приложения после готовности DOM дерева
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboard);
} else {
  initDashboard();
}
