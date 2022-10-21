import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharList from "../charList/charList";
import SingleChar from '../singleChar/singleChar';
import Search from '../search/search';

const App = () => {


    return(
        <Router>
            <Routes>
                <Route path='/' element={<><Search/><div className='char__content'><CharList/></div></>}></Route>
                <Route path="/charactar/:charID" element={<SingleChar/>}/>
            </Routes>
        </Router>
    ) 
}

export default App;