import {Query} from '../query/query';

export abstract class Operator {

    /**
     * Determines the arity of the operator, that is the number of arguments/operands it takes.
     */
    private static readonly NUMBER_OF_OPERANDS: number;

    /**
     * The operator symbol that is used to generate the query.
     */
    private static readonly OPERATOR: string;

    private static readonly

    /**
     * Escapes all escapable Elasticsearch symbols. Removes all unescapable Elasticsearch symbols.
     *
     * For a list of symbols see Elasticsearch's Query string query
     * [documentation]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#_reserved_characters}
     * @param input user input that should have special characters escaped
     */
    public static escapeInput(input: string): string {

    }

    /**
     * Creates a Query string query string literal with the provided arguments.
     * @param elasticKeyword Elasticsearch index keyword for the field you want to query
     * @param arg The value that you want to query the property for
     * @param operator The operator you want to use to query the indexed field. Consult the Elasticsearch's
     * [documentation]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html}
     * for more information.
     * @returns combines the input strings by this pattern: `([elasticKeyword]:[operator][arg])`
     */
    public static query(elasticKeyword: string, arg: string, operator: string): string {
        return `(${elasticKeyword}:${operator}${arg})`;
    }

    /**
     *
     */
    public abstract createQuery(elasticKeywords: Array<string>, args: Array<string>): Query {

    }
}
