define({
    test: "Toto je testovací reťazec!",
    page: {
        signIn: {
            email: "Email",
            psw: "Heslo",
            forgotPsw: "Zabudnuté heslo",
            submit: "Prihlásiť"
        },
        signUp: {
            email: "Email",
            psw: "Heslo",
            retypePsw: "Opakovať heslo",
            name: "Meno",
            surname: "Priezvisko",
            submit: "Registrovať"
        },
        dashboard: {
            this: "Dashboard",
            offers: "Ponuky",
            contacts: "Kontakty",
            contracts: "Zmluvy"
        },
        offers: {
            this: "Ponuky",
            my: "Moje ponuky"
        },
        contacts: {
            this: "Kontakty"
        },
        documents: {
            this: "Dokumenty",
            preview: "Náhľad"
        },
        contracts: {
            this: "Zmluvy",
            my: "Moje zmluvy"
        },
        console: {
            this: "Konzola",
            inviteUser: "Pozvať používateľa",
            newUser: "Nový používateľ",
            orgs: "Organizácie",
            roles: "Roly",
            processRolesLower: "Procesné roly",
            processRoles: "Procesné roly"
        }
    },
    block: {
        input: {
            search: "Hľadať",
            active: "Aktívne",
            finished: "Ukončené",
            email: "Email",
            user: "Používateľ",
            name: "Meno",
            process: "Proces",
            role: "Rola"
        },
        btn: {
            delete: "Vymazať",
            invite: "Pozvať",
            save: "Uložiť",
            collapse: "Skryť",
            finish: "Dokončiť"
        },
        mainMenu: {
            profile: "Profil",
            lang: {
                this: "Jazyk",
                en: "Anglický",
                sk: "Slovenský"
            },
            logout: "Odhlásiť"
        },
        case: {
            label: "Typ",
            visualID: "Vizuálne ID",
            title: "Názov",
            client: "Klient",
            date: "Dátum",
            insurance: "Poistné",
            inEur: "V eurách"
        },
        task: {
            label: "Typ",
            offer: "Ponuka",
            title: "Názov",
            date: "Dátum začiatku",
            status: "Stav",
            contract: "Zmluva",
            type: "Typ",
            name: "Meno",
            surname: "Priezvisko",
            phone: "Tel. číslo",
            email: "Email",
            noData: "Táto úloha nemá žiadne údaje. Stlačte dokončiť pre pokračovanie."
        },
        data: {
            noUserChosen: "Žiaden zvolený používateľ",
            self: "Sebe",
            chooseUser: "Vybrať používateľa",
            noFile: "Žiaden súbor",
            fileNotUploaded: "Súbor ešte nebol nahraný",
            fileUploaded: "Súbor bol úspešne nahraný",
            newFile: "Nový súbor",
            upload: "Nahrať",
            download: "Stiahnuť",
            yes: "Áno",
            no: "Nie",
            enterDate: "Zadať dátum"
        },
        validation: {
            pswLength: "Heslo musí byť aspoň 6 znakov dlhé",
            retypedPswNotMatch: "Heslá sa nezhodujú",
            email: "Zadaná emailová adresa musí byť v správnom tvare",
            required: "Toto pole je povinné",
            oddNumber: "Zadané číslo musí byť nepárne",
            evenNumber: "Zadané číslo musí byť párne",
            positiveNumber: "Zadané číslo musí byť kladné",
            negativeNumber: "Zadané číslo musí byť záporné",
            decimalNumber: "Zadané číslo musí byť desatinné",
            inRange: "Zadané číslo musí byť v rozsahu",
            textMustBeAtMost: "Zadaný text musí byť najviac",
            textInEmailFormat: "Zadaný text musí mať formát emailu",
            textInTelFormat: "Zadaný text musí mať formát tel. čísla",
            textInWrongFormat: "Zadaný text nemá správny formát"
        },
        dialog: {
            createCase: {
                heading: "Vytvoriť ponuku",
                process: "Proces",
                title: "Názov",
                color: "Farba",
                submit: "Vytvoriť"
            },
            assignUser: {
                user: "Používateľ",
                assign: "Priradiť",
                title: "Priradiť úlohu používateľovi"
            },
            caseSelect: {
                choose: "Zvoliť"
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
            emailFieldOfNewUserIsMandatory: "Email field on new user is mandatory",
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
            featureWillBeAvailableSoon: "This feature will be available soon"
        },
        add: {
            createOffer: "Vytvoriť ponuku",
            createContact: "Vytvoriť kontakt",
            createDocument: "Vytvoriť dokument"
        },
        sentencePart: {

        },
        word: {
            from: "od",
            to: "do",
            characters: "znakov",
            long: "dlhý"
        },
        char: {

        }
    }
});
