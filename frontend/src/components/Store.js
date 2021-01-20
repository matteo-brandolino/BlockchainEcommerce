import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Pagination from './Pagination';

const API_URL = 'http://localhost:4000'

function Store({paymentProcessor, dai }) {
    const [state, setState] = useState(0)
    const [items, setItems] = useState()

    const buy = async (item) => {
        const price = ethers.utils.parseEther(item.price)
        //store payment in db
        const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`)
        const tx1 = await dai.approve(paymentProcessor.address, price)
        await tx1.wait()
        //here pay from smart contract
        const tx2 = await paymentProcessor.pay(price, response1.data.paymentId)
        await tx2.wait()

        //give time to listen events to backend
        await new Promise(resolve => setTimeout(resolve, 5000))

        const response2 = await axios.get(`${API_URL}/api/getItemUrl/${response1.data.paymentId}`)
        console.log(response2);
    }

    const fetchItems = async () => {
        await axios.get(`${API_URL}/api/getAllItems`)
            .then((response)=>{
            const selectedItems = response.data.items.items.slice(state,state + 4) //0,4 4,8 8,12
            setItems(selectedItems);

        }).catch((err) => console.log(err.response))
    }

    useEffect(() => {
        fetchItems()
        // eslint-disable-next-line
    }, [state])

    return (
        <div 
            className="d-flex flex-column justify-content-center align-items-center" 
            style={{borderRadius:"30px" , backgroundColor:"white", width:"90%", height:"85%", margin:"4.75em auto"}}
        >
        <h3 className="black-text">Best Items in the World</h3>
        <div className="d-flex flex-row justify-content-center mb-1">
            {
                items && items.map( (item, idx)=> (
                    <Card key={item.id} style={{width:"18em", margin:"1em"}}>
                        <Card.Img variant="top" src={item.urlImg} style={{width:"100%", height:"16em"}} />
                        <Card.Body className="d-flex flex-column justify-content-center">
                                <Card.Title className="black-text">{item.name}</Card.Title>
                                <Card.Text className="text-center">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, veniam!
                                </Card.Text>
                                <button
                                    style={{width:"50%", margin:"0.5em auto 0"}}
                                    type='button' 
                                    className="btn btn-primary"
                                    onClick={ () => buy(items[idx])}  
                                >{item.price} DAI</button>

                        </Card.Body>
                    </Card>
                    
                ))
            }
        </div>
        <Pagination state={state} setState={setState} />
        </div>
    )
}

export default Store
