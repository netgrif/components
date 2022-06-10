# Public view

Public view provides anonymous access to view, that are marked as public with no
authorization needed. Users can access tasks and cases without any login or registration needed. Public view can be
implemented as workflow view (list of processes), task list view (list of tasks of a case created from a public process) and
a single task view (displays only data of single task without header and panel).

## Frontend

In this manual we will show, how to set up a public view component. 

### Public workflow view
In ``nae.json``, into ``view`` array, define new view object for public view as follows (you can
define your own names for layout, class and name, it is not strictly defined):

```json
{
  "view": {
    "demo-public-view-workflow": {
      "layout": {
        "name": "publicWorkflowView",
        "params": {
          "allowedNets": []
        }
      },
      "component": {
        "class": "PublicWorkflowViewComponent",
        "from": "./doc/public-workflow-view/public-workflow-view.component"
      },
      "access": "public",
      "navigation": {
        "title": "Public view - process"
      },
      "routing": {
        "path": "process"
      }
    }
  }
}
```

The @netgrif/components:create-view schematic will use this configuration file to create view.
You can find more about ``nae.json`` on [this link](https://engine.netgrif.com/#/views/viewid_generation?id=view-id-generation).

After that, open terminal and generate the defined view with Angular Schematic using the following
command:

```console
foo@bar:~$ ng generate @netgrif/components:create-view
```

This will detect the new public component definition in ``nae.json`` and will create the new component.
After that, just serve your application with ``ng serve`` and the public view will be awailable on
path you defined in ``nae.json``.

### Public task view

The steps are the same as in case public workflow view, the JSON definition differs in layout name,
that is ``publicTaskView`` and path, that must be ``process/:petriNetId/:caseId``:

```json
{
    "view": {
        "public-task-view": {
            "layout": {
                "name": "publicTaskView",
                "params": {
                    "allowedNets": []
                }
            },
            "component": {
                "class": "PublicTaskViewComponent",
                "from": "./doc/public-task-view/public-task-view.component"
            },
            "access": "public",
            "navigation": {
                "title": "Public view - task"
            },
            "routing": {
                "path": "process/:petriNetId/:caseId"
            }
        }
    }
}
```

### Public single task view
If you want to generate a URL, that redirects you directly to task, you can use direct redirect functionality
of public view. At first, you will have to define a view in ``nae.json`` as follows:

```json
{
    "view": {
        "public-single-task-view": {
            "layout": {
                "name": "publicSingleTaskView",
                "params": {
                    "allowedNets": []
                }
            },
            "component": {
                "class": "PublicTaskSingleViewComponent",
                "from": "./doc/public-task-view/public-task-single-view.component"
            },
            "access": "public",
            "navigation": {
                "title": "Public view - task"
            },
            "routing": {
                "path": "process/:petriNetId/:caseId/:transitionId"
            }
        }
    }
}
```

Then just generate the view using schematics with command from previous examples.

Then it is simple to navigate to the view, you just have to construct the right URL, which must have the following form:
``https://<app_address>/process/<process_identifier>/<case_id>/<transition_id>``

For example:
``https://demo.netgrif.com/process/all_data/6290bb764f280603dd861d25/1``
where:
- <app_address> - demo.netgrif.com
- <process_identifier> - all_data
- <case_id> - 6290bb764f280603dd861d25
- <transition_id> - 1
