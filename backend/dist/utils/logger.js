"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sistema de logging estruturado
 * Em produção, pode ser substituído por winston ou pino
 */
const node_util_1 = __importDefault(require("node:util"));
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const writeLine = (line) => {
    process.stdout.write(`${line}\n`);
};
const formatMessage = (level, message, meta = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level,
        message,
        ...meta,
    };
    if (isDevelopment) {
        const metaString = Object.keys(meta).length > 0 ? ` ${node_util_1.default.inspect(meta, { depth: null })}` : "";
        writeLine(`[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`);
    }
    else {
        writeLine(JSON.stringify(logEntry));
    }
    return logEntry;
};
const logger = {
    error: (message, meta = {}) => {
        if (!isTest) {
            formatMessage('error', message, meta);
        }
    },
    warn: (message, meta = {}) => {
        if (!isTest) {
            formatMessage('warn', message, meta);
        }
    },
    info: (message, meta = {}) => {
        if (!isTest) {
            formatMessage('info', message, meta);
        }
    },
    debug: (message, meta = {}) => {
        if (isDevelopment && !isTest) {
            formatMessage('debug', message, meta);
        }
    },
};
exports.default = logger;
//# sourceMappingURL=logger.js.map