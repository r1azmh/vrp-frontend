# RouteShaper — Frontend

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

RouteShaper is an open-source, web-based decision-support tool for industrial freight route planning with integrated CO₂ emission estimation and quality (freshness) reporting for perishable goods.

This repository contains the **web interface**, a React (Create React App)
project. It requires the [vrp-backend](https://github.com/r1azmh/vrp-backend) service, which holds the data model, the optimization engine and the emission and freshness calculations. Install the backend first.

Developed at the School of Technology and Innovations, University of Vaasa,
Finland, within the project [Optimising distribution transport in the food ecosystem](https://www.uwasa.fi/en/elintarvike-ekosysteemi).

---

## What the interface provides

- **Accounts** — sign-up, login and password reset. All data is scoped to the account that creates it.
- **Data entry and bulk import** — routing tasks (works), jobs, vehicles,
  vehicle profiles and perishability categories, individually or in bulk from CSV using the templates in this repository.
- **Map visualisation** — optimised routes on an OpenStreetMap layer via
  Leaflet Routing Machine, one colour per vehicle, with depot and stop markers.
- **Dashboard** — cost, distance, driving time, CO₂ emissions and freshness
  penalties, per vehicle and for the whole plan.
- **Exports** — route plan and emission report as CSV.

A short video walkthrough of a full planning session is available here:
[YouTube Video Link](https://youtu.be/-4l0e0ATQ78).

---

## Requirements

- Node.js 18 or newer
- Yarn (`npm install -g yarn`) or npm
- A running RouteShaper backend

---

## Configuration

The backend address is read from the environment at build time. Create a
`.env` file in the project root:

```ini
REACT_APP_BASE_URL=http://localhost:8000
```

Use the public URL of the backend for a deployed installation. The variable
must keep the `REACT_APP_` prefix or Create React App will ignore it, and the value is baked into the bundle — changing it requires a rebuild.

---

## Running for development

```bash
git clone https://github.com/r1azmh/vrp-frontend.git
cd vrp-frontend
yarn install
yarn start
```

The dev server runs at `http://localhost:3000` and talks to the backend at
`REACT_APP_BASE_URL`. The backend allows all origins in development, so no
proxy configuration is needed.

## Building for deployment

In production the interface is compiled and served by Django as part of the
backend, so there is no separate frontend process.

```bash
yarn build
```

Then copy the output into the backend project:

```bash
mkdir -p ../vrp-backend/templates ../vrp-backend/static
cp build/index.html  ../vrp-backend/templates/
cp -r build/static/* ../vrp-backend/static/
```

Django renders `templates/index.html` for `/`, `/signup/`, `/login/` and
`/dashboard/`. Until this copy is made, those routes fail with
`TemplateDoesNotExist`. Re-run both commands after every rebuild.

---

## CSV import templates

| File | Columns |
| --- | --- |
| `job_bulk_import_template.csv` | `name, category_id, lat, lng, job_type, demand, duration, start_at, end_at, created_by_id, multi_id` |
| `fleet_bulk_import_template.csv` | `name, lat, lng, capacity, start_at, end_at, created_by_id, profile_id` |

- `job_type` is `pp` for pickup, `dd` for delivery.
- `duration` is service time in seconds.
- Times are ISO 8601 UTC, e.g. `2024-04-22T04:25:00.000Z`.
- On a job, `start_at` is when the container becomes ready for pick-up: it
  opens the time window and is also the reference time for the freshness
  penalty.
- `category_id` and `profile_id` refer to categories and vehicle profiles
  created in the interface beforehand — create those first and check their IDs.

---

## Typical workflow

1. Register an account and log in.
2. Create **Categories** with hourly freshness penalties, and **Vehicle
   Profiles** with cost coefficients, truck type, temperature regime and
   capacity. The truck type and temperature select the emission factor and
   materially change the reported CO₂ — set them to match the real fleet.
3. Create a **Work** (routing task).
4. Add **Jobs** and **Vehicles**, individually or by CSV import.
5. Press **Get Solution** and wait for the solver (up to 300 seconds).
6. Review the plan on the map and in the dashboard, then export the eports.

---

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) and
[NOTICE](NOTICE).

Copyright © 2024–2026 Petri Helo and Riaz Mahmud.

## Acknowledgements

Supported by the European Regional Development Fund and the Regional Council
of South Ostrobothnia (grant A80384). Map data © OpenStreetMap contributors;
routing by [OpenRouteService](https://openrouteservice.org/) (HeiGIT).

## Contact

[riaz dot mahmud at uwasa.fi]
