import type { UserCreate, UserPublic } from "../types";
export declare function register(data: UserCreate): Promise<{
    user: UserPublic;
    token: string;
}>;
export declare function login(email: string, password: string): Promise<{
    user: UserPublic;
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map