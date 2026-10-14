# Campus Connect

Campus Connect is a Vue 3 single-page application for managing student events. Vue Router connects the dashboard and separate management pages for events, venues, registrations, participants, and organizers.

## Project structure

- `src/App.vue`: app root and shared layout.
- `src/router/index.js`: page URLs and navigation.
- `src/data.js`: sample records and browser storage.
- `src/components/AppLayout.vue`: sidebar, header, and routed page outlet.
- `src/pages/*Page.vue`: page interfaces and templates.
- `src/pages/*Page.js`: CRUD functions for the matching page.

## Requirements

### Functional requirements

- Navigate between the dashboard and each management page without reloading the application.
- Create, view, update, search, and delete event, venue, registration, participant, and organizer records.
- Connect registrations to participants and events, and events to venues and organizers.
- Display dashboard totals, upcoming events, and recent registration activity.
- Preserve changes between visits in the browser using local storage.

### Non-functional requirements

- Use Vue 3 and Vite for a responsive single-page application.
- Validate required fields in the browser and provide clear empty and search-result states.
- Keep the interface usable on desktop and mobile screen sizes.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## Pages and presentation flow

1. **Overview**: show event, participant, registration, and venue totals, upcoming events, and the registration pulse.
2. **Events**: add an event, edit its details, search the list, and delete a record.
3. **Venues**: manage spaces, locations, capacities, and availability.
4. **Registrations**: manage participant sign-ups, event selection, confirmation, waitlist, and payment status.
5. **Participants**: manage student participant records.
6. **Organizers**: manage event organizer records.

Use the sidebar to navigate. Changes are stored in the current browser and can be reset by clearing the site's local storage. This is a front-end demo and does not use a shared server or database, so records are local to each browser.
