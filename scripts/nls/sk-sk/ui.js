define({
    test: "Toto je testovací reťazec!",
    version: {
        this: "Verzia",
        id: "1.2.0"
    },
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
            this: "Plocha",
            offers: "Ponuky",
            contacts: "Kontakty",
            contracts: "Zmluvy"
        },
        cases: {
            this: "Prípady",
            my: "Prípady"
        },
        tasks: {
            this: "Úlohy",
            my: "Úlohy"
        },
        workflow: {
            this: "Workflow",
            my: "Workflow"
        },
        console: {
            this: "Konzola",
            inviteUser: "Pozvať používateľa",
            newUser: "Nový používateľ",
            orgs: "Organizácie",
            roles: "Roly",
            processRolesLower: "Procesné roly",
            processRoles: "Procesné roly",
            thereIsNoOrgAssignedToThisUserYet: "Tento používateľ ešte nemá priradenú žiadnu organizáciu",
            thereIsNoRoleAssignedToThisUserYet: "Tento používateľ ešte nemá priradenú žiadnu rolu"
        },
        profile: {
            this: "Profil",
            progressPart1: "Váš profil je na",
            progressPart2: "kompletný",
            personalInfo: {
                this: "Osobné informácie",
                firstName: "Meno",
                lastName: "Priezvisko"
            },
            contactInfo: {
                this: "Kontaktné informácie",
                phone: "Telefónne číslo",
                email: "Email"
            },
            orgs: {
                this: "Organizácie"
            },
            systemRoles: {
                this: "Systémové roly"
            },
            workflowRoles: {
                this: "Workflow roly"
            },
            actions: {
                this: "Akcie",
                edit: "Upraviť",
                changePsw: "Zmeniť heslo"
            }
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
            assign: "Priradiť",
            finish: "Ďalej",
            cancel: "Zrušiť"
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
            this: "Prípad",
            label: "Typ",
            visualID: "Vizuálne ID",
            title: "Názov",
            client: "Klient",
            date: "Dátum",
            insurance: "Poistné",
            inEur: "V eurách",
            newTitle: {
                Offer: "Nové poistenie",
                Contact: "Meno a priezvisko"
            }
        },
        task: {
            this: "Úloha",
            label: "Značka",
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
            noData: "Táto úloha nemá žiadne údaje. Stlačte dokončiť pre pokračovanie.",
            user: "Používateľ"
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
            case: "Prípad",
            wasDeleted: "bol/-i odstránený/-é",
            failedToDelete: "sa nepodarilo odstrániť",
            dataForCase: "Údaje pre prípad",
            failedToLoad: "sa nepodarilo načítať",
            loadingTasksForCase: "Načítanie úloh pre prípad",
            failed: "sa nepodarilo",
            noCases: "Práve neexistujú žiadne prípady",
            noResourceForCasesFound: "Nenašli sa žiadne zdroje pre prípady",
            gettingCasesFailed: "Získanie prípadov sa nepodarilo",
            creatingNewCaseFailed: "Vytvorenie nového prípadu sa nepodarilo",
            gettingPetriNetRefsFailed: "Získanie referencie Petriho siete sa nepodarilo",
            loading: "Načítanie",
            loadingDataForFilterFailed: "Načítanie údajov pre filter sa nepodarilo",
            file: "Súbor",
            failedToUpload: "sa nepodarilo načítať",
            uploadedSuccessfully: "bol načítaný úspešne",
            assigningTask: "Priradenie úlohy",
            cancelingAssignmentOfTask: "Zrušenie priradenia úlohy",
            finishingTask: "Dokončenie úlohy",
            dataFor: "Údaje pre",
            fieldsHaveInvalidValues: "Niektoré polia nemajú správne hodnoty",
            dataSavedSuccessfully: "Údaje boli úspešne uložené",
            savingDataFailed: "Uloženie údajov sa nepodarilo",
            noTasks: "Práve neexistujú žiadne úlohy",
            noTasksFoundIn: "Nenašli sa žiadne úlohy v",
            tasksOn: "Úlohy na",
            transactionsFor: "Transakcie pre",
            failedToLoadRolesForProcess: "Nepodarilo sa načítať roly pre proces",
            noOrganizationFound: "Nenašla sa žiadna organizácia",
            emailFieldIsMandatory: "Emailové pole je povinné",
            newUserMustBelongToOneOrMoreOrganization: "Nový používateľ musí mať priradenú aspoň jednu organizáciu",
            newUserMustHasAssignedOneOrMoreRoles: "Nový používateľ musí mať priradenú aspoň jednu rolu",
            inviteSent: "Pozvánka bola zaslaná",
            inviteFailed: "Pozvánku sa nepodarilo zaslať",
            failedToLoadUsers: "Nepodarilo sa načítať používateľov",
            failedToLoadProcesses: "Nepodarilo sa načítať procesy",
            rolesSuccessfullyAssignedTo: "Roly boli úspešne priradené",
            assigningRolesToUser: "Priradenie rolí používateľovi",
            noCasesToChooseFrom: "Neexistujú prípady, z ktorých je možné si zvoliť",
            failedToIdentifyToken: "Nepodarilo sa identifikovať token",
            wrongUserCredentials: "Nesprávne používateľské autentizačné údaje",
            userIsNotVerified: "Používateľ nie je overený",
            registrationFailed: "Registrácia sa nepodarila",
            passwordFieldsDoNotMatch: "Hodnoty polí s heslami sa nezhodujú",
            failedToLoadUsersInTask: "Nepodarilo sa načítať používateľov pre úlohu",
            failedToLoadRoles: "Nepodarilo sa načítať roly",
            unableToLoadUserData: "Nepodarilo sa načítať dáta používateľa",
            featureWillBeAvailableSoon: "Táto funckia bude čoskoro dostupná"
        },
        add: {
            createCase: "Vytvoriť prípad",
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
