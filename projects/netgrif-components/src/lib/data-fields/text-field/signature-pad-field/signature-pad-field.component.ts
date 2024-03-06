import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Inject,
    NgZone,
    Optional,
    ViewChild
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextAreaField,
    AbstractSimpleTextFieldComponent
} from '@netgrif/components-core';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'nc-signature-pad-field',
    templateUrl: './signature-pad-field.component.html',
    styleUrls: ['./signature-pad-field.component.scss']
})
export class SignaturePadFieldComponent extends AbstractSimpleTextFieldComponent implements AfterViewInit {

    @ViewChild('signPad', {static: false}) signPad!: ElementRef<HTMLCanvasElement>;
    @ViewChild('canvasDiv') canvasDiv!: ElementRef<HTMLCanvasElement>;
    protected signatureImg?: string;
    protected signPadElement: any;
    protected context: any;
    protected isDrawing!: boolean;
    public canvasWidth: number;
    public canvasHeight: number;
    public aspectRatio = 0.2;

    constructor(protected _translate: TranslateService, protected _ngZone: NgZone,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>) {
        super(_translate, dataFieldPortalData);
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.signPadElement = this.signPad.nativeElement;
            this.context = this.signPadElement.getContext('2d');
            this.canvasWidth = this.canvasDiv.nativeElement.clientWidth - 2;
            this.canvasHeight = this.canvasWidth * this.aspectRatio;
            this.formControlRef.valueChanges.pipe(
                filter(value => value !== this.signatureImg)
            ).subscribe(value => {
                this.signatureImg = value;
                const img = new Image();
                img.onload = () => {
                    this.context.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
                };
                img.src = this.signatureImg;
            });
        });
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
    mouseUp(e: any): void {
        this.isDrawing = false;
        this.saveSignature();
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
        this.formControlRef.setValue(undefined);
    }

    saveSignature(): void {
        this.signatureImg = this.signPadElement.toDataURL('image/png');
        this.formControlRef.setValue(this.signatureImg);
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
