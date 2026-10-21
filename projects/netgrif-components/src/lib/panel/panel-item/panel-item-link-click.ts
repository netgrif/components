export function configurePanelItemLinks(container: HTMLElement): void {
    container.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(anchor => {
        anchor.target = '_blank';
        const relValues = new Set(anchor.rel.split(/\s+/).filter(value => value.length > 0));
        relValues.add('noopener');
        relValues.add('noreferrer');
        anchor.rel = Array.from(relValues).join(' ');
    });
}

export function extractPanelItemText(container: HTMLElement): string {
    return (container.textContent ?? '').replace(/\s+/g, ' ').trim();
}

export function handlePanelItemLinkClick(event: MouseEvent): void {
    const anchor = (event.target as Element | null)?.closest('a');
    if (!anchor) {
        return;
    }
    event.stopPropagation();
}
