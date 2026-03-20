import { AppError } from "./AppError";
/**
 * Erro para validação de dados (400)
 */
export declare class ValidationError extends AppError {
    readonly errors: string[];
    constructor(message?: string, errors?: string[]);
}
//# sourceMappingURL=ValidationError.d.ts.map