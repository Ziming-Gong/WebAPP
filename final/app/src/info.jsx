import { useEffect, useState } from 'react';
import {fetchGetInformation} from './services'

function Info({id}){
    const [info,setInfo] = useState({});
    useEffect( 
        ()=>{
        fetchGetInformation(id)
        .then(info =>{
            setInfo(info);
        })
        .catch(error =>{ 
            console.log('poop', error)
        }
        );
        },[]
    )
    return (
        <div className="infomation">
            <ul className="info">
                {
                    Object.values(info).map( item =>{
                        return(
                            <li>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Info;