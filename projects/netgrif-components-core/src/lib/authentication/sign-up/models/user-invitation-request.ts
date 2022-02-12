export interface UserInvitationRequest {
    email: string;
    groups: Array<number>;
    processRoles: Array<string>;
}
