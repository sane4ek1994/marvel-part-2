import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {clearError, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);


    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }


    const setContent = (process, char) => {
        switch (process) {
            case 'waiting':
                return <Skeleton/>;
                break;
            case 'loading':
                return <Spinner/>;
                break;
            case 'confirmed':
                return <View char={char}/>;
                break;
            case 'error':
                return <ErrorMessage/>;
                break;
            default:
                throw new Error('Unexpected process state');
        }
    }

    return (
        <div className="char__info"> 
            {setContent(process, char)}
        </div>
    )
}

const View = ({char}) => {
    const {thumbnail, name, homepage, description, wiki, comics} = char;
    let imgStyle = {'obectFit': 'cover'};

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character.'}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li className="char__comics-item" key={item.id}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

//Проверка типов с помощью доп пакета PropTypes
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;