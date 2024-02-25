import React,{useState,useEffect} from 'react';

const AddCommunity =({setCommunities})=>{

    const [showInputsOne, setShowInputsOne] = useState(false);
    const [showInputsTwo, setShowInputsTwo] = useState(false);
    const [showInputsThree, setShowInputsThree] = useState(false);
    const [inputValues, setInputValues] = useState({
      input1: "",
      input2: "",
      input3: "",
    });

    const handleClickOne = () => {
        if(showInputsOne)
        {
            setShowInputsOne(!showInputsOne);
            setInputValues({...inputValues,input1:''})
        }
        else
            {setShowInputsOne(!showInputsOne);}
    };

    const handleClickTwo=()=>{
        if(showInputsTwo)
        {
            setShowInputsTwo(!showInputsTwo);
            setInputValues({...inputValues,input2:''})
        }
        else
            {setShowInputsTwo(!showInputsTwo);}
    }

    const handleClickThree=(e)=>{
      if(showInputsThree)
        {
            setShowInputsThree(!showInputsThree);
            setInputValues({...inputValues,input3:''})
        }
        else
            {setShowInputsThree(!showInputsThree);}
    }
  
    const handleInputChange = (event) => {
      setInputValues({
        ...inputValues,
        [event.target.name]: event.target.value,
      });
    };

    useEffect(()=>{
        setCommunities({input1:inputValues.input1,input2:inputValues.input2,input3:inputValues.input3})
    },[inputValues,setCommunities])
  
    return (
        
      <div className='community'><hr className="grey-line" />

        <div className='community-header'>
        <h3 className='post-community'>Post Community</h3>
        </div>
        <div className='community-name'><button id='oneButton' name='oneButton' className='comm-button' onClick={(e)=>handleClickOne(e)}>&#123;{showInputsOne && 'X'}
        &#125;</button>{
            <input
              type="text"
              name="input1"
              id="input1"
              className='comm-input'
              placeholder="Enter a Community Name"
              value={inputValues.input1}
              onChange={handleInputChange}
              hidden={!showInputsOne}
            />}</div>
            <div className='community-name'>
            <button id='twoButton' name='twoButton' className='comm-button' onClick={(e)=>handleClickTwo(e)}>&#123;{showInputsTwo && 'X'}
        &#125;
            </button>{
            <input
              type="text"
              name="input2"
              id="input2"
              className='comm-input'
              placeholder="Enter a Community Name"
              value={inputValues.input2}
              onChange={handleInputChange}
              hidden={!showInputsTwo}
            />}</div>
            <div className='community-name'>
            <button id='threeButton' name='threeButton' className='comm-button' onClick={(e)=>handleClickThree(e)}>&#123;{showInputsThree && 'X'}
        &#125;
            </button>{
            <input
              type="text"
              id="input3"
              name="input3"
              className='comm-input'
              placeholder="Enter a Community Name"
              value={inputValues.input3}
              onChange={handleInputChange}
              hidden={!showInputsThree}
            />}</div>
      </div>
    );
  };

export default AddCommunity;