/**
 * Names of a user from which the initials are made: a user of the engine (`name`, `surname`), the logged user
 * (`firstName`, `lastName`) or only a full name / e-mail.
 */
export interface UserInitialsSource {
    name?: string;
    surname?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
}

/**
 * Initials of a user for an avatar: the first letters of the name and of the surname (of the words of the full name
 * when they are missing, the first letter of the e-mail at last), at most two letters.
 *
 * @param user the user, `undefined` gives an empty string
 * @returns the initials in upper case
 */
export function userInitials(user: UserInitialsSource | undefined): string {
    const parts = [user?.name ?? user?.firstName, user?.surname ?? user?.lastName].filter(part => !!part?.trim());
    const source = parts.length > 0 ? parts : (user?.fullName ?? '').split(/\s+/).filter(part => !!part);
    const initials = source.map(part => part.trim().charAt(0)).join('').slice(0, 2);
    return (initials || user?.email?.charAt(0) || '').toUpperCase();
}
