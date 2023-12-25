import React, { useState } from 'react';

function CreateBlog() {
    const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    // Limit the input to 50 characters
    if (value.length <= 50) {
      setInputValue(value);
    }
  };
    return (
        <div style={{marginTop:'6rem'}}>
            <h1>Create Blog</h1>
            {/* <textarea name="" id="" cols="30" rows="10" maxLength={100} style={{resize:'none',width:'30rem',height:'30rem'}}>dfsdf</textarea> */}
            <input
                type="text"
                id="limitedInput"
                value={inputValue}
                onChange={handleChange}
                className={inputValue.length === 50 ? 'reachedLimit' : ''}
            />

        </div>
    );
    
};

export default CreateBlog;
