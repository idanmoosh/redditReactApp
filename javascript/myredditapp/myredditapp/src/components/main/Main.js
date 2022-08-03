import './Main.css'
import { MainBody } from '../MainBody/MainBody'
import { Subreddits } from '../SubReddits/SubReddits'
export function Main (){
    return(<div className='Main'>
        <Subreddits/>
        <MainBody/>
    </div>)
}