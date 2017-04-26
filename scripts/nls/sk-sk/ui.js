define({
    test: "Toto je testovací string!",
    page: {
        signIn: {
            email: "Email",
            psw: "Heslo",
            forgotPsw: "Zabudnuté heslo",
            submit: "Prihlásiť sa"
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
            msg: "Na stránke Dashboard sa pracuje"
        },
        tasks: {
            tab: {
                allTasks: "Všetky úlohy",
                myTasks: "Moje úlohy"
            },
            addTab: {
                title: "Nová záložka",
                label: "Názov",
                filters: "Filtre",
                submit: "Pridať záložku"
            }
        },
        cases: {
            tab: {
                allCases: "Všetky prípady"
            }
        },
        roles: {
            tab: {
                systemRoles: {
                    this: "Systémové role"
                },
                manageRoles: {
                    this: "Procesné role",
                    label: "Petriho sieť"
                }
            }
        },
        workflow: {
            msg: "Na stránke Workflow sa pracuje",
            uploadNet: "Nahrať sieť",
            createCase: "Vytvoriť prípad"
        },
        console: {
            title: "Pozvať používateľa",
            email: "Email",
            submit: "Poslať pozvánku"
        },
        userProfile: {
            title: "Profil",
            msgPart1: "Tvoj profil je na",
            msgPart2: "kompletný",
            generalInfo: {
                title: "Všeobecné informácie",
                name: "Meno",
                surname: "Priezvisko",
                org: "Organizácia"
            },
            systemRoles: {
                title: "Systémové role"
            },
            workflowRoles: {
                title: "Procesné role"
            },
            contactInfo: {
                title: "Kontaktné informácie",
                phone: "Telefónne číslo",
                email: "Email"
            },
            changePsw: "Zmeniť heslo",
            submit: "Uložiť"
        }
    },
    block: {
        mainNav: {
            dashboard: "Dashboard",
            tasks: "Úlohy",
            data: "Dáta",
            cases: "Prípady",
            roles: "Role",
            workflow: "Workflow",
            console: "Konzola",
            version: "Verzia 1.0.1"
        },
        mainMenu: {
            notifications: "Notifikácie",
            profile: "Profil",
            lang: {
                this: "Jazyk",
                en: "English",
                sk: "Slovenčina"
            },
            logout: "Odhlásiť sa"
        },
        taskFilter: {
            process: "Proces",
            task: "Úloha",
            dataField: "Datové pole",
            dataFieldVal: "Hodnota datového pola",
            search: "Hľadať",
            save: "Uložiť",
            reset: "Resetovať"
        },
        taskHeader: {
            case: "Prípad",
            name: "Meno",
            priority: "Priorita",
            user: "Vykonávateľ",
            startDate: "Dátum začiatku",
            status: "Status",
            view: {
                this: "Náhlaď",
                list: "Zoznam",
                table: "Tabuľka"
            }
        },
        task: {
            assign: "Priraďiť",
            reassign: "Preraďiť",
            delegate: "Delegovať",
            saveData: "Uložiť dáta",
            finish: "Dokončiť",
            cancel: "Zrušiť",
            collapse: "Zbaliť",
            noDataMsg: "Pre túto úlohu neexistujú dáta",
            process: "Proces",
            task: "Úloha",
            notFound: "nebol/a nájdený/á :(",
            priority: {
                low: "Nízka",
                medium: "Stredná",
                high: "Vysoká"
            }
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
            download: "Stiahnuť"
        },
        dialog: {
            uploadNet: {
                title: "Nahrať sieť",
                uploadBtn: "Vybrať sieť",
                uploadHelp: "Požaduje sa XML súbor",
                name: "Názov",
                maxchars: "Iniciály Petriho sieťe musia mať maximálne 3 písmená",
                initials: "Iniciály",
                submit: "Nahrať"
            },
            createCase: {
                title: "Vytvoriť prípad",
                petriNet: "Petriho Sieť",
                name: "Názov",
                color: "Farba značky",
                submit: "Vytvoriť"
            },
            saveFilter: {
                title: "Uložiť filter",
                name: "Názov",
                visibility: {
                    label: "Prístupnosť",
                    global: "Všeobecná",
                    organization: "Pre organizáciu",
                    private: "Súkromná"
                },
                process: "Proces",
                task: "Úlohy",
                submit: "Uložiť"
            }
        },
        bottomSheet: {
            user: "Používateľ",
            assign: "Priraďiť",
            title: "Priraďiť úlohu používateľovi"
        },
        fab: {
            tooltip: "Spät nahor"
        }
    }
});
