# Frontend Actions
Frontend actions are type of actions that are executed on frontend. The action implementation is done as part of
frontend code and they can be called from inside data or transition events.

## Definition of action on frontend

A frontend action can be defined anywhere in frontend code, but it is suggested to make a separate file
for it. When defining action, we should follow these steps:

1. Create a file with any name, e.g. ``example-action.ts``, this will be the file, where we define our action
2. To define an action we should create and export a constant. Type of this constant has to be `FrontendActionDefinition`. The value of this constant will be the actual action definition
```
export const redirectAction: FrontActionDefinition
```
3. The ``FrontActionDefinition`` interface has an argument called ``fn`` which has a type of anonymous function with two arguments: ``injector: Injector``, ``frontAction: FrontAction``.
``Injector`` is classic Angular injector, ``FrontAction`` contains the ID/name of the frontend action and the arguments. The content of this object is got from backend frontend action call. The frontend
action definition should look like as follows:
```
export const redirectAction: FrontActionDefinition = {
    fn: (injector: Injector, frontAction: FrontAction) => {
        const router = injector.get(Router);
        router.navigate([frontAction.args[0]])
    }
}
```
4. The final step to register our new frontend function into ``FrontActionsRegisterService``. This can be done in any module of our frontend application,
but it is suggested to do it in ``app.module.ts``. This can be done via calling the ``FrontActionsRegistryService.register(actionId: string, actionDefintion: FrontActionDefinition)``. The first argument, ``actionId``
should be the same, that it is called on backend.
```
export class AppModule {
    constructor(frontActionsRegistryService: FrontActionsRegistryService) {
        frontActionsRegistryService.register('redirect', redirectAction);
    }
}
```
