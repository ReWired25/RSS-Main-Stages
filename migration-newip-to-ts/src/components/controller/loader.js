import { IResponse, IDataSource, IDataNews } from '../../types/interfaces';

class Loader {
    constructor(baseLink, options) {
        this.baseLink = baseLink; // https://newsapi.org/v2/
        this.options = options; // 7d5f5b3ecb15471885fc6585166838aa
    }
    // ({endpoint: 'everything',options: {sources: sourceId}}, (data) => this.view.drawSources(data))
    getResp(
        { endpoint, options = {} }, // sources // { apiKey: '7d5f5b3ecb15471885fc6585166838aa' }
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    // getResp( { endpoint: 'sources' }, (data) => this.view.drawSources(data) )
    // { this.load('GET', { endpoint: 'sources' }, (data) => this.view.drawSources(data), options); }

    errorHandler(res) {
        console.log(res);

        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        console.log(res);
        console.log(res.body);

        return res;
    }

    // ({}, 'sources')
    makeUrl(options, endpoint) {
        const urlOptions = { ...this.options, ...options }; // { apiKey: '7d5f5b3ecb15471885fc6585166838aa' }
        let url = `${this.baseLink}${endpoint}?`; // https://newsapi.org/v2/sources/?

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        console.log(url);

        return url.slice(0, -1);
    }

    // ('GET', 'sources',  (data) => this.view.drawSources(data), {})

    load(method, endpoint, callback, options = {}) {
        // ( ( {}, 'sources' ), 'GET')
        fetch(this.makeUrl(options, endpoint), { method }) // https://newsapi.org/v2/sources?apiKey=7d5f5b3ecb15471885fc6585166838aa
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return callback(data);
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
