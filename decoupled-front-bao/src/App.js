import React, { useState } from 'react';
import './App.css';

import axios from 'axios';

import Header from './components/Header';


function App() {
  
  const [fields, setFields] = useState({
    name: '',
    email: '',
    comment: '',
    excel: ''
  });

  function handleInputChange(event){
    if(event.target.name === "excel")
      fields[event.target.name] = event.target.files[0];
    else
      fields[event.target.name] = event.target.value;
    setFields(fields);
  }

  function handleFormSubmit(event){
    event.preventDefault();
    console.log(fields);
    send(fields);
    setFields({fields:""})
  }

  function send(){
    const formData = new FormData();
    Object.keys(fields).forEach(key => formData.append(key, fields[key]));
    axios.post('https://pacific-sea-93997.herokuapp.com/api/post', 
              formData,
              {
                headers: {
                  "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                }
              })
      .then(response => { console.log(response.data); })
  }


return (
<>

    <Header />
    <span></span>
    <div>
      <text>
        <p>Envie seu excel para edição.</p>
        <p>Corrigimos fórmulas, visualizações, tabelas dinâmicas.</p>
      </text>
    </div>
    <section>
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">nome</label>
                    <input type="text" id="name" name="name" onChange={handleInputChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" name="email"  onChange={handleInputChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">explique o problema</label>
                    <textarea name="comment" id="comment" cols="30" rows="10"  onChange={handleInputChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="excel">excel</label>
                    <input type="file" id="excel" name="excel"  onChange={handleInputChange}></input>
                </div>
                <button type="submit">enviar</button>
            </form>
        </div>
    </section>

</>
);

}
	
export default App;
