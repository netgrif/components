import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CanvasConfiguration} from '@netgrif/petri.svg';
import {BasicSimulation, ExportService, PetriNet} from '@netgrif/petriflow';
import format from 'xml-formatter';
import {DialogDeadNetComponent} from '../../../dialogs/dialog-dead-net/dialog-dead-net.component';
import {ModelerConfig} from '../../modeler-config';
import {ModelSourceService} from './model-source.service';
import {ModelService} from './model.service';

@Injectable()
export class ModelExportService {

    private _downloadLink: HTMLAnchorElement;

    constructor(
        private _modelService: ModelService,
        private _modelSource: ModelSourceService,
        private _exportService: ExportService,
        private matDialog: MatDialog,
    ) {
    }

    private get model(): PetriNet {
        return this._modelSource.getModel();
    }

    /**
     * Triggers a download of an XML file containing the serialised model stored in the {@link ModelService}.
     */
    public downloadAsXml(model = this.model): void {
        if (this.deadNet()) {
            const dialogRef = this.matDialog.open(DialogDeadNetComponent);
            dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.downloadXml(model);
                }
            });
        } else {
            this.downloadXml(model);
        }
    }

    public exportXml(model = this.model): string {
        const serialisedModel = this._exportService.exportXml(model);
        return this.prettyFormat(serialisedModel);
    }

    private downloadXml(model: PetriNet): void {
        const prettyModel = this.exportXml(model);
        const fileName = this.resolveFileName(model);
        this.startDownload(prettyModel, fileName);
    }

    public prettyFormat(model: string): string {
        const indentationSymbol ='\t';
        const newLineSymbol = '\n';
        const prettyModel = format(model, {
            indentation: indentationSymbol,
            lineSeparator: newLineSymbol,
            collapseContent: true,
            forceSelfClosingEmptyTag: true,
        });
        return  prettyModel.replace(new RegExp(`^(\\s*)([\\S ]*?)<!\\[CDATA\\[${newLineSymbol}([\\s\\S]*?)]]>(\\S*?)$`, 'gm'), (match: string, tagIndent: string, startingTag: string, code: string, endingTag: string) => {
            const contentIndent = `${tagIndent}${indentationSymbol}`;
            const indentedCode = code.replace(/^([\s\S]*?)$/gm, `${contentIndent}$&`);
            return `${tagIndent}${startingTag}${newLineSymbol}${contentIndent}<![CDATA[${newLineSymbol}${indentedCode}]]>${newLineSymbol}${tagIndent}${endingTag}`;
        });
    }

    /**
     * Triggers a download of an SVG file containing the graphical model
     */
    public downloadAsSvg(svg: SVGSVGElement): void {
        // TODO: NAB-326 refactor https://github.com/angular/components/issues/11315
        const serializer = new XMLSerializer();
        const style = document.createElementNS(CanvasConfiguration.SVG_NAMESPACE, 'style') as SVGStyleElement;
        style.textContent = '@import url("https://fonts.googleapis.com/icon?family=Material+Icons");\n' +
            '.svg-inactive-stroke {\n' +
            '    stroke: black !important;\n' +
            '}\n' +
            '\n' +
            '.svg-inactive-fill {\n' +
            '    fill: black !important;\n' +
            '}\n' +
            '\n' +
            '.svg-active-stroke {\n' +
            '    stroke: map-get($netgrif-blue, A200) !important;\n' +
            '}\n' +
            '\n' +
            '.svg-active-fill {\n' +
            '    fill: map-get($netgrif-blue, A200) !important;\n' +
            '}\n' +
            '\n' +
            '.svg-invisible-fill {\n' +
            '    fill: none !important;\n' +
            '}\n' +
            '\n' +
            '.svg-transition-enabled {\n' +
            '    stroke: green;\n' +
            '    fill: yellowgreen;\n' +
            '}\n' +
            '\n' +
            '.svg-transition-disabled {\n' +
            '    stroke: red;\n' +
            '    fill: white;\n' +
            '}\n' +
            '\n' +
            '.svg-transition-firing {\n' +
            '    stroke: green;\n' +
            '    fill: none;\n' +
            '}\n' +
            '\n' +
            '.svg-fire-arrow-cancel-active {\n' +
            '    fill: coral;\n' +
            '    stroke: red;\n' +
            '}\n' +
            '\n' +
            '.svg-fire-arrow-cancel-inactive {\n' +
            '    fill: none;\n' +
            '    stroke: none;\n' +
            '}\n' +
            '\n' +
            '.svg-fire-arrow-finish-active {\n' +
            '    stroke: green;\n' +
            '    fill: yellowgreen;\n' +
            '}\n' +
            '\n' +
            '.svg-fire-arrow-finish-inactive {\n' +
            '    fill: none;\n' +
            '    stroke: none;\n' +
            '}\n' +
            '\n' +
            '.svg-icon-active {\n' +
            '    display: block;\n' +
            '}\n' +
            '\n' +
            '.svg-icon-inactive {\n' +
            '    display: none;\n' +
            '}\n';
        svg.appendChild(style);
        let svgModel = serializer.serializeToString(svg);
        svgModel = this.removeAngular(svgModel);
        svgModel = this.setDimensionAndScale(svgModel, svg);

        const fileName = this.resolveFileName(this.model, 'svg');
        this.startDownload(svgModel, fileName);
        svg.removeChild(style);
    }

    private removeAngular(svgModel: string): string {
        svgModel = svgModel.replace('<defs xmlns="">', '<defs>');
        svgModel = svgModel.replace(/&lt;!\[CDATA\[/g, '<![CDATA[');
        svgModel = svgModel.replace(/]]&gt;/g, ']]>');
        svgModel = svgModel.replace(/ _ngcontent-[\w].*?=""/g, '');
        return svgModel
    }

    private setDimensionAndScale(svgModel: string, svg: SVGSVGElement): string {
        let gElement;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < svg.childNodes.length; i++) {
            if (svg.childNodes[i] instanceof SVGGElement) {
                gElement = svg.childNodes[i];
                break;
            }
        }
        if (!gElement) {
            return svgModel;
        }
        const canvasBounds = gElement.getBBox();
        const width = this._modelService.alignPositionX(canvasBounds.x + canvasBounds.width) + ModelerConfig.SIZE / 2;
        const height = this._modelService.alignPositionY(canvasBounds.y + canvasBounds.height) + ModelerConfig.SIZE / 2;
        svgModel = svgModel.replace('width="10000"', `width="${width}"`);
        svgModel = svgModel.replace('height="10000"', `height="${height}"`);
        svgModel = svgModel.replace(/scale\([.+\-0-9]*\) translate\([.+\-0-9]*px, [.+\-0-9]*px\)/g, '');
        return svgModel;
    }

    private startDownload(serialisedModel: string, fileName: string): void {
        let xmlBlob = null;
        if (window.Blob) {
            xmlBlob = new Blob([serialisedModel], {type: 'text/plain;charset=utf-8'});
        }
        if (xmlBlob != null) {
            this._downloadLink = document.createElement('a');
            this._downloadLink.download = fileName;
            this._downloadLink.innerHTML = 'Download Model' + fileName;
            if (window.webkitURL !== undefined) {
                this._downloadLink.href = window.webkitURL.createObjectURL(xmlBlob);
            } else {
                if (window.URL.createObjectURL !== undefined) {
                    this._downloadLink.href = window.URL.createObjectURL(xmlBlob);
                    this._downloadLink.onclick = (event) => {
                        document.body.removeChild(event.target as Node);
                    };
                    this._downloadLink.style.display = 'none';
                    document.body.appendChild(this._downloadLink);
                }
            }
            this._downloadLink.click();
        }
    }

    private resolveFileName(model: PetriNet, extension = 'xml'): string {
        return `${model.id ? model.id : 'newmodel'}.${extension}`;
    }

    private deadNet(): boolean {
        const transitions = this.model.getTransitions();
        const simulation = new BasicSimulation(this.model);
        return transitions.every(t => {
            return !simulation.isEnabled(t.id);
        });
    }
}
