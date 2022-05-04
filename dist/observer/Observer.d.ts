import IObserver from './interface';
declare class Observer implements IObserver {
    observers: {
        key: string;
        observer: (data: any) => void;
    }[];
    constructor();
    subscribe(fn: {
        key: string;
        observer: (data: any) => void;
    }): void;
    notify(key: string, data: any): void;
}
export default Observer;
