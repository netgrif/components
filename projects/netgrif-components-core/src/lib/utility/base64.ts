import * as Buffer from 'buffer';


export function encodeBase64(text: string): string {
    return Buffer.Buffer.from(text).toString('base64');
}

export function decodeBase64(encoded: string): string {
    return Buffer.Buffer.from(encoded, 'base64').toString('utf-8');
}
