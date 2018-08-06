define([], function () {
    return {
        appName: "Application Engine",
        version: "2.1.0",
        themes: {
            default: {
                primary: {
                    '50': '#E0F2F1',
                    '100': '#B2DFDB',
                    '200': '#80CBC4',
                    '300': '#4DB6AC',
                    '400': '#26A69A',
                    '500': '#009688',
                    '600': '#00897B',
                    '700': '#00796B',
                    '800': '#00695C',
                    '900': '#004D40',
                    'A100': '#A7FFEB',
                    'A200': '#64FFDA',
                    'A400': '#1DE9B6',
                    'A700': '#00BFA5',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': '50 100 200 A100 A200',
                    'contrastLightColors': undefined
                },
                accent: "grey",
                warn: "red"
            },
            darkBlue: {
                primary: {
                    '50': '#EAF0F9',
                    '100': '#CAD8F1',
                    '200': '#A6BFE7',
                    '300': '#82A5DD',
                    '400': '#6891D6',
                    '500': '#4D7ECF',
                    '600': '#4676CA',
                    '700': '#3D6BC3',
                    '800': '#3461BD',
                    '900': '#254EB2',
                    'A100': '#EFF3FF',
                    'A200': '#BCCEFF',
                    'A400': '#89A9FF',
                    'A700': '#6F96FF',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': '50 100 200 A100 A200',
                    'contrastLightColors': undefined
                },
                accent: "grey",
                warn: "amber"
            },
            lightBlue: {
                primary: {
                    '50': '#E0E9F7',
                    '100': '#B3C8EA',
                    '200': '#80A3DD',
                    '300': '#4D7ECF',
                    '400': '#2663C4',
                    '500': '#0047BA',
                    '600': '#0040B3',
                    '700': '#0037AB',
                    '800': '#002FA3',
                    '900': '#002094',
                    'A100': '#BFC8FF',
                    'A200': '#8C9CFF',
                    'A400': '#5971FF',
                    'A700': '#405BFF',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': '50 100 200 A100 A200',
                    'contrastLightColors': undefined
                },
                accent: "grey",
                warn: "red"
            }
        },
        theme: "default",
        imageSrc: {
            auth: {
                gtXs: "../../assets/default/netgrif_under_grey.svg",
                xs: "../../assets/default/netgrif_full_grey.svg"
            },
            mainToolbar: "../../assets/default/netgrif_full_white.svg",
            sidenav: "../../assets/default/netgrif.svg"
        },
        defaults: {
            invitedUser: {
                // groups: ["Org name"],
                // processRoles: [
                //     {
                //         net: "Net name",
                //         roles: ["Role name"]
                //     },
                //     {
                //         net: "Net name",
                //         roles: ["Agent"]
                //     }
                // ]
            }
        },
        show: {
            cases: {
                transactions: true,

                taskSearch: false,
                taskPriority: true,
                taskCaseTitle: true
            },
            tasks: {
                taskSearch: true,
                taskPriority: true,
                taskCaseTitle: true
            }
        },
        enable: {
            userSignUp: true,
            modelDelete: true,
            inviteUserWithNoProcessRoles: true,

            cases: {
                caseDelete: true,

                allowHighlight: false,
                autoOpenUnfinished: false,
                fullReload: false
            },
            tasks: {
                allowHighlight: false,
                autoOpenUnfinished: false,
                fullReload: false
            }
        }
    };
});