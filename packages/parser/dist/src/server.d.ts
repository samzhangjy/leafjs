/// <reference types="node" />
import expressWs from 'express-ws';
export declare const staticServer: (publicPath: string) => {
    start: {
        (port: number, hostname: string, backlog: number, callback?: (() => void) | undefined): import("http").Server;
        (port: number, hostname: string, callback?: (() => void) | undefined): import("http").Server;
        (port: number, callback?: (() => void) | undefined): import("http").Server;
        (callback?: (() => void) | undefined): import("http").Server;
        (path: string, callback?: (() => void) | undefined): import("http").Server;
        (handle: any, listeningListener?: (() => void) | undefined): import("http").Server;
    };
    update: () => void;
    error: (msg: string) => void;
    on: (event: string, callback: (parent: import("express-serve-static-core").Application<Record<string, any>>) => void) => expressWs.Application;
};
//# sourceMappingURL=server.d.ts.map