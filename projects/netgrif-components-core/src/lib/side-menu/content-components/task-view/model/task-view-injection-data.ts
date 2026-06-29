import {SideMenuInjectionData} from "../../../models/side-menu-injection-data";
import {TaskSearchRequestBody} from "../../../../filter/models/task-search-request-body";

export interface TaskViewInjectionData extends SideMenuInjectionData {
    searchBody: TaskSearchRequestBody
}
