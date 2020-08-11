import { loader, quoteContainer } from './Dom';

export const loading = (): void => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

export const complete = (): void => {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
};
