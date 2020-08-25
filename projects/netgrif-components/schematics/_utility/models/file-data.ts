import {FileEntry} from '@angular-devkit/schematics/src/tree/interface';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

export interface FileData {
    fileEntry: FileEntry;
    sourceFile: ts.SourceFile;
}
