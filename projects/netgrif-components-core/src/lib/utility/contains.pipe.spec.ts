import {ContainsPipe} from "./contains.pipe";
import {expect} from "@angular/flex-layout/_private-utils/testing";

describe('ContainsPipe', () => {
    const pipe = new ContainsPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should check that not contains', () => {
        expect(pipe.transform([], 'hello')).toBeFalsy();
    });

    it('should check that contains', () => {
        expect(pipe.transform(['hello'], 'hello')).toBeTruthy();
    });
});
