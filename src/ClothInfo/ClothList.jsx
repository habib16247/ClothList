import React, { useEffect, useState } from 'react'
import "./Cloth.css"
import Cloths from './Cloths';
import folderImage from '../assets/image/folder.png';

const ClothList = () => {
    
    
    const getDataFromLocal = () => {
        const data = localStorage.getItem("Clothes") 
        if(data) {
            return JSON.parse(data)
        } else {
            return []
        }
    }
    

    const [data, setData] = useState(getDataFromLocal());
    

     const submitHandler = (e) => {
        e.preventDefault();
        const input = {};
        const elements = [...e.target.elements];

        
        elements.forEach(element => {
            if ((element.name === "ClothId" || element.name === "price" || element.name === "quantity") && (element.value < 0) ) {
                alert("Please Enter the Positive Number!!!")
                return [...e.target.elements] = []
            } else {
                if (element.name === "size" && element.checked) {
                    input[element.name] = element.value;
                    element.checked = false;
                } else if (element.name !== "size") {
                    input[element.name] = element.value;
                    element.checked = false;
                    element.value = ""
                }
            }
        });
        
        const IdOfcloth = data.find(item => item.ClothId === input.ClothId) 
        if (IdOfcloth) {
            alert("Set unique Id for this Item!!!")
        } else {
            setData([...data, input])
        }

     }

     useEffect(() => {
        localStorage.setItem("Clothes", JSON.stringify(data))
     }, [data])


     const deleteHandler = (id) => {
        const findData = data.filter(item => item.ClothId !== id)
        setData(findData)
     }

     const deleteAll = () => {
        setData([])
     }

  return (
    <div className='ClothList'>
        <div className="formSections">
        <div className="headLine">
            <h1>Cloth Items Management Data</h1>
            <p>List Of Cloth Details</p>
        </div>
        <form onSubmit={submitHandler}>
            <div className="left-form">
            <label> 
                <span className="title">
                   Cloth Name:
                </span><br />
                <input type="text" name='ClothName' required />
            </label>
            <br /><br />
            
            <label>

                <span className="title">
                    Cloth ID:
                </span> <br />
                <input type="number" name='ClothId' required />
            </label>
            <br /><br />

            <label>
                <span className="title">
                    Price:
                </span><br />
                <input type="number" name='price' required/>
            </label>
            <br /><br />

            <label>
                <span className="title">
                    Quantity:
                </span><br />
                <input type="number" min="1" max="10" name='quantity' required />
            </label>
            <br /><br />

            <label >
                <span className="title">
                    Choose a Color:
                </span><br />
                <select name="colors" required >
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                </select>
            </label>
            <br /><br />



            </div>

            <div className="right-form">
            <label className='radio' >
                <span className="title">
                   Size:
                </span>
                <span>
                    <input type="radio" name='size' value="X" required />
                    <b>X</b>
                </span>
                
                <span>
                    <input type="radio" name='size' value="XL" />
                    <b>XL</b>
                </span>

                <span>
                    <input type="radio" name='size' value="M" />
                    <b>M</b>
                </span>
            </label>
            <br /><br />

            <label>
                <span className="title">
                    Manufacture Date:
                </span><br />
                <input type="date" name='manufacDate' required />
            </label>
            <br /><br />
            
            <label>
                <span className="title">
                    Description:
                </span><br />
                <textarea style={{resize: "none"}} name="description" id="descript" required></textarea>
            </label>
            <br /><br />
            
            <label>
                <input type="checkbox" name='condition' value="true" required/>
                   <b style={{fontSize: "16px"}}>Accept Our Terms and Condition</b>
            </label>
            <br /><br />

            <button type='submit' className='addBtn'>Add</button>

        </div>

            
        </form>
        {
            data.length > 0 ? (
                <div className="table">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Cloth Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th>Manu. Date</th>
                        <th>
                            Delete
                        </th>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => <Cloths key={item.ClothId} item={item} deleteHandler={deleteHandler}/>)
                        }
                    </tbody>
                </table>
                    <button onClick={deleteAll} className='removeAll'>Remove All</button>
                </div>
            ) : (
                <div style={{textAlign: "center", marginTop: "20px"}}>
                    <img style={{width: "150px"}} src={folderImage} alt="empty" />
                    <h1>There is no Item Added!!!</h1>
                </div>
            )
        }
        </div>
    </div>
  )
}

export default ClothList