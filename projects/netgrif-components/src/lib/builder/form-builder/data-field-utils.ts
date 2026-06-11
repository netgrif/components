import {DataType} from '@netgrif/petriflow';

export class DataFieldUtils {
  public static readonly FIELDS_WITH_OPTIONS = [
    DataType.ENUMERATION,
    DataType.ENUMERATION_MAP,
    DataType.MULTICHOICE,
    DataType.MULTICHOICE_MAP,
  ];
  public static readonly FIELDS_WITH_INITS = [
    DataType.MULTICHOICE,
    DataType.MULTICHOICE_MAP,
  ];
}
