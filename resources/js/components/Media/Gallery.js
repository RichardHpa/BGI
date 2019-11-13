import React, { Component } from 'react';
import './Modal.scss';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {image64toCanvasRef, downloadBase64File, extractImageFileExtensionFromBase64, base64StringtoFile} from './ReusableUtils.js';

const imageMaxSize = 1000000000;
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';

class Gallery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            media: [],
            uploader: true,
            hovering: false,
            src: null,
            crop: {
                unit: '%',
                width: 40,
                height: 40
            },
        }
    }

    toggleTabs = (e) => {
        e.preventDefault();
        this.setState({
            uploader: !this.state.uploader
        })
    }

    handleDragOver = () => {
        this.setState({
            hovering: true
        })
    }

    handleDragLeave = () => {
        this.setState({
            hovering: false
        })
    }

    verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypes.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    handleDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0){
            this.verifyFile(rejectedFiles)
        }

        if (files && files.length > 0){
            const isVerified = this.verifyFile(files)
            if (isVerified){
                const currentFile = files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener('load', () =>{
                    const myResult = myFileItemReader.result;
                    this.setState({
                        src: myResult,
                        imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                    })
                }, false)

                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }

    onImageLoaded = (image) => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        console.log(crop);
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            resolve(canvas.toDataURL());
        });
    }

    render () {
        const { uploader, hovering, croppedURL, crop} = this.state;
        const { croppedImageUrl, src } = this.state;
        return (
            <div>
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item"><a className={ `nav-link ${uploader? '': 'active' }`} onClick={this.toggleTabs} href="#">Select Image</a></li>
                    <li className="nav-item"><a className={ `nav-link ${uploader? 'active': '' }`} onClick={this.toggleTabs} href="#">Upload</a></li>
                </ul>
                { uploader?
                        src !== null?
                            <div className="row">
                                {src && (
                                    <div className="col-12 col-md-8">
                                    <ReactCrop
                                        src={src}
                                        crop={crop}
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                    </div>
                                )}
                                {croppedImageUrl && (
                                    <div className="col-md-4">
                                        <div className="card bg-light h-100">
                                            <div className="card-body bg-white">
                                                <p className="text-left d-none d-md-block">Preview Image</p>
                                                <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                                            </div>
                                            <div className="card-footer bg-white border-0">
                                                <button className="btn btn-bgi mt-3" onClick={this.cropImage}>Crop Image</button>
                                                <button className="btn mt-3" onClick={this.cropImage}>Cancel Crop</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        :
                            <Dropzone
                                onDrop={this.handleDrop}
                                accept={acceptedFileTypes}
                                multiple={false}
                                maxSize={imageMaxSize}
                                onDragOver={this.handleDragOver}
                                onDragLeave={this.handleDragLeave}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <section id="dropzoneSection">
                                    <div id="dropzone" {...getRootProps()} className={hovering? 'hovering': ''}>
                                    <input {...getInputProps()} />
                                    <button className="btn btn-theme-color">Drag 'n' drop some files here, or click to select files</button>
                                    </div>
                                    </section>
                                )}
                            </Dropzone>
                        :
                            'List all of the media'
                }
            </div>
        );
    }
}

export default Gallery;
