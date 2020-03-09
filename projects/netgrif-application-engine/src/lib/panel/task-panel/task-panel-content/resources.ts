export class Resources {
    static json = `{
  "_embedded" : {
    "cols": 4,
    "dataGroups" : [ {
      "fields" : {
        "_embedded" : {
          "localisedNumberFields" : [ {
            "stringId" : "number",
            "type" : "number",
            "name" : "Number",
            "description" : "Number field description",
            "placeholder" : "Number field placeholder",
            "behavior" : {
              "editable" : true
            },
            "layout" : {
              "x" : 0,
              "y" : 0,
              "cols" : 1,
              "rows" : 4
            },
            "value" : 10.0,
            "order" : 0,
            "minValue" : 0.0,
            "validationJS" : "if(value < 0){ if(this.validationErrors) this.validationErrors.inrange=true; return false;} else { if(this.validationErrors) this.validationErrors.inrange=false;} return true;",
            "validationErrors" : {
              "inrange" : false
            },
            "defaultValue" : 10.0
          } ]
        }
      },
      "alignment" : "start",
      "stretch" : true
    }, {
      "fields" : {
        "_embedded" : {
          "localisedTextFields" : [ {
            "stringId" : "text",
            "type" : "text",
            "name" : "Text",
            "description" : "Text field description",
            "placeholder" : "Text field placeholder",
            "behavior" : {
              "editable" : true
            },
            "layout" : {
              "x" : 0,
              "y" : 1,
              "cols" : 1,
              "rows" : 4
            },
            "value" : "text",
            "order" : 1,
            "subType" : "simple",
            "formatting" : "example@example.com",
            "validationJS" : "if(!(new RegExp(\"[a-z0-9!#\\\\u0024%&'*+\\/=?^_\`{|}~-]+(?:\\\\.[a-z0-9!#\\\\u0024%&'*+\\/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\").test(value))){ if(this.validationErrors) this.validationErrors.email=true; return false;} else { if(this.validationErrors) this.validationErrors.email=false;} return true;",
"validationErrors" : {
    "email" : false
},
"defaultValue" : "text"
} ]
}
},
"alignment" : "start",
    "stretch" : true
}, {
    "fields" : {
        "_embedded" : {
            "localisedEnumerationFields" : [ {
                "stringId" : "enumeration",
                "type" : "enumeration",
                "name" : "Enumeration",
                "description" : "Enumeration field description",
                "placeholder" : "Enumeration field placeholder",
                "behavior" : {
                    "editable" : true
                },
                "layout" : {
                  "x" : 0,
                  "y" : 2,
                  "cols" : 1,
                  "rows" : 4
                },
                "value" : "enumeration",
                "order" : 2,
                "choices" : [ "enumeration", "enumeration2", "enumeration3" ],
                "defaultValue" : "enumeration"
            } ]
        }
    },
    "alignment" : "start",
        "stretch" : true
}, {
    "fields" : {
        "_embedded" : {
            "localisedMultichoiceFields" : [ {
                "stringId" : "multichoice",
                "type" : "multichoice",
                "name" : "Multichoice",
                "description" : "Multichoice field description",
                "placeholder" : "Multichoice field placeholder",
                "behavior" : {
                    "editable" : true
                },
                "layout" : {
                  "x" : 0,
                  "y" : 3,
                  "cols" : 1,
                  "rows" : 4
                },
                "value" : [ "multichoice", "multichoice2" ],
                "order" : 3,
                "choices" : [ "multichoice", "multichoice2", "multichoice3" ],
                "defaultValue" : [ "multichoice", "multichoice2" ]
            } ]
        }
    },
    "alignment" : "start",
        "stretch" : true
}, {
    "fields" : {
        "_embedded" : {
            "localisedBooleanFields" : [ {
                "stringId" : "boolean",
                "type" : "boolean",
                "name" : "Boolean",
                "description" : "Boolean field description",
                "placeholder" : "Boolean field placeholder",
                "behavior" : {
                    "editable" : true
                },
                "layout" : {
                  "x" : 0,
                  "y" : 4,
                  "cols" : 1,
                  "rows" : 2
                },
                "value" : true,
                "order" : 4,
                "defaultValue" : true
            } ]
        }
    },
    "alignment" : "start",
        "stretch" : true
}, {
    "fields" : {
        "_embedded" : {
            "localisedDateFields" : [ {
                "stringId" : "date",
                "type" : "date",
                "name" : "Date",
                "description" : "Date field description",
                "placeholder" : "Date field placeholder",
                "behavior" : {
                    "editable" : true
                },
                "layout" : {
                  "x" : 0,
                  "y" : 5,
                  "cols" : 1,
                  "rows" : 4
                },
                "order" : 5,
                "minDate" : "2020-03-09",
                "validationJS" : "const startDate = new Date('2020-03-09'); if((value - startDate) < -86400000){ if(this.validationErrors) this.validationErrors.between=true; return false;} else { if(this.validationErrors) this.validationErrors.between=false;} return true;",
                "validationErrors" : {
                    "between" : false
                }
            } ]
        }
    },
    "alignment" : "start",
        "stretch" : true
}, {
    "fields" : {
        "_embedded" : {
            "localisedFields" : [ {
                "stringId" : "file",
                "type" : "file",
                "name" : "File",
                "description" : "File field description",
                "placeholder" : "File field placeholder",
                "behavior" : {
                    "editable" : true
                },
                "layout" : {
                  "x" : 0,
                  "y" : 6,
                  "cols" : 1,
                  "rows" : 2
                },
                "order" : 6
            } ]
        }
    },
    "alignment" : "start",
        "stretch" : true
}, {
    "fields" : {
        "_embedded" : {
            "localisedUserFields" : [ {
                "stringId" : "user",
                "type" : "user",
                "name" : "User",
                "description" : "User field description",
                "placeholder" : "User field placeholder",
                "behavior" : {
                    "editable" : true
                },
                "layout" : {
                  "x" : 0,
                  "y" : 7,
                  "cols" : 1,
                  "rows" : 2
                },
                "order" : 7,
                "roles" : [ ]
            } ]
        }
    },
    "alignment" : "start",
        "stretch" : true
}, {
    "fields" : {
        "_embedded" : {
            "localisedFields" : [ {
                "stringId" : "dateTime",
                "type" : "dateTime",
                "name" : "DateTime",
                "description" : "DateTime field description",
                "placeholder" : "DateTime field placeholder",
                "behavior" : {
                    "editable" : true
                },
                "layout" : {
                  "x" : 0,
                  "y" : 8,
                  "cols" : 1,
                  "rows" : 4
                },
                "order" : 8
            } ]
        }
    },
    "alignment" : "start",
        "stretch" : true
} ]
},
"_links" : {
    "self" : {
        "href" : "http://dev.netgrif.com/api/task//data"
    }
}
}`
}
