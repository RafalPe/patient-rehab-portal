# Patient Rehab Portal

[EN] Recruitment Task | [PL] Zadanie Rekrutacyjne

---

## 🇬🇧 [EN] Project Overview

A system for managing patient rehabilitation plans and simulating exercises. This application was built as a recruitment task, leveraging modern React 19 and Next.js 15 patterns.

### 🚀 Technology Stack

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/) + React 19 (Server Actions)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Testing**: Playwright (E2E) + Vitest (Unit/Integration)
- **Database**: In-Memory Database (with `Deep Copy` and `Object.freeze` mechanisms)

### ✅ Requirements Fulfillment

The application meets 100% of the core requirements and all bonus features.

| Feature                                  | Status |
| :--------------------------------------- | :----: |
| Auth (Login, Logout, Session)            |   ✅   |
| **New User Registration (Bonus)**        |   ✅   |
| Dashboard & Exercise List                |   ✅   |
| Exercise Simulation (Timer, API, SVG UI) |   ✅   |
| User Profile (Persistent Editing)        |   ✅   |
| **Full E2E Tests (Playwright) (Bonus)**  |   ✅   |
| **Unit Tests (Vitest) (Bonus)**          |   ✅   |

### 🏗️ Architectural Decisions

1.  **Defense in Depth (Proxy + Page Guard)**
    Instead of deprecated Middleware, the **Proxy** pattern (`src/proxy.ts`) is used to protect routes at the network level.

2.  **Server Actions & React 19**
    Business logic is completely separated from the client. `useActionState` is utilized for form management.

3.  **E2E Test Isolation**
    The In-Memory Database features a custom state reset mechanism (`/api/test/reset-db`), guaranteeing that every test runs in a "clean" environment.

### 🔑 Demo Accounts

| Name     | Email                | Password      | Role         |
| :------- | :------------------- | :------------ | :----------- |
| **Jan**  | `pacjent@test.pl`    | `password123` | Patient      |
| **Anna** | `anna.nowak@test.pl` | `password123` | Patient      |
| **E2E**  | `e2e@test.pl`        | `password123` | Tech Account |

### 🛠️ Installation & Testing

```bash
# Install
npm install

# Run Dev Server
npm run dev

# Run E2E Tests
npm run test:e2e

# Run Unit Tests
npm run test
```

---

## 🇵🇱 [PL] Opis Projektu

System do zarządzania planem rehabilitacji pacjenta oraz symulacji treningów. Aplikacja zrealizowana w ramach zadania rekrutacyjnego, wykorzystująca nowoczesne wzorce React 19 i Next.js 15.

### 🚀 Technologie

- **Rdzeń**: [Next.js 16 (App Router)](https://nextjs.org/) + React 19 (Server Actions)
- **Język**: TypeScript (Strict Mode)
- **Style**: Tailwind CSS
- **Testy**: Playwright (E2E) + Vitest (Unit/Integration)
- **Baza**: In-Memory Database (z mechanizmem `Object.freeze` dla spójności testów)

### ✅ Realizacja Wymagań

Aplikacja spełnia 100% wymagań podstawowych oraz wszystkie bonusowe.

| Funkcjonalność                             | Status |
| :----------------------------------------- | :----: |
| Logowanie, Wylogowanie, Sesja              |   ✅   |
| **Rejestracja nowego użytkownika (Bonus)** |   ✅   |
| Panel Pacjenta i Lista Zadań               |   ✅   |
| Symulacja Treningu (Timer, API, UI)        |   ✅   |
| Edycja Profilu (Persistent)                |   ✅   |
| **Pełne testy E2E (Playwright) (Bonus)**   |   ✅   |
| **Testy Jednostkowe (Vitest) (Bonus)**     |   ✅   |

### 🏗️ Decyzje Architektoniczne

1.  **Obrona w głąb (Proxy + Page Guard)**
    Zamiast przestarzałego Middleware, zastosowano wzorzec **Proxy** (`src/proxy.ts`) do ochrony ścieżek na poziomie sieci.

2.  **Server Actions & React 19**
    Logika biznesowa jest odseparowana od klienta. Wykorzystano `useActionState` do obsługi formularzy bez klasycznego REST API.

3.  **Izolacja Testów E2E**
    Baza In-Memory posiada autorski mechanizm resetowania stanu (`/api/test/reset-db`), co gwarantuje stabilność testów ("flaky tests elimination").

### 🔑 Konta Demo

| Imię     | Email                | Hasło         | Rola             |
| :------- | :------------------- | :------------ | :--------------- |
| **Jan**  | `pacjent@test.pl`    | `password123` | Pacjent          |
| **Anna** | `anna.nowak@test.pl` | `password123` | Pacjent          |
| **E2E**  | `e2e@test.pl`        | `password123` | Konto techniczne |

### 🛠️ Instalacja i Testowanie

```bash
# Instalacja
npm install

# Uruchomienie
npm run dev

# Testy E2E
npm run test:e2e

# Testy Jednostkowe
npm run test
```
