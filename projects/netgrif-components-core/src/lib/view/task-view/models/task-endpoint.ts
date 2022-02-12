/**
 * Used to determine which backend endpoint should be used to request tasks from
 */
export enum TaskEndpoint {
    MONGO = 1,
    ELASTIC,
}
