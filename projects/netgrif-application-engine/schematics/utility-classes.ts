export class FileSystemNode {
    children: Array<FileSystemNode>;

    constructor(public path: string, public parent: FileSystemNode) {
        this.children = [];
    }
}
