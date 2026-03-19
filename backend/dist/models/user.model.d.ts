import type { User } from "../types";
export declare function findByEmail(email: string): Promise<User | undefined>;
export declare function findById(id: number): Promise<User | undefined>;
interface UserInsert {
    email: string;
    password_hash: string;
    name?: string | null;
}
export declare function create(data: UserInsert): Promise<User>;
export {};
//# sourceMappingURL=user.model.d.ts.map