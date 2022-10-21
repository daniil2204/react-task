import { useState,useEffect } from "react"
import Service from "../../services/services";
import Spinner from "../spinner/spinner";
import ErrorMess from "../errorMess/errorMess";
import { Link } from "react-router-dom";

import './charList.scss'

const CharList = () => {
    const[chars, setChars] = useState([]);
    const[newItemLoading, setNewItemLoading] = useState(true);
    const[page,setPage] = useState(1)
    const[charEnded, setCharEnded] = useState(false);
    const { loading, error, getChars } = Service();
    
    let limit = 1

    useEffect(() => {
        if (limit === 1){
            onRequest(page,true);
        }
    },[])
  

    const onRequest = (page,initial)=>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getChars(page)
            .then(onCharLoad)
            .then(limit = 0)
    }
    
    const onCharLoad = (newchars) =>{     
        if (newchars.length < 10) {
            setCharEnded(charEnded => true)
        }         
        setChars(chars => [...chars , ...newchars]);
        setPage(page => page + 1)
        setNewItemLoading(newItemLoading => false);
    }

    

    const renderItems = (arr) => {
        const items = arr.map((item) => {
            return(
                <Link className= "char__item" key={item.id} to={`/charactar/${item.id}`}>
                    <div className="char__str">{item.name}</div>
                    <div className="char__str">height = {item.height} m</div>
                    <div className="char__str">mass = {item.mass} kg</div>
                    <div className="char__str">hair color = {item.hairColor}</div>
                    <div className="char__str">skin color = {item.skinColor}</div>
                    <div className="char__str">height = {item.height} kg</div>
                    <div className="char__str">id = {item.id} </div>
                </Link>
            )
        })
        return(
            <div className="char__grid">
                {items}
            </div>
        )
    }

    const loadButton = newItemLoading  ? <Spinner/> : 
            <button className="button button__main button__long" 
                onClick = {()=> onRequest(page)}
                style = {{'display' : charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>;
    const errorMessage = error ? <ErrorMess/> : null;
    const spinner = loading && !newItemLoading  ? <Spinner/> : null;
    const items = renderItems(chars);
    return(
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}
            {loadButton}
        </div>
    )
    
}

export default CharList;