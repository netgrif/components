import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NgxDropzoneChangeEvent} from 'ngx-dropzone';
import {ModelImportService} from '../model-import-service';
import {ModelerUtils} from '../modeler-utils';
import {HistoryService} from '../services/history/history.service';
import {ModelService} from '../services/model/model.service';
import {ContextMenu} from './context-menu/context-menu';
import {ContextMenuComponent} from './context-menu/context-menu.component';
import {EditModeService} from './edit-mode.service';
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

@Component({
    selector: 'nc-builder-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditModeComponent implements AfterViewInit, OnDestroy {

    @ViewChild('contextMenu', {read: ElementRef}) contextMenu: ElementRef;
    @ViewChild('contextMenu') contextMenuComponent: ContextMenuComponent;

    private contextMenuSubscription: Subscription;
    private gridSubscription: Subscription;

    constructor(
        private importService: ModelImportService,
        private _modelService: ModelService,
        private _editModeService: EditModeService,
        private historyService: HistoryService,
        public dialog: MatDialog,
        private _translateService: TranslateService,
        private _cdr: ChangeDetectorRef
    ) {
        this.gridSubscription = this._editModeService.gridChanged$?.subscribe(() => this._cdr.markForCheck());
    }

    @HostListener('contextmenu', ['$event'])
    onRightClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    ngAfterViewInit() {
        ModelerUtils.clearSelection();
        this.contextMenuSubscription = this._editModeService.contextMenuItems.subscribe(menu => {
            if (!menu) {
                this.contextMenu.nativeElement.style.visibility = 'hidden';
                return;
            }
            this.contextMenuComponent.menuItems = menu.items;
            this.contextMenu.nativeElement.style.position = 'fixed';
            this.contextMenu.nativeElement.style.visibility = 'visible';
            this.contextMenu.nativeElement.style.opacity = '1';
            this.checkPosition(menu);
            setTimeout(() => {
                this.checkPosition(menu);
            }, 100);
        });
        setTimeout(() => {
            if (this._modelService.model === undefined) {
                this._modelService.model = this._modelService.newModel();
                this.historyService.save(this._translateService.instant('builder.modeler.edit-mode.services.newModelCreated'));
            } else {
                this._editModeService.renderModel();
            }
        });
    }

    private checkPosition(menu: ContextMenu): void {
        const host: HTMLElement = this.contextMenu.nativeElement;
        const menuElement = (host.firstElementChild ?? host) as HTMLElement;
        const area = (host.closest('#modeler_area') ?? document.getElementById('modeler_area')) as HTMLElement;
        const areaBounds = area.getBoundingClientRect();

        host.style.left = '0px';
        host.style.top = '0px';
        const origin = host.getBoundingClientRect();

        const width = menuElement.offsetWidth;
        const height = menuElement.offsetHeight;

        const x = Math.max(areaBounds.left, Math.min(menu.position.x, areaBounds.right - width));
        const y = Math.max(areaBounds.top, Math.min(menu.position.y, areaBounds.bottom - height));

        host.style.left = (x - origin.left) + 'px';
        host.style.top = (y - origin.top) + 'px';
    }

    ngOnDestroy(): void {
        this.contextMenuSubscription?.unsubscribe();
        this.gridSubscription?.unsubscribe();
        this.editModeService.activeTool.unbind();
    }

    onDropZone($event: NgxDropzoneChangeEvent) {
        $event.addedFiles[0]?.text()?.then(originFile => {
            this.importService.importFromXml(originFile);
        });
    }

    get editModeService(): EditModeService {
        return this._editModeService;
    }
}
