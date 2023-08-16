# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Full Changelog: [https://github.com/netgrif/components/commits/v6.4.0](https://github.com/netgrif/components/commits/v6.4.0)

## [6.4.0](https://github.com/netgrif/components/releases/tag/v6.4.0) (2023-06-26)

### Fixed
- [NAE-1915] TaskRef behaviour handling for multiple level
- [NAE-1908] NAE-1906 Improvements

### Added
- [NAE-1890] Data field component register
- [NAE-1901] Taskref rendering update
- [NAE-1904] CaseRef list component
- [NAE-1497] Frontend Actions
- [NAE-1497] Frontend Actions
- [NAE-1904] Case ref as multichoice and enumeration

## [6.3.0](https://github.com/netgrif/components/releases/tag/v6.3.0) (2023-05-26)

### Fixed

- [NAE-1790] Validation message on the date field is not displaying correctly
- [NAE-1795] Breadcrumbs based on the menu, not on the currently displayed view
- [NAE-1797] I18N field at asynchronous rendering
- [NAE-1804] In UserList field can choose one user multiple times
- [NAE-1823] Error when searching for non-existing tasks
- [NAE-1825] Fix the upstream dependency conflict
- [NAE-1827] Dynamic enumeration looses focus after querying for data
- [NAE-1830] Changing columns in overflow Service deletes all set columns
- [NAE-1832] Security upgrade moment from 2.24.0 to 2.29.4
- [NAE-1839] Public view - fields after auto assign are still only visible
- [NAE-1869] Incorrectly expanded task
- [NAE-1802] TaskRef-ed fields behavior update unaware of parent task behavior
- [NAE-1800] Operations on date fields in advanced search are not rendered correctly

### Changed

- [NAE-1431] Login view redirect configuration
- [NAE-1725] Login spinner / button spinner
- [NAE-1674] Uri node cases pagination
- [NAE-1759] Update documentation of public views, PDF generator and user list
- [NAE-1762] Public view URL encoding

### Added

- [NAE-1678] User impersonation
- [NAE-1703] Dashboard
- [NAE-1809] UserList field show selected users
- [NAE-1835] Change password component
- [NAE-1841] Idle timer component
- [NAE-1874] Filtering users based on roles when selecting users for UserListField
- [NAE-1607] Allowed nets configuration for newly created filter
- [NAE-1722] Set default view headers with the CreateMenuItem action method
- [NAE-1711] Dashboard

## [6.2.9](https://github.com/netgrif/components/releases/tag/v6.2.9) (2023-05-04)

### Fixed

- [NAE-1867] Fulltext replaces only first ' '

## [6.2.8](https://github.com/netgrif/components/releases/tag/v6.2.8) (2023-03-22)

### Added

- [NAE-1851] Save selected headers in filter

## [6.2.7](https://github.com/netgrif/components/releases/tag/v6.2.7) (2022-12-19)

### Fixed

- [NAE-1803] UserListComponent validations bug

## [6.2.6](https://github.com/netgrif/components/releases/tag/v6.2.6) (2022-12-12)

### Fixed

- [NAE-1799] Multilevel process identifier handling in 6.2.x for public view
- [NAE-1800] Operations on date fields in advanced search are not rendered correctly

## [6.2.5](https://github.com/netgrif/components/releases/tag/v6.2.5) (2022-12-05)

### Fixed

- [NAE-1752] MatPrefix for currency field overrides prefix for dateField
- [NAE-1754] Currency field not displaying symbol
- [NAE-1758] Task on single task view is not rendering
- [NAE-1760] Enumeration autocomplete constantly sending value
- [NAE-1763] FileField value is not promoted to the frontend after "set data event"
- [NAE-1766] Options on multichoice autocomplete do not refresh in a specific situation

## [6.2.4](https://github.com/netgrif/components/releases/tag/v6.2.4) (2022-10-12)

### Fixed

- [NAE-1744] Public view does not work delete file
- [NAE-1745] Enumeration autocomplete constantly sending value

### Added

- [NAE-1751] Autocomplete new filter "include"

## [6.2.3](https://github.com/netgrif/components/releases/tag/v6.2.3) (2022-10-06)

### Fixed

- [NAE-1367] Boolean does not have desc
- [NAE-1537] It is not possible to copy a value from a visible enumeration
- [NAE-1729] User field null value on frontend throwing error
- [NAE-1731] Missing write access to /home/.../node_modules/@netgrif/components
- [NAE-1732] LDAP group role assignment component tile tooltip
- [NAE-1734] Overlay on login page
- [NAE-1736] Rich textarea fix cursor
- [NAE-1737] Bug i18n field placeholder
- [NAE-1738] Multichoice map autocomplete init key
- [NAE-1739] Currency symbol is displayed on new line, when editing currency field
- [NAE-1740] Disable "create case" button, while case is creating
- [NAE-1741] 'Undefined' error on frontend when checking i18n translation equality
- [NAE-1742] I18nField throws error on frontend when its value is null
- [NAE-1743] File preview change to null object

## [6.2.2](https://github.com/netgrif/components/releases/tag/v6.2.2) (2022-09-28)

### Fixed

- [NAE-1693] TaskController deleteFile endpoint lacks data about tasks
- [NAE-1712] Advanced search in case of date operators is blinking (very quickly opening and closing)
- [NAE-1713] Advanced search searching based on case data does not work
- [NAE-1715] Currency component not working properly
- [NAE-1716] Autocomplete component not working properly on enumeration_map field
- [NAE-1717] Banned roles not hiding menu entries
- [NAE-1721] Create case event bad handling on frontend
- [NAE-1724] Incorrect german translation

## [6.2.1](https://github.com/netgrif/components/releases/tag/v6.2.1) (2022-09-15)

### Fixed

- [NAE-1719] Auto finish no data does not work without auto assign

## [6.2.0](https://github.com/netgrif/components/releases/tag/v6.2.0) (2022-09-12)

### Fixed

- [NAE-1427] Allowed nets factory ignores allowedNets in nae.json
- [NAE-1430] Generated sidenav ignores inputs
- [NAE-1626] Trigger of set event for fileList value deletion is not implemented
- [NAE-1628] Reset radio buttons button visible on visible radio buttons
- [NAE-1635] Tree view has incorrect object for set data
- [NAE-1639] Non-Latin1 characters cannot be used in passwords
- [NAE-1667] Select user translation
- [NAE-1669] Fix header design
- [NAE-1672] Change userField value
- [NAE-1680] Public view + change behavior bug
- [NAE-1690] Fix header responsive overflow mode
- [NAE-1681] Delete file function works with parent task in taskRef-ed file field.
- [NAE-1701] Reload validity on the change required field
- [NAE-1708] Fix lint issues

### Changed

- [NAE-1156] View Deprecation and All Data
- [NAE-1457] Schematic support for public view generation
- [NAE-1606] Configuration of case creation button from menu item
- [NAE-1648] Redesign dataFields
- [NAE-1677] Message from exception thrown in SET event on data field is not propagated in EventOutcome
- [NAE-1682] Translate tooltip admin view
- [NAE-1695] Fix generated tests in schematics

### Added

- [NAE-1436] Create all views schematic
- [NAE-1437] Missing view components schematics
- [NAE-1631] Process download in workflow view
- [NAE-1642] Redirect to transition via URL
- [NAE-1643] Configure public view via request parameters
- [NAE-1647] Elastic mapping for I18N data field
- [NAE-1650] Multi-choice autocomplete field component missing
- [NAE-1658] Two-level navigation menu
- [NAE-1662] Navigation breadcrumbs
- [NAE-1671] Dynamic case title in tab
- [NAE-1679] User list frontend component

## [6.1.1](https://github.com/netgrif/components/releases/tag/v6.1.1) (2022-06-09)

### Fixed

- [NAE-1649] File field preview component bug
- [NAE-1656] Export nc-panel-item
- [NAE-1653] Create view schematic not functional after angular 13 update

## [6.1.0](https://github.com/netgrif/components/releases/tag/v6.1.0) (2022-06-01)

### Fixed

- [NAE-1470] Unable to copy from html text area
- [NAE-1526] Visible HTML text area with no value displays undefined
- [NAE-1591] Unit tests failing on "An error was thrown in afterAll"
- [NAE-1435] Number field value NaN causes 'Maximum call stack size exceeded'
- [NAE-1555] Required select enumeration does not display asterix

### Changed

- [NAE-1061] Resource pagination with paginator footer
- [NAE-1604] Remove case creation button if there are no nets where user can create an instance
- [NAE-1363] Refactor panel featured values
- [NAE-1462] Change BaseAllowedNetService to always use observables
- [NAE-1381] Public view task loading
- [NAE-1609] Angular 13 upgrade
- [NAE-1585] Security update to resolve vulnerabilities

