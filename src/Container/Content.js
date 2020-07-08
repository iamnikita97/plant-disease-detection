import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Content(props) {
    const [state, setState] = useState({
        disease_name: '-',
        propbility: '-',
        record_prediction: false,
        modal_load_complete: false
    })
    const [model, setModel] = useState(null);
    const [results, setResults] = useState([]);
    const [imageURL, setImageURL] = useState(null);
    const imageRef = useRef();
    const inputRef = useRef();

    /*  Map Classes */
    const TARGET_CLASSES = {
        0: "Bacterial_spot",
        1: "Black_rot",
        2: "Cercospora_leaf_spot Gray_leaf_spot",
        3: "Common_rust",
        4: "Early_blight",
        5: "Esca_(Black_Measles)",
        6: "Haunglongbing_(Citrus_greening)",
        7: "healthy",
        8: "Late_blight",
        9: "Leaf_blight_(Isariopsis_Leaf_Spot)",
        10: "Leaf_Mold",
        11: "Leaf_scorch",
        12: "mosaic_virus",
        13: "Northern_Leaf_Blight",
        14: "Powdery_mildew",
        15: "rust",
        16: "scab",
        17: "Septoria_leaf_spot",
        18: "Spider_mites Two-spotted_spider_mite",
        19: "Squash___Powdery_mildew",
        20: "Target_Spot",
        21: "Yellow_Leaf_Curl_Virus"
    };




    useEffect(() => {

        loadModel();
        /*  code to run on component mount */
    }, [])

    const handleUpload = event => {
        const { files } = event.target;
        if (files.length > 0) {
            console.log(event.target.files[0], "----file");
            const url = URL.createObjectURL(event.target.files[0]);


            setState((state) => ({
                ...state,
                record_prediction: true
            }));

            setImageURL(url);
            setTimeout(function () { identify() }, 100);
        }
    };

    const loader = () => {
        return <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs

        />
    }

    const loadModel = async () => {

        //const model = await mobilenet.load();
        const model = await tf.loadGraphModel('/model/model.json');
        console.log(model);
        setModel(model);

        setState((state) => ({
            ...state,
            modal_load_complete: true
        }));
    };

    const identify = async () => {
        //const results = await model.classify(imageRef.current);

        console.log("Loading image...");
        let tensor = tf.browser.fromPixels(imageRef.current, 3)
            .resizeNearestNeighbor([224, 224]) // change the image size
            .expandDims()
            .toFloat()
            .reverse(-1); // RGB -> BGR

        let predictions = await model.predict(tensor).data();
        console.log(predictions);

        let finalData = Array.from(predictions)
            .map(function (p, i) { // this is Array.map
                return {
                    probability: p,
                    className: i
                };
            }).sort(function (a, b) {
                return b.probability - a.probability;
            }).slice(0, 1);


        console.log(finalData[0], "----matched records");

        const { probability, className } = finalData[0];



        setState((state) => ({
            ...state,
            record_prediction: false,
            disease_name: (TARGET_CLASSES[className]).replace(/_/g, " "),
            propbility: `${(probability * 100).toFixed(
                2
            )}%`,
        }));

        console.log(state, "******");

        //setResults(top5);

    }; 
    return (<>
        <div className="container" style={{ marginTop: 30 }}>
            <div className="row">


                <div className="col-md-6">
                    <div className="col-md-12">
                        <img src={imageURL != null ? imageURL : '/maxresdefault.jpg'}
                            alt="upload-preview" ref={imageRef} style={{ width: "100%" }} height="300" />

                        <div className="select-image-upload" style={{ marginTop: '0px' }} >
                            <input
                                className="btn btn-warning"
                                type="file"
                                accept="image/*"
                                capture="camera"
                                onChange={handleUpload}
                                ref={inputRef}
                                style={{ width: "100%" }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="text-center1">

                        <ul>
                            {results.map(({ className, probability }) => (
                                <li key={className}>{`${className}: %${(probability * 100).toFixed(
                                    2
                                )}`}</li>
                            ))}
                        </ul>

                        <div className="col-md-12">
                            <h2>Predictions  {state.record_prediction &&
                                <div className="spinner-grow spinner-grow-sm" style={{ marginLeft: '10px' }}></div>}
                            </h2>


                            <div className="table-responsive">
                                <table className="table table-borderless" id="table_disease_prediction">
                                    <tbody>
                                        <tr>
                                            <td>Disease Name :</td>
                                            <td>{state.disease_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Probebility Percentage :</td>
                                            <td>{state.propbility}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
    );
}

export default Content;