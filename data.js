/**
 * js/data.js
 * База данных автосервиса «АвтоМастер Pro»
 */

const autoserviceDB = {
  // Сущность 1: Заказ-наряды (15 записей, 9 полей)
  workOrders: [
    {
      id: "WO-2026-001",
      orderNumber: "ЗН-101",
      title: "Плановое ТО-60 Toyota Camry",
      description: "Комплексная замена моторного масла, всех фильтров и диагностика ходовой.",
      status: "in_progress", // new | in_progress | waiting_parts | done | cancelled
      createdAt: "2026-09-28T08:30:00Z",
      totalCost: 18500,
      master: { name: "Сергеев А.П.", specialization: "Моторист", grade: "Высший" },
      services: ["Замена масла 5W-30", "Масляный фильтр", "Фильтр салона", "Осмотр подвески"]
    },
    {
      id: "WO-2026-002",
      orderNumber: "ЗН-102",
      title: "Замена передних колодок VW Polo",
      description: "Замена изношенных тормозных колодок и проверка толщины дисков.",
      status: "done",
      createdAt: "2026-09-29T10:15:00Z",
      totalCost: 7200,
      master: { name: "Иванов К.С.", specialization: "Слесарь", grade: "1 категория" },
      services: ["Колодки передние", "Прокачка тормозной системы", "Очистка суппортов"]
    },
    {
      id: "WO-2026-003",
      orderNumber: "ЗН-103",
      title: "Компьютерная диагностика Mercedes C180",
      description: "Считывание ошибок блока управления АКПП и калибровка датчиков.",
      status: "in_progress",
      createdAt: "2026-10-01T07:45:00Z",
      totalCost: 9400,
      master: { name: "Сергеев А.П.", specialization: "Диагност", grade: "Высший" },
      services: ["Скан ошибок OBD-II", "Тест-план АКПП", "Адаптация дросселя"]
    },
    {
      id: "WO-2026-004",
      orderNumber: "ЗН-104",
      title: "Сезонный шиномонтаж Kia Rio",
      description: "Комплексная переобувка на зимнюю резину R15 с балансировкой.",
      status: "new",
      createdAt: "2026-10-02T11:00:00Z",
      totalCost: 3600,
      master: { name: "Петров Д.И.", specialization: "Шиномонтажник", grade: "2 категория" },
      services: ["Снятие/установка 4 колес", "Балансировка", "Мойка дисков"]
    },
    {
      id: "WO-2026-005",
      orderNumber: "ЗН-105",
      title: "Замена масла в ДВС Hyundai Tucson",
      description: "Экспресс-замена синтетического моторного масла и воздушного фильтра.",
      status: "done",
      createdAt: "2026-10-02T14:20:00Z",
      totalCost: 6100,
      master: { name: "Иванов К.С.", specialization: "Слесарь", grade: "1 категория" },
      services: ["Масло Shell Helix Ultra", "Фильтр масляный", "Замена уплотнительного кольца"]
    },
    {
      id: "WO-2026-006",
      orderNumber: "ЗН-106",
      title: "Ремонт тормозной системы Nissan Qashqai",
      description: "Замена дисков и колодок по кругу с заменой тормозной жидкости DOT-4.",
      status: "in_progress",
      createdAt: "2026-10-03T09:10:00Z",
      totalCost: 14800,
      master: { name: "Петров Д.И.", specialization: "Слесарь", grade: "2 категория" },
      services: ["Диски передние Brembo", "Колодки перед/зад", "Замена жидкости DOT-4"]
    },
    {
      id: "WO-2026-007",
      orderNumber: "ЗН-107",
      title: "Большое ТО Mercedes-Benz E200",
      description: "Замена свечей зажигания, приводного ремня и технический аудит.",
      status: "done",
      createdAt: "2026-10-03T12:00:00Z",
      totalCost: 24900,
      master: { name: "Сергеев А.П.", specialization: "Моторист", grade: "Высший" },
      services: ["Иридиевые свечи (4 шт.)", "Ремень поликлиновой", "Диагностика подвески"]
    },
    {
      id: "WO-2026-008",
      orderNumber: "ЗН-108",
      title: "Диагностика стуков Skoda Octavia",
      description: "Поиск источника металлического стука в передней подвеске при проезде неровностей.",
      status: "new",
      createdAt: "2026-10-04T08:50:00Z",
      totalCost: 2500,
      master: { name: "Иванов К.С.", specialization: "Ходовик", grade: "1 категория" },
      services: ["Осмотр на вибростенде", "Проверка люфтов шаровых опор"]
    },
    {
      id: "WO-2026-009",
      orderNumber: "ЗН-109",
      title: "Ремонт системы зажигания Lada Vesta",
      description: "Устранение пропусков зажигания в 3-м цилиндре, ожидание катушки.",
      status: "waiting_parts",
      createdAt: "2026-10-04T10:30:00Z",
      totalCost: 5800,
      master: { name: "Петров Д.И.", specialization: "Электрик", grade: "2 категория" },
      services: ["Компьютерная диагностика", "Заказ оригинальной катушки зажигания"]
    },
    {
      id: "WO-2026-010",
      orderNumber: "ЗН-110",
      title: "Шиномонтаж RunFlat BMW 320i",
      description: "Смена жестких покрышек RunFlat R18 с обязательной калибровкой датчиков давления.",
      status: "done",
      createdAt: "2026-10-04T15:40:00Z",
      totalCost: 5200,
      master: { name: "Иванов К.С.", specialization: "Шиномонтажник", grade: "1 категория" },
      services: ["Монтаж низкого профиля", "Балансировка колес", "Инициализация TPMS"]
    },
    {
      id: "WO-2026-011",
      orderNumber: "ЗН-111",
      title: "Регламентное обслуживание Honda Civic",
      description: "Замена моторного масла, воздушного, масляного и салонного фильтров.",
      status: "new",
      createdAt: "2026-10-05T09:00:00Z",
      totalCost: 7900,
      master: { name: "Сергеев А.П.", specialization: "Слесарь", grade: "Высший" },
      services: ["Масло 0W-20 Honda", "Фильтр воздушный", "Фильтр салона угольный"]
    },
    {
      id: "WO-2026-012",
      orderNumber: "ЗН-112",
      title: "Замена стоек стабилизатора VW Tiguan",
      description: "Замена изношенных тяг стабилизатора и регулировка углов установки колес.",
      status: "in_progress",
      createdAt: "2026-10-05T11:20:00Z",
      totalCost: 11300,
      master: { name: "Петров Д.И.", specialization: "Ходовик", grade: "2 категория" },
      services: ["Тяги стабилизатора (пара)", "Сход-развал 3D на стенде"]
    },
    {
      id: "WO-2026-013",
      orderNumber: "ЗН-113",
      title: "Отказ от ремонта Renault Duster",
      description: "Клиент принял решение продать автомобиль без проведения сервисных работ.",
      status: "cancelled",
      createdAt: "2026-10-05T13:10:00Z",
      totalCost: 0,
      master: { name: "Иванов К.С.", specialization: "Приемщик", grade: "1 категория" },
      services: ["Отказ по заявлению собственника"]
    },
    {
      id: "WO-2026-014",
      orderNumber: "ЗН-114",
      title: "Обслуживание кондиционера Mazda CX-5",
      description: "Вакуумирование системы, проверка на утечки и заправка фреоном R134a.",
      status: "new",
      createdAt: "2026-10-06T08:15:00Z",
      totalCost: 4700,
      master: { name: "Сергеев А.П.", specialization: "Климат-контроль", grade: "Высший" },
      services: ["Опрессовка азотом", "Заправка 550г фреона", "Антибактериальная обработка"]
    },
    {
      id: "WO-2026-015",
      orderNumber: "ЗН-115",
      title: "Замена комплекта ГРМ Ford Focus",
      description: "Замена зубчатого ремня ГРМ, натяжного ролика и водяного насоса.",
      status: "waiting_parts",
      createdAt: "2026-10-06T09:30:00Z",
      totalCost: 22600,
      master: { name: "Петров Д.И.", specialization: "Моторист", grade: "2 категория" },
      services: ["Комплект ГРМ Gates", "Водяная помпа", "Антифриз G12+ 5л"]
    }
  ],

  // Сущность 2: Автомобили (15 записей, 9 полей)
  cars: [
    {
      id: "CAR-001",
      vin: "XTA21099012345678",
      model: "Toyota Camry 2.5 AT",
      description: "Бизнес-седан черного цвета, комплектация Prestige, один владелец.",
      status: "in_repair", // in_repair | ready | diagnostics | waiting_queue | delivered
      year: 2021,
      mileage: 64200,
      registeredAt: "2024-03-12T10:20:00Z",
      specs: { engine: "2.5L Бензин 181 л.с.", plate: "А101АА777", color: "Черный" },
      owner: { clientId: "CL-001", name: "Иван Петров" }
    },
    {
      id: "CAR-002",
      vin: "WVWZZZ3CZWE123456",
      model: "Volkswagen Polo 1.6 MT",
      description: "Городской седан серебристого цвета для ежедневных поездок на работу.",
      status: "ready",
      year: 2019,
      mileage: 91400,
      registeredAt: "2024-05-20T14:10:00Z",
      specs: { engine: "1.6L Бензин 110 л.с.", plate: "В202ВВ777", color: "Серебристый" },
      owner: { clientId: "CL-002", name: "Мария Соколова" }
    },
    {
      id: "CAR-003",
      vin: "WDD2040011A123456",
      model: "Mercedes-Benz C180",
      description: "Служебный корпоративный седан, регулярное дилерское обслуживание.",
      status: "in_repair",
      year: 2022,
      mileage: 48300,
      registeredAt: "2023-11-02T09:40:00Z",
      specs: { engine: "1.5L Турбо 150 л.с.", plate: "Е303ЕЕ777", color: "Белый" },
      owner: { clientId: "CL-003", name: "Алексей Кузнецов" }
    },
    {
      id: "CAR-004",
      vin: "XTA21723012345679",
      model: "Kia Rio 1.6 AT",
      description: "Компактный хэтчбек красного цвета, идеальное состояние кузова.",
      status: "waiting_queue",
      year: 2018,
      mileage: 118900,
      registeredAt: "2025-01-18T11:50:00Z",
      specs: { engine: "1.6L Бензин 123 л.с.", plate: "К404КК777", color: "Красный" },
      owner: { clientId: "CL-004", name: "Елена Новикова" }
    },
    {
      id: "CAR-005",
      vin: "JTMBD32V265123456",
      model: "Hyundai Tucson 2.0 4WD",
      description: "Полноприводный семейный кроссовер для поездок за город.",
      status: "ready",
      year: 2022,
      mileage: 32400,
      registeredAt: "2023-08-09T16:25:00Z",
      specs: { engine: "2.0L Бензин 150 л.с.", plate: "М505ММ777", color: "Темно-синий" },
      owner: { clientId: "CL-005", name: "Дмитрий Орлов" }
    },
    {
      id: "CAR-006",
      vin: "Z94C241BBMR123456",
      model: "Nissan Qashqai 2.0 CVT",
      description: "Кроссовер серый металлик, требует регулярной проверки вариатора.",
      status: "in_repair",
      year: 2017,
      mileage: 145000,
      registeredAt: "2024-07-14T08:20:00Z",
      specs: { engine: "2.0L Бензин 144 л.с.", plate: "Н606НН777", color: "Серый" },
      owner: { clientId: "CL-006", name: "Ольга Васильева" }
    },
    {
      id: "CAR-007",
      vin: "WDD2050461A654321",
      model: "Mercedes-Benz E200 4MATIC",
      description: "Представительский седан премиум-класса с расширенной гарантией.",
      status: "ready",
      year: 2023,
      mileage: 21900,
      registeredAt: "2023-04-25T13:10:00Z",
      specs: { engine: "2.0L Турбо 197 л.с.", plate: "О707ОО777", color: "Черный металлик" },
      owner: { clientId: "CL-007", name: "Павел Морозов" }
    },
    {
      id: "CAR-008",
      vin: "XWEH241CB0A123457",
      model: "Skoda Octavia 1.4 TSI",
      description: "Вместительный лифтбек с турбированным двигателем и коробкой DSG.",
      status: "diagnostics",
      year: 2020,
      mileage: 86400,
      registeredAt: "2025-02-03T15:45:00Z",
      specs: { engine: "1.4L TSI 150 л.с.", plate: "Р808РР777", color: "Бежевый" },
      owner: { clientId: "CL-008", name: "Анна Лебедева" }
    },
    {
      id: "CAR-009",
      vin: "XTA21074012345680",
      model: "Lada Vesta SW Cross",
      description: "Универсал повышенной проходимости, эксплуатация в смешанном цикле.",
      status: "in_repair",
      year: 2021,
      mileage: 58100,
      registeredAt: "2024-01-11T12:10:00Z",
      specs: { engine: "1.6L Бензин 106 л.с.", plate: "С909СС777", color: "Оранжевый Марс" },
      owner: { clientId: "CL-009", name: "Сергей Волков" }
    },
    {
      id: "CAR-010",
      vin: "WBA8E9C50GK123456",
      model: "BMW 320i xDrive",
      description: "Спортивный полноприводный седан, комплект M-пакета.",
      status: "ready",
      year: 2021,
      mileage: 72300,
      registeredAt: "2024-09-28T10:30:00Z",
      specs: { engine: "2.0L TwinPower 184 л.с.", plate: "Т010ТТ777", color: "Синий Портимао" },
      owner: { clientId: "CL-010", name: "Наталья Егорова" }
    },
    {
      id: "CAR-011",
      vin: "JHMCM56157C123456",
      model: "Honda Civic 1.8 AT",
      description: "Японский надежный хэтчбек с бережной безаварийной эксплуатацией.",
      status: "waiting_queue",
      year: 2016,
      mileage: 161200,
      registeredAt: "2023-12-19T17:10:00Z",
      specs: { engine: "1.8L i-VTEC 140 л.с.", plate: "У111УУ777", color: "Темно-серый" },
      owner: { clientId: "CL-011", name: "Игорь Смирнов" }
    },
    {
      id: "CAR-012",
      vin: "WVGZZZ5NZHW123456",
      model: "Volkswagen Tiguan 2.0 TSI",
      description: "Немецкий кроссовер, обслуживание по корпоративному договору фирмы.",
      status: "in_repair",
      year: 2022,
      mileage: 43500,
      registeredAt: "2023-06-07T10:00:00Z",
      specs: { engine: "2.0L TSI 180 л.с.", plate: "Х222ХХ777", color: "Белый" },
      owner: { clientId: "CL-012", name: "Татьяна Крылова" }
    },
    {
      id: "CAR-013",
      vin: "XTA11193012345681",
      model: "Renault Duster 2.0 MT",
      description: "Внедорожник снят с обслуживания в связи с продажей третьему лицу.",
      status: "delivered",
      year: 2015,
      mileage: 197000,
      registeredAt: "2024-04-16T11:20:00Z",
      specs: { engine: "2.0L 143 л.с. 4х4", plate: "А333АА777", color: "Коричневый" },
      owner: { clientId: "CL-013", name: "Николай Белов" }
    },
    {
      id: "CAR-014",
      vin: "Z94CB41AAGR123458",
      model: "Mazda CX-5 2.5 AWD",
      description: "Японский кроссовер в цвете Soul Red Crystal, предпродажная диагностика.",
      status: "diagnostics",
      year: 2021,
      mileage: 51200,
      registeredAt: "2025-06-22T13:40:00Z",
      specs: { engine: "2.5L SkyActiv 194 л.с.", plate: "В444ВВ777", color: "Красный металлик" },
      owner: { clientId: "CL-014", name: "Юлия Фролова" }
    },
    {
      id: "CAR-015",
      vin: "XTA21901012345682",
      model: "Ford Focus 1.6 PowerShift",
      description: "Хэтчбек с пробегом, регулярное обслуживание силового агрегата и узлов.",
      status: "in_repair",
      year: 2017,
      mileage: 138600,
      registeredAt: "2024-10-08T09:00:00Z",
      specs: { engine: "1.6L Duratec 125 л.с.", plate: "Е555ЕЕ777", color: "Черный" },
      owner: { clientId: "CL-015", name: "Андрей Павлов" }
    }
  ],

  // Сущность 3: Клиенты (15 записей, 9 полей)
  clients: [
    {
      id: "CL-001",
      fullName: "Иван Петров",
      phone: "+7 (495) 111-22-33",
      email: "ivan.petrov@mail.ru",
      notes: "Постоянный клиент сервиса, предпочитает утреннюю приемку автомобиля.",
      status: "active", // active | vip | corporate | new_client | inactive
      registeredAt: "2024-03-12T10:15:00Z",
      discountRate: 10,
      address: { city: "Москва", street: "ул. Ленина, д. 15", zip: "117218" }
    },
    {
      id: "CL-002",
      fullName: "Мария Соколова",
      phone: "+7 (495) 222-33-44",
      email: "m.sokolova@gmail.com",
      notes: "Обслуживает две семейные машины, оплата всегда безналичным расчетом.",
      status: "active",
      registeredAt: "2024-05-20T14:00:00Z",
      discountRate: 5,
      address: { city: "Москва", street: "ул. Тверская, д. 8", zip: "125009" }
    },
    {
      id: "CL-003",
      fullName: "Алексей Кузнецов",
      phone: "+7 (495) 333-44-55",
      email: "a.kuznetsov@yandex.ru",
      notes: "Руководитель транспортного отдела ООО «Вектор», прямой VIP-договор.",
      status: "vip",
      registeredAt: "2023-11-02T09:30:00Z",
      discountRate: 15,
      address: { city: "Химки", street: "пр-кт Мира, д. 3", zip: "141400" }
    },
    {
      id: "CL-004",
      fullName: "Елена Новикова",
      phone: "+7 (495) 444-55-66",
      email: "e.novikova@mail.ru",
      notes: "Просит направлять уведомления о готовности через СМС и мессенджеры.",
      status: "active",
      registeredAt: "2025-01-18T11:45:00Z",
      discountRate: 5,
      address: { city: "Мытищи", street: "ул. Победы, д. 21", zip: "141008" }
    },
    {
      id: "CL-005",
      fullName: "Дмитрий Орлов",
      phone: "+7 (495) 555-66-77",
      email: "d.orlov@inbox.ru",
      notes: "Не обращался в сервис более одного года, отправлено специальное промо-предложение.",
      status: "inactive",
      registeredAt: "2023-08-09T16:20:00Z",
      discountRate: 0,
      address: { city: "Москва", street: "ул. Новый Арбат, д. 44", zip: "119019" }
    },
    {
      id: "CL-006",
      fullName: "Ольга Васильева",
      phone: "+7 (495) 666-77-88",
      email: "o.vasileva@gmail.com",
      notes: "Всегда просит назначать старшего мастера Сергеева А.П.",
      status: "active",
      registeredAt: "2024-07-14T08:10:00Z",
      discountRate: 7,
      address: { city: "Королёв", street: "ул. Гагарина, д. 9", zip: "141070" }
    },
    {
      id: "CL-007",
      fullName: "Павел Морозов",
      phone: "+7 (495) 777-88-99",
      email: "p.morozov@mail.ru",
      notes: "Личный представитель премиум-клиента, приоритетная очередь на ТО.",
      status: "vip",
      registeredAt: "2023-04-25T13:00:00Z",
      discountRate: 15,
      address: { city: "Москва", street: "ул. Садовая, д. 2", zip: "101000" }
    },
    {
      id: "CL-008",
      fullName: "Анна Лебедева",
      phone: "+7 (495) 888-99-00",
      email: "a.lebedeva@yandex.ru",
      notes: "Новый клиент сервиса, обратилась по рекомендации знакомых.",
      status: "new_client",
      registeredAt: "2025-02-03T15:40:00Z",
      discountRate: 3,
      address: { city: "Реутов", street: "ул. Лесная, д. 17", zip: "143966" }
    },
    {
      id: "CL-009",
      fullName: "Сергей Волков",
      phone: "+7 (495) 999-00-11",
      email: "s.volkov@gmail.com",
      notes: "Корпоративный автопарк службы доставки малотоннажного транспорта.",
      status: "corporate",
      registeredAt: "2024-01-11T12:00:00Z",
      discountRate: 12,
      address: { city: "Люберцы", street: "ул. Октябрьская, д. 6", zip: "140000" }
    },
    {
      id: "CL-010",
      fullName: "Наталья Егорова",
      phone: "+7 (495) 101-12-13",
      email: "n.egorova@mail.ru",
      notes: "Заранее бронирует сезонное хранение комплекта колес на складе.",
      status: "active",
      registeredAt: "2024-09-28T10:25:00Z",
      discountRate: 5,
      address: { city: "Москва", street: "ул. Профсоюзная, д. 50", zip: "117393" }
    },
    {
      id: "CL-011",
      fullName: "Игорь Смирнов",
      phone: "+7 (495) 121-23-34",
      email: "i.smirnov@inbox.ru",
      notes: "Предпочитает установку только оригинальных комплектующих и масел.",
      status: "active",
      registeredAt: "2023-12-19T17:05:00Z",
      discountRate: 5,
      address: { city: "Подольск", street: "ул. Кирова, д. 11", zip: "142100" }
    },
    {
      id: "CL-012",
      fullName: "Татьяна Крылова",
      phone: "+7 (495) 131-24-35",
      email: "t.krylova@gmail.com",
      notes: "Генеральный директор филиала, обслуживание автопарка топ-менеджмента.",
      status: "vip",
      registeredAt: "2023-06-07T09:50:00Z",
      discountRate: 15,
      address: { city: "Москва", street: "Кутузовский пр-кт, д. 21", zip: "121151" }
    },
    {
      id: "CL-013",
      fullName: "Николай Белов",
      phone: "+7 (495) 141-25-36",
      email: "n.belov@yandex.ru",
      notes: "Продал транспортное средство, заявка на переоформление карточки клиента.",
      status: "inactive",
      registeredAt: "2024-04-16T11:15:00Z",
      discountRate: 0,
      address: { city: "Балашиха", street: "ул. Советская, д. 4", zip: "143900" }
    },
    {
      id: "CL-014",
      fullName: "Юлия Фролова",
      phone: "+7 (495) 151-26-37",
      email: "y.frolova@mail.ru",
      notes: "Первое посещение сервиса для комплексной сезонной диагностики кондиционера.",
      status: "new_client",
      registeredAt: "2025-06-22T13:35:00Z",
      discountRate: 3,
      address: { city: "Москва", street: "ул. Вавилова, д. 33", zip: "119334" }
    },
    {
      id: "CL-015",
      fullName: "Андрей Павлов",
      phone: "+7 (495) 161-27-38",
      email: "a.pavlov@gmail.com",
      notes: "Оставляет автомобиль на ночь перед утренним стартом работ.",
      status: "active",
      registeredAt: "2024-10-08T08:55:00Z",
      discountRate: 5,
      address: { city: "Щёлково", street: "ул. Заводская, д. 12", zip: "141100" }
    }
  ]
};
