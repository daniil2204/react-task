import Service from "../../services/services";
import ErrorMess from '../errorMess/errorMess';
import Spinner from '../spinner/spinner';
import { Link,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import './singleChar.scss'

const SingleChar = () => {
    const { loading, error, getChar,getInfo } = Service();

    const{charID} = useParams();
    const[char,setChar] = useState();
    const[dataFilms,setFilms] = useState([])
    const[dataPlanet,setPlanet] = useState([])
    const[dataSpecies,setSpecies] = useState()
    let limit = 1
    useEffect(() => {
        if (limit === 1){
            onRequest();
        }
    },[charID])
  

    const onRequest = ()=>{
        getChar(charID)
            .then(onCharLoad)
            .then(limit = 0)
    }
    


    const onCharLoad = (char) =>{             
        setChar(char);
        char.films.forEach(element => {
            getInfo(element,"films").then(film => {
                setFilms(dataFilms => [...dataFilms,film])
            })
        });
        getInfo(char.homeWorldUrl,"planets").then(planet => {
            setPlanet(planet)
        })
        if (char.species != false){
            getInfo(char.species,"species").then(species => {
                setSpecies(species)
            })
        }

    }



    const renderFilm = ()=> {
        const filmData = dataFilms.map((item,index) => {
            return(
                <p key={index}>
                    <span className="single-char__str">title - {item.title}; </span>
                    <span className="single-char__str">director - {item.director}; </span>
                    <span className="single-char__str">producer - {item.producer}; </span>
                    <span className="single-char__str">release date - {item.release_date}; </span>
                </p>
            )
        });
        return(
            <p>
                {filmData}
            </p>
        )
    }

    const renderPlanet = ()=> {
        return(
            <p>
                <span className="single-char__str">title - {dataPlanet.title}; </span>
                <span className="single-char__str">terrain - {dataPlanet.terrain}; </span>
                <span className="single-char__str">population - {dataPlanet.population}; </span>
            </p>
        )
    }

    const renderSpecies = ()=> {
        let str;
        if (dataSpecies == undefined) {
            return <span className="single-char__str">Human </span>
        }else{
            return(
                <p>
                    <span className="single-char__str">title - {dataSpecies.title}; </span>
                    <span className="single-char__str">averageLifespan - {dataSpecies.averageLifespan}; </span>
                    <span className="single-char__str">classification - {dataSpecies.classification}; </span>
                    <span className="single-char__str">language - {dataSpecies.language}; </span>
                </p>
            )
        }
    }


    const renderChar = (char)=> {
        const{name,height,mass,hairColor,skinColor,eye,birth,gender,homeWorld,films,species,vehicles,starships,created,edited,url,id} = char;
        return(
            <div className="single-char">
                <div className="single-char__info">
                    <p className="single-char__str">name - {name}</p>
                    <p className="single-char__str">height - {height} centimeter</p>
                    <p className="single-char__str">mass - {mass} kg</p>
                    <p className="single-char__str">hairColor - {hairColor}</p>
                    <p className="single-char__str">skinColor - {skinColor}</p>
                    <p className="single-char__str">eye - {eye}</p>
                    <p className="single-char__str">birth - {birth}</p>
                    <p className="single-char__str">gender - {gender}</p>
                    <p className="single-char__str">created - {created}</p>
                    <p className="single-char__str">edited - {edited}</p>
                    <p className="single-char__str">species : {renderSpecies()}</p>
                    <p className="single-char__str">films list{renderFilm()}</p>
                    <p className="single-char__str">planet{renderPlanet()}</p>
                    <Link to='/' className="single-char__back">Back to all</Link>
                </div>
            </div> 
        )
    }

    const errorMessage = error ? <ErrorMess/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) && char ? renderChar(char) : null;

    return(
        <div>
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

export default SingleChar