# RouteShaper — Frontend

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

RouteShaper is an open-source, web-based decision-support tool for industrial
freight route planning with integrated CO₂ emission estimation and quality
(freshness) reporting for perishable goods.

This repository contains the **web interface**: a React application built
with Vite. It requires the
[vrp-backend](https://github.com/r1azmh/vrp-backend) service, which holds the
data model, the optimization engine and the emission and freshness
calculations, **and which also serves this interface in production**. Install
the backend first.

Developed at the School of Technology and Innovations, University of Vaasa,
Finland, within the project
[Optimising distribution transport in the food ecosystem](https://www.uwasa.fi/en/elintarvike-ekosysteemi).

---

## What the interface provides

- **Accounts** — sign-up, login and password reset, handled by Django. All
  data is scoped to the account that creates it.
- **Data entry and bulk import** — routing tasks (works), jobs, vehicles,
  vehicle profiles and perishability categories, individually or in bulk from
  CSV using the templates in this repository.
- **Map visualisation** — optimized routes on an OpenStreetMap layer via
  Leaflet and Leaflet Routing Machine, one colour per vehicle, with depot and
  stop markers.
- **Dashboard** — cost, distance, driving time, CO₂ emissions and freshness
  penalties, per vehicle and for the whole plan.
- **Exports** — route plan and emission report as CSV.

---

## Requirements

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 7)
- Yarn — this project ships `yarn.lock` only
- A checkout of [vrp-backend](https://github.com/r1azmh/vrp-backend)

---

## Building for deployment

```bash
git clone https://github.com/r1azmh/vrp-frontend.git
cd vrp-frontend
yarn install
```

The build writes into the backend directory. By default it looks for
`../vrp-backend`, i.e. a sibling checkout. Set `VRP_BACKEND_DIR` if yours is
somewhere else:

```bash
yarn build                                        # sibling ../vrp-backend
VRP_BACKEND_DIR=/srv/routeshaper/vrp-backend yarn build   # explicit path
```

Expected output:

```
../vrp-backend/templates/index.html
../vrp-backend/static/main-<hash>.js
../vrp-backend/static/main-<hash>.css
```

Then start the backend (`python manage.py runserver`) and open
`http://localhost:8000/signup/`.

Asset filenames are content-hashed and change on every build, so old bundles
accumulate in `static/`. Clear the directory periodically, and re-run
`collectstatic` after each build if you deploy with `DEBUG=False`.

> **If you get a blank page**, the bundle is almost certainly being served as
> HTML. Check the response content type of `/static/main-<hash>.js`: it must be
> `text/javascript`. If it is `text/html`, Django's catch-all URL pattern is
> answering the request — see the backend README.

## Running the dev server

```bash
echo "VITE_PUBLIC_API_BASE=http://localhost:8000" > .env
yarn dev
```

Vite serves at `http://localhost:5173` with hot reload. In development mode
`apiBaseUrl` is read from `VITE_PUBLIC_API_BASE`; in a production build it is
an empty string, so requests stay same-origin. The backend sets
`CORS_ALLOW_ALL_ORIGINS = True`, so no proxy configuration is needed.

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
6. Review the plan on the map and in the dashboard, then export the reports.

---

## Project layout

```
index.html              Vite entry template (contains Django template tags)
vite.config.js          Build config, incl. the Django-template output plugin
src/main.jsx            Router and application entry point
src/App.jsx             Landing page
src/pages/              Work, job, category, fleet, vehicle profile, auth pages
src/components/         Dashboard, map, charts, tables, constants.jsx
src/managers/           API client (apiManager.jsx)
src/hooks/              Shared React hooks
```

---

## Video Tutorial

A complete step-by-step video tutorial for installation and implementation of RouteShaper is available here:
[Tutorial Link](https://youtu.be/V_FPSygpemU).

---

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE).

Copyright © 2024–2026 Petri Helo and Riaz Mahmud.

## Acknowledgements

Supported by the European Regional Development Fund and the Regional Council
of South Ostrobothnia (grant A80384). Map data © OpenStreetMap contributors;
routing by [OpenRouteService](https://openrouteservice.org/) (HeiGIT).

## Contact

riaz dot mahmud at uwasa.fi