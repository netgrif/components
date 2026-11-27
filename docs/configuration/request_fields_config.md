#### Configuring the `fields` request parameter

Requests to the task and case endpoints can send a `fields` query parameter that tells the backend which parts of the
response to return (for example `?fields=outcomes,outcome,task(stringId)`).

**By default the library sends no `fields` parameter**, so the backend returns its default response. To limit the
response, set a value for the operation in `nae.json` under `services.requests.fields`:

```json
{
    "services": {
        "requests": {
            "fields": {
                "task.assign": "outcomes,outcome,task(stringId)",
                "task.getData": "outcomes,outcome,task(stringId),data",
                "task.setData": "outcomes,outcome,case(stringId),task(stringId),changedFields",
                "case.create": "outcomes,case",
                "case.delete": null
            }
        }
    }
}
```

Each key has the form `<resource>.<operation>`. Keys that are missing, `null` or empty behave the same: the `fields`
parameter is not sent. You only need to list the operations you want to restrict. Listing every key with `null`, as in the
`nae.json` in this repository, is a convenient way to show which options exist.

| Key | Request | Default |
|---|---|---|
| `task.assign` | `GET task/assign/:id` | `null` |
| `task.cancel` | `GET task/cancel/:id` | `null` |
| `task.delegate` | `POST task/delegate/:id` | `null` |
| `task.finish` | `GET task/finish/:id` | `null` |
| `task.getData` | `GET task/:id/data` | `null` |
| `task.setData` | `POST task/:id/data` | `null` |
| `case.create` | `POST workflow/case/` | `null` |
| `case.delete` | `DELETE workflow/case/:id` | `null` |
| `publicTask.assign` | `GET public/task/assign/:id` | `null` |
| `publicTask.cancel` | `GET public/task/cancel/:id` | `null` |
| `publicTask.finish` | `GET public/task/finish/:id` | `null` |
| `publicTask.getData` | `GET public/task/:id/data` | `null` |
| `publicTask.setData` | `POST public/task/:id/data` | `null` |

Notes:

- **Value types.** The value must be a string. `null`, an empty string `""` or any other type means the `fields`
  parameter is omitted.
- **Explicit parameters win.** If code calls a resource service method and passes its own `params`, those are used as they
  are and the configuration is ignored.
- **Public delegate.** Delegating a task is not supported in public views, so there is no `publicTask.delegate` key.
- **Applied when the request is sent.** The configuration is read on every request, so a configuration loaded from the
  backend (`resolve_configuration`) takes effect as soon as it is available.
