import {Injectable} from '@angular/core';
import {SearchIndex} from '../models/search-index';

/**
 * A utility service that aims to provide elasticsearch query string query index names for data set queries.
 *
 * If your app uses a customised elasticsearch database mapping for Case objects, that affects the way data fields are indexed you must
 * provide an updated version of this service, so that search can generate correct queries.
 *
 * You are encouraged to use this service when creating {@link Filter}s, with elastic query string queries, so that future changes to the
 * default mapping don't affect your existing code.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchIndexResolverService {

    public readonly KEYWORD = '.keyword';

    constructor() { }

    /**
     * Constructs the index name for the specified field.
     *
     * Note that almost all combinations are valid and will not throw an error when used to query the database, but not all combinations are
     * used by the application engine. The {@link SearchIndex} class has some information about which field types map to which indices, but
     * you should consult the backend documentation for more reliable information.
     * @param dataFieldIdentifier import ID of the queried data field
     * @param index the queried index
     * @param keyword whether the keyword of a TEXT index should be queried
     * @returns the full name of the specified index
     */
  public getIndex(dataFieldIdentifier: string, index: SearchIndex, keyword = false): string {
      return `dataSet.${dataFieldIdentifier}.${index}${keyword ? this.KEYWORD : ''}`;
  }

    /**
     * Constructs the index name for the specified core field.
     *
     * Note that almost all combinations are valid and will not throw an error when used to query the database, but not all combinations are
     * used by the application engine. The {@link SearchIndex} class has some information about which field types map to which indices, but
     * you should consult the backend documentation for more reliable information.
     * @param index the queried index
     * @param keyword whether the keyword of a TEXT index should be queried
     * @returns the full name of the specified index
     */
  public getCoreIndex(index: string, keyword = false): string {
      return `${index}${keyword ? this.KEYWORD : ''}`;
  }
}
