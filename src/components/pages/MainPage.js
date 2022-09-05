import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const  onCharSelected = (id) => {
        setChar(id);
    }
  
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <ErrorBoundary>
                <CharSearchForm />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage;