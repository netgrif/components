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
import {ProcessService} from '../../process/process.service';
import {CaseSimpleDataset} from '../models/category/case/case-simple-dataset';
import {TranslateService} from '@ngx-translate/core';
import {Moment} from 'moment';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {LoggerService} from '../../logger/services/logger.service';

interface PredicateInfo {
    predicateIndex: number;
    chipText: string;
}

/**
 * Acts as an intermediary between the {@link AbstractHeaderService} instances of various types and the {@link SearchService}
 */
@Injectable()
export class HeaderSearchService {

    protected _headerService: AbstractHeaderService;
    protected _columnToPredicate: Map<number, PredicateInfo>;
    protected _typeToCategory: Map<string, Category<any>>;

    constructor(protected _categoryFactory: CategoryFactory,
                protected _processService: ProcessService,
                protected _translate: TranslateService,
                protected _logger: LoggerService,
                @Optional() protected _searchService: SearchService) {
        this._columnToPredicate = new Map<number, PredicateInfo>();
        this._typeToCategory = new Map<string, Category<any>>();
        [
            {k: CaseMetaField.VISUAL_ID, v: CaseVisualId},
            {k: CaseMetaField.TITLE, v: CaseTitle},
            {k: CaseMetaField.CREATION_DATE, v: CaseCreationDate},
            {k: CaseMetaField.AUTHOR, v: CaseAuthor}
        ].forEach(pair => {
            this._typeToCategory.set(pair.k, this._categoryFactory.getWithDefaultOperator(pair.v));
        });
        this._typeToCategory.set(HeaderColumnType.IMMEDIATE, this._categoryFactory.get(CaseSimpleDataset));
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
        if (!this._searchService) {
            this._logger.error('You can\'t call initializeHeaderSearch without providing a SearchService to be injected!');
            return;
        }
        if (!this._headerService) {
            this._logger.error('You can\'t call initializeHeaderSearch without setting an AbstractHeaderService implementation instance!');
            return;
        }

        this._headerService.headerChange$
            .pipe(filter(change => change.changeType === HeaderChangeType.SEARCH || change.changeType === HeaderChangeType.MODE_CHANGED))
            .subscribe(change => {
                if (change.changeType === HeaderChangeType.SEARCH) {
                    this.processSearchChange(change.headerType, change.description as SearchChangeDescription);
                } else if ((change.description as ModeChangeDescription).previousMode === HeaderMode.SEARCH) {
                    this.processModeChange();
                }
            });

        this._searchService.predicateRemoved$.subscribe(event => this.handlePredicateRemoval(event.index, event.clearInput));
    }

    /**
     * Pushes all the predicates from the headers into the search interface and clears the header inputs
     */
    protected processModeChange(): void {
        if (this._searchChipService) {
            this._columnToPredicate.forEach(info => {
                this._searchChipService.addExistingChip(info.chipText, info.predicateIndex);
            });
        } else {
            const indices = [];
            this._columnToPredicate.forEach(info => {
                indices.push(info.predicateIndex);
            });
            indices.sort((a: number, b: number) => b - a);
            indices.forEach(index => {
                this._searchService.removePredicate(index);
            });
        }
        this._columnToPredicate.clear();
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
        if (this.emptyInput(changeDescription)) {
            this.removePredicate(changeDescription.columnIdentifier);
            return;
        }

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
        const category = this._typeToCategory.get(changeDescription.fieldIdentifier);
        const predicate = category.generatePredicate([changeDescription.searchInput]);
        this.addPredicate(changeDescription.columnIdentifier, predicate, this.createChipText(changeDescription, category));
    }

    /**
     * Processes the change object of a case immediate data header and resolves it into the appropriate case search predicate change
     * @param changeDescription the change object that should be resolved
     */
    protected processCaseDataSearch(changeDescription: SearchChangeDescription): void {
        this._processService.getNet(changeDescription.petriNetIdentifier).subscribe(net => {
            const category = this._typeToCategory.get(changeDescription.type) as CaseSimpleDataset;
            category.configure(changeDescription.fieldIdentifier, changeDescription.fieldType, [net.stringId]);
            const predicate = category.generatePredicate([changeDescription.searchInput]);
            this.addPredicate(changeDescription.columnIdentifier, predicate, this.createChipText(changeDescription, category));
        });
    }

    /**
     * @param changeDescription information about the search header change
     * @returns whether the input was cleared
     */
    protected emptyInput(changeDescription: SearchChangeDescription): boolean {
        return changeDescription.searchInput === undefined
            || changeDescription.searchInput === null
            || (typeof changeDescription.searchInput === 'string' && changeDescription.searchInput.length === 0);
    }

    /**
     * Returns the text that should be displayed by the chip that corresponds to the search change
     * @param changeDescription the change object that generates the predicate that should be described by the chip text
     * @param category the search category of the generated predicate
     */
    protected createChipText(changeDescription: SearchChangeDescription, category: Category<any>): string {
        let result = `${this._translate.instant(category.translationPath)}: `;
        if (changeDescription.type === HeaderColumnType.IMMEDIATE) {
            result += `${changeDescription.fieldTitle}: `;
        }
        if (changeDescription.fieldType === 'date') {
            result += (changeDescription.searchInput as Moment).format(DATE_FORMAT_STRING);
        } else if (changeDescription.fieldType === 'dateTime') {
            result += (changeDescription.searchInput as Moment).format(DATE_TIME_FORMAT_STRING);
        } else {
            result += changeDescription.searchInput;
        }
        return result;
    }

    /**
     * Updates a Predicate for a given column.
     * Removes an existing predicate for this column if it exists and adds the new Predicate.
     * @param column the index of the header column
     * @param predicate the Predicate that should be added
     * @param chipText the text that should be displayed by a chip representing the predicate
     */
    protected addPredicate(column: number, predicate: Predicate, chipText: string): void {
        this.removePredicate(column, !this._columnToPredicate.has(column));
        const predicateIndex = this._searchService.addPredicate(predicate);
        this._columnToPredicate.set(column, {predicateIndex, chipText});
    }

    /**
     * Removes a predicate that corresponds to the provided column
     * @param column the index of the column that cleared it's search
     * @param clearInput whether the corresponding header search input should be cleared
     */
    protected removePredicate(column: number, clearInput = true): void {
        const predicateInfo = this._columnToPredicate.get(column);
        if (predicateInfo !== undefined) {
            this._searchService.removePredicate(predicateInfo.predicateIndex, clearInput);
            this._columnToPredicate.delete(column);
        }
    }

    /**
     * Handles the removal of a {@link Predicate} from the {@link SearchService} by shifting
     * any affected indices referenced by the header search
     * @param removedIndex the index of the removed {@link Predicate}
     * @param clearInput whether the corresponding header search input should be cleared
     */
    protected handlePredicateRemoval(removedIndex: number, clearInput = true): void {
        let columnToRemove;
        this._columnToPredicate.forEach((info, columnNumber) => {
            if (info.predicateIndex === removedIndex) {
                columnToRemove = columnNumber;
                if (this._headerService && clearInput) {
                    this._headerService.clearHeaderSearch(columnNumber);
                }
            } else if (info.predicateIndex > removedIndex) {
                info.predicateIndex -= 1;
            }
        });
        if (columnToRemove !== undefined) {
            this._columnToPredicate.delete(columnToRemove);
        }
    }
}
