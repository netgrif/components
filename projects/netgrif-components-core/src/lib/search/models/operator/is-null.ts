import {Operator} from './operator';
import {Query} from '../query/query';
import {Operators} from './operators';
import {BooleanOperator} from "../boolean-operator";

/**
 * An operator that can be used on any field and matches entries with null or empty string values.
 *
 * Beware that if any additional constraints should be applied to the generated query the results may behave strangely.
 * Consult the [createQueryWithConstraint()]{@link IsNull#createQueryWithConstraint} method for more information.
 */
export class IsNull extends Operator<any> {

    constructor() {
        super(0);
    }

    /**
     * @param pfqlKeywords the queried fields
     * @returns Generates a query that matches null fields and fields with empty string values.
     */
    createQuery(pfqlKeywords: Array<string>): Query {
        return Operator.forEachKeyword(pfqlKeywords,
            keyword => {
                const nullQuery = this.nullQuery(keyword);
                const emptyQuery = this.emptyQuery(keyword);
                return Query.combineQueries([nullQuery, emptyQuery], BooleanOperator.OR)
            }
        );
    }

    /**
     * Creates query to check if the fields (in pfqlKeywords) are null or empty.
     *
     * @param pfqlKeywords attributes that should be null or empty
     * @param constraint constraint to match process identifier
     *
     * @return Query containing the null and empty query with the contraint.
     */
    createQueryWithConstraint(pfqlKeywords: Array<string>, constraint: Query): Query {
        if (constraint.isEmpty) {
            return this.createQuery(pfqlKeywords);
        }
        return Operator.forEachKeyword(pfqlKeywords,
            keyword => {
                const nullQuery = this.nullQuery(keyword);
                const emptyQuery = this.emptyQuery(keyword);
                const nullAndConstraintQuery = Query.combineQueries([nullQuery, constraint], BooleanOperator.AND)
                const emptyAndConstraintQuery = Query.combineQueries([emptyQuery, constraint], BooleanOperator.AND)
                return Query.combineQueries([nullAndConstraintQuery, emptyAndConstraintQuery], BooleanOperator.OR)
            });
    }

    /**
     * @param pfqlKeyword the queried field
     * @returns a query that checks whether the field is null
     */
    protected nullQuery(pfqlKeyword: string): Query {
        return new Query(`${pfqlKeyword} eq null`);
    }

    /**
     * @param pfqlKeyword the queried field
     * @returns a query that checks whether the field has an empty string value
     */
    protected emptyQuery(pfqlKeyword: string): Query {
        return new Query(`${pfqlKeyword} eq ''`);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.isNull'];
    }

    serialize(): Operators | string {
        return Operators.IS_NULL;
    }
}
