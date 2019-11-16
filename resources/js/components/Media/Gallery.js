import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

import './Modal.scss';

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
            imgSrc: null,
            croppedURL: null,
            crop: {
                x: 20,
                y: 10,
                width: 40,
                height: 40
            }
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.hover = this.hover.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.cropImage = this.cropImage.bind(this);

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

    verifyFile(files){
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

    handleDrop(files, rejectedFiles){
        if (rejectedFiles && rejectedFiles.length > 0){
            this.verifyFile(rejectedFiles)
        }

        if (files && files.length > 0){
             const isVerified = this.verifyFile(files)
              if (isVerified){
                  const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", ()=>{
                     const myResult = myFileItemReader.result
                     this.setState({
                         imgSrc: myResult,
                         imageType: currentFile.type,
                     })
                 }, false)

                 myFileItemReader.readAsDataURL(currentFile)
              }
         }
    }

    hover(){
        this.setState({
            hovering: true
        })
    }

    handleDragLeave(){
        this.setState({
            hovering: false
        })
    }

    onCropChange(crop){
        this.setState({ crop });
    }

    onImageLoaded(image, pixelCrop){
        this.imageRef = image;
        const { crop } = this.state;
        if (crop.aspect && crop.height && crop.width) {
          this.setState({
            crop: { ...crop, height: null },
          });
        } else {
          this.makeClientCrop(crop, pixelCrop);
        }
    }

    onCropComplete(crop, pixelCrop){
        this.makeClientCrop(crop, pixelCrop);
    }

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedURL = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
            );
            this.setState({ croppedURL });
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );

        return new Promise((resolve, reject) => {
            resolve(canvas.toDataURL());
        });
    }

    cropImage(e){
        e.preventDefault();
        const {croppedURL, imgSrc, imageType, media} = this.state;
        let form = new FormData();
        const extention = extractImageFileExtensionFromBase64(imgSrc);
        const fileName = "previewFile"+ extention;
        const newCroppedFile = base64StringtoFile(croppedURL, fileName);
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
                this.props.selectedImage(response.data.mediaInfo);
            }
            media.push(response.data.mediaInfo)
            this.setState({
                media: media,
                uploader: false,
                imgSrc: null,
                croppedURL: null,
            })
        });
    }

    handleSelectImage = (media) => {
        this.setState({
            uploader: false,
        });
        this.props.selectedImage(media);
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

    render () {
        const {imgSrc, hovering, croppedURL, uploader, media, crop} = this.state;
        return (
            <div className="gallery">
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item"><a className={ `nav-link ${uploader? '': 'active' }`} onClick={this.toggleTabs} href="#">Select Media</a></li>
                    <li className="nav-item"><a className={ `nav-link ${uploader? 'active': '' }`} onClick={this.toggleTabs} href="#">Upload</a></li>
                </ul>
                { uploader?
                        imgSrc !== null?
                            <div className="row">
                                {imgSrc && (
                                    <div className="col-12 col-md-8">
                                    <ReactCrop
                                        src={imgSrc}
                                        crop={crop}
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                    </div>
                                )}
                                {croppedURL && (
                                    <div className="col-md-4">
                                        <div className="card bg-light h-100">
                                            <div className="card-body bg-white">
                                                <p className="text-left d-none d-md-block">Preview Image</p>
                                                <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedURL} />
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
                                            onClick={this.handleSelectImage.bind(this, mediaItem)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        )
    }
}

export default Gallery;
