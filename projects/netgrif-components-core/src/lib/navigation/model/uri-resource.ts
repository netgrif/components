
export interface UriNodeResources {

}

export interface UriNodeResource {
    id: string;
    uriPath: string;
    name: string;
    parentId: string;
    parent: UriNodeResource;
    childrenId: Set<string>;
    children: Set<UriNodeResource>;
    level: number;
    contentTypes: Set<UriContentType>
}

export enum UriContentType {
    PROCESS,
    CASE
}
