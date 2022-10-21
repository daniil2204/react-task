import { Hook } from "../hooks/hook";

const Service = () => {
    const {loading, request, error, clearError} = Hook();

    const getChars = async(page) => {
        const res = await request(`https://swapi.dev/api/people/?page=1&page=${page}`);
        return res.results.map(_transformData)
    }

    const getChar = async(id) => {
        const res = await request(`https://swapi.dev/api/people/${id}`);
        return _transformData(res)
    }


    const getInfo = async(url,title) => {
        const res = await request(url);
        switch (title) {
            case "films":
                return _transformSingleData(res,"film")
            case "planets":
                return _transformSingleData(res,"planet")
            case "species":
                return _transformSingleData(res,"species")
            default:
                break;
        }
        
    }

    const findIndex = (str) => {
        let arr = str.split("")
        let Id = []
        for (let i = arr.length - 1; i > 0; i--) {
            if(arr[i] === '/'){
                Id.push(arr[i-1])
                if(typeof Number(arr[i-2]) === 'number' && arr[i - 2] !== '/'){
                    Id.push(arr[i - 2])
                    Id.reverse();
                }
                break;
            }
        }
        return Id.join("")
    }

    const _transformData = (char)=>{
        let charId = findIndex(char.url)
        return {
            name: char.name,
            height : char.height,
            mass : char.mass,
            hairColor : char.hair_color,
            skinColor : char.skin_color,
            eye : char.eye_color,
            birth : char.birth_year,
            gender : char.gender,
            homeWorldUrl : char.homeworld,
            films : char.films,
            species : char.species,
            vehicles : char.vehicles,
            starships : char.starships,
            created : char.created,
            edited : char.edited,
            url : char.url,
            id : charId
        }
    }

    const _transformSingleData = (data,typeOfData)=> {
            switch (typeOfData) {
                case "planet":
                    return{
                        title:data.name,
                        terrain:data.terrain,
                        population:data.population,
                    }
                case "film":
                    return{
                        title:data.title,
                        director:data.director,
                        producer:data.producer,
                        release_date:data.release_date
                    }
                case "species":
                    return{
                        title:data.name,
                        averageLifespan:data.average_lifespan,
                        classification:data.classification,
                        language:data.language
                    }
            
                default:
                    break;
        }
    } 


    return {getChars,loading,clearError,error,getChar,getInfo}

}


export default Service;