### Added

- [NAE-1627] LDAP Groups resolving and mapping
- [NAE-1468] i18n Data field

## [6.0.4](https://github.com/netgrif/components/releases/tag/v6.0.4) (2022-04-12)

### Fixed

- [NAE-1613] Text selection in field value prevents task expansion panel header from reacting to click events
- [NAE-1594] SonarCloud analysis is not configured correctly for @netgrif/components
- [NAE-1614] Advanced search substring query
- [NAE-1601] Component preview field is not propagated into taskRef
- [NAE-1597] New case process input is not validated
- [NAE-1615] Finish button randomly throws error and does not send request
- [NAE-1619] Task that has no fields cannot be completed

### Changed

- [NAE-1612] Optimize Tree Case View performance with many children

## [6.0.3](https://github.com/netgrif/components/releases/tag/v6.0.3) (2022-04-01)

### Fixed

- [NAE-1592] UserService user$ observable null value not checked
- [NAE-1590] Taskref with file field must be assigned
- [NAE-1608] Configuration service getViewByUrl not working with /**

### Changed

- [NAE-1571] Change the Version.NEWEST from "^" to "latest"

## [6.0.2](https://github.com/netgrif/components/releases/tag/v6.0.2) (2022-03-04)

### Fixed

- [NAE-1389] Immediate map data fields display their keys
- [NAE-1455] Navigation menu closes on small screens and cannot be reopened
- [NAE-1472] MaterialAppearance property on AbstractDataField
- [NAE-1524] Header search by author is not working
- [NAE-1529] Finish auto does not work
- [NAE-1557] Cannot clear optional enumeration
- [NAE-1574] Net role permission checking
- [NAE-1575] User select component trying open non-existing side menu component
- [NAE-1577] Task reffed change behavior does not propagate
- [NAE-1580] Grammar check
- [NAE-1583] Broken FileField/FileListField placeholder
- [NAE-1586] Virtual scroll is broken everywhere on page

### Changed

- [NAE-1459] Loading indicator on login and registration related components

## [6.0.1](https://github.com/netgrif/components/releases/tag/v6.0.1) (2022-02-15)

- Fixing mistake with npm registry

## [6.0.0](https://github.com/netgrif/components/releases/tag/v6.0.0) (2022-02-11)

### Changed

- [NAE-1503] Permission refactor phase 1
- [NAE-1228] Re-enable class name minification

### Fixed

- [NAE-1539] Broken change propagation for data field within taskRef
- [NAE-1564] File field value change is not seen on frontend
- [NAE-1541] Navigation and refresh bug correction
- [NAE-1563] Filters don't work with parent views

## [5.8.0](https://github.com/netgrif/components/releases/tag/5.8.0) (2021-11-26)

### Changed

- [NAE-1469] Data group layouts refactor

### Added

- [NAE-1296] Event Outcome refactor

## [5.7.4](https://github.com/netgrif/components/releases/tag/5.7.4) (2021-12-21)

### Fixed

- [NAE-1534] CaseStringId search category is not exported

## [5.7.3](https://github.com/netgrif/components/releases/tag/5.7.3) (2021-11-23)

### Added

- [NAE-1493] i18n divider data field

## [5.7.2](https://github.com/netgrif/components/releases/tag/5.7.2) (2021-11-23)

### Fixed

- [NAE-1518] Export of chained filters

### Added

- [NAE-1519] Independent column count in data groups

## [5.7.1](https://github.com/netgrif/components/releases/tag/5.7.1) (2021-11-08)

### Fixed

- [NAE-1474] HtmlEditor: pop-up windows for url link does not show completely with video embedding
- [NAE-1487] Assign button on assigned task
- [NAE-1486] Default node case name in Tree Case View

### Changed

- [NAE-1421] File preview border
- [NAE-1042] Hide create new case button if there are no allowed nets

## [5.7.0](https://github.com/netgrif/components/releases/tag/5.7.0) (2021-10-29)

### Fixed

- [NAE-1375] Form field layout does not respect rows
- [NAE-1281] Immediate file field
- [NAE-1332] Cancel Task after interaction does not check user permissions correctly
- [NAE-1380] rxjs throwError calls are not returned
- [NAE-1460] Data field Spinner Attribute Refactor
- [NAE-1150] Workflow panel doesn't react to language change

### Changed

- [NAE-1390] Update "Process file could not be uploaded" message
- [NAE-1444] No inferrable param types tslint rule

### Added

- [NAE-1402] Configurable group navigation with role constraints
- [NAE-1397] Fix task rows

## [5.6.3](https://github.com/netgrif/components/releases/tag/5.6.3) (2021-09-27)

### Fixed

- [NAE-1451] Configurable group navigation issues
- [NAE-1452] Case Side Menu
- [NAE-1453] Example app sign-up broken

### Changed

- [NAE-1454] Dynamic filter chaining

## [5.6.2](https://github.com/netgrif/components/releases/tag/5.6.2) (2021-08-03)

## [5.6.1](https://github.com/netgrif/components/releases/tag/5.6.1) (2021-08-30)

## [5.6.0](https://github.com/netgrif/components/releases/tag/5.6.0) (2021-08-26)

### Fixed

- [NAE-1385] Immediate data cannot be copied from case panels
- [NAE-1377] Creation date time filtering
- [NAE-1356] Broken search for case id
- [NAE-1354] Empty task event title does nothing
- [NAE-1320] Asynchronously rendered hidden fields are always blocked
- [NAE-1303] Finishing task failing with message [object Object]
- [NAE-1298] Scrolling down with a lot of cases is broken
- [NAE-1293] Search service logs error
- [NAE-1288] Button overflows in Group management
- [NAE-1281] Immediate file field
- [NAE-1278] Autogenerated navigation disappears after site reload
- [NAE-1277] Scroll to invalid data field

### Changed

- [NAE-1304] Case title configuration
- [NAE-1246] URL auto resolve
- [NAE-1104] User filters

### Added

- [NAE-420] Redirect to any view

## [5.5.4](https://github.com/netgrif/components/releases/tag/5.5.4) (2021-12-20)

### Fixed

- [NAE-1536] Simple search does not work with values containing dash symbol

## [5.5.2](https://github.com/netgrif/components/releases/tag/5.5.2) (2021-07-19)

### Fixed

- [NAE-1395] AfterActions are not completed if some event queue conditions are not met

## [5.5.1](https://github.com/netgrif/components/releases/tag/5.5.1) (2021-07-09)

### Fixed

- [NAE-1386] setData events are ignored when fired too closely together

## [5.5.0](https://github.com/netgrif/components/releases/tag/5.5.0) (2021-06-11)

### Fixed

- [NAE-1316] Currency format is broken on number field
- [NAE-1315] Overflow in tabs
- [NAE-1314] Broken automatic tab closing when it is empty

### Changed

- [NAE-1318] I18n in autogenerated navigation
- [NAE-1313] Advanced case search filter for customer data fields
- [NAE-1297] Set action for invalid required value
- [NAE-1289] More filter operators

### Added

- [NAE-1305] Loading on set data for button data field

## [5.4.1](https://github.com/netgrif/components/releases/tag/5.4.1) (2021-05-31)

### Changed

- [NAE-1309] Expose close tab event to NAE tabs

## [5.4.0](https://github.com/netgrif/components/releases/tag/5.4.0) (2021-05-27)

### Fixed

- [NAE-1211] Search in several data fields does not work as intended

### Changed

- [NAE-1228] Re-enable class name minification
- [NAE-1207] Filter management
- [NAE-412] Process and Case loading refactor

## [5.3.1](https://github.com/netgrif/components/releases/tag/5.3.1) (2021-05-20)

### Fixed

- [NAE-1307] Cancel of a task is available even for unassigned task

## [5.3.0](https://github.com/netgrif/components/releases/tag/5.3.0) (2021-05-05)

### Changed

- [NAE-58] Dynamic Init values

### Added

- [NAE-1251] Dynamic validations

## [5.2.0](https://github.com/netgrif/components/releases/tag/5.2.0) (2021-05-03)

### Fixed

- [NAE-1165] Grid layout not stretching rows in height
- [NAE-1285] Display process version
- [NAE-1241] Remove three dots on task panel

### Changed

- [NAE-1291] Color lines
- [NAE-1272] Data group divider improvement
- [NAE-1269] Enable user preferences for anonymous user
- [NAE-1268] Displaying case ID in column
- [NAE-1238] Case event view

## [5.1.2](https://github.com/netgrif/components/releases/tag/5.1.2) (2021-04-16)

### Fixed

- [NAE-1287] Broken case creation when only one process is uploaded

## [5.1.1](https://github.com/netgrif/components/releases/tag/5.1.1) (2021-04-12)

### Fixed

- [NAE-1273] Data fields in task are accessible even on unassigned task
- [NAE-1266] Public view does not use i18n
- [NAE-1265] Anonymous user inconsistency

### Changed

- [NAE-1249] Async loading data group
- [NAE-1248] Icon enum
- [NAE-1247] Backend autocomplete enumeration
- [NAE-1245] Dynamic process loading

## 5.1.0 - Black Zinc (25.3.2021)

### Fixed

- [NAE-867] Search ignores process versions
- [NAE-1183] Race condition in switching between opened and closed task
- [NAE-1198] On assign event new data is not loaded if task was previously assigned
- [NAE-1200] Table mode broken after load
- [NAE-1237] Asynchronous search tests fail randomly
- [NAE-1270] Unavailable file upload after file deletion

### Improvement

- [NAE-1040] SearchService with variable base filter
- [NAE-1129] Add trackBy to data field ngFor
- [NAE-1158] Refactor factory services
- [NAE-1217] Upload file-ov na public view
- [NAE-1233] Add textElipsis on taskView
- [NAE-1234] Prevent ENOENT error during library build

### Added

- [NAE-1226] Frontend starter app features

## [5.0.7](https://github.com/netgrif/components/releases/tag/5.0.7) (2021-03-01)

## [5.0.6](https://github.com/netgrif/components/releases/tag/5.0.6) (2021-02-24)

## [5.0.5](https://github.com/netgrif/components/releases/tag/5.0.5) (2021-02-19)

### Changed

- [NAE-1244] Add button to immediate on panel

## [5.0.4](https://github.com/netgrif/components/releases/tag/5.0.4) (2021-02-19)

### Fixed

- [NAE-1243] Clearing fulltext input doesn't clear fulltext search

## [5.0.3](https://github.com/netgrif/components/releases/tag/5.0.3) (2021-02-09)

### Fixed

- [NAE-1221] TreeNode.toLoggableForm returns object with cyclic references
- [NAE-1222] TaskDataService destroy event is failing

## [5.0.2](https://github.com/netgrif/components/releases/tag/5.0.2) (2021-02-07)

### Fixed

- [NAE-1230] TrackBy function on fields not working correctly with taskRef changes
- [NAE-1229] On wrong credentials undefined user is propagated
- [NAE-1231] Enter key on login form does not trigger login action

## [5.0.1](https://github.com/netgrif/components/releases/tag/5.0.1) (2021-02-04)

### Fixed

- [NAE-1170] Lost of focus on forms
- [NAE-1218] Bad import on scss search theme
- [NAE-1219] NavigationTreeComponent path of undefined error
- [NAE-1223] Fix tests and lint warnings

## [5.0.0](https://github.com/netgrif/components/releases/tag/5.0.0) (2021-02-28)

### Fixed

- [NAE-1174] Boolean field isn't aligned at edge case layout
- [NAE-1179] getViewByPath broken
- [NAE-1176] Date picker dont have min and max value
- [NAE-1177] Dialog new line doesn't work
- [NAE-1187] Number validation inrange does not process floating points numbers
- [NAE-1210] Column search is not working correctly with advanced search component

### Changed

- [NAE-1147] Auto-generated navigation
- [NAE-1149] Immediate task data
- [NAE-1092] Unify filter attributes names
- [NAE-1106] User resizable navigation drawer
- [NAE-1120] Upgrade to Angular 10
- [NAE-1152] Don't load resources from external servers
- [NAE-1184] Disable task event buttons on loading and update state

### Added

- [NAE-1159] Eager loaded tree
- [NAE-1054] Public view
- [NAE-1115] User list on task instead of roles
- [NAE-1119] Constructor and destructor as process meta-data
- [NAE-1164] GroupGuard

## [4.6.0](https://github.com/netgrif/components/releases/tag/4.6.0) (2021-01-20)

### Fixed

- [NAE-1202] Bug in ChangedFieldTree

### Changed

- [NAE-1109] Task ref set data propagation

## [4.5.0](https://github.com/netgrif/components/releases/tag/4.5.0) (2020-12-22)

### Fixed

- [NAE-1163] Calling actions on invalid data field

### Changed

- [NAE-1178] Cancel and finish error changed fields propagation

### Added

- [NAE-1168] Task ref representation
- [NAE-1172] Frontend control from process actions

## [4.4.0](https://github.com/netgrif/components/releases/tag/4.4.0) (2020-12-14)

### Fixed

- [NAE-1143] Login form doesn't stretch properly
- [NAE-1072] SignUpService bad URL resolution
- [NAE-1085] getNets never emits with empty argument
- [NAE-1089] Task ref changed field calls get data
- [NAE-1111] Bad text field validation
- [NAE-1123] Translate all snackbar messages
- [NAE-1134] No tab notification emitted in edge case
- [NAE-1135] SetData on Finish task
- [NAE-1067] Prompt dialog irrelevant button press

### Changed

- [NAE-1091] Required of visible fields
- [NAE-932] TaskRef behaviour
- [NAE-1063] Display only the newest process version in create case
- [NAE-1088] Improve overridability of resource services
- [NAE-1132] Individual button control in login component
- [NAE-1145] Improve overrability of tasks services
- [NAE-1148] Clickable stepper

### Added

- [NAE-1141] GDPR and terms and conditions
- [NAE-1009] Group view schematic
- [NAE-1019] Currency view for number field
- [NAE-1098] Horizontal scrollbar view
- [NAE-1110] Configurable invalid data policy
- [NAE-1112] Sort search autocomplete
- [NAE-1093] Stepper component for enumeration field

## [4.3.1](https://github.com/netgrif/components/releases/tag/4.3.1) (2020-11-13)

### Fixed

- [NAE-1064] Required
- [NAE-1105] Current CaseTree node reload fails if node has no children case ref

## [4.3.0](https://github.com/netgrif/components/releases/tag/4.3.0) (2020-11-11)

### Fixed

- [NAE-986] Virtual scroll tab initialization broken
- [NAE-1006] Broken headers' alignment with 9 columns
- [NAE-1039] PetriNetResourceService bad return type
- [NAE-1041] Page interface not exported
- [NAE-1062] Extra process page loaded
- [NAE-1065] Fix bug with redirect service
- [NAE-1066] Fix Empty list text when list has loading
- [NAE-1073] Registration component stuck with bad token
- [NAE-1078] Tab labels are unaffected by language change
- [NAE-1082] Incorrect German translation in workflow view
- [NAE-1083] Enforce minimum password length
- [NAE-1084] LoadAllPages utility function break if there is no content
- [NAE-1094] Current CaseTree node reloads incorrectly

### Changed

- [NAE-1002] Boolean field visible values
- [NAE-1014] Pass DI context into ComponentPortals
- [NAE-1020] Change empty value of number field from 0 to 'empty'
- [NAE-1023] Password view for text field
- [NAE-1077] Component tag sending all included information

### Added

- [NAE-994] Group Management
- [NAE-1026] Filter by group
- [NAE-1031] Case delete button
- [NAE-1048] Process delete
- [NAE-1075] Recover account component

## [4.2.1](https://github.com/netgrif/components/releases/tag/4.2.1) (2020-09-23)

### Fixed

- [NAE-1007] Schematics of component library are broken
- [NAE-1033] Tab view fails to switch tab when called programmatically
- [NAE-889] Create View Schematic Inconsistencies
- [NAE-1004] Task ref can break task layout
- [NAE-890] SidenavView Schematic From nae.json
- [NAE-1003] Multi-choice field bug with required
- [NAE-1005] Immediate data with no title break header
- [NAE-1016] Parameter id z AuthorSearchRequest
- [NAE-1030] FileField have horizontal scrollbar
- [NAE-1050] Search in headers are broken
- [NAE-1032] Navigation drawer images appear empty
- [NAE-1012] Broken parsing of data fields

### Changed

- [NAE-1000] Repair dashboard cards
- [NAE-1051] Add icon to tree

### Added

None

## [4.2.0](https://github.com/netgrif/components/releases/tag/4.2.0) (2020-09-21)

### Fixed

- [NAE-996] Some data field ids break grid layout
- [NAE-995] Auto-assign tasks don't auto-cancel
- [NAE-993] NextPage in virtual scroll views broken
- [NAE-991] Create new case copy existing panel
- [NAE-990] Tabs view open already opened tab
- [NAE-985] Notify initially opened tab
- [NAE-983] Get view by URL duplicates '/' in the url string
- [NAE-982] Headers columns disappear
- [NAE-976] Logout broken
- [NAE-975] Reassign should filter by role
- [NAE-968] Filter changes ignored
- [NAE-967] Block fields after initializing DataFields
- [NAE-950] Remove timer from task view
- [NAE-923] Tab selection notifications broken
- [NAE-978] Broken method getViewByPath()

### Changed

- [NAE-989] Unsubscribe in ngOnDestroy
- [NAE-988] Authority to create in nae.json
- [NAE-981] Disabling buttons in panel
- [NAE-957] Create NAE Components Library
- [NAE-898] Repair unit tests
- [NAE-966] Task search on MongoDB refactor
- [NAE-301] Add key param to data-fields of type enumeration and multi-choice
- [NAE-267] Action result propagation

### Added

- [NAE-992] User Invite component
- [NAE-973] Authority Guard
- [NAE-972] Roles Guard
- [NAE-969] Task event notifications
- [NAE-965] Grid layout container
- [NAE-980] Create HTML textarea field

## [4.1.2](https://github.com/netgrif/components/releases/tag/4.1.2) (2020-09-10)

### Fixed

- [NAE-984] Destroy subscription on changedFields

## [4.1.1](https://github.com/netgrif/components/releases/tag/4.1.1) (2020-08-20)

### Fixed

- [NAE-956] Counters in tab
- [NAE-960] Tree does not reload cases
- [NAE-961] Cancel dont close the panel
- [NAE-963] Bad parsing multi-choice value
- [NAE-964] Validations work only with static dates

### Changed

- [NAE-958] Auto text stretching text area

### Added

None

## [4.1.0](https://github.com/netgrif/components/releases/tag/4.1.0) (2020-08-17)

### Fixed

- [NAE-956] Counters in tab
- [NAE-951] Tree adds children to incorrect nodes
- [NAE-947] Role assignment component deselect users o search
- [NAE-945] Button field class
- [NAE-944] Tabbed view schematic bad generation
- [NAE-943] Add min and max validation on text field
- [NAE-941] User Value in Panel
- [NAE-937] Enumeration autocomplete bug
- [NAE-936] Behavior subject in user service
- [NAE-924] Selected task in tree doesn't switch
- [NAE-912] Task with no data cannot be finished
- [NAE-907] Task event title
- [NAE-900] resolveLoginPath in AuthenticationGuard

### Changed

- [NAE-958] Auto text stretching text area
- [NAE-955] Tree root child notification
- [NAE-954] Enumeration and multi-choice responsive choices
- [NAE-953] Auto stretch text area
- [NAE-948] Configurable default template and appearance
- [NAE-942] Close tab after finish task
- [NAE-935] Change update strategy on some fields
- [NAE-933] Add counters to tab label
- [NAE-929] Search on Role Assigment Component
- [NAE-925] Remove Case Delete button from panel
- [NAE-922] Injection token for SnackBar position
- [NAE-918] Filter ID and MergeOperator getter
- [NAE-913] Form components without card element
- [NAE-914] User Transformer methods
- [NAE-908] Update Angular dependency
- [NAE-894] Auto-convert config filters to SimpleFilter
- [NAE-864] Additional CaseViewService Factories
- [NAE-874] Customisable data field offset

### Added

- [NAE-940] Automatically open one task in task list
- [NAE-939] Opening same tab
- [NAE-917] File list field
- [NAE-909] Search mode on headers
- [NAE-517] Background Screen
- [NAE-876] Tree Case View

## [4.0.1](https://github.com/netgrif/components/releases/tag/4.0.1) (2020-08-10)

### Fixed

- [NAE-931] Task content algorithm function defined in loop
- [NAE-921] Touch state cleared after set data
- [NAE-920] Regex with spaces doesn't work
- [NAE-916] Search predicate index tracking
- [NAE-915] PetriNetSearchRequest is not exported
- [NAE-906] Dynamic routing does not work on server
- [NAE-905] Default headers are not changing
- [NAE-901] Authentication Guard does not consider validity of session token
- [NAE-878] UserAssignComponent With Pagination
- [NAE-869] AuthGuard token expiration
- [NAE-860] Tab View Schematic doesn't generate 'canBeClosed' attribute

## [4.0.0](https://github.com/netgrif/components/releases/tag/4.0.0) (2020-07-24)

### Fixed

- [NAE-877] Enumeration Keys With Dot
- [NAE-878] UserAssignComponent With Pagination
- [NAE-879] Empty Rows in Data Field Layout Disappear
- [NAE-888] Add Schematic Missing Imports
- [NAE-892] Fix Format in Search Request Interface
- [NAE-897] Action Delegate Context Leak
- [NAE-899] Fields don't resolve validity when changing behavior
- [NAE-911] Enum is always required
- [NAE-912] Task with no data cannot be finished

### Changed

- [NAE-271] Unique id for all xml objects
- [NAE-849] Boolean data-field validation
- [NAE-851] Paper view
- [NAE-857] UI & UX upgrade
- [NAE-858] Responsive design in new components
- [NAE-861] Configuration service without schematic
- [NAE-862] Dynamic routing
- [NAE-875] Developer defined number of columns
- [NAE-881] Remove Injection Token Modules
- [NAE-882] User Transformer as service

### Added

- [NAE-504] Abstract view
- [NAE-505] Abstract tab
- [NAE-508] Abstract Panel
- [NAE-510] Task Panel
- [NAE-511] Case Panel
- [NAE-512] Abstract Dialog
- [NAE-513] Auth Service
- [NAE-514] User Service
- [NAE-515] Config Service
- [NAE-516] Search Service
- [NAE-518] Login Panel
- [NAE-519] Registration Panel
- [NAE-520] Forgotten password Panel
- [NAE-521] Task View
- [NAE-522] Task View Header
- [NAE-523] Search Bar
- [NAE-524] Case View
- [NAE-525] Case View Header
- [NAE-526] Main Menu (side nav)
- [NAE-527] Main Menu Item
- [NAE-528] Toolbar
- [NAE-529] Right sidenav
- [NAE-530] Right sidenav
- [NAE-531] New Case Sidenav
- [NAE-532] User Assign Sidenav
- [NAE-533] Filter Side-menu
- [NAE-534] User Profile
- [NAE-535] Workflows View
- [NAE-536] Import net sidenav
- [NAE-537] Admin Console
- [NAE-538] Process role list
- [NAE-539] User list
- [NAE-540] Abstract Data Field
- [NAE-541] Dashboard
- [NAE-543] Number Field
- [NAE-544] Text Field
- [NAE-545] Enumeration Field
- [NAE-546] Multi-choice Field
- [NAE-547] Boolean Field
- [NAE-548] Date Field
- [NAE-549] File Field
- [NAE-550] User Field
- [NAE-551] Date Field
- [NAE-552] Datetime Field
- [NAE-553] Button Field
- [NAE-556] Abstract Side menu
- [NAE-563] Snackbar service
- [NAE-572] Automated frontend documentation
- [NAE-573] Automated tests
- [NAE-574] Log service
- [NAE-584] Frontend installation schematic
- [NAE-763] Resource service
- [NAE-800] User Preference Service

### Tasks

- [NAE-357] Angular project
- [NAE-736] Documentation Page
- [NAE-753] Example App
- [NAE-757] Theming
- [NAE-805] Data Fields behaviour
- [NAE-807] Optimize package build
- [NAE-809] Frontend alpha release
- [NAE-822] Data field layout data
- [NAE-833] Custom components theming
- [NAE-835] NAE library assets
- [NAE-839] Schematics
- [NAE-843] Filter management (Filter repository)
- [NAE-844] Process service (process cache)
- [NAE-846] PetriNet Resource Service
- [NAE-768] Schematic initialize rout object
- [NAE-778] Schematic create/update route module
- [NAE-823] Optional dark theme and create pallet from string
- [NAE-836] User resource service
- [NAE-837] File resource service
- [NAE-838] Rich text area view
- [NAE-840] Empty view
- [NAE-841] Toolbar & sidenav
- [NAE-842] Auth guard

<!-- Template
## [version](https://github.com/netgrif/components/releases/tag/v) (YYYY-MM-dd)
### Added
 - for new features.
### Changed
 - for changes in existing functionality.
### Deprecated
 - for soon-to-be removed features.
### Removed
 - for now removed features.
### Fixed
 - for any bug fixes.
### Security
 - in case of vulnerabilities.
-->
