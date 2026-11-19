# Netgrif Components Playground (`netgrif-example`)

Playground of the `@netgrif/components` and `@netgrif/components-core` libraries: every page shows a live preview of a
component, a configuration panel and the code (Petriflow, TypeScript, HTML) for the current configuration.

It runs **without Netgrif Application Engine and without login**, all data are created in the browser: the views
(case, task, tabbed, single task, ticket, process builder, dashboard), the navigation (double drawer, breadcrumbs),
the user profile and the administration (role assignment, user invite) work on an in-memory mock engine.

## Run

```shell
npm run project:local-build   # builds both libraries into dist/ and links them into node_modules
npm run example:start         # ng serve netgrif-example
npm run example:build         # production build to dist/netgrif-example
npx ng test netgrif-example --watch=false
```

## Structure

```
src/app/
  app.component.*                 shell: toolbar (light / dark toggle), side navigation from DEMO_GROUPS
  app.module.ts                   library modules, offline providers, provideNaeMaterialDefaults()
  app-routing.module.ts           one route per demo
  playground/
    demos.ts                      navigation (groups and items)
    demo-page/                    page scaffold: header, Preview, Configuration, Usage (code)
    code-block/                   code snippets in tabs with copy button
    offline/
      playground-configuration.service.ts   minimal ConfigurationService, engine address is fake
      playground-view.service.ts            ViewService without registered views (tab view, navigation need one)
      offline-http.interceptor.ts           answers every request to the fake engine locally:
                                            recorded response > mock engine > empty page (logged with console.debug)
    mock-engine/
      mock-data.ts                processes (fields, task forms, flow of transitions), initial cases, user
      mock-navigation.ts          URI nodes, menu_item cases (double drawer, breadcrumbs), dashboard cases,
                                  `process` net of the builder view (Petriflow XML generated from mock-data)
      mock-engine.ts              in-memory engine: case / task search, create / delete case, assign, finish,
                                  cancel, delegate, get / set data; engine REST response format
  demos/
    overview/                     landing page
    data-field/
      field-specs.ts              one FieldSpec per data field type: variants, component properties, validations,
                                  constructor arguments; the same spec builds the model and the code snippets
      data-field-demo.component.* generic demo, renders the model with nc-data-field-template
    snack-bar/, dialog/           SnackBarService and DialogService demos
    views/
      playground-views.ts         views the way an application writes them (extend AbstractCaseViewComponent, ...)
      view-demos.ts               case, task, tabbed and process builder view demos
      navigation-demos.ts         double drawer (+ menu item content), dashboard, breadcrumbs, single task view
                                  (with the form layout settings, FORM_LAYOUT of the mock engine)
      user-admin-demos.ts         ticket view, user profile, role assignment, user invite
```

### Mock engine and recorded responses

The views call the real REST API of the libraries, `OfflineHttpInterceptor` answers it:

1. `src/assets/mock-engine/recorded.json` – responses recorded from a running engine, `"METHOD path"` → response body,
   e.g. `{"POST workflow/case/search": {"_embedded": {"cases": [...]}, "page": {...}}}`. A recorded response always wins.
2. `MockEngine` – hand written processes and cases of `mock-data.ts`, the state (new cases, finished tasks, set data)
   lives until the page is reloaded.
3. anything else gets an empty page and `[playground] offline, METHOD path is not mocked` in the console.

### Offline mode

- `ConfigurationService` → `PlaygroundConfigurationService` (no views, fake engine address)
- `HTTP_INTERCEPTORS` → `OfflineHttpInterceptor` (requests to the fake engine never leave the browser)
- `AuthenticationMethodService` → `MockAuthenticationMethodService`, `AuthenticationService` → `MockAuthenticationService`
  (always logged in, the user comes from the mock engine `user/me`), `UserPreferenceService` → `MockUserPreferenceService`
  (mocks exported by components-core)
- `ViewService` → `PlaygroundViewService`
- `AuthenticationModule` (navigation guards) and `SignUpModule` (user invite) imported, `services.auth.toLoginRedirect: '/'`, a verified session token is set by
  an app initializer (the URI service loads the navigation root only with a session)
- `services.groupNavigation.groupNavigationRoute: views/navigation/item` – route of the menu items
- no login, no auth guard, no session idle; translations are the bundled ones of `LanguageService`

### Adding a demo

1. Data field type or variant: add / extend a `FieldSpec` in `demos/data-field/field-specs.ts`, it appears in the
   navigation automatically.
2. Other component: create a component that uses `<ne-demo-page>` with `[demoPreview]`, `[demoConfig]` (and optionally
   `[demoState]`) content and `[snippets]`, declare it in `AppModule`, add a route and an item in `playground/demos.ts`.

## TODO – not covered yet

- [ ] Data field properties not exposed yet: `align` of button, `dividerLGBTQ` / `dividerColor` details of i18n,
      validations of date / date time / i18n, `immediate` data, field offset and alignment of the layout
      (the preview has a density switch, the appearance is always `outline`)
- [ ] Record real engine responses into `recorded.json`
- [ ] Views: public views (public task / workflow / single task)

Covered already: data fields with engine data (file, file list, user, user list, task / case / process ref) on the mock
engine, task forms and panels in the case / task / tabbed views, role assignment (also LDAP) and user invite, the
dialogs (impersonation too), the appearance dialog in the navigation view, the account forms, the dashboard and the
user profile. Not planned: the old dashboard cards, the side menu (deprecated) and the quick panel.
