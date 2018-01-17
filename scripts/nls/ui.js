define({
    'root': {
        test: "This is test string!",
        version: {
            this: "Version",
            id: "2.0.0"
        },
        page: {
            signIn: {
                email: "Email",
                psw: "Password",
                forgotPsw: "Forgot password",
                submit: "Sign In"
            },
            signUp: {
                email: "Email",
                psw: "Password",
                retypePsw: "Retype password",
                name: "First Name",
                surname: "Last Name",
                submit: "Sign Up"
            },
            dashboard: {
                this: "Dashboard",
                offers: "Offers",
                contacts: "Contacts",
                contracts: "Contracts"
            },
            filter: {
                type: "Type",
                filter: "Filter",
                label: "Label",
                author: "Author",
                date: "Created",
                group: "Group",
                global: "Global",
                personal: "Personal",
                process: "Process",
                detail: "Filter: ",
                description: "Description",
                transition: "Transition: ",
                tooltips:{
                    details: "Show details",
                    transition: "Selected transition",
                    process: "Selected process"
                },
            },
            cases: {
                this: "Cases",
                my: "Cases"
            },
            tasks: {
                this: "Tasks",
                my: "Tasks",
                addTab: {
                    submit: "Add to tabs"
                },
            },
            workflow: {
                this: "Workflow",
                uploadModel: "Upload model",
                color: "Color",
                modelTitle: "Model title",
                author: "Author",
                data: {
                    group: {
                        information: "Information",
                        statistics: "Statistics"
                    },
                    item: {
                        file: {
                            title: "File",
                            desc: "Petriflow model used as template"
                        },
                        uploaded: {
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
                        }
                    },
                    placeholder: {
                        date: "Date",
                        count: "Count"
                    }
                }
            },
            console: {
                this: "Console",
                inviteUser: "Invite User",
                newUser: "New user",
                orgs: "Organizations",
                roles: "Roles",
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
                invite: "Invite",
                save: "Save",
                edit: "Edit",
                collapse: "Collapse",
                assign: "Assign",
                finish: "Next",
                cancel: "Cancel"
            },
            mainMenu: {
                profile: "Profile",
                lang: {
                    this: "Language",
                    en: "English",
                    sk: "Slovak"
                },
                logout: "Logout"
            },
            case: {
                this: "Case",
                label: "Type",
                visualID: "Visual ID",
                title: "Title",
                client: "Client",
                date: "Date",
                insurance: "Insurance",
                inEur: "In EUR",
                newTitle: {
                    Offer: "New insurance",
                    Contact: "Name and surname"
                }
            },
            task: {
                this: "Task",
                label: "Label",
                offer: "Offer",
                title: "Title",
                date: "Start date",
                status: "Status",
                contact: "Contact",
                type: "Type",
                name: "Name",
                surname: "Surname",
                phone: "Phone number",
                email: "Email",
                noData: "This task has no data. Finish to continue.",
                user: "User"
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
                enterDate: "Enter date"
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
                    heading: "Create Offer",
                    process: "Process",
                    title: "Title",
                    color: "Color",
                    submit: "Submit"
                },
                assignUser: {
                    user: "User",
                    assign: "Assign",
                    title: "Delegate task to user"
                },
                caseSelect: {
                    choose: "Choose"
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
                failedToUpload: "failed to upload",
                uploadedSuccessfully: "uploaded successfully",
                assigningTask: "Assigning task",
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
                newUserMustBelongToOneOrMoreOrganization: "New user must belong to one or more organizations",
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
    'sk-sk':true
});
