import { authorText, quoteText } from './Dom';

export const twitterShare = (): void => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
};
