import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // путь
   const _apiKey = 'apikey=72e5fd280398cdce6c2d8429c281338f'; // ключ
   const _baseOffset = 210; // базовый отступ


    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getAllComicsList = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is not description',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available',
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            language: comics.textObjects.language || 'eu-us',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages'
        }
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`); // res это большой {} из которого вытаскиваем [] c нужными нам данными
        return res.data.results.map(_transformCharacter); // передаем callback на выходе получаем нужный нам [] c {}
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`); // Асинхронный запрос не забуть asyns await!
        return _transformCharacter(res.data.results[0]); // передаем полученный {} на трансформацию
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? char.description.slice(0, 210) : 'There is no description for this character.',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComicsList, getComic, getCharacterByName};
}

export default useMarvelService;