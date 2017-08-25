export interface RouteInfo {
    id: string;
    title: string;
    icon: string;
    role?: string;
    path?: string;
    children?: RouteInfo[];
}
