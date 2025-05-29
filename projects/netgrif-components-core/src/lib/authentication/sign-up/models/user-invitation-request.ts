export interface UserInvitationRequest {
    username: string;
    groups: Array<number>;
    roles: Array<string>;
}
