#### Configuring the `fields` request parameter

Requests to the task and case endpoints send a `fields` query parameter that tells the backend which parts of the
response to return (for example `?fields=outcomes,outcome,task(stringId)`). The defaults are built into the library, but you
can override them per operation in `nae.json` under `services.requests.fields`:

```json
{
    "services": {
        "requests": {
            "fields": {
                "task.assign": "outcomes,outcome,task(stringId)",
                "task.getData": "outcomes,outcome,task(stringId),data",
                "task.setData": "outcomes,outcome,case(stringId),task(stringId),changedFields",
                "case.create": "outcomes,case",
                "publicTask.getData": ""
            }
        }
    }
}
```

Each key has the form `<resource>.<operation>`. An operation that is not listed uses its default value, so you only need
to configure the ones you want to change.

| Key | Request | Default |
|---|---|---|
| `task.assign` | `GET task/assign/:id` | `undefined` - every field is included |
| `task.cancel` | `GET task/cancel/:id` | `undefined` - every field is included |
| `task.delegate` | `POST task/delegate/:id` | `undefined` - every field is included |
| `task.finish` | `GET task/finish/:id` | `undefined` - every field is included |
| `task.getData` | `GET task/:id/data` | `undefined` - every field is included |
| `task.setData` | `POST task/:id/data` | `undefined` - every field is included |
| `case.create` | `POST workflow/case/` | `undefined` - every field is included |
| `case.delete` | `DELETE workflow/case/:id` | `undefined` - every field is included |
| `publicTask.assign` | `GET public/task/assign/:id` | `undefined` - every field is included |
| `publicTask.cancel` | `GET public/task/cancel/:id` | `undefined` - every field is included |
| `publicTask.finish` | `GET public/task/finish/:id` | `undefined` - every field is included |
| `publicTask.getData` | `GET public/task/:id/data` | `undefined` - every field is included |
| `publicTask.setData` | `POST public/task/:id/data` | `undefined` - every field is included |

Notes:

- **Empty string or `undefined`.** Setting a value to `""` or `undefined` removes the `fields` parameter from the request, so the backend returns its
  full response.
- **Explicit parameters win.** If code calls a resource service method and passes its own `params`, those are used as they
  are and the configuration is ignored.
- **Invalid values.** A value that is not a string is ignored and the default is used.
