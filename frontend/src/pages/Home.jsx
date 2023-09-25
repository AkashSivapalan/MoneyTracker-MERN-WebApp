import React, {useEffect, useState } from 'react';
import './Home.css';
import jwtDecode from "jwt-decode";

function Home() {

  const [name,setName] = useState('');
  const [datetime,setDatetime] = useState('');
  const [description,setDescription] = useState('');
  const [transactions,setTransactions] = useState([]);
  const [error, setError] = useState(false);


  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions);
    })
  }, []);


  async function getTransactions() {
    const jwt = localStorage.getItem("token");
    const acc = jwtDecode(jwt);
    const email = acc.email;


    const url = import.meta.env.VITE_REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    const data = await response.json();
    return data.filter(d => d.email === email);


  }

  function handleSubmit(ev) {
    const url = import.meta.env.VITE_REACT_APP_API_URL + '/transaction';
    

    if (datetime === '' || description === '' || name.split(' ').length < 2 || (!(!isNaN(+name.split(' ')[0])))) {
      console.log("Enter all input fields");
      setError(true)
      ev.preventDefault();
    }else {

      const price = name.split(' ')[0];
          const jwt = localStorage.getItem("token");
      const acc = jwtDecode(jwt);
      const email = acc.email
        fetch(url, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            price,
            name: name.substring(price.length + 1),
            description,
            datetime,
            email,
          })
        })
          .then(response => {
          response.json().then(json => {
            setName('');
            setDatetime('');
            setDescription('');
            setError(false);
            
            console.log('result', json);
          });
        });
    }
    

  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;

  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];



  return (
    <main>
      <h1>${balance}<span>.{ + fraction}</span></h1>
      <form onSubmit={handleSubmit}>
        <div className="basic">
          <input type="text"
            value={name}
            onChange={ev=>setName(ev.target.value) }
            palceholder={'+200 new samsung tv'} />
          <input type="datetime-local"
                      value={datetime}
            onChange={ev=>setDatetime(ev.target.value) }/>           
        </div>

        <div className="description">
          <input type="text" placeholder={'description'}
                      value={description}
            onChange={ev => setDescription(ev.target.value)}
          />

        </div>
        <button type="submit">Add new transaction</button>
        {error ? <label>Enter information in the correct fields before saving</label> : ""}
        
      </form>

      <div className="transactions">
        {transactions.length>0 && transactions.map(transaction=>(
        <div className="transaction">
          <div className="left">
            <div className="name" >{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>

          <div className="right">
              <div className={"price " + (transaction.price<0?'red':'green')} >{transaction.price}</div>
            <div className="datetime">2023-09-09 20:12</div>
          </div>
        </div>
))}
      </div>
    </main>
  );
}

export default Home;

