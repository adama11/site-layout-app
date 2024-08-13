This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Deployed on Vercel: https://site-layout-app.vercel.app/

## Getting Started -- Local Setup

1. install Docker Desktop
2. install `npm` (recommended to use v18 via `nvm`)
3. clone this repo
4. `cd site-layout-app`
5. `cp .env.example .env` (copy example directly for local development)
6. `make local` (ensure this finishes to completion, otherwise your db might not be set up correctly)
7. go to http://localhost:8000, refresh page on first load

Use `make run` subsequently to start the server after this first time setup.

## Testing using Playwright

1. install playwright
2. `make test`


## Features
- Generate a site layout based on the number of devices in the site
- Save and load site layouts, access them later by saving your link (with session name)
- Add and remove devices from the site
- Calculate the total area, power, and cost of the site
- Responsive layout
- Data is stored in a database
- Start new session
- View last saved timestamp
