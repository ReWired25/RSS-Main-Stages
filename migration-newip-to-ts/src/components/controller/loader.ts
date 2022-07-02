import { IDataSource, IDataNews } from '../../types/interfaces';
import { Callback } from '../../types/functions';

type getRestObjParameter = {
    endpoint: string;
    options?: Record<string, string>;
};

enum ResponseErrors {
    notFound = 404,
    unauthorized = 401,
}

// type Callback<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: getRestObjParameter,
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === ResponseErrors.unauthorized || res.status === ResponseErrors.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: string) {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback<IDataSource | IDataNews>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: IDataSource | IDataNews) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
