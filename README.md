# NavCare

Emergency patient coordination portal: connects hospital, patient and family.

```
navcare/
├── frontend/   Angular 21 (standalone, signals, lazy routes)
└── backend/    Spring Boot 3.5 / Java 21 (JPA, Spring Security + JWT)
```

## Run

Backend (http://localhost:8080) - needs JDK 21 + Maven:
```
cd backend
mvn spring-boot:run
```
Frontend (http://localhost:4200, proxies /api to :8080) - needs Node 20+:
```
cd frontend
npm install
npm start
```

## Demo logins (seeded on startup, dev only)
| Role  | Email                | Password   |
|-------|----------------------|------------|
| Admin | admin@navcare.test   | Admin@123  |
| Staff | staff@navcare.test   | Staff@123  |
| User  | family@navcare.test  | Family@123 |

## Screens
- Header (everyone): **Dashboard** + one role link (**Admin Panel** / **Staff Panel** / **User Panel**)
- Admin Panel: sidebar `Staff` -> staff list, **Add staff** button at top
- Staff Panel: sidebar `Patients` -> patient list, **Add patient** button at top
- User Panel: no sidebar, just the linked patient's hospital + medical details

## Adding a sidebar item later
Edit the `nav` array in `frontend/src/app/features/<role>/<role>.routes.ts`, and add the child route.
