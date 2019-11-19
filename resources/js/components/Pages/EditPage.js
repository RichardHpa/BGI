import React, { Component } from 'react';
import Button from '../Buttons/Button';
import BlockEditor from '../Blocks/Blocks';

class EditPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            orignalName: '',
            pageID: null,
            pageTitle: '',
            blocks: []
        }
    }

    componentDidMount () {
      const pageId = this.props.match.params.id;
      axios.get(`/api/page/${pageId}`).then(response => {
          if(response.data === '404'){
            console.log('need to redirect');
          } else {
              for (var i = 0; i < response.data.pageInfo.blocks.length; i++) {
                  response.data.pageInfo.blocks[i].originalID = response.data.pageInfo.blocks[i].id;
                  response.data.pageInfo.blocks[i].id = i+1;
              }
              this.setState({
                  orignalName: response.data.pageInfo.page_title,
                  pageID: response.data.pageInfo.id,
                  pageTitle: response.data.pageInfo.page_title,
                  blocks: response.data.pageInfo.blocks
              })
          }
      })
    }

    changeTitle = (e) => {
        this.setState({
            pageTitle: e.target.value
        })
    }

    handleRecieveBlocks = (allBlocks) => {
        // console.log(allBlocks);
        this.setState({
            blocks: allBlocks
        })
    }

    sendForm = (e) => {
        e.preventDefault();
        const { pageTitle, blocks } = this.state;
        let form = new FormData();
        form.append('page_title', pageTitle);
        form.append('blocks', JSON.stringify(blocks));
        axios.post(`/api/pages/edit/${this.state.pageID}`, form)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log('error');
        });
    }

    render () {
        const {orignalName, pageTitle, blocks, pageID} = this.state;
        return (
            <section className="pb-3">
                <div className="row">
                    <div className="col-12 col-md-7">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Page Title" onChange={this.changeTitle} value={pageTitle}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                            {
                                pageID &&  <BlockEditor
                                            blocks={blocks}
                                            recieveBlocks={this.handleRecieveBlocks}
                                        />
                            }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md">
                        <div className="card p-4">
                            <div className="row">
                                <div className="col">
                                    <h2>Edit {orignalName}</h2>
                                </div>
                            </div>
                            <button className="btn btn-bgi btn-block" onClick={this.sendForm}>Edit Page</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default EditPage
