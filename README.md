# **JobTracker — агрегатор вакансий**

[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/) <br/> [![MobX](https://img.shields.io/badge/State-MobX-orange?style=flat&logo=mobx&logoColor=white)](https://mobx.js.org/) [![UI: MUI](https://img.shields.io/badge/UI-Material-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/) <br/> [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/cptblackmore/jobtracker/blob/main/LICENSE) [![Netlify Status](https://api.netlify.com/api/v1/badges/40d12425-12d1-4d54-ad0e-9c472446b4a7/deploy-status)](https://app.netlify.com/sites/cptblackmore-jobtracker/deploys)

JobTracker — веб-приложение для поиска вакансий с разных источников в одном месте.

> [Ссылка на демо](https://cptblackmore-jobtracker.netlify.app/home)

## **Описание**

JobTracker собирает вакансии с нескольких источников и позволяет соискателям удобно фильтровать и сохранять интересные предложения.

В условиях большого разнообразия сервисов по поиску работы растёт трудоёмкость их мониторинга и JobTracker решает эту проблему.

На данный момент в JobTracker интегрированы API с реальными данными следующих сервисов: HeadHunter, Superjob, Работа России. Однако, проект был создан с оглядкой на расширение и добавление большего количества источников вакансий.

JobTracker предлагает возможность авторизации и сохранения избранных вакансий в аккаунте - в качестве сервера используется другой мой [пет-проект](https://github.com/cptblackmore/jobtracker-server).

<br/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/0259cd9a-23c2-440c-b69b-63a6f33ec957" width="90%" alt="Главная страница JobTracker"/>
</p>

###### Другие проекты

[![JobTracker Server](https://img.shields.io/badge/JobTracker-Server-96b9ff.svg?logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA3MiA3Mic+DQogIDxyZWN0IHdpZHRoPSc3MicgaGVpZ2h0PSc3Micgcng9JzgnIGZpbGw9JyMzNzVFOTcnIC8+DQogIDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDUsIDUpJyBmaWxsPScjRUFGMkZGJz4NCiAgICA8cGF0aCBkPSdNMTEuNDAgNDlRNy44NSA0OSA0Ljg4IDQ3LjY3UTEuOTAgNDYuMzUgMCA0My45MEw0LjUwIDM4LjUwUTUuOTUgNDAuNDAgNy41NSA0MS4zOFE5LjE1IDQyLjM1IDExLjAwIDQyLjM1UTE1Ljk1IDQyLjM1IDE1Ljk1IDM2LjU1TDE1Ljk1IDE5LjkwTDMuNjUgMTkuOTBMMy42NSAxMy40MEwyNC4wMCAxMy40MEwyNC4wMCAzNi4xMFEyNC4wMCA0Mi42MCAyMC44MCA0NS44MFExNy42MCA0OSAxMS40MCA0OVpNMzkuMjUgNDguNDBMMzkuMjUgMjAuMDBMMjguMDUgMjAuMDBMMjguMDUgMTMuNDBMNTguNTUgMTMuNDBMNTguNTUgMjAuMDBMNDcuMzUgMjAuMDBMNDcuMzUgNDguNDBMMzkuMjUgNDguNDBaJy8+DQogIDwvZz4NCjwvc3ZnPg==)](https://github.com/cptblackmore/jobtracker-server) [![TypeWeather](https://img.shields.io/badge/TypeWeather-3b3b54.svg?logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxnIGlkPSJMb2dvIj4NCjxnIGlkPSJWZWN0b3IiPg0KPHBhdGggaWQ9IlZlY3Rvcl8yIiBkPSJNMjIuNjY1IDE5Ljc4MDNDMjEuNTkzOSAxOS43ODAzIDIwLjkzNDEgMTkuMjg1OCAxOS44NTU5IDE4LjcwMzRDMTguNzc3NyAxOC4xMjEgMTUuNjU5MyAxNS43NzYxIDE1LjY1OTMgMTIuODU3MkMxNS42NTkzIDEwLjg3NzEgMTUuMTQ4OSA5LjI3NTU1IDE0LjI3OTYgNy45OTkyMkMxMy40MTY4IDYuNzMyNjkgMTIuMjQ4IDUuODU1MiAxMS4wMzIgNS4yMzU3OEMxMC40NDYgNC45MzczNiA5LjgzNjI4IDQuNjkzMzEgOS4yMjkwOSA0LjQ5MTYyQzguODc1MTIgNC4zNzQxMiA4LjY2OTcgMy45OTQwNCA4LjgyMzI5IDMuNjU0MjVDOS43OTY2OCAxLjQ5OTMxIDExLjk2NDUgMCAxNC40ODI4IDBDMTcuOTEwNyAwIDIwLjY4OTcgMi43Nzg4NyAyMC42ODk3IDYuMjA2OTNDMjAuNjg5NyA2Ljk0MDMyIDIwLjU2MjUgNy42NDQxIDIwLjMyODkgOC4yOTcxOEMyMS4zMTgzIDcuNjMwNDIgMjIuNTEwNCA3LjI0MTM0IDIzLjc5MzIgNy4yNDEzNEMyNy4yMjExIDcuMjQxMzQgMjkuOTk5OSAxMC4wMjAyIDI5Ljk5OTkgMTMuNDQ4M0MyOS45OTk5IDE3LjU3NTEgMjYuMzczNSAxOS43ODAzIDIyLjY2NSAxOS43ODAzWiIgZmlsbD0iIzhGQjJGNSIvPg0KPHBhdGggaWQ9IlZlY3Rvcl8zIiBkPSJNMCAxMi45MzEyQzAgMTYuMjAyOSAyLjE1NzA0IDE4LjkyOSA1LjAxNDYxIDE5LjUzMTRDNS40NTU2OCAxOS42OTI1IDUuOTMxODUgMTkuNzgwNCA2LjQyODYgMTkuNzgwNEgxNi4wNzIzQzE2LjM5NTcgMTkuNzgwNCAxNi41MzY1IDE5LjM0NzkgMTYuMjg5NiAxOS4xMzg5QzE0LjYwNDIgMTcuNzEyOSAxMy4zNTE3IDE1LjcwMzEgMTMuMzUxNyAxMi44NTczQzEzLjM1MTcgMTEuMjkzNiAxMi45NTU3IDEwLjE1NDcgMTIuMzcyNCA5LjI5ODUxQzExLjc4MjQgOC40MzI0NyAxMC45NTI2IDcuNzg1MTkgOS45ODQ2NCA3LjI5MkM5LjAwNzY5IDYuNzk0NDMgNy45NDcwNyA2LjQ3NzQ1IDYuOTM0MjIgNi4yNTI3NEM2LjY5NTY3IDYuMjIyNjQgNi40NTI5IDYuMjA3MDIgNi4yMDY5MyA2LjIwNzAyQzIuNzc4ODcgNi4yMDcwMiAwIDkuMjE3NTUgMCAxMi45MzEyWiIgZmlsbD0iIzhGQjJGNSIvPg0KPC9nPg0KPC9nPg0KPC9zdmc+DQo=)](https://github.com/cptblackmore/typeweather) [![React ToDo List](https://img.shields.io/badge/React_ToDo_List-13877b?logo=react)](https://github.com/cptblackmore/reacttodolist)

## **Основной функционал**

- **Агрегация вакансий с нескольких сайтов:** сбор актуальных предложений с hh.ru, superjob.ru и trudvsem.ru через их API.
- **Гибкая фильтрация:** фильтры по должности, периоду размещения, типу занятости, местоположению и диапазону зарплат. Система автоматически предупреждает, если какие-то источники несовместимы с выбранными фильтрами.
- **Управление избранным:** возможность сохранить вакансии в избранное, скачать в разных форматах (TXT, CSV), экспортировать на другие устройства JSON файлом.
- **Авторизация и Личный кабинет:** регистрация по email с подтверждением, авторизация и сохранение списка избранных вакансий в базе данных.
- **Виртуализация списков:** бесконечная прокрутка с виртуализацией для отображения тысяч вакансий без потери производительности.
- **Доступность:** поддержка навигации с клавиатуры по всем фичам, корректное использование ARIA-атрибутов для скринридеров (проверено с NVDA).
- **Realtime-синхронизация вкладок:** использование BroadcastChannel API для синхронизации данных авторизации между несколькими открытыми вкладками.

## **Примеры использования**

### Поиск вакансий

Быстро находим актуальные вакансии с разных источников.

В одном списке — предложения с HH, Superjob и Работа России, адаптированные под единый формат.

<p align="center">
  <img src="https://github.com/user-attachments/assets/0be22f35-1a95-4d24-9897-100e852c409c" width="90%" alt="Поиск вакансий"/>
</p>

### Фильтрация

Фильтрация вакансий по зарплате, опыту, местоположению и типу занятости.

Без нерелевантных результатов. Источники, не поддерживающие включенный фильтр, автоматически исключаются.

<p align="center">
  <img src="https://github.com/user-attachments/assets/3b56feec-f227-41e8-a82e-d122e0441f83" width="90%" alt="Фильтрация вакансий"/>
</p>

### Избранное

Добавляем вакансии в избранное одним кликом.

Можно скачать список в TXT, CSV или экспортировать в JSON — чтобы сохранить себе или с кем-то поделиться.

<p align="center">
  <img src="https://github.com/user-attachments/assets/9e8d3efa-6fac-4440-8807-d672470a7797" width="90%" alt="Избранное"/>
</p>

### Авторизация

При авторизации локальное избранное синхронизируется со списком избранного с сервера.

Становится доступен Личный кабинет с общей информацией и действиями над аккаунтом.

<p align="center">
  <img src="https://github.com/user-attachments/assets/699b2bb9-b66b-455a-a87f-533f4d126f38" width="90%" alt="Авторизация"/>
</p>

## **Стек**

### Основной стек

- **TypeScript** — строгая типизация компонентов, хранилищ, адаптеров API, универсальных инструментов
- **React 18** — функциональные компоненты, хуки, контекст
- **React Router v7** — навигация, вложенные роуты и их защита
- **MUI (Material UI)** — продуманные компоненты, темизация, адаптивный UI, анимации
- **MobX** — реактивные глобальные состояния без бойлерплейта
- **Axios** — кастомные ошибки и инстансы, интерцепторы, отмена запросов

### Инфраструктура и сборка

- **Vite** — быстрая сборка, дев-сервер, поддержка .env
- **@emotion/styled** — стилизация компонентов
- **nanoid** — генерация коротких уникальных ID
- **react-transition-group** — анимации появления/исчезновения элементов

### Дополнительные библиотеки

- **react-virtuoso** — виртуализация списков вакансий (поиск, избранное)
- **date-fns** — локализация и форматирование дат без лишнего веса
- **currency-symbol-map** — корректные значки валют в зарплатах
- **react-intersection-observer** — отслеживание видимости элементов
- **html-to-text** — преобразование HTML в текст (описания вакансий)

## **Устройство и архитектура**

Проект организован на основе методологии Feature-Sliced Design (FSD), что упрощает масштабирование, ускоряет добавление новых фич и поддерживает высокую читаемость кода на протяжении всего цикла разработки.

Весь код строго разделён на слои (`app`, `pages`, `widgets`, `features`, `entities`, `shared`), а внутри них — на слайсы и сегменты, что облегчает навигацию для разработчиков, знакомых с FSD.

Подробнее о принципах методологии можно прочитать в [официальной документации](https://feature-sliced.github.io/documentation/ru/docs/get-started/overview).

**Структура src**:

```
├── app
|  ├── App.tsx
|  ├── context
|  ├── index.tsx
|  └── router
├── entities
|  └── Vacancy
├── features
|  ├── Auth
|  └── Favorites
├── pages
|  ├── account
|  ├── activation
|  ├── favorites
|  ├── home
|  ├── loading
|  └── search
├── shared
|  ├── api
|  ├── config
|  ├── lib
|  └── ui
└── widgets
   ├── AccountActions
   ├── AccountActivation
   ├── AccountInfo
   ├── ActivationMessage
   ├── AuthModal
   ├── FavoritesActions
   ├── FavoritesList
   ├── FavoritesQuantity
   ├── Footer
   ├── Logo
   ├── Nav
   ├── PageTitle
   ├── SourcesStatusTable
   ├── VacancyCard
   ├── VacancyFilter
   ├── VacancyList
   └── VacancySource
```

### **Состояние и управление данными**

В проекте применены разные модели управления состоянием, в зависимости от характера данных:

- **Локальное состояние (страница поиска):**
  Для управления параметрами фильтрации и списком вакансий используется `useReducer`.  
  Это решение позволяет избежать лишних перерендеров и гарантирует, что данные всегда "освежаются" при возвращении на страницу.
  ```ts
  export const vacancyListReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_PAGE":
        return { ...state, params: { ...state.params, page: action.page } };
      case "SET_FILTERS":
        return { ...state, params: { ...state.params, filters: action.filters } };
      case "SET_VACANCIES":
        return { ...state, vacancies: action.vacancies };
      case "ADD_VACANCIES":
        return { ...state, vacancies: [...state.vacancies, ...action.vacancies] };
      default:
        return state;
    }
  };
  ```
- **Глобальные состояния (MobX)**:
  - `AuthStore` — авторизация, данные пользователя, токены, модалка, синхронизация между вкладками.
  - `FavoritesStore` — управление избранным, синхронизация с сервером.
  - `AlertsStore` — очередь уведомлений, показ/удаление.
- **Браузерные хранилища**:
  - `localStorage` — JWT access-токен, тема, лидер-вкладка, избранное.
  - `sessionStorage` — статус обновления токенов.

### Интегрированные API вакансий

- [SuperJob API](https://api.superjob.ru/) — требуется "Secret key" (см. [инструкцию](#регистрация-приложения-в-api-superjob)).
- [HeadHunter API](https://dev.hh.ru/) — открытое API, работает без ключа.
- [«Работа России» API](https://trudvsem.ru/opendata/api) — государственный источник; не поддерживает большинство фильтров (тип занятости, зарплата, период).

### Работа с API

Приложение использует две независимые модели взаимодействия с API:

- **Вакансии**:  
  Запросы к внешним источникам (hh, superjob, trudvsem) проходят через единый проксирующий эндпоинт на бэкенде (`/vacancies`).  
  Клиент использует паттерн `Strategy`: каждый источник имеет собственные адаптеры (`adaptParams`, `adaptVacancies`, `adaptVacancy`).  
  Все адаптеры описаны в реестре `sourcesRegistry`, где у каждого источника хранятся также стили, адреса и список несовместимых фильтров.

- **Авторизация и избранное**:  
  Для запросов к серверному функционалу используются все остальные маршруты (`POST /users`, `POST /auth/token`, `PUT /favorites/me` и т.д.).
  Взаимодействие происходит через сервисный слой (`AuthService`, `FavoritesService` и т.д.), использующий экземпляр Axios (`$api`) с интерцепторами для подстановки токенов и обработки ошибок.
  ```ts
  $api.interceptors.request.use((config) => {
    if (!config.url?.match("/auth/token/refresh")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  });
  ```

### **Роутинг и навигация**

Навигация построена на `React Router v7`:

- Все страницы имеют собственный маршрут (`/home`, `/search`, `/favorites`, `/account`, `/activation`) в `Router.tsx` и вложены в универсальный лэйаут страницы.
- Страницы, которым важна инициализация данных или авторизация пользователя (`/favorites`, `/activation`, `/account`) обёрнуты в компонент `<ProtectedRoute>`:
  ```ts
  export const ProtectedRoute: React.FC<Props> = ({ isReady, isAllowed }) => {
    if (!isReady) {
      return <LoadingPage />;
    }

    return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
  };
  ```
- Навигация между страницами происходит через `<Link>` или `useNavigate`
- Параметры фильтров поисковой страницы синхронизируются с URL и сохраняются в `History API`, что обеспечивает корректную работу истории браузера.

### **Авторизация и безопасность**

Авторизация реализована через JWT-токены:

- `accessToken` хранится в `localStorage`
- `refreshToken` хранится в `httpOnly` cookie и добавляется только сервером.
- Успешное обновление токенов подтверждается клиентом по роуту `/refresh/ack`, после чего они обновляются уже и в БД. Это позволяет избежать потери токенов из-за нестабильного соединения или несвоевременного закрытия вкладки.
- Обновление токенов (`refresh`) инициируется только **лидирующей вкладкой** для оптимизации сетевой активности и избежания гонки.
  - Лидер вкладки определяется алгоритмом на основе `BroadcastChannel` + heartbeat-механизма (`localStorage` ключ с обновляющимся timestamp).
  - Если вкладка теряет лидерство — инициируется автоматическое переизбрание.
- Данные пользователя автоматически синхронизируются между вкладками с помощью сообщений в `BroadcastChannel` (`authChannel`).
  ```ts
  ...
  if (type === "request_auth") {
    await waitForCondition(() => authStore.isInit);
    if (authStore.isLeader) {
      authChannel.postMessage({
        type: "response_auth",
        payload: toJS(authStore.user),
      });
    }
  }

  if (type === "response_auth" || type === "login") {
    authStore.setUser(event.data.payload);
    authStore.setInit(true);
  }
  ...
  ```

### **Оптимизация производительности**

Оптимизация выполнена в самых значимых местах:

- **useReducer** для тяжёлого состояния списка вакансий и фильтров.
- **useCallback** для обработчиков событий и колбэков в дочерние компоненты.
- **useMemo** для мемоизации тяжёлых состояний.
- **React.memo** для повторяющихся или тяжёлых компонентов.
- **Виртуализация списков** через `react-virtuoso`:
  - В списках вакансий (поиск, избранное) реализован lazy loading вакансий с их виртуализацией при скроллинге.
  - Скроллинг остаётся плавным даже при тысячах подгруженных вакансий.
- **Минимизация состояний**:
  - По возможности использовал `useRef` вместо `useState` и `computed` вместо `action`.

## Установка и запуск

0. Перед началом убедитесь, что у вас есть:
   - Node.js версии **18 и выше** — [скачать с nodejs.org](https://nodejs.org/)
   - Git — [скачать с git-scm.com](https://git-scm.com/)
1. Клонируйте репозиторий: `git clone https://github.com/cptblackmore/jobtracker`
2. Перейдите в него: `cd jobtracker`
3. Установите зависимости: `npm install`
4. Создайте файл с переменными окружения: `cp .env.example .env`
5. Откройте `.env` и заполните поля:
    - `VITE_API_URL` — адрес API jobtracker-server. Если не хостили свой, используйте демо: `https://jobtracker-server.onrender.com/api` (указан по умолчанию).
    - `VITE_SUPERJOB_API_APP_KEY` — ключ для API Superjob. Требует регистрации приложения (см. главу ниже). Вы можете не указывать это свойство, но тогда данный источник работать не будет.
    - `VITE_MODE` — если собираетесь разрабатывать и тестировать хуки/компоненты, укажите `development`
    - **Пример готового `.env`:**
      ```dotenv
      VITE_API_URL=https://jobtracker-server.onrender.com/api
      VITE_SUPERJOB_API_APP_KEY=v3.r.123820349.b68cc10ac962d5436d1f0f980e84fc6c604d5dsd.c1c4d5a9f2ba2dc80ce328f4802fbe72d97346dd
      VITE_MODE=development
      ```
6. Запустите: `npm run dev -- --host`
7. После запуска Vite в терминале появятся адреса для доступа к проекту:
   - `http://localhost:5173` — для текущего устройства
   - `http://<Network-IP>:5173` — для других устройств в вашей локальной сети (например, для проверки с телефона)

### Регистрация приложения в API Superjob

> ⚠️ Это необязательно! Если вы не хотите использовать SuperJob, просто оставьте переменную `VITE_SUPERJOB_API_APP_KEY` пустой. Всё остальное будет работать.

1. Перейдите на [страницу API](https://api.superjob.ru/).
2. Зарегистрируйте приложение (потребуется аккаунт соискателя).
3. Дождитесь рассмотрения.
4. Найдите ключ: "Информация о приложении" → "Secret key".
5. Укажите его в свойстве `VITE_SUPERJOB_API_APP_KEY` в файле `.env`

## Планы по улучшению

- **Интеграция новых источников**: найти и добавить другие источники вакансий с открытыми API и возможностью осуществлять поиск (например, Rabota.ru).
- **UX**: добавить облако актуальных профессий, историю поиска с возможностью повтора, возможность поделиться результатами поиска и списком избранного — через короткие URL и кнопки соцсетей (Telegram, VK, WhatsApp).
- **Безопасность**: добавить функционал смены и восстановления пароля.
- **Тестирование**: покрыть тестами критическую бизнес-логику (поиск, фильтрация, избранное, авторизация).
- **Технологии**: обновить до последних версий React и MUI для доступа к новым фичам, перейти с MobX на Redux Toolkit с RTK Query для более масштабируемой архитектуры.

## Author

**Victor** _aka_ **captain_blackmore**

- [Telegram](https://t.me/captain_blackmore)
- [Github](https://github.com/cptblackmore)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/cptblackmore/jobtracker/blob/main/LICENSE) file for details.
