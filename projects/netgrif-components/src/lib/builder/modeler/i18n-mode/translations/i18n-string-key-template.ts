export class I18nStringKeyTemplate {
  public static readonly model = {
    title: () => 'model_title',
    defaultCaseName: () => 'model_default_case_name',
  };
  public static readonly task = {
    title: (id) => `task_${id}_title`,
    event: {
      title: (id, eventId) => `task_${id}_event_${eventId}_title`,
      message: (id, eventId) => `task_${id}_event_${eventId}_message`,
    },
  };
  public static readonly data = {
    title: (id) => `data_${id}_title`,
    placeholder: (id) => `data_${id}_placeholder`,
    description: (id) => `data_${id}_description`,
    init: (id) => `data_${id}_init`,
    option: (dataId, optionId) => `data_${dataId}_option_${optionId}`,
    validation: (dataId, validationId) => `data_${dataId}_validation_${validationId}`,
  };
  public static readonly role = {
    title: (id) => `role_${id}_title`,
    event: {
      title: (id, eventId) => `role_${id}_event_${eventId}_title`,
      message: (id, eventId) => `role_${id}_event_${eventId}_message`,
    },
  };
}
