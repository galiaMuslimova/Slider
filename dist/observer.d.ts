declare class Observer {
    observers: {
        key: string;
        observer: (data: any) => void;
    }[];
    constructor();
    subscribe(fn: {
        key: string;
        observer: (data: any) => void;
    }): void;
    unsubscribe(fn: {
        key: string;
        observer: (data: any) => void;
    }): void;
    notify(key: string, data: any): void;
}
export default Observer;
