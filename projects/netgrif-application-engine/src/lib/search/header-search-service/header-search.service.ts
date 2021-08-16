import {Injectable, OnDestroy, Optional} from '@angular/core';
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
import {CaseStringId} from '../models/category/case/case-string-id';
import {Predicate} from '../models/predicate/predicate';
import {ProcessService} from '../../process/process.service';
import {CaseSimpleDataset} from '../models/category/case/case-simple-dataset';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {Subscription} from 'rxjs';

/**
 * Holds the Id of the predicate in the {@link SearchService}
 */
interface PredicateId {
    predicateId: number;
}

/**
 * Holds the information necessary for the configuration of a {@link Category} class to generate
 * a predicate for a Meta header field
 */
interface MetaGeneratorConfiguration {
    type: HeaderColumnType.META;
    fieldIdentifier: string;
    userInput: Array<any>;
}

/**
 * Holds the information necessary for the configuration of a {@link Category} class to generate
 * a predicate for a Data header field
 */
interface DataGeneratorConfiguration {
    type: HeaderColumnType.IMMEDIATE;
    fieldType: string;
    fieldTitle: string;
    userInput: Array<any>;
}

type HeaderConfiguration = PredicateId & (MetaGeneratorConfiguration | DataGeneratorConfiguration);

/**
 * Acts as an intermediary between the {@link AbstractHeaderService} instances of various types and the {@link SearchService}
 */
@Injectable()
export class HeaderSearchService implements OnDestroy {

    protected _headerService: AbstractHeaderService;
    protected _columnToConfiguration: Map<number, HeaderConfiguration>;
    protected _typeToCategory: Map<string, Category<any>>;
    protected _headerSub: Subscription;
    protected _searchSub: Subscription;

    constructor(protected _categoryFactory: CategoryFactory,
                protected _processService: ProcessService,
                protected _translate: TranslateService,
                protected _logger: LoggerService,
                @Optional() protected _searchService: SearchService) {
        this._columnToConfiguration = new Map<number, HeaderConfiguration>();
        this._typeToCategory = new Map<string, Category<any>>();
        [
            {k: CaseMetaField.VISUAL_ID, v: CaseVisualId},
            {k: CaseMetaField.TITLE, v: CaseTitle},
            {k: CaseMetaField.CREATION_DATE, v: CaseCreationDate},
            {k: CaseMetaField.AUTHOR, v: CaseAuthor},
            {k: CaseMetaField.MONGO_ID, v: CaseStringId}
        ].forEach(pair => {
            this._typeToCategory.set(pair.k, this._categoryFactory.getWithDefaultOperator(pair.v));
        });
        this._typeToCategory.set(HeaderColumnType.IMMEDIATE, this._categoryFactory.get(CaseSimpleDataset));
    }

    ngOnDestroy(): void {
        if (this._headerSub) {
            this._headerSub.unsubscribe();
        }
        if (this._searchSub) {
            this._searchSub.unsubscribe();
        }
        for (const cat of this._typeToCategory.values()) {
            cat.destroy();
        }
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

        this._headerSub = this._headerService.headerChange$
            .pipe(filter(change => change.changeType === HeaderChangeType.SEARCH || change.changeType === HeaderChangeType.MODE_CHANGED))
            .subscribe(change => {
                if (change.changeType === HeaderChangeType.SEARCH) {
                    this.processSearchChange(change.headerType, change.description as SearchChangeDescription);
                } else if ((change.description as ModeChangeDescription).previousMode === HeaderMode.SEARCH) {
                    this.processModeChange();
                }
            });

        this._searchSub =
            this._searchService.predicateRemoved$.subscribe(event => this.handlePredicateRemoval(event.index, event.clearInput));
    }

    /**
     * Pushes all the predicates from the headers into the search interface and clears the header inputs
     */
    protected processModeChange(): void {
        const addedPredicateIds = [];
        this._columnToConfiguration.forEach(config => {
            this._searchService.removePredicate(config.predicateId);

            let editableCategory;
            if (config.type === HeaderColumnType.META) {
                editableCategory = this._typeToCategory.get(config.fieldIdentifier).duplicate();
                editableCategory.selectDefaultOperator();
                editableCategory.setOperands(config.userInput);
            } else  {
                const dataset = (this._typeToCategory.get(HeaderColumnType.IMMEDIATE) as CaseSimpleDataset);
                editableCategory = dataset.transformToCaseDataset(config.fieldType, config.fieldTitle, config.userInput);
            }
            addedPredicateIds.push(this._searchService.addGeneratedLeafPredicate(editableCategory));
        });

        this._searchService.show(addedPredicateIds);

        this._columnToConfiguration.clear();
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
        const config = {
            fieldIdentifier: changeDescription.fieldIdentifier,
            userInput: [changeDescription.searchInput]
        };
        const category = this._typeToCategory.get(config.fieldIdentifier);
        const predicate = category.generatePredicate(config.userInput);
        this.addPredicate(changeDescription.columnIdentifier, predicate, {
            type: HeaderColumnType.META,
            ...config
        });
    }

    /**
     * Processes the change object of a case immediate data header and resolves it into the appropriate case search predicate change
     * @param changeDescription the change object that should be resolved
     */
    protected processCaseDataSearch(changeDescription: SearchChangeDescription): void {
        this._processService.getNet(changeDescription.petriNetIdentifier).subscribe(net => {
            const config = {
                fieldType: changeDescription.fieldType,
                fieldTitle: changeDescription.fieldTitle,
                userInput: [changeDescription.searchInput]
            };
            const category = this._typeToCategory.get(changeDescription.type) as CaseSimpleDataset;
            category.configure(changeDescription.fieldIdentifier, config.fieldType, [net.identifier]);
            const predicate = category.generatePredicate(config.userInput);
            this.addPredicate(changeDescription.columnIdentifier, predicate, {
                type: HeaderColumnType.IMMEDIATE,
                ...config
            });
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
     * Updates a Predicate for a given column.
     * Removes an existing predicate for this column if it exists and adds the new Predicate.
     * @param column the index of the header column
     * @param predicate the Predicate that should be added
     * @param configuration data necessary for the configuration of the {@link Category} that generates the added predicate
     */
    protected addPredicate(column: number,
                           predicate: Predicate,
                           configuration: MetaGeneratorConfiguration | DataGeneratorConfiguration): void {

        this.removePredicate(column, !this._columnToConfiguration.has(column));
        const predicateId = this._searchService.addPredicate(predicate);
        this._columnToConfiguration.set(column, {predicateId, ...configuration});
    }

    /**
     * Removes a predicate that corresponds to the provided column
     * @param column the index of the column that cleared it's search
     * @param clearInput whether the corresponding header search input should be cleared
     */
    protected removePredicate(column: number, clearInput = true): void {
        const predicateConfig = this._columnToConfiguration.get(column);
        if (predicateConfig !== undefined) {
            this._searchService.removePredicate(predicateConfig.predicateId, clearInput);
            this._columnToConfiguration.delete(column);
        }
    }

    /**
     * @param removedId the id of the removed {@link Predicate}
     * @param clearInput whether the corresponding header search input should be cleared
     */
    protected handlePredicateRemoval(removedId: number, clearInput = true): void {
        if (this._headerService && clearInput) {
            this._headerService.clearHeaderSearch(removedId);
        }
        this._columnToConfiguration.delete(removedId);
    }
}
