# Famly tech assignment - Sergiu Uifalean

## Requirements

You are tasked to build a simple application for a nursery to manage the attendance of children each day.

It has to be done using Typescript.

The application should be able to do 3 things:

1. List children with some form of pagination/lazy-loading/infinite-scroll
2. Checkin a child
3. Checkout a child

## Design decisions

-   **API key security** - use env file, don't push your API key to the remote

-   **API helper** - small functions that help with API calls

-   **Store** - single source of truth, simple `useReducer` implementation

-   **Data** - have 1 list, with progressive loading of another _display list_

-   **Validation** - stop user from entering invalid values through UX and silently fail server issues, allowing the user to repeat their action (would implement a full validation system as an improvement)

-   **Design** - simple responsive design, with only important information, that is always retrieved from the API

-   **Infinite Scrolling** - used `IntersectionObserver` to check if a `Loader` component was visible, and did a bit of memoization to prevent unnecessary re-renders

-   **Reusability** - most of the code is abstracted away into functions and hooks, and all of the components were made with reusability in mind, so you can build future UIs or swap certain parts of the system with ease
-   **Type Safety** - everything in the app is typed, including scss files, config files, so it offers the best DX you can get with autocomplete and typescript errors

## Installation

1. clone this repo (or download the zip)
2. run `npm install`

## Setup your access token

1. copy `env.example` to a new file `env.local`
2. copy paste your **access token** after `VITE_ACCESS_TOKEN=`

## Run

1. `npm run dev` - dev server
2. `npm test` - unit tests
