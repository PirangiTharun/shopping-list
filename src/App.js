import React, { useState } from 'react';
import './App.css';
import plus from './plus.png';
import left from './left.svg';
import right from './right.svg';

function App() {
  const [item, setItem] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [total, setTotal] = useState(0);
  const handleChange = (e) => {
    setItem(e.target.value);
  }
  const handleClick = () => {
    if (item.length > 0) {
      setAllItems(prev => [...prev, { 'name': item, 'count': 1, 'checked': false }]);
      setTotal(total + 1);
      setItem('');
    }
  }
  const changeCount = (name, change) => {
    const newItems = allItems.map((item) => {
      if (item.name === name) {
        if (item.count + change >= 1) setTotal(total + change);
        return { 'name': item.name, 'count': item.count + change < 1 ? 1 : item.count + change };
      }
      return item;
    });
    setAllItems(newItems);
  }
  const handleCheckboxClick = (name) => {
    const newItems = allItems.map((item) => {
      if (item.name === name) {
        return { 'name': item.name, 'count': item.count, 'checked': !item.checked };
      }
      return item;
    });
    setAllItems(newItems);
  }
  return (
    <>
      <h1 className='title'>Shopping List</h1>
      <div className='parentDiv'>
        <div className='fakeInput'>
          <input className='inputBox' type={"text"} value={item} onChange={handleChange} />
          <img src={plus} alt='' onClick={handleClick} />
        </div>
        {allItems.map((oneItem, index) => (
          <div className='shopItem'>
            <div className='itemName'>
              <input className='checkBox' type={'checkbox'} checked={oneItem.checked} onClick={() => handleCheckboxClick(oneItem.name)} />
              {oneItem.checked ? <h2 style={{ marginBlock: 0 }} key={index}><s>{oneItem.name}</s></h2> : <h2 style={{ marginBlock: 0, }} key={index}>{oneItem.name}</h2>}
            </div>
            <div className='countEdit'>
              <img className='chevImages' src={left} alt='' onClick={() => changeCount(oneItem.name, -1)} />
              <p>{oneItem.count}</p>
              <img className='chevImages' src={right} alt='' onClick={() => changeCount(oneItem.name, 1)} />
            </div>
          </div>
        ))}
        <div>
          {total > 0 && <h2 className='total'>Total : {total}</h2>}
        </div>
      </div>
    </>

  );
}

export default App;
