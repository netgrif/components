
export interface TaskPanelContext {
    canAssign: () => boolean;
    assign: () => void;
    getAssignTitle: () => string;
    delegate: () => void;
    getDelegateTitle: () => string;
    canReassign: () => boolean;
    canCancel: () => boolean;
    cancel: () => void;
    getCancelTitle: () => string;
    canFinish: () => boolean;
    finish: () => void;
    getFinishTitle: () => string;
    canCollapse: () => boolean;
    collapse: () => void;
    canDisable: (arg: string) => boolean;
    canDo: (arg: string) => boolean;
    isLoading: () => boolean;
}
