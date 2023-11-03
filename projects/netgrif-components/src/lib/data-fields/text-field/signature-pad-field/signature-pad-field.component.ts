import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, HostListener,
    Inject,
    NgZone,
    Optional,
    Output,
    ViewChild
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextAreaField,
    AbstractSimpleTextFieldComponent
} from '@netgrif/components-core';

@Component({
    selector: 'nc-signature-pad-field',
    templateUrl: './signature-pad-field.component.html',
    styleUrls: ['./signature-pad-field.component.scss']
})
export class SignaturePadFieldComponent extends AbstractSimpleTextFieldComponent implements AfterViewInit {

    @ViewChild('signPad', {static: false}) signPad!: ElementRef<HTMLCanvasElement>;
    @ViewChild('canvasDiv') canvasDiv!: ElementRef<HTMLCanvasElement>;
    @Output() signatureSaved = new EventEmitter();
    protected signatureImg?: string;
    protected signPadElement: any;
    protected context: any;
    protected isDrawing!: boolean;
    public canvasWidth: number;
    public canvasHeight: number;

    constructor(protected _translate: TranslateService, protected _ngZone: NgZone,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>) {
        super(_translate, dataFieldPortalData);
        this.canvasWidth = 500;
        this.canvasHeight = 150;
    }

    public ngAfterViewInit(): void {
        this.signPadElement = this.signPad.nativeElement;
        this.context = this.signPadElement.getContext('2d');
        this.canvasWidth = this.canvasDiv.nativeElement.clientWidth - 2;
        this.context.strokeStyle = '#000';
    }

    onMouseDown(e: any): void {
        this.isDrawing = true;
        const coords = this.relativeCoords(e);
        this.context.moveTo(coords.x, coords.y);
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(e: any): void {
        this.isDrawing = false;
    }

    @HostListener('document:blur', ['$event'])
    onMouseUp(e: any): void {
        this.isDrawing = false;
    }

    onMouseMove(e: any): void {
        if (this.isDrawing) {
            const coords = this.relativeCoords(e);
            this.context.lineTo(coords.x, coords.y);
            this.context.stroke();
        }
    }

    clearSignature(): void {
        this.signatureImg = undefined;
        this.context.clearRect(0, 0, this.signPadElement.width, this.signPadElement.height);
        this.context.beginPath();
    }

    saveSignature(): void {
        this.signatureImg = this.signPadElement.toDataURL('image/png');
        this.signatureSaved.emit(this.signatureImg);
    }

    protected relativeCoords(event: any): { x: number, y: number } {
        const bounds = event.target.getBoundingClientRect();
        const cords = {
            clientX: event.clientX || event.changedTouches[0].clientX,
            clientY: event.clientY || event.changedTouches[0].clientY
        };
        const x = cords.clientX - bounds.left;
        const y = cords.clientY - bounds.top;
        return {x, y};
    }
}
