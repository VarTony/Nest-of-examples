type PassPack = {
    salt: string, 
    passhash: string
};

type RolesForPublicUserData = 'Admin' | 'Moderator' | 'User' | 'Test';

export { PassPack, RolesForPublicUserData };