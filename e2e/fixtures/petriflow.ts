import * as fs from 'fs';

/**
 * A Petriflow XML without the formatting: no XML declaration, no comments, whitespace between the tags removed and
 * whitespace inside texts (CDATA of the actions too) collapsed, one tag per line. Two documents with the same
 * content are equal however they are indented.
 */
export function normalizePetriflow(xml: string): string {
    return xml
        .replace(/<\?xml[^>]*\?>/g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (_, code: string) => `<![CDATA[${code.replace(/\s+/g, ' ').trim()}]]>`)
        .replace(/>\s+</g, '><')
        .replace(/\s+/g, ' ')
        .replace(/></g, '>\n<')
        .trim();
}

export function readPetriflow(path: string): string {
    return normalizePetriflow(fs.readFileSync(path, 'utf8'));
}

/** the elements of the tag with their XML (`<data type="number">...</data>`) */
export function petriflowElements(xml: string, tag: string): Array<string> {
    return [...xml.matchAll(new RegExp(`<${tag}(?:\\s[^>]*)?>[\\s\\S]*?</${tag}>`, 'g'))].map(m => m[0]);
}

/** the text of the first child element of the tag (`<title>Amount</title>` is `Amount`), undefined when it is missing */
export function petriflowText(xml: string, tag: string): string | undefined {
    const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([^<\\]]*)(?:\\]\\]>)?</${tag}>`));
    return match?.[1].trim();
}

/** the element of the tag with the id */
export function petriflowElement(xml: string, tag: string, id: string): string | undefined {
    return petriflowElements(xml, tag).find(element => petriflowText(element, 'id') === id);
}

const ELEMENTS =['role', 'data', 'transition', 'place', 'arc', 'function', 'roleRef', 'dataRef', 'event', 'action'];

/**
 * The content of a Petriflow model independent of the order of the elements: the sorted ids of the roles, data,
 * transitions, places, arcs... and the number of the elements without an id. The builder can order the elements
 * differently than the imported file, the content stays the same. An event without actions and messages is left out,
 * the builder does not export it (it does nothing).
 */
export function petriflowContent(xml: string): Record<string, Array<string> | number> {
    xml = xml.replace(/<event(?:\s[^>]*)?>\s*<id>[^<]*<\/id>\s*<\/event>/g, '');
    const content: Record<string, Array<string> | number> = {};
    for (const element of ELEMENTS) {
        const ids = [...xml.matchAll(new RegExp(`<${element}(?:\\s[^>]*)?>\\s*<id>([^<]*)</id>`, 'g'))].map(m => m[1].trim());
        const count = (xml.match(new RegExp(`<${element}[\\s>]`, 'g')) ?? []).length;
        content[element] = ids.length === count ? ids.sort() : count;
    }
    return content;
}
