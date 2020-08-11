import { authorText, quoteText, newQuoteBtn, twitterBtn } from './Dom';
import { loading, complete } from './Loader';
import { twitterShare } from './Twitter';

interface IQuote {
    quoteText: string;
    quoteAuthor: string;
}

const httpRequest = async <T>(request: RequestInfo): Promise<T> => {
    loading();
    try {
        const response = await fetch(request);
        const body = await response.json();
        complete();
        return body;
    } catch {
        httpRequest<T>(request);
    }
};

const fetchQuote = async () => {
    const proxyUrl = 'https://cryptic-refuge-10869.herokuapp.com/';
    const apiUrl =
        'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    const quote = await httpRequest<IQuote>(proxyUrl + apiUrl);
    authorText.innerHTML =
        quote.quoteAuthor === '' ? 'UnKnow' : quote.quoteAuthor;
    quoteText.innerHTML = quote.quoteText;

    if (quote.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
};

fetchQuote();

newQuoteBtn.addEventListener('click', fetchQuote);
twitterBtn.addEventListener('click', twitterShare);
