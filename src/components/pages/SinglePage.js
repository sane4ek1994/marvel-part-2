import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import AppBanner from "../appBanner/AppBanner";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';



const SinglePage = ({Component, dataType}) => {
    const {id} = useParams(); // передаем comicId в URL
    const [data, setData] = useState(null);
    const {loading, error, getComic, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic' :
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }


    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;