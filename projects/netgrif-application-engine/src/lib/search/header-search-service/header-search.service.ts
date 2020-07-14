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

/**
 * Acts as an intermediary between the {@link AbstractHeaderService} instances of various types and the {@link SearchService}
 */
@Injectable()
export class HeaderSearchService {

    protected _headerService: AbstractHeaderService;
    protected _columnToPredicate: Map<number, number>;

    constructor(protected _categoryFactory: CategoryFactory, @Optional() protected _searchService: SearchService) {
        this._columnToPredicate = new Map<number, number>();
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
        } else {
            this.processTaskSearch(changeDescription);
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

        const category = this.resolveCaseMetaCategory(changeDescription.fieldIdentifier);
        const predicate = category.generatePredicate([changeDescription.searchInput]);
        this.addPredicate(changeDescription.columnIdentifier, predicate);
    }

    /**
     * @param metaField the type of the meta field
     * @returns the corresponding Category object with it's default operator set
     */
    protected resolveCaseMetaCategory(metaField: string): Category<any> {
        switch (metaField) {
            case CaseMetaField.VISUAL_ID:
                return this._categoryFactory.getWithDefaultOperator(CaseVisualId);
            case CaseMetaField.AUTHOR:
                return this._categoryFactory.getWithDefaultOperator(CaseAuthor);
            case CaseMetaField.CREATION_DATE:
                return this._categoryFactory.getWithDefaultOperator(CaseCreationDate);
            case CaseMetaField.TITLE:
                return this._categoryFactory.getWithDefaultOperator(CaseTitle);
        }
    }

    protected processCaseDataSearch(changeDescription: SearchChangeDescription): void {

    }

    protected processTaskSearch(changeDescription: SearchChangeDescription): void {

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
        if (predicateIndex) {
            this._searchService.removePredicate(predicateIndex);
            this._columnToPredicate.delete(column);
        }
    }
}
