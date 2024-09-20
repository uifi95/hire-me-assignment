# Famly tech assignment - Sergiu Uifalean
Check-in management application

## Requirements

You are tasked to build a simple application for a nursery to manage the attendance of children each day.

It has to be done using Typescript.

The application should be able to do 3 things:

1. List children with some form of pagination/lazy-loading/infinite-scroll
2. Checkin a child
3. Checkout a child

## Design decisions

-   **API key security** - use `.env.local` file, don't push your API key to the remote, gitignored from the beggining

-   **API helper** - small functions that help with API calls, makes API work declarative

-   **Store** - single source of truth, simple `useReducer` implementation, the only places I used local state was where the state was context dependent, and not complex enough to make a store for it

-   **Data** - have 1 list, with progressive loading of another _display list_

-   **Validation** - prevent user from entering invalid values through UX and HTML validation, silently fail server issues, allowing the user to repeat their action (would implement a full validation system as an improvement)

-   **Design** - simple responsive design, with only important information, that is always retrieved from the API, in the future I would create a component that fits well and renders any optional properties we had (like gender, birthday, etc)

-   **Infinite Scrolling** - to make the functionality reusable I wrapped it in a hook, so I could add it declaratively to any component, (this took the most time as I did not want to use a library for helpers with intersection observer), used pure js to detect a `Loader` with `IntersectionObserver`. Created a hook that simulates "fetching more items" with a 500ms delay.

-   **Reusability** - most of the code is abstracted away into functions and hooks, and all of the components were made with reusability in mind, so you can build future UIs or swap certain parts of the system with ease

-   **Type Safety** - everything in the app is typed, including `scss` files, `config` files, so it offers the best DX you can get with autocomplete and `typescript` validation

## Installation

1. clone this repo (or download the zip)
2. run `npm install`

## Setup your access token

1. copy the contents of `.env.example` to a new file `.env.local`
2. copy paste your **access token** after `VITE_ACCESS_TOKEN=`

## Run

1. `npm run dev` - dev server
2. `npm test` - unit tests
