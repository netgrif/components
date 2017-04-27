define({
    'root': {
        test: "This is test string!",
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
                msg: "Dashboard page coming soon"
            },
            tasks: {
                tab: {
                    allTasks: "All Tasks",
                    myTasks: "My Tasks"
                },
                addTab: {
                    title: "New Tab",
                    label: "Label",
                    filters: "Filters",
                    submit: "Add Tab"
                }
            },
            cases: {
                tab: {
                    allCases: "All Cases"
                }
            },
            roles: {
                tab: {
                    systemRoles: {
                        this: "System Roles"
                    },
                    manageRoles: {
                        this: "Process Roles",
                        label: "Petri Net"
                    }
                }
            },
            workflow: {
                msg: "Workflow page coming soon",
                uploadNet: "Upload Net",
                createCase: "Create Case"
            },
            console: {
                title: "Invite User",
                email: "Email",
                submit: "Send Invite"
            },
            userProfile: {
                title: "Profile",
                msgPart1: "Your profile is",
                msgPart2: "complete",
                generalInfo: {
                    title: "General Information",
                    name: "First Name",
                    surname: "Last Name",
                    org: "Organization"
                },
                systemRoles: {
                    title: "System Roles"
                },
                workflowRoles: {
                    title: "Workflow Roles"
                },
                contactInfo: {
                    title: "Contact Information",
                    phone: "Phone Number",
                    email: "Email"
                },
                changePsw: "Change Password",
                submit: "Update"
            }
        },
        block: {
            mainNav: {
                dashboard: "Dashboard",
                tasks: "Tasks",
                data: "Data",
                cases: "Cases",
                roles: "Roles",
                workflow: "Workflow",
                console: "Admin Console",
                version: "Version 1.0.1"
            },
            mainMenu: {
                notifications: "Notifications",
                profile: "Profile",
                lang: {
                    this: "Language",
                    en: "English",
                    sk: "Slovak"
                },
                logout: "Logout"
            },
            taskFilter: {
                process: "Process",
                task: "Task",
                dataField: "Data field",
                dataFieldVal: "Data Field Value",
                search: "Search",
                save: "Save",
                reset: "Reset"
            },
            taskHeader: {
                case: "Case",
                name: "Name",
                priority: "Priority",
                user: "User",
                startDate: "Start Date",
                status: "Status",
                view: {
                    this: "View",
                    list: "List",
                    table: "Table"
                }
            },
            task: {
                assign: "Assign",
                reassign: "Reassign",
                delegate: "Delegate",
                saveData: "Save Data",
                finish: "Finish",
                cancel: "Cancel",
                collapse: "Collapse",
                noDataMsg: "There is no data for this task",
                notFound: "was not found :(",
                priority: {
                    low: "Low",
                    medium: "Medium",
                    high: "High"
                }
            },
            data: {
                noUserChosen: "No user was chosen",
                self: "Self",
                chooseUser: "Choose user",
                noFile: "No file",
                fileNotUploaded: "File has not been uploaded yet!",
                fileUploaded: "File uploaded successfully",
                newFile: "New file",
                upload: "Upload",
                download: "Download",
                yes: "Yes",
                no: "No"
            },
            dialog: {
                uploadNet: {
                    title: "Upload Net",
                    uploadBtn: "Choose a Net",
                    uploadHelp: "Requires XML file",
                    name: "Name",
                    maxchars: "Petri Net initials must be at most 3 characters long",
                    initials: "Initials",
                    submit: "Upload"
                },
                createCase: {
                    title: "Create Case",
                    petriNet: "Petri Net",
                    name: "Name",
                    color: "Label color",
                    submit: "Create"
                },
                saveFilter: {
                    title: "Save Filter",
                    name: "Name",
                    visibility: {
                        label: "Visibility",
                        global: "Global",
                        organization: "Organization",
                        private: "Private"
                    },
                    process: "Process",
                    task: "Task",
                    submit: "Save"
                }
            },
            bottomSheet: {
                user: "User",
                assign: "Assign",
                title: "Delegate task to user"
            },
            fab: {
                tooltip: "Back to top"
            }
        }
    },
    'sk-sk':true
});
