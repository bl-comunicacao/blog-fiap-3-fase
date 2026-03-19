/**
 * Sistema de logging estruturado
 * Em produção, pode ser substituído por winston ou pino
 */
interface LogMeta {
    [key: string]: any;
}
interface Logger {
    error: (message: string, meta?: LogMeta) => void;
    warn: (message: string, meta?: LogMeta) => void;
    info: (message: string, meta?: LogMeta) => void;
    debug: (message: string, meta?: LogMeta) => void;
}
declare const logger: Logger;
export default logger;
//# sourceMappingURL=logger.d.ts.map