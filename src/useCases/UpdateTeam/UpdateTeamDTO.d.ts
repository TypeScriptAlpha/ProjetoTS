export interface UpdateTeamDTO{
    user_id: string | null,
    is_admin: boolean | undefined,
    name?: string,
    leader?: string,
    id?: string
}