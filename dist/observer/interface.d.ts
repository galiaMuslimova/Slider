interface IObserver {
    observers: {
        key: string;
        observer: (data: any) => void;
    }[];
    subscribe(fn: {
        key: string;
        observer: (data: any) => void;
    }): void;
    notify(key: string, data: any): void;
}
export default IObserver;
