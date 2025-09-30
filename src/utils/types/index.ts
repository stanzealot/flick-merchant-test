import { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export type Payload = Record<string, unknown>;

export type APIPagination = {};

export interface ApiResponse {
    status?: number;
    data?: any;
    message?: string;
}
