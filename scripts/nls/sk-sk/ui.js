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
            retypePsw: "Heslo znovu",
            name: "Meno",
            surname: "Priezvisko",
            submit: "Registruj"
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
        data: {
            msg: "Na stránke Dáta sa pracuje"
        },
        roles: {
            tab: {
                systemRoles: {
                    this: "Systémové Role"
                },
                manageRoles: {
                    this: "Procesné Role",
                    label: "Petriho sieť",
                    back: "Späť",
                    save: "Uložiť"
                }
            }
        },
        workflow: {
            msg: "Na stránke Workflow sa pracuje",
            uploadNet: "Nahraj Sieť",
            createCase: "Vytvor Prípad"
        },
        console: {
            title: "Pozvi Používateľa",
            email: "Email",
            submit: "Pošli Pozvánku"
        },
        userProfile: {
            title: "Profil",
            msgPart1: "Tvoj profil je",
            msgPart2: "kompletný",
            generalInfo: {
                title: "Všeobecné Informácie",
                name: "Meno",
                surname: "Priezvisko",
                org: "Organizácia"
            },
            systemRoles: {
                title: "Systémové Role"
            },
            workflowRoles: {
                title: "Procesné Role"
            },
            contactInfo: {
                title: "Kontaktné Informácie",
                phone: "Telefónne Číslo",
                email: "Email"
            },
            changePsw: "Zmeň Heslo",
            submit: "Ulož"
        }
    },
    block: {
        mainNav: {
            dashboard: "Dashboard",
            tasks: "Úlohy",
            data: "Dáta",
            roles: "Role",
            workflow: "Workflow",
            console: "Správcovská Konzola"
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
            save: "Uložiť",
            reset: "Reset"
        },
        taskHeader: {
            visualId: "ID",
            name: "Meno",
            priority: "Priorita",
            user: "Vykonávateľ",
            startDate: "Dátum Začiatku",
            status: "Status",
            view: {
                this: "Náhlaď",
                list: "Zoznam",
                table: "Tabuľka"
            }
        },
        task: {
            assign: "Priraď",
            reassign: "Preraď",
            saveData: "Ulož Dáta",
            finish: "Dokonči",
            cancel: "Zruš",
            collapse: "Zbaľ",
            noDataMsg: "Pre túto úlohu neexistujú dáta",
            process: "Proces",
            task: "Úloha",
            notFound: "nebol/a nájdený/á :(",
            priority: {
                low: "Nízska",
                medium: "Stredná",
                high: "Vysoká"
            }
        },
        dialog: {
            uploadNet: {
                title: "Nahraj Sieť",
                uploadBtn: "Vyber Sieť",
                uploadHelp: "Požaduje sa XML súbor",
                name: "Názov",
                initials: "Iniciály",
                submit: "Nahraj"
            },
            createCase: {
                title: "Vytvor Prípad",
                petriNet: "Petriho Sieť",
                name: "Názov",
                submit: "Vytvor"
            }
        },
        bottomSheet: {
            user: "Používateľ",
            assign: "Priraď"
        },
        fab: {
            tooltip: "Spät nahor"
        }
    }
});
