# Blockchain Voting (frontend)

The React frontend of a voting app. Users sign in, browse polls, create them
and vote. The blockchain side, which stores the votes and checks poll
integrity, is a separate backend that is not in this repository.

## What it does

- **Sign in / register** form with email and password, protected by Google
  reCAPTCHA. It sends `POST /users/sign_in` or `POST /users` and keeps the
  returned `auth_token` in Redux.
- **Dashboard**: a table of polls with ID, author email, theme, start and
  finish dates, and an **Integrity** indicator (the backend's `valid` flag). It
  has a debounced search by theme or author.
- **Poll actions**:
  - signed-in users can reload all polls, re-check a single poll with
    `GET /polls/:id`, and delete polls;
  - polls marked valid can be opened to vote for one of their options with
    `POST /polls/:id/options/:option/votes`.

  Completed polls show the result for each option instead of a vote button.
- **New poll** modal: theme, finish date (`react-day-picker`), description and
  a list of options that can grow or shrink. It creates the poll with
  `POST /polls`, then each option with `POST /polls/:id/options`.

The backend URL is hard-coded as `http://localhost:3001` in
`src/components/`. Without that backend, the dashboard stays empty.

## Stack

- React 16, Redux 3, react-redux, redux-thunk, axios and SCSS.
- `react-google-recaptcha`, `react-day-picker` and `react-debounce-input`.
- webpack 3 and Babel 6, served by a small Express server (`server.js`) with
  hot reloading in development.

`package.json` also lists many dependencies copied from another project that
the app does not use.

## Getting started

```bash
npm install
npm start       # http://localhost:3000, expects the API on http://localhost:3001
```

This toolchain is from 2018. node-sass 4, bcrypt 3 and webpack 3 need an old
Node, around version 10. As in the sibling list project, the
`buildproduction` and `deploy` scripts point to a `webpack.config.prod.js` that
is not in the repository.

## Context

Team project, November 2018 – January 2019. This repository is the frontend
part.
