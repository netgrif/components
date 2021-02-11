interface InnerNode extends GuiMetaAttribute {
    operator: 'AND' | 'OR' | 'NOT'; // univerzalna negacia sa vyuziva v custom queries na projektoch
    subQueries: Array<InnerNode | LeafNode>;
}

interface LeafNode extends GuiMetaAttribute {
    // niektore attributes su len pre cases, niektore len pre tasks a niektore spolocne
    attribute: 'authorEmail' | 'authorName' | 'authorId' | 'processIdentifier' | 'processId' | 'transitionId' | 'roleId' | 'title'
        | 'visualId' | 'fulltext' | 'groupId' | 'caseId' | 'assigneeId' | 'fieldId';
    attributeArguments?: {
        filedId: string;
        fieldType: string; // po uprave elastic mappingu je nutne vediet aky index sa ma dopytovat
    };
    // synonyma pre lessThan - fewerThan, greaterThan - moreThan?
    // zvlast operator na isNull a zvlast na isEmpty?
    // treba zabezpecit, aby equals spravne matchoval elasticove hodnoty nech nenajde match ak sa vyhladava nieco co ma so skutocnou
    // hodnotou len neprazdny prienik ale match to nie je - mozno cez operator umoznit jedno aj druhe spravanie
    operator: 'equals' | 'inRange' | 'isNull' | 'lessThan' | 'fuzzy' | 'greaterThan' | 'notEquals' | 'substring' | 'lessThanOrEqual'
        | 'greaterThanOrEqual';
    // mozno chceme skratit resp. umoznit skratku args?
    // ako chceme reprezentovat datumy?
    // stara syntax umoznovala vypisanie viacerych hodnot na reprezentaciu viacerych queries. Chceme podobne spravanie zachovat? - implicitne musia byt OR quries, lebo AND nedavaju zmysel
    arguments: Array<string> | Array<number> | Array<boolean>;
}

interface GuiMetaAttribute {
    // nepovinne, sluzi na ulozenie informacii potrebnych na rekonstrukciu GUI zobrazenia
    guiMetaData?: GuiMetaData;
}

interface GuiMetaData {
    category: string;
    params?: any; // TODO neviem, co mi treba vsetko na fakenutie stavu
}

// class
interface Filter {
    type: 'case' | 'task';
    body: InnerNode | LeafNode;
}


















const f: Filter = {
    type: 'case',
    body: {
        operator: 'AND',
        subQueries: [{
            attribute: 'authorEmail',
            operator: 'equals',
            arguments: ['kovar@netgrif.com']
        }, {
            attribute: 'processIdentifier',
            operator: 'equals',
            arguments: ['new_model']
        }, {
            operator: 'NOT',
            subQueries: [{
                operator: 'OR',
                subQueries: [{
                    attribute: 'fieldId',
                    attributeArguments: {
                        filedId: 'text_0',
                        fieldType: 'text'
                    },
                    operator: 'equals',
                    arguments: ['world']
                }, {
                    attribute: 'fieldId',
                    attributeArguments: {
                        filedId: 'number_0',
                        fieldType: 'number'
                    },
                    operator: 'inRange',
                    arguments: [5, 10]
                }]
            }]
        }, {
            attribute: 'roleId',
            operator: 'equals',
            arguments: ['5faba7140a975a1b77bd063f', '6017dc0a0a975a02a8dbb17a']
        }]
    }
};
