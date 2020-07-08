import React from 'react';
import './App.css';
// import InputFileReader from './components/fileReader';
// import ImportFromFileBodyComponent from './components/fileReader2';
import Header from './Container/Header';
import Content from './Container/Content';

function App() {
  return (
    <div>
      <Header />
      {/* <InputFileReader />
      <br />
      <ImportFromFileBodyComponent /> */}
       <Content />
    </div>
  );
}

export default App;
