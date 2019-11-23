import React, { Component } from 'react';
import Button from '../Buttons/Button';
import BlockEditor from '../Blocks/Blocks';
import MediaModel from '../Media/MediaModel';


class AddProgrammes extends Component {
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            bio: '',
            media: null,
            blocks: []
        }
    }
    handleRecieveBlocks = (allBlocks) => {
        this.setState({
            blocks: allBlocks
        })
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    changeBio = (e) => {
        this.setState({
            bio: e.target.value
        })
    }

    sendForm = (e) => {
        e.preventDefault();
        const { title, media, bio } = this.state;
        console.log(title, media, bio);
        let form = new FormData();
        form.append('programme_tite', title);
        form.append('programme_bio', bio);
        form.append('programme_image', media.id);
        // form.append('blocks', JSON.stringify(blocks));
        axios.post('/api/programme/add', form)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log('error');
        });
    }

    handleSendImage = (image) => {
        this.setState({
            media: image
        })
    }

    render () {
        const { blocks, media } = this.state;
        return (
            <section>
                <div className="row">
                    <div className="col-12 col-md-7">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Programme Title" onChange={this.changeTitle}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <BlockEditor
                                    blocks={blocks}
                                    recieveBlocks={this.handleRecieveBlocks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md">
                        <div className="card p-4">
                            <div className="form-group">
                                <label>Programme Bio</label>
                                <textarea className="form-control" onChange={this.changeBio}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Programme Image</label>
                                {
                                    media === null?
                                        <MediaModel sendImage={this.handleSendImage}/>
                                    :
                                    <img className="img-fluid" src={`/images/uploads/originals/${media.media_name}`} />
                                }
                            </div>
                            <button className="btn btn-bgi btn-block" onClick={this.sendForm}>Save Page</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default AddProgrammes
