import React from "react";
class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: null };
        this.onChange = this.onChange.bind(this);
        this.resetFile = this.resetFile.bind(this);
    }
    onChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        });
    }

    resetFile(event) {
        event.preventDefault();
        this.setState({ file: null });
    }
    render() {
        return (
            <div>
                {this.state.file && (
                    <div style={{ textAlign: "center" }} className="image-action-btn-container">
                        <button onClick={this.resetFile} >Remove File</button>
                    </div>
                )}

                <div className="div-image-preview">
                    <img style={{ width: "100%" }} src={this.state.file != null ? this.state.file : '/maxresdefault.jpg'} className="rounded" width="100%" height="300" />
                </div>

                <div className="select-image-upload" style={{ marginTop: '0px' }} >
                    <input type="file" className="btn btn-warning" style={{ width: '100%' }} type="file" onChange={this.onChange} accept="image/*" />
                </div>


            </div>
        );
    }
}
export default FileUpload;
