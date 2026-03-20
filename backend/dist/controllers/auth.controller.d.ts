import { Request, Response } from "express";
import type { UserCreate } from "../types";
export declare const register: (req: Request<{}, {}, UserCreate>, res: Response) => Promise<Response>;
export declare const login: (req: Request, res: Response) => Promise<Response>;
//# sourceMappingURL=auth.controller.d.ts.map