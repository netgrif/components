#Tree case view

##Configure case paging

By default, the Tree case view uses a page size of 50 cases when it loads the tree nodes.

If you want to configure this value you can do this by providing the `NAE_TREE_CASE_VIEW_CONFIGURATION` injection token.

If you provide this token directly in the Component that houses the Tree case view, you will configure the page size of this view only. By providing the token higher in the provider tree you will affect all Tree case views in the respective subtree. By providing the token at the application root, all Tree case views in the application will be affected by this configuration.

An example code snippet, for setting the page size to 100, note that other providers may be present in a real application:
```typescript
providers: [
    {provide: NAE_TREE_CASE_VIEW_CONFIGURATION, useValue: {pageSize: 100}}   
]
```
