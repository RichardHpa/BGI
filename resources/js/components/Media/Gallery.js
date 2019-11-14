import React, { Component } from 'react';
import './Modal.scss';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

import {image64toCanvasRef, downloadBase64File, extractImageFileExtensionFromBase64, base64StringtoFile} from './ReusableUtils.js';

const imageMaxSize = 1000000000;
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';

class Gallery extends Component {
    constructor (props) {
        super(props);
        this.state = {
            media: [],
            uploader: false,
            hovering: false,
            src: null,
            crop: {
                unit: '%',
                width: 40,
                height: 40
            },
        }
    }

    componentDidMount () {
        axios.get('/api/media').then(response => {
            this.setState({
                media: response.data
            })
        })
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
                const currentFile = files[0];
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener('load', () => {
                    const myResult = myFileItemReader.result;
                    this.setState({
                        src: myResult,
                        imageType: currentFile.type,
                        extention: currentFile.path.split('.').pop()
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

    cancelCrop = (e) => {
        e.preventDefault();
        this.setState({
            src: null,
            croppedImageUrl: null,
            imageType: null,
            hovering: false
        });
    }

    cropImage = (e) => {
        e.preventDefault();
        const {croppedImageUrl, src, imageType, media} = this.state;
        let form = new FormData();
        const extention = extractImageFileExtensionFromBase64(src);
        const fileName = "previewFile"+ extention;
        const newCroppedFile = base64StringtoFile(croppedImageUrl, fileName);
        form.append('file', newCroppedFile);
        form.append('type', imageType);
        form.append('extention', extention);
        axios.post('/api/media', form, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            }
        })
        .then((response) => {
            if(this.props.selectedImage){
                this.props.selectedImage();
            }
            media.push(response.data.mediaInfo)
            this.setState({
                uploader: false,
                media: media
            })
        });
    }

    render () {
        const { uploader, hovering, crop, croppedImageUrl, src, media } = this.state;
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
                                                <button className="btn mt-3" onClick={this.cancelCrop}>Cancel Crop</button>
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
                        <div className="row">
                            {
                                media.map((mediaItem, i) => (
                                    <div className="col-6 col-sm-4 col-md-2 mt-2" key={i}>
                                        <img
                                            src={`/images/uploads/square/${mediaItem.media_name}`}
                                            className="img-fluid thumbImg"
                                        />
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        );
    }
}

export default Gallery;
