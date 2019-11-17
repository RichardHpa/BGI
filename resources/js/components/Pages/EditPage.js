import React, { Component } from 'react';
import Button from '../Buttons/Button';
import BlockEditor from '../Blocks/Blocks';

class EditPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pageInfo: ''
        }
    }

    componentDidMount () {
      const pageId = this.props.match.params.id;
      axios.get(`/api/page/${pageId}`).then(response => {
          console.log(response);
          if(response.data === '404'){
            console.log('need to redirect');
          } else {
              this.setState({
                  pageInfo: response.data.pageInfo
              })
          }
      })
    }

    render () {
        const {pageInfo} = this.state;
        console.log(pageInfo['blocks']);
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <h2>Edit {pageInfo['page_title']}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Page Title" onChange={this.changeTitle} value={pageInfo['page_title']}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                            {
                                pageInfo && <BlockEditor
                                                addBlock={this.handleAddBlock}
                                                blocks={pageInfo['blocks']}
                                                recieveBlocks={this.handleRecieveBlocks}
                                            />
                            }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md">
                        <div className="card p-4">
                            <button className="btn btn-bgi btn-block" onClick={this.sendForm}>Edit Page</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default EditPage
