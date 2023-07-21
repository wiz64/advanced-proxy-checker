
export type Result = { valid?: boolean; status?: string; statusCode?: any|boolean; data?: any; }
export type Options = {
    hostname?: string;
    method: string;
    host?: string;
    path: string;
    agent: any;
    headers?: {}
}
