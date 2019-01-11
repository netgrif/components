define({
    test: "Toto je testovací reťazec!",
    version: {
        this: "Verzia"
    },
    page: {
        signIn: {
            email: "Email",
            psw: "Heslo",
            signIn: "Prihlásiť",
            signUp: "Vytvoriť účet",
            forgotPsw: "Zabudnuté heslo"
        },
        signUp: {
            email: "Email",
            psw: "Heslo",
            retypePsw: "Opakovať heslo",
            name: "Meno",
            surname: "Priezvisko"
        },
        dashboard: {
            this: "Prehľad"
        },
        cases: {
            this: "Prípady",
            my: "Moje prípady",
            all: "Všetky prípady",
            noCasesAvailableForThisView: "Pre toto zobrazenie neexistujú žiadne prípady",
            noTasksForThisCaseAvailable: "V tomto prípade už pre Vás nie sú žiadne úlohy"
        },
        tasks: {
            this: "Úlohy",
            all: "Všetky úlohy",
            my: "Moje úlohy",
            search:{
                category: "Kategória",
                search: "Hľadať"
            },
            noTasksSatisfyingThisFilter: "Pre tento filter nie sú vyhovujúce žiadne úlohy",
            filter: {
                process: "Proces",
                type:"Typ",
                task: "Úloha",
                processNotFound: "nebol najdený", // SK ...
                taskNotFound: "nebola najdená",
                filter: "Filter",
                label: "Názov",
                author: "Autor",
                date: "Vytvorenie",
                group: "Skupinový",
                public: "Verejný",
                private: "Súkromný",
                detail: "Filter: ",
                description: "Popis",
                transition: "Úlohy: ",
                tooltips: {
                    details: "Viac detailov",
                    transition: "Vybrané úlohy",
                    process: "Vybrané procesy"
                }
            }
        },
        documents: {
            this: "Organizácie"
        },
        contacts: {
            this: "Kontakty"
        },
        workflow: {
            this: "Workflow",
            uploadModel: "Nahrať model",
            initials: "Iniciály",
            modelTitle: "Názov modelu",
            version: "Verzia",
            author: "Autor",
            uploadDate: "Dátum nahrania",
            data: {
                group: {
                    details: "Detaily",
                    statistics: "Štatistiky"
                },
                item: {
                    identifier: {
                        title: "Identifikátor",
                        desc: "Jedinečný identifikátor modelu",
                    },
                    file: {
                        title: "Súbor",
                        desc: "Petriflow model použitý ako šablóna",
                        download: "Stiahnuť"
                    },
                    version: {
                        title: "Verzia",
                        desc: "Verzia modelu"
                    },
                    author: {
                        title: "Autor",
                        desc: "Používateľ, ktorý nahral model"
                    },
                    uploadDate: {
                        title: "Nahrané",
                        desc: "Dátum nahrania modelu do systému"
                    },
                    cases: {
                        title: "Prípady",
                        desc: "Počet prípadov používajúcich túto šablónu"
                    },
                    roles: {
                        title: "Roly",
                        desc: "Počet rolí v tomto modeli"
                    },
                    tasks: {
                        title: "Úlohy",
                        desc: "Počet úloh v tomto modeli"
                    },
                    activeTasks: {
                        title: "Aktívne úlohy",
                        desc: "Počet aktívnych úloh používajúcich tento model"
                    },
                    activeUsers: {
                        title: "Aktívni používatelia",
                        desc: "Počet používateľov pracujúcich s ľubovoľným prípadom tohto modelu"
                    },
                    places: {
                        title: "Miesta",
                        desc: ""
                    },
                    transitions: {
                        title: "Prechody",
                        desc: ""
                    },
                    arcs: {
                        title: "Hrany",
                        desc: ""
                    },
                    data: {
                        title: "Dáta",
                        desc: ""
                    },
                    actions: {
                        title: "Akcie",
                        desc: ""
                    }
                }
            }
        },
        console: {
            this: "Konzola",
            inviteUser: "Pozvať používateľa",
            newUser: "Nový používateľ",
            orgs: "Organizácie",
            roles: "Roly",
            users: "Používatelia",
            processRolesLower: "Procesné roly",
            process: "Proces",
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
        },
        settings: {
            this: "Nastavenia",
            userSignUp: "Registrácia používateľov",
            enableUserSignUp: "Povoliť registráciu používateľov",
            processRolesForSignedUpUser: "Procesné roli zaregistrovaného používateľa"
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
            download: "Stiahnuť",
            invite: "Pozvať",
            save: "Uložiť",
            edit: "Upraviť",
            collapse: "Skryť",
            assign: "Priradiť",
            reassign: "Preradiť",
            delegate: "Delegovať",
            finish: "Dokončiť",
            cancel: "Zrušiť",
            reset: "Reset",
            search: "Hľadať",
            apply: "Použiť",
            submit: "Potvrdiť",
            closeTab: "Zavrieť kartu"
        },
        mainMenu: {
            lang: {
                this: "Jazyk",
                en: "Anglický",
                sk: "Slovenský"
            },
            profile: "Profil",
            settings: "Nastavenia",
            logout: "Odhlásiť"
        },
        case: {
            this: "Prípad",
            header: {
                metaData: "meta dáta",
                label: "Typ",
                visualID: "Vizuálne ID",
                title: "Názov",
                author: "Autor",
                createDate: "Dátum vytvorenia",
                optional: "Voliteľné pole",
                enableEditMode: "Povoliť úpravy",
                confirmChanges: "Potvrdiť úpravy"
            },
            newTitle: "Nová inštancia"
        },
        task: {
            type: "Typ",
            name: "Meno",
            surname: "Priezvisko",
            phone: "Tel. číslo",
            details: "Detaily",
            email: "Email",
            data: "Údaje",
            noData: "Táto úloha nemá žiadne údaje. Stlačte dokončiť pre pokračovanie.",
            user: "Používateľ",
            header: {
                label: "Značka",
                case: "Prípad",
                title: "Názov",
                priority: "Priorita",
                user: "Vykonávateľ",
                assignDate: "Dátum priradenia",
                status: "Stav"
            }
        },
        priority: {
            low: "Nízka",
            medium: "Stredná",
            high: "Vysoká"
        },
        data: {
            noUserChosen: "Žiaden zvolený používateľ",
            self: "Sebe",
            selectUser: "Zvoliť používateľa",
            removeUser: "Odstrániť používateľa",
            noFile: "Žiaden súbor",
            fileNotUploaded: "Súbor ešte nebol nahraný",
            fileUploaded: "Súbor bol úspešne nahraný",
            newFile: "Nový súbor",
            upload: "Nahrať",
            download: "Stiahnuť",
            yes: "Áno",
            no: "Nie",
            enterDate: "Zadať dátum",
            enable: "Povoliť",
            disable: "Zakázať"
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
                heading: "Nová inštancia",
                process: "Proces",
                title: "Názov",
                color: "Farba",
                purple: "Fialová",
                yellow: "Žltá",
                orange: "Oranžová",
                brown: "Hnedá",
                submit: "Vytvoriť"
            },
            assignUser: {
                user: "Používateľ",
                assign: "Priradiť",
                title: "Priradiť úlohu používateľovi"
            },
            caseSelect: {
                choose: "Zvoliť"
            },
            uploadModel: {
                title: "Nahrať model",
                attachModel: "Priložiť model",
                attachModelHelp: "Vyžadovaný formát XML",
                name: "Názov",
                key: "Klúč",
                maxchars: "Kľúč musí byť maximálne 3 znaky dlhý",
                identifier: "Identifier",
                release: {
                    this: "Release",
                    type: {
                        major: "Major",
                        minor: "Minor",
                        patch: "Patch"
                    }
                },
                submit: "Nahrať"
            },
            saveFilter: {
                title: "Uložiť filter",
                name: "Názov",
                desc: "Popis",
                type: {
                    this: "Typ",
                    public: "Verejný",
                    group: "Skupinový",
                    private: "Súkromný"
                },
                bindFilterToRoles: "Naviazať filter na roli",
                process: "Proces",
                task: "Úloha"
            },
            changePsw: {
                title: "Zmeniť heslo",
                currentPsw: "Súčasné heslo",
                newPsw: "Nové heslo",
                repeatNewPsw: "Opakovať nové heslo",
                submit: "Potvrdiť"
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
            model: "Model",
            failedToUpload: "sa nepodarilo nahrať",
            uploadedSuccessfully: "bol načítaný úspešne",
            assigningTask: "Priradenie úlohy",
            delegatingTask: "Delegovanie úlohy",
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
            noFileWasAttached: "Nebol priložený žiaden súbor",
            fileMustHaveXmlFormat: "Súbor musí byť vo formáte XML",
            modelFailedToUpload: "Model sa nepodarilo nahrať",
            noWorkflowModel: "V systéme sa nenachádzajú žiadne workflow modely",
            loadingWorkflowFailed: "Nepodarilo sa načítať workflow modely",
            filtersFailedLoad: "Filtre sa nepodarilo načítať",
            preferencesFailedLoad: "Používateľské preferencie sa nepodarilo načítať",
            noFiltersFound: "Neboli nájdené žiadne filtre",
            noSavedFilters: "Doposiaľ neboli uložené žiadne filtre",
            deletingFilter: "Vymazávanie filtra",
            noRequiredNetUploaded: "Nie je nahraná žiadna sieť vyžadovaná týmto zobrazením",
            accountCreated: "Účet bol vytvorený",
            invitationEmailSent: "Pozvánka na vytvorenie účtu bola zaslaná",
            pswRecoveryEmailSentTo: "Email na obnovu hesla bol odoslaný na ",
            newPswSet: "Vaše nové heslo bolo nastavené",
            expiredSession: "Platnosť tejto relácie uplynula (pravdepodobne kvôli viacerým súbežným prihláseniam).",
            noFileInput: "Nebol nájdený žiaden vstup pre súbory",
            featureWillBeAvailableSoon: "Táto funckia bude čoskoro dostupná"
        },
        add: {
            createCase: "Vytvoriť prípad",
            createContact: "Vytvoriť kontakt",
            createDocument: "Vytvoriť dokument",
            createContact: "Vytvoriť kontakt"
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

        },
        custom: {

        }
    }
});
