define({
    'root': {
        test: "This is test string!",
        version: {
            this: "Version"
        },
        page: {
            signIn: {
                email: "Email",
                psw: "Password",
                signIn: "Sign In",
                signUp: "Sign Up",
                forgotPsw: "Forgot password"
            },
            signUp: {
                email: "Email",
                psw: "Password",
                retypePsw: "Retype password",
                name: "First Name",
                surname: "Last Name"
            },
            dashboard: {
                this: "Dashboard"
            },
            cases: {
                this: "Cases",
                my: "My cases",
                all: "All cases"
            },
            casesData: {
                this: "Data cases",
                my: "My cases",
                all: "All cases",
                enableEditMode: "Enable edit mode",
                confirmChanges: "Confirm changes"
            },
            tasks: {
                this: "Tasks",
                all: "All tasks",
                my: "My tasks",
                search:{
                    category: "Category",
                    search: "Search"
                },
                filter: {
                    process: "Process",
                    type:"Type",
                    task: "Task",
                    processNotFound: "not found", // SK ...
                    taskNotFound: "not found",
                    filter: "Filter",
                    label: "Label",
                    author: "Author",
                    date: "Created",
                    group: "Group",
                    public: "Public",
                    private: "Private",
                    detail: "Filter: ",
                    description: "Description",
                    transition: "Transition: ",
                    tooltips:{
                        details: "Show details",
                        transition: "Selected transition",
                        process: "Selected process"
                    }
                }
            },
            workflow: {
                this: "Workflow",
                uploadModel: "Upload model",
                initials: "Initials",
                modelTitle: "Model title",
                version: "Version",
                author: "Author",
                uploadDate: "Upload date",
                data: {
                    group: {
                        details: "Details",
                        statistics: "Statistics"
                    },
                    item: {
                        identifier: {
                            title: "Identifier",
                            desc: "Unique model identifier",
                        },
                        file: {
                            title: "File",
                            desc: "Petriflow model used as template",
                            download: "Download"
                        },
                        version: {
                            title: "Version",
                            desc: "Model version"
                        },
                        author: {
                            title: "Author",
                            desc: "User who uploaded model"
                        },
                        uploadDate: {
                            title: "Uploaded",
                            desc: "Date when this model was uploaded"
                        },
                        cases: {
                            title: "Cases",
                            desc: "Number of cases using this model"
                        },
                        roles: {
                            title: "Roles",
                            desc: "Number of roles used in this model"
                        },
                        tasks: {
                            title: "Tasks",
                            desc: "Number of tasks used in this model"
                        },
                        activeTasks: {
                            title: "Active tasks",
                            desc: "Number of active tasks using this model"
                        },
                        activeUsers: {
                            title: "Active users",
                            desc: "Number of users working with any case of this model"
                        },
                        places: {
                            title: "Places",
                            desc: "Number of places in model's Petri net"
                        },
                        transitions: {
                            title: "Transitions",
                            desc: "Number of transitions in model's Petri net"
                        },
                        arcs: {
                            title: "Arcs",
                            desc: "Number of arcs in model's Petri net"
                        },
                        data: {
                            title: "Data",
                            desc: ""
                        },
                        actions: {
                            title: "Actions",
                            desc: ""
                        }
                    }
                }
            },
            console: {
                this: "Console",
                inviteUser: "Invite User",
                newUser: "New user",
                orgs: "Organizations",
                roles: "Roles",
                users: "Users",
                processRolesLower: "Process roles",
                process: "Process",
                processRoles: "Process Roles",
                thereIsNoOrgAssignedToThisUserYet: "There is no organisation assigned to this user yet",
                thereIsNoRoleAssignedToThisUserYet: "There is no role assigned to this user yet"
            },
            profile: {
                this: "Profile",
                progressPart1: "Your profile is",
                progressPart2: "complete",
                personalInfo: {
                    this: "Personal Information",
                    firstName: "First Name",
                    lastName: "Last Name"
                },
                contactInfo: {
                    this: "Contact Information",
                    phone: "Phone Number",
                    email: "Email"
                },
                orgs: {
                    this: "Organizations"
                },
                systemRoles: {
                    this: "System Roles"
                },
                workflowRoles: {
                    this: "Workflow Roles"
                },
                actions: {
                    this: "Actions",
                    edit: "Edit",
                    changePsw: "Change Password"
                }
            },
            settings: {
                this: "Settings",
                userSignUp: "User sign up",
                enableUserSignUp: "Enable user sign up",
                processRolesForSignedUpUser: "Process roles for signed up user"
            }
        },
        block: {
            input: {
                search: "Search",
                active: "Active",
                finished: "Finished",
                email: "Email",
                user: "User",
                name: "Name",
                process: "Process",
                role: "Role"
            },
            btn: {
                delete: "Delete",
                download: "Download",
                invite: "Invite",
                save: "Save",
                edit: "Edit",
                collapse: "Collapse",
                assign: "Assign",
                reassign: "Reassign",
                delegate: "Delegate",
                finish: "Finish",
                cancel: "Cancel",
                reset: "Reset",
                search: "Search",
                apply: "Apply",
                submit: "Submit"
            },
            mainMenu: {
                lang: {
                    this: "Language",
                    en: "English",
                    sk: "Slovak"
                },
                profile: "Profile",
                settings: "Settings",
                logout: "Logout"
            },
            case: {
                this: "Case",
                header: {
                    metaData: "meta data",
                    fields: "fields",
                    label: "Type",
                    visualID: "Visual ID",
                    title: "Title",
                    author: "Author",
                    createDate: "Create Date"
                },
                newTitle: "New instance"
            },
            task: {
                type: "Type",
                name: "Name",
                surname: "Surname",
                phone: "Phone number",
                email: "Email",
                details: "Details",
                data: "Data",
                noData: "This task has no data. Finish to continue.",
                user: "User",
                header: {
                    label: "Label",
                    case: "Case",
                    title: "Title",
                    priority: "Priority",
                    user: "User",
                    assignDate: "Assign Date",
                    status: "Status"
                }
            },
            priority: {
                low: "Low",
                medium: "Medium",
                high: "High"
            },
            data: {
                noUserChosen: "No user was chosen",
                self: "Self",
                chooseUser: "Choose user",
                noFile: "No file",
                fileNotUploaded: "File has not been uploaded yet",
                fileUploaded: "File uploaded successfully",
                newFile: "New file",
                upload: "Upload",
                download: "Download",
                yes: "Yes",
                no: "No",
                enterDate: "Enter date",
                enable: "Enable",
                disable: "Disable"
            },
            validation: {
                pswLength: "Password must be at least 6 characters long",
                retypedPswNotMatch: "Passwords does not match",
                email: "Entered email address must be valid",
                required: "This field is required",
                oddNumber: "Entered number must be odd",
                evenNumber: "Entered number must be even",
                positiveNumber: "Entered number must be positive",
                negativeNumber: "Entered number must be negative",
                decimalNumber: "Entered number must be decimal",
                inRange: "Entered number must be in range",
                textMustBeAtMost: "Entered text must be at the most",
                textInEmailFormat: "Entered test must be in email format",
                textInTelFormat: "Entered text must be in telephone number format",
                textInWrongFormat: "Entered text is in wrong format"
            },
            dialog: {
                createCase: {
                    heading: "New instance",
                    process: "Process",
                    title: "Title",
                    color: "Color",
                    purple: "Purple",
                    yellow: "Yellow",
                    orange: "Orange",
                    brown: "Brown",
                    submit: "Submit"
                },
                assignUser: {
                    user: "User",
                    assign: "Assign",
                    title: "Delegate task to user"
                },
                caseSelect: {
                    choose: "Choose"
                },
                uploadModel: {
                    title: "Upload model",
                    attachModel: "Attach model",
                    attachModelHelp: "Required XML format",
                    name: "Name",
                    key: "Key",
                    maxchars: "Key must be at most 3 characters long",
                    identifier: "Identifier",
                    release: {
                        this: "Release",
                        type: {
                            major: "Major",
                            minor: "Minor",
                            patch: "Patch"
                        }
                    },
                    submit: "Upload"
                },
                saveFilter: {
                    title: "Save Filter",
                    name: "Name",
                    desc: "Description",
                    type: {
                        this: "Type",
                        public: "Public",
                        group: "Group",
                        private: "Private"
                    },
                    bindFilterToRoles: "Bind filter to roles",
                    process: "Process",
                    task: "Task"
                },
                changePsw: {
                    title: "Change Password",
                    currentPsw: "Current password",
                    newPsw: "New password",
                    repeatNewPsw: "Repeat new password",
                    submit: "Confirm"
                }
            },
            snackbar: {
                case: "Case",
                wasDeleted: "was deleted",
                failedToDelete: "failed to delete",
                dataForCase: "Data for case",
                failedToLoad: "failed to load",
                loadingTasksForCase: "Loading tasks for case",
                failed: "failed",
                noCases: "Currently there are no cases",
                noResourceForCasesFound: "No resource for cases was found",
                gettingCasesFailed: "Getting cases failed",
                creatingNewCaseFailed: "Creating new case failed",
                gettingPetriNetRefsFailed: "Getting Petri net refs failed",
                loading: "Loading",
                loadingDataForFilterFailed: "Loading data for filter failed",
                file: "File",
                model: "Model",
                failedToUpload: "failed to upload",
                uploadedSuccessfully: "uploaded successfully",
                assigningTask: "Assigning task",
                delegatingTask: "Delegating task",
                cancelingAssignmentOfTask: "Canceling assignment of task",
                finishingTask: "Finishing task",
                dataFor: "Data for",
                fieldsHaveInvalidValues: "Some fields have invalid values",
                dataSavedSuccessfully: "Data saved successfully",
                savingDataFailed: "Saving data failed",
                noTasks: "Currently there are no tasks",
                noTasksFoundIn: "No tasks found in",
                tasksOn: "Tasks on",
                transactionsFor: "Transactions for",
                failedToLoadRolesForProcess: "Failed to load roles for process",
                noOrganizationFound: "No organization found",
                emailFieldIsMandatory: "Email field is mandatory",
                newUserMustBelongToOneOrMoreOrganization: "New user must belong to one or more groups",
                newUserMustHasAssignedOneOrMoreRoles: "New user must has assigned one or more roles",
                inviteSent: "Invite sent",
                inviteFailed: "Invite failed",
                failedToLoadUsers: "Failed to load users",
                failedToLoadProcesses: "Failed to load processes",
                rolesSuccessfullyAssignedTo: "Roles successfully assigned to",
                assigningRolesToUser: "Assigning roles to user",
                noCasesToChooseFrom: "There are no cases to choose from",
                failedToIdentifyToken: "Failed to identify token",
                wrongUserCredentials: "Wrong user credentials",
                userIsNotVerified: "User is not verified",
                registrationFailed: "Registration failed",
                passwordFieldsDoNotMatch: "Password fields do not match",
                failedToLoadUsersInTask: "Failed to load users in task",
                failedToLoadRoles: "Failed to load roles",
                unableToLoadUserData: "Unable to load user data",
                noFileWasAttached: "No file was attached",
                fileMustHaveXmlFormat: "File must have XML format",
                modelFailedToUpload: "Model failed to upload",
                noWorkflowModel: "There are no workflow models uploaded into the system",
                loadingWorkflowFailed: "Loading workflow models has failed",
                filtersFailedLoad: "Filters has failed to load",
                noFiltersFound: "No filters has been found",
                noSavedFilters: "There are no saved filters",
                deletingFilter: "Deleting of the filter",
                noRequiredNetUploaded: "There isn't uploaded any net required for this view",

                featureWillBeAvailableSoon: "This feature will be available soon"
            },
            add: {
                createCase: "Create Case",
                createContact: "Create Contact",
                createDocument: "Create Document"
            },
            sentencePart: {

            },
            word: {
                from: "from",
                to: "to",
                characters: "characters",
                long: "long"
            },
            char: {

            }
        }
    },
    'sk-SK':true
});
