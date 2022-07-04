import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '7d5f5b3ecb15471885fc6585166838aa', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
