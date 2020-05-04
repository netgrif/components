import {AutocompleteCategory} from '../autocomplete-category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Operator} from '../../operator/operator';
import {Query} from '../../query/query';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {SearchInputType} from '../search-input-type';
import {DatafieldMapKey} from '../../datafield-map-key';
import {SearchAutocompleteOption} from '../search-autocomplete-option';

interface Datafield {
    netId: string;
    fieldId: string;
    fieldType: string;
}

export class CaseDataset extends AutocompleteCategory<Datafield> {

    protected static DISABLED_TYPES = ['button', 'file'];

    protected _selectedDatafield: Datafield;

    protected _dynamicOptionsMap: Map<string, Array<any>>;


    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(undefined,
            undefined,
            'search.category.case.dataset',
            logger);
    }

    get inputType(): SearchInputType {
        return SearchInputType.AUTOCOMPLETE;
    }

    get allowedOperators(): Array<Operator<any>> {
        if (!this._selectedDatafield) {
            return [];
        }
        switch (this._selectedDatafield.fieldType) {

        }
    }

    get options(): Array<SearchAutocompleteOption> {
        const result = [];

        if (!this._selectedDatafield) {
            for (const entry of this._optionsMap.entries()) {
                const mapKey = DatafieldMapKey.parse(entry[0]);
                result.push({
                    text: mapKey.title,
                    value: entry[1],
                    icon: mapKey.icon
                });
            }
        }

        return result;
    }

    protected get elasticKeywords(): Array<string> {
        return [];
    }

    reset() {
        super.reset();
    }

    protected generateQuery(userInput: Array<Datafield>): Query {
        return super.generateQuery(userInput);
    }

    protected createOptions(): void {
        this._optionalDependencies.caseViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                petriNet.immediateData
                    .filter(immediateData => {
                        return immediateData.title !== undefined
                            && immediateData.title.trim().length > 0
                            && !CaseDataset.DISABLED_TYPES.includes(immediateData.type);
                    })
                    .forEach(immediateData => {
                        this.addToMap(DatafieldMapKey.serializedForm(immediateData.type, immediateData.title), {
                            netId: petriNet.stringId,
                            fieldId: immediateData.stringId,
                            fieldType: immediateData.type,
                        });
                    });
            });
        });
    }
}
