import { AxiosResponse } from "axios";
import Mirai from "..";
import { PickMariaReq, PickMariaRes } from "../api";
import { IMiraiAxiosConfig } from "../types";
export declare function createService(miraiInstance: Mirai): {
    get<URL_1 extends keyof import("../api/verify").default | keyof import("../api/info").default | keyof import("../api/message").default>(url: URL_1, config?: IMiraiAxiosConfig<URL_1> | undefined): Promise<AxiosResponse<PickMariaRes<URL_1>, any>>;
    post<URL_2 extends keyof import("../api/verify").default | keyof import("../api/info").default | keyof import("../api/message").default>(url: URL_2, data?: PickMariaReq<URL_2> | undefined, config?: IMiraiAxiosConfig<URL_2> | undefined): Promise<AxiosResponse<PickMariaRes<URL_2>, any>>;
};
