import { useState } from 'react'
import { Link } from 'react-router-dom'
import './search.scss'
import data from "../../chars/chars.json"

const Search = () => {

    const[searchValue,setSearchValue] = useState('')

    const changeInput = (event) => {
        setSearchValue(event.target.value)
    }

    const renderItems = () => {
        const items = data.chars.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map(item => {
                return(
                    <Link key={item.id} className='search__items' to={`/charactar/${item.id}`}>{item.name}</Link>
                )
        }) 

        return(
            <div className='search__items-border'>
                {items}
            </div>
        )
    } 

    const items = searchValue == "" ? null : renderItems();

    return(
        <>
            <input className="search__input"
                placeholder="Поиск..." 
                type="text" 
                onChange={changeInput}/>
            {items}
        </>
        
        
    )
}

export default Search;

