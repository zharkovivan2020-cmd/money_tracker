# UI/UX и дизайн Money Tracker — Feature PRD

**Используйте этот файл как дополнение к плану Task Master.**
Базовое приложение (PRD), аутентификация (PRD-2) и роли/админка (PRD-3) уже
реализованы. Этот файл — про **единый дизайн** и **дружелюбный интерфейс**
всех существующих страниц и функций.

Скопируйте содержимое ниже в `.taskmaster/docs/prd.txt` (или объедините с
текущим PRD вручную) и запустите:

```bash
task-master parse-prd .taskmaster/docs/PRD-4.md --append
```

Флаг `--append` **добавит** UI-задачи к существующим, не сотрёт их.

---

# UI/UX и дизайн — описание фичи

## О чём фича

Money Tracker уже работает: транзакции, auth, админка. Но интерфейс собран
**минимально** — часть элементов на «голом» HTML (`<dialog>`, `<table>`,
`window.confirm`), нет единой навигации, обратной связи и состояний загрузки.

Цель PRD-4 — **не добавлять новую бизнес-логику**, а привести все экраны к
единому, современному и понятному виду с помощью **[shadcn/ui](https://ui.shadcn.com)**
и [CLI](https://ui.shadcn.com/docs/cli).

Пользователь должен чувствовать, что это **одно цельное приложение**, а не набор
отдельных страниц.

## Текущее состояние (что уже есть)

| Область | Сейчас |
|---------|--------|
| Стек UI | Next.js 16, Tailwind 4, shadcn `base-nova`, `@base-ui/react` |
| `components.json` | Настроен, alias `@/components/ui` |
| Установленные UI | `button`, `card`, `input`, `label`, `field`, `separator` |
| Страницы | `/`, `/login`, `/register`, `/blocked`, `/admin/users` |
| Форма транзакций | Нативный `<dialog>` |
| Таблицы | Сырые `<table>` в transaction-list и admin users-table |
| Удаление user | `window.confirm` |
| Фильтры транзакций | Кастомные pill-ссылки |
| Ошибки | Текст под формой / блок на странице |
| Навигация | `AppHeader` без общего shell |

## Технический стек (май 2026)

- **shadcn CLI** — добавление компонентов в проект:
  ```bash
  npx shadcn@latest add [component] -y
  ```
  Документация: [ui.shadcn.com/docs/cli](https://ui.shadcn.com/docs/cli)
- **Существующий preset** — не менять `style: base-nova` в `components.json`
  без необходимости; новые компоненты ставить через CLI, не копировать вручную
- **Иконки** — `lucide-react` (уже в проекте)
- **Язык интерфейса** — русский (как сейчас)

## Компоненты shadcn для установки (через CLI)

Установить пакетом (одной командой или поэтапно):

```bash
npx shadcn@latest add table badge dialog alert-dialog sonner skeleton tabs empty dropdown-menu breadcrumb separator -y
```

| Компонент | Зачем |
|-----------|-------|
| `table` | Транзакции и админ-список пользователей |
| `badge` | Статус user/admin, активен/заблокирован, тип income/expense |
| `dialog` | Форма добавления/редактирования транзакции (вместо `<dialog>`) |
| `alert-dialog` | Подтверждение удаления user и транзакции |
| `sonner` | Toast «Сохранено», «Ошибка», «Пользователь заблокирован» |
| `skeleton` | Загрузка дашборда и админ-таблицы |
| `tabs` | Фильтр все / доходы / расходы |
| `empty` | Пустой список транзакций и пользователей |
| `dropdown-menu` | Меню действий в шапке (Админка, Выйти) |
| `breadcrumb` | Навигация в админке: Главная → Админка → Пользователи |

> **Не ставим в v1:** sidebar, charts, data-table с пагинацией — избыточно для
> текущего объёма данных.

## Главные направления UX

### 1. Общий layout (App Shell)

- Единая **шапка** на всех авторизованных страницах: логотип/название, email
  пользователя, dropdown «Админка» / «Выйти»
- Контент в **контейнере** `max-w-4xl` (дашборд) и `max-w-5xl` (админка) —
  уже есть, выровнять отступы и вертикальный ритм
- Auth-страницы (`/login`, `/register`) — **центрированная карточка** на
  мягком фоне (`bg-muted/30`), единый visual с blocked-страницей
- Footer не обязателен

### 2. Дашборд `/` — транзакции

**BalanceSummary**
- Карточки с иконками (TrendingUp / TrendingDown / Wallet из lucide)
- Цвет доход/расход через `text-emerald-600` / `text-red-600` + badge «за месяц»
- На мобильном — одна колонка, на `sm+` — три

**Фильтры**
- Заменить pill-ссылки на **Tabs** (Все | Доходы | Расходы)
- URL-параметр `?type=` сохранить для shareable links

**TransactionList**
- Перейти на shadcn **Table** (TableHeader, TableBody, TableRow, TableCell)
- Тип транзакции — **Badge** (variant: default/destructive или custom green/red)
- Hover-строка, клик по строке → редактирование
- Кнопка удаления — иконка Trash2 + **AlertDialog** подтверждение
- Пустое состояние — компонент **Empty** + CTA «Добавить первую транзакцию»

**TransactionForm**
- Заменить `<dialog>` на shadcn **Dialog** (DialogHeader, DialogTitle, DialogFooter)
- Кнопки: «Отмена» (outline) + «Сохранить» (primary), disabled при pending
- Поля через существующий `Field` / `Label` / `Input`
- После успеха — **toast** (sonner) + закрытие dialog

**Кнопка «+ Добавить»**
- Primary button с иконкой Plus, фиксированно над таблицей

### 3. Auth — `/login`, `/register`

- Карточка `max-w-md`, единые заголовки и описания
- **Separator** «или» между email-формой и OAuth (уже частично есть)
- Social buttons — одинаковая высота, иконки провайдеров (Google/GitHub)
- Ошибки — **Alert** (variant destructive) вместо plain `<p>`
- Ссылка «Нет аккаунта? / Уже есть аккаунт?» — `text-sm text-muted-foreground`
- Состояние pending — `disabled` на кнопке + **Spinner** или текст «Вход…»

### 4. Страница `/blocked`

- Card по центру (как login), иконка Ban или ShieldOff
- Чёткий заголовок, короткий текст, одна кнопка «Выйти»
- Тон: нейтральный, не агрессивный

### 5. Админка `/admin/users`

- **Breadcrumb**: Money Tracker → Админка → Пользователи
- Таблица на shadcn **Table**
- Колонка «Роль» — Badge (`admin` / `user`)
- Колонка «Статус» — Badge (зелёный «Активен» / красный «Заблокирован»)
- Действия — **DropdownMenu** (Заблокировать / Разблокировать / Удалить)
  или компактные icon buttons с tooltip-подсказкой
- Удаление — **AlertDialog**, не `window.confirm`
- После block/unblock/delete — **toast** с результатом
- Пустой список — **Empty**

### 6. Обратная связь и состояния

- **Sonner** в `src/app/layout.tsx` — `<Toaster richColors closeButton />`
- Server Actions после мутаций — возвращать `{ success, message }` где нужно;
  клиент показывает toast (или revalidate + optimistic UI для block)
- **Skeleton** на главной при `loading.tsx` (optional) или Suspense boundary
- Ошибка Supabase на главной — shadcn **Alert** + иконка AlertCircle

### 7. Доступность и мобильная версия

- Все интерактивные элементы — focus-visible (shadcn даёт из коробки)
- Таблицы — `overflow-x-auto` на узких экранах (уже есть)
- Минимальный touch target 44px для кнопок на mobile
- `lang="ru"` в layout — уже есть

### 8. Тема и типографика

- Не менять базовую палитру `neutral` из `components.json`
- Заголовки страниц: `text-3xl font-semibold tracking-tight`
- Вспомогательный текст: `text-muted-foreground`
- Суммы: `tabular-nums` (уже используется)
- Dark mode — опционально в v1; если добавлять — через `next-themes` + toggle
  в header (отложить, если усложняет scope)

## Структура файлов (что изменится)

```
money_tracker/
├── components.json                          ← без смены preset
├── src/
│   ├── app/
│   │   ├── layout.tsx                       ← Toaster (sonner)
│   │   ├── loading.tsx                      ← optional skeleton home
│   │   ├── page.tsx                         ← Alert для ошибок
│   │   ├── (auth)/login/page.tsx
│   │   ├── (auth)/register/page.tsx
│   │   ├── blocked/page.tsx
│   │   └── admin/users/page.tsx
│   ├── components/
│   │   ├── app-header.tsx                   ← dropdown-menu, breadcrumb hook
│   │   ├── app-shell.tsx                    ← NEW: общая обёртка auth pages
│   │   ├── balance-summary.tsx
│   │   ├── home-dashboard.tsx               ← tabs, dialog
│   │   ├── transaction-list.tsx             ← table, badge, alert-dialog
│   │   ├── transaction-form.tsx             ← dialog
│   │   ├── auth/login-form.tsx              ← alert, pending states
│   │   ├── auth/register-form.tsx
│   │   ├── auth/social-buttons.tsx
│   │   └── admin/users-table.tsx            ← table, badge, alert-dialog, toast
│   └── components/ui/                       ← новые компоненты от CLI
│       ├── table.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── alert-dialog.tsx
│       ├── sonner.tsx
│       ├── skeleton.tsx
│       ├── tabs.tsx
│       ├── empty.tsx
│       ├── dropdown-menu.tsx
│       ├── breadcrumb.tsx
│       └── alert.tsx                        ← optional для ошибок
```

## Этапы разработки (станут задачами Task Master)

1. **Установить shadcn-компоненты** через CLI (`table`, `badge`, `dialog`,
   `alert-dialog`, `sonner`, `skeleton`, `tabs`, `empty`, `dropdown-menu`,
   `breadcrumb`, `alert`); проверить `npx shadcn@latest info`
2. **Подключить Toaster** в root layout; helper `showActionToast` для клиента
3. **App shell и header** — dropdown вместо отдельных кнопок, единые отступы
4. **Дашборд: BalanceSummary + Tabs** — иконки, фильтры через Tabs
5. **TransactionList + Table + Badge + Empty + AlertDialog** для удаления
6. **TransactionForm → Dialog** — замена native dialog, toast при сохранении
7. **Auth forms** — Alert для ошибок, pending states, визуальное единство login/register
8. **Blocked page** — иконка, улучшенная карточка
9. **Admin users table** — Table, Badge, DropdownMenu, AlertDialog, toast, Breadcrumb
10. **Polish pass** — loading/skeleton, проверка mobile, lint + build

## Чего НЕ делаем в этой версии (PRD-4)

- **Новые фичи** (бюджеты, категории, графики, экспорт CSV)
- **Полный redesign** бренда (логотип, кастомный шрифт)
- **Sidebar navigation** и multi-page dashboard
- **Data Table** с сортировкой/фильтрами/пагинацией (100+ строк)
- **i18n** — только русский
- **PWA**, push-уведомления
- **A/B тесты** и аналитика UI

## Дополнительные правила

- Компоненты добавлять **только через** `npx shadcn@latest add`, не копировать
  с других проектов — сохраняем совместимость с `base-nova`
- Не ломать Server Actions и RLS — меняется только presentation layer
- Сохранить URL-поведение (`?type=income`, `/admin/users`)
- После UI-изменений — `npm run build` без ошибок TypeScript
- Не удалять работающую a11y (labels, `role="alert"` на ошибках)

## Критерии приёмки

- [ ] Все новые shadcn-компоненты установлены через CLI и лежат в `src/components/ui/`
- [ ] Нет нативного `<dialog>` и `window.confirm` в пользовательских сценариях
- [ ] Дашборд: tabs-фильтры, table транзакций, badge типов, empty state
- [ ] Форма транзакции открывается в shadcn Dialog; успех — toast
- [ ] Login/register: единый стиль карточек, ошибки в Alert
- [ ] Админка: breadcrumb, table, badge роли/статуса, alert-dialog на удаление
- [ ] Header: dropdown с «Админка» (только admin) и «Выйти»
- [ ] `/blocked` визually согласован с auth-страницами
- [ ] Mobile: таблицы скроллятся, кнопки кликабельны
- [ ] `npm run build` проходит успешно

## Связь с предыдущими PRD

| PRD    | Тема              | Статус        |
|--------|-------------------|---------------|
| PRD.md | Транзакции, CRUD  | Реализовано   |
| PRD-2  | Auth, RLS         | Реализовано   |
| PRD-3  | Роли, админка     | Реализовано   |
| PRD-4  | UI/UX, shadcn     | **Этот файл** |

PRD-4 — **косметический и UX-слой** поверх готового функционала. Бизнес-логика,
auth и admin API не меняются без крайней необходимости.

## Ссылки

- [shadcn/ui — CLI](https://ui.shadcn.com/docs/cli)
- [shadcn/ui — Components](https://ui.shadcn.com/docs/components)
- [shadcn/ui — Theming](https://ui.shadcn.com/docs/theming)
