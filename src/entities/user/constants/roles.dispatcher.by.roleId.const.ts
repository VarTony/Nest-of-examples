import { RolesForPublicUserData } from "@user/types/constants.types";

const rolesDispatcherByRoleId  = (index: 1 | 2 | 3 | 4): RolesForPublicUserData => ([
    'Admin',
    'Moderator',
    'User',
    'Test'
][index-1] as RolesForPublicUserData);


export { rolesDispatcherByRoleId };