import {Subgrid} from './subgrid';
import {createMockField} from '../../utility/tests/utility/create-mock-field';
import {FieldTypeResource} from './field-type-resource';
import {createMockDataGroup} from '../../utility/tests/utility/create-mock-datagroup';
import {TaskElementType} from './task-content-element-type';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';

describe('Subgrid', () => {
    let subgrid: Subgrid;

    beforeEach(() => {
        subgrid = new Subgrid('', 4, {});
    });

    afterEach(() => {
        subgrid.destroy();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(subgrid).toBeTruthy();
    });

    it('should create elements', () => {
        const titleElement = subgrid.addTitle(createMockDataGroup([], 'title'));

        expect(titleElement.title).toBe('title');
        expect(titleElement.type).toBe(TaskElementType.DATA_GROUP_TITLE);
        expect(titleElement.gridAreaId?.includes('group')).toBeTrue();

        const field = createMockField(true, {x: 0, y: 0, rows: 1, cols: 2}, 'field');
        const fieldElement = subgrid.addField(field, FieldTypeResource.BOOLEAN);

        expect(fieldElement.gridAreaId?.includes('field')).toBeTrue();
        expect(fieldElement.item).toBe(field);
    });

    it('should add elements', () => {
        const field = createMockField(true, {x: 0, y: 0, rows: 1, cols: 2}, 'field');
        const fieldElement = subgrid.addField(field, FieldTypeResource.BOOLEAN);

        expect(Array.isArray(subgrid.content)).toBeTrue();
        expect(subgrid.content.length).toBe(0);

        subgrid.displayAllFields();

        expect(subgrid.content.length).toBe(1);
        expect(subgrid.content[0]).toBe(fieldElement);
    });

    it('should compute element diff', () => {
        const oldSubgrid = new Subgrid('', 4, {});

        const field = createMockField(true, {x: 0, y: 0, rows: 1, cols: 2}, 'field');
        const keptElement = oldSubgrid.addField(field, FieldTypeResource.BOOLEAN);
        oldSubgrid.addField(createMockField(true, {x: 2, y: 0, rows: 1, cols: 2}, 'old'), FieldTypeResource.BOOLEAN);

        oldSubgrid.displayAllFields();

        expect(oldSubgrid.content.length).toBe(2);

        const keptElement2 = subgrid.addField(field, FieldTypeResource.BOOLEAN);
        subgrid.addField(createMockField(true, {x: 2, y: 0, rows: 1, cols: 2}, 'new'), FieldTypeResource.BOOLEAN);

        subgrid.determineKeptFields(oldSubgrid);

        expect(subgrid.content.length).toBe(1);
        expect(subgrid.content[0]).toBe(keptElement2);
        expect(keptElement).toEqual(keptElement2);

        oldSubgrid.destroy();
    });

    it('should build grid', () => {
        let thrown = false;
        try {
            subgrid.addRow(['', '', '']);
        } catch (e) {
            thrown = true;
            expect(e.message?.includes(JSON.stringify(['', '', '']))).toBeTrue();
        }
        expect(thrown).toBeTrue();

        subgrid.addRow(['', 'a', 'a', '']);
        subgrid.addRow(['b', 'b', 'b', '']);

        expect(subgrid.gridAreas).toBe(undefined);

        subgrid.finalize();

        expect(subgrid.gridAreas).toBe('xblank0 a a xblank1 | b b b xblank2');
    });

    it('should do async rendering of first subgrid', fakeAsync(() => {
        subgrid.destroy();
        subgrid = new Subgrid('', 4, {batchSize: 1, batchDelay: 100, numberOfPlaceholders: 1});

        const field1 = subgrid.addField(createMockField(), FieldTypeResource.BOOLEAN);
        const field2 = subgrid.addField(createMockField(), FieldTypeResource.BOOLEAN);
        const field3 = subgrid.addField(createMockField(), FieldTypeResource.BOOLEAN);

        let called = false;
        subgrid.renderContentOverTime(() => {called = true; }, true);

        expect(subgrid.content.length).toBe(2);
        expect(subgrid.content[0]).toBe(field1);
        expect(subgrid.content[1].type).toBe(TaskElementType.LOADER);

        tick(100);

        expect(subgrid.content.length).toBe(3);
        expect(subgrid.content[0]).toBe(field1);
        expect(subgrid.content[1]).toBe(field2);
        expect(subgrid.content[2].type).toBe(TaskElementType.LOADER);

        tick(100);

        expect(subgrid.content.length).toBe(3);
        expect(subgrid.content[0]).toBe(field1);
        expect(subgrid.content[1]).toBe(field2);
        expect(subgrid.content[2]).toBe(field3);
    }));

    it('should do async rendering of latter subgrid', fakeAsync(() => {
        subgrid.destroy();
        subgrid = new Subgrid('', 4, {batchSize: 1, batchDelay: 100, numberOfPlaceholders: 1});

        const field1 = subgrid.addField(createMockField(), FieldTypeResource.BOOLEAN);
        const field2 = subgrid.addField(createMockField(), FieldTypeResource.BOOLEAN);
        const field3 = subgrid.addField(createMockField(), FieldTypeResource.BOOLEAN);

        let called = false;
        subgrid.renderContentOverTime(() => {called = true; }, false);

        expect(subgrid.content.length).toBe(1);
        expect(subgrid.content[0].type).toBe(TaskElementType.LOADER);

        tick(100);

        expect(subgrid.content.length).toBe(2);
        expect(subgrid.content[0]).toBe(field1);
        expect(subgrid.content[1].type).toBe(TaskElementType.LOADER);

        tick(100);

        expect(subgrid.content.length).toBe(3);
        expect(subgrid.content[0]).toBe(field1);
        expect(subgrid.content[1]).toBe(field2);
        expect(subgrid.content[2].type).toBe(TaskElementType.LOADER);

        tick(100);

        expect(subgrid.content.length).toBe(3);
        expect(subgrid.content[0]).toBe(field1);
        expect(subgrid.content[1]).toBe(field2);
        expect(subgrid.content[2]).toBe(field3);
    }));
});
