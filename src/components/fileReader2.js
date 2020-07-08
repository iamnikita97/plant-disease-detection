import React , { Component } from 'react';
const ImportFromFileBodyComponent = () => {
    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        console.log(content);
        // … do something with the 'content' …
    };

    const handleFileChosen = (fileInp) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(fileInp);

        console.log(fileInp);
        console.log(fileReader);

        var temp;
        let file = fileInp, reader = new FileReader();
        reader.onload = function(r){
            temp = r.target.result
        }
        reader.readAsDataURL(file);
       // self.setState({value:reader});


        // let fileRead = e.target.files[0], reader = new FileReader();
        //      reader.onload = function(r){
        //          self.setState({
        //              src: r.target.result
        //          });
        //      }
        // reader.readAsDataURL(file);

    //    document.getElementById('display-file').src = temp;

        
    };

    return <div className='upload-expense'>

        <img id="display-file" height={80} width={80}/>

        <input type='file'
               id='file'
               className='input-file'
               accept='image/*'
               onChange={e => handleFileChosen(e.target.files[0])}
        />
    </div>;
};
export default ImportFromFileBodyComponent;