import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {Change, InsertChange} from '@schematics/angular/utility/change';
import {getDecoratorMetadata, getMetadataField, insertImport} from '@schematics/angular/utility/ast-utils';


/**
 * copied from original at @schematics/angular/utility/ast-utils
 * our version allows for more freedom by adding the `insertedText` parameter
 */
export function addProviderToModule(source: ts.SourceFile,
                                    modulePath: string, classifiedName: string,
                                    importPath: string, providerText?: string): Change[] {
    return addSymbolToDecoratorMetadata(source, modulePath, 'NgModule', 'providers', classifiedName, providerText, importPath);
}

/**
 * copied from original method `addSymbolToNgModuleMetadata` at @schematics/angular/utility/ast-utils
 *
 * Changes in our version in comparison to the lib version:
 *  - `editedFilePath` parameter - renamed from the original `ngModulePath` to better reflect it's use
 *  - `metadataField` parameter - allows for more diverse uses such as editing component source files
 *  - `insertedText` parameter - allows for more freedom and flexibility when adding more complicated providers
 *
 * @param source modified file
 * @param editedFilePath path to edited file
 * @param decoratorName name of the decorator, that should have a property added
 * @param metadataField name of the array, where the symbol is added
 * @param symbolName name of the symbol eg. class name
 * @param insertedText the exact text that should be included in the array. If none is provided `symbolName` is used instead
 * @param importPath path for the import
 */
export function addSymbolToDecoratorMetadata(
    source: ts.SourceFile,
    editedFilePath: string,
    decoratorName: string,
    metadataField: string,
    symbolName: string,
    insertedText?: string,
    importPath: string | null = null,
): Change[] {
    const nodes = getDecoratorMetadata(source, decoratorName, '@angular/core');
    let node: any = nodes[0];  // eslint-disable-line @typescript-eslint/no-explicit-any

    // Find the decorator declaration.
    if (!node) {
        return [];
    }

    // Get all the children property assignment of object literals.
    const matchingProperties = getMetadataField(
        node as ts.ObjectLiteralExpression,
        metadataField,
    );

    if (!insertedText) {
        insertedText = symbolName;
    }

    // Get the last node of the array literal.
    if (!matchingProperties) {
        return [];
    }
    if (matchingProperties.length === 0) {
        // We haven't found the field in the metadata declaration. Insert a new field.
        const expr = node as ts.ObjectLiteralExpression;
        let exprPosition: number;
        let strToInsert: string;
        if (expr.properties.length === 0) {
            exprPosition = expr.getEnd() - 1;
            strToInsert = `  ${metadataField}: [${insertedText}]\n`;
        } else {
            node = expr.properties[expr.properties.length - 1];
            exprPosition = node.getEnd();
            // Get the indentation of the last element, if any.
            const text = node.getFullText(source);
            const matches = text.match(/^\r?\n\s*/);
            if (matches && matches.length > 0) {
                strToInsert = `,${matches[0]}${metadataField}: [${insertedText}]`;
            } else {
                strToInsert = `, ${metadataField}: [${insertedText}]`;
            }
        }
        if (importPath !== null) {
            return [
                new InsertChange(editedFilePath, exprPosition, strToInsert),
                insertImport(source, editedFilePath, symbolName.replace(/\..*$/, ''), importPath),
            ];
        } else {
            return [new InsertChange(editedFilePath, exprPosition, strToInsert)];
        }
    }
    const assignment = matchingProperties[0] as ts.PropertyAssignment;

    // If it's not an array, nothing we can do really.
    if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
        return [];
    }

    const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
    if (arrLiteral.elements.length === 0) {
        // Forward the property.
        node = arrLiteral;
    } else {
        node = arrLiteral.elements;
    }

    if (!node) {
        // eslint-disable-next-line no-console
        console.error('No app module found. Please add your new class to your component.');

        return [];
    }

    if (Array.isArray(node)) {
        const nodeArray = node as {} as Array<ts.Node>;
        const symbolsArray = nodeArray.map(n => n.getText());
        if (symbolsArray.includes(symbolName)) {
            return [];
        }

        node = node[node.length - 1];
    }

    let toInsert: string;
    let position = node.getEnd();
    if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        // We haven't found the field in the metadata declaration. Insert a new
        // field.
        const expr = node as ts.ObjectLiteralExpression;
        if (expr.properties.length === 0) {
            position = expr.getEnd() - 1;
            toInsert = `  ${insertedText}\n`;
        } else {
            // Get the indentation of the last element, if any.
            const text = node.getFullText(source);
            if (text.match(/^\r?\r?\n/)) {
                toInsert = `,${text.match(/^\r?\n\s*/)[0]}${insertedText}`;
            } else {
                toInsert = `, ${insertedText}`;
            }
        }
    } else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
        // We found the field but it's empty. Insert it just before the `]`.
        position--;
        toInsert = `${insertedText}`;
    } else {
        // Get the indentation of the last element, if any.
        const text = node.getFullText(source);
        if (text.match(/^\r?\n/)) {
            toInsert = `,${text.match(/^\r?\n(\r?)\s*/)[0]}${insertedText}`;
        } else {
            toInsert = `, ${insertedText}`;
        }
    }
    if (importPath !== null) {
        return [
            new InsertChange(editedFilePath, position, toInsert),
            insertImport(source, editedFilePath, symbolName.replace(/\..*$/, ''), importPath),
        ];
    }

    return [new InsertChange(editedFilePath, position, toInsert)];
}
