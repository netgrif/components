import {Injectable, Optional} from '@angular/core';
import {SearchService} from '../search-service/search.service';
import {AbstractHeaderService} from '../../header/abstract-header-service';
import {HeaderType} from '../../header/models/header-type';
import {filter} from 'rxjs/operators';
import {HeaderChangeType} from '../../header/models/user-changes/header-change-type';
import {HeaderMode} from '../../header/models/header-mode';
import {ModeChangeDescription} from '../../header/models/user-changes/mode-change-description';
import {SearchChangeDescription} from '../../header/models/user-changes/search-change-description';
import {HeaderColumnType} from '../../header/models/header-column';
import {CaseMetaField} from '../../header/case-header/case-menta-enum';
import {CategoryFactory} from '../category-factory/category-factory';
import {CaseVisualId} from '../models/category/case/case-visual-id';
import {Category} from '../models/category/category';
import {CaseAuthor} from '../models/category/case/case-author';
import {CaseCreationDate} from '../models/category/case/case-creation-date';
import {CaseTitle} from '../models/category/case/case-title';
import {Predicate} from '../models/predicate/predicate';
import {CaseDataset} from '../models/category/case/case-dataset';
import {DatafieldMapKey} from '../models/datafield-map-key';
import {ProcessService} from '../../process/process.service';

/**
 * Acts as an intermediary between the {@link AbstractHeaderService} instances of various types and the {@link SearchService}
 */
@Injectable()
export class HeaderSearchService {

    protected _headerService: AbstractHeaderService;
    protected _columnToPredicate: Map<number, number>;
    protected _typeToCategory: Map<string, Category<any>>;

    constructor(protected _categoryFactory: CategoryFactory,
                protected _processService: ProcessService,
                @Optional() protected _searchService: SearchService) {
        this._columnToPredicate = new Map<number, number>();
        this._typeToCategory = new Map<string, Category<any>>();
        [
            {k: CaseMetaField.VISUAL_ID, v: CaseVisualId},
            {k: CaseMetaField.TITLE, v: CaseTitle},
            {k: CaseMetaField.CREATION_DATE, v: CaseCreationDate},
            {k: CaseMetaField.AUTHOR, v: CaseAuthor}
        ].forEach(pair => {
            this._typeToCategory.set(pair.k, this._categoryFactory.getWithDefaultOperator(pair.v));
        });
        this._typeToCategory.set(HeaderColumnType.IMMEDIATE, this._categoryFactory.get(CaseDataset));
    }

    public set headerService(headerService: AbstractHeaderService) {
        if (headerService.headerType === HeaderType.CASE || headerService.headerType === HeaderType.TASK) {
            this._headerService = headerService;
        }

        if (headerService && this._searchService) {
            this.initializeHeaderSearch();
        }
    }

    /**
     * {@link HeaderSearchService} can only be initialized if it successfully injected a {@link SearchService}
     * and a {@link AbstractHeaderService} instance of any of the supported types was set into it.
     *
     * Currently only task and case header searching is supported.
     */
    protected initializeHeaderSearch(): void {
        this._headerService.headerChange$
            .pipe(filter(change => change.changeType === HeaderChangeType.SEARCH || change.changeType === HeaderChangeType.MODE_CHANGED))
            .subscribe(change => {
                if (change.changeType === HeaderChangeType.SEARCH) {
                    this.processSearchChange(change.headerType, change.description as SearchChangeDescription);
                } else if ((change.description as ModeChangeDescription).previousMode === HeaderMode.SEARCH) {
                    this.processModeChange();
                }
            });
    }

    /**
     * Pushes all the predicates from the headers into the search interface
     */
    protected processModeChange(): void {

    }

    /**
     * Transforms the {@link HeaderChange} object into a search predicate
     */
    protected processSearchChange(headerType: HeaderType, changeDescription: SearchChangeDescription): void {
        if (headerType === HeaderType.CASE) {
            this.processCaseSearch(changeDescription);
        }
    }

    /**
     * Processes the change object and resolves it into the appropriate case search predicate change
     * @param changeDescription the change object that should be resolved
     */
    protected processCaseSearch(changeDescription: SearchChangeDescription): void {
        if (changeDescription.type === HeaderColumnType.META) {
            this.processCaseMetaSearch(changeDescription);
        } else {
            this.processCaseDataSearch(changeDescription);
        }
    }

    /**
     * Processes the change object of a case meta header and resolves it into the appropriate case search predicate change
     * @param changeDescription the change object that should be resolved
     */
    protected processCaseMetaSearch(changeDescription: SearchChangeDescription): void {
        if (this.emptyInput(changeDescription)) {
            this.removePredicate(changeDescription.columnIdentifier);
            return;
        }

        const category = this._typeToCategory.get(changeDescription.fieldIdentifier);
        const predicate = category.generatePredicate([changeDescription.searchInput]);
        this.addPredicate(changeDescription.columnIdentifier, predicate);
    }

    protected processCaseDataSearch(changeDescription: SearchChangeDescription): void {
        const category = this._typeToCategory.get(changeDescription.type) as CaseDataset;
        category.selectDatafields(DatafieldMapKey.serializedForm(changeDescription.fieldType, changeDescription.fieldIdentifier));

        this._processService.getNet(changeDescription.petriNetIdentifier).subscribe(net => {
            category.setConstraintNet([net.stringId]);
            const predicate = category.generatePredicate([changeDescription.searchInput]);
            this.addPredicate(changeDescription.columnIdentifier, predicate);
        });
    }

    /**
     * @param changeDescription information about the search header change
     * @returns whether the input was cleared
     */
    protected emptyInput(changeDescription: SearchChangeDescription): boolean {
        return !changeDescription.searchInput;
    }

    /**
     * Updates a Predicate for a given column.
     * Removes an existing predicate for this column if it exists and adds the new Predicate.
     * @param column the index of the header column
     * @param predicate the Predicate that should be added
     */
    protected addPredicate(column: number, predicate: Predicate): void {
        this.removePredicate(column);
        const predicateIndex = this._searchService.addPredicate(predicate);
        this._columnToPredicate.set(column, predicateIndex);
    }

    /**
     * Removes a predicate that corresponds to the provided column
     * @param column the index of the column that cleared it's search
     */
    protected removePredicate(column: number): void {
        const predicateIndex = this._columnToPredicate.get(column);
        if (predicateIndex !== undefined) {
            this._searchService.removePredicate(predicateIndex);
            this._columnToPredicate.delete(column);
        }
    }
}
