import React from 'react';
import { Container } from 'semantic-ui-react';

const paddingStyle = { padding: 20 };

/** A simple static component to render some text for the landing page. */
class FeedBack extends React.Component {
  render() {
    return (
        <Container style={paddingStyle}>
        <div className='container'>
          <div className="row">
            <div className='container-fluid'>
              <h1>Feedback</h1>
              <p>Feedback helps us to understand where improvements are needed. Please let us know.</p>
              <div className="panel panel-default">
                <div className="panel-body">
                  <form className="form-horizontal" action="#">
                    <div className="form-group">
                      <label htmlFor="typeField" className="col-sm-2 control-label">Feedback Type:</label>
                      <div className="col-sm-10">
                        <select className="form-control" id="typeField" name="type">
                          <option value="problem">PROBLEM</option>
                          <option value="feature">FEATURE</option>
                          <option value="question">QUESTION</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="nameField" className="col-sm-2 control-label">Name (Optional):</label>
                      <div className="col-sm-10">
                        <textarea rows="1" cols="66" className="form-control" id="nameField" placeholder="Name"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailField" className="col-sm-2 control-label">Email:</label>
                      <div className="col-sm-10">
                        <textarea rows="1" cols="66" className="form-control" id="emailField"
                               placeholder="Email"
                               required="true"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="messageField" className="col-sm-2 control-label">Feedback:</label>
                      <div className="col-sm-10">
                        <textarea rows="10" cols="66" className="form-control" id="messageField" placeholder="Enter Feedback Here" required="true"/>
                      </div>
                    </div>
                    <div>
                      <br/>
                      <button type="reset" className="btn btn-default">Reset</button>
                      &nbsp;&nbsp;
                      <button type="submit" className="btn btn-default">Email Form Data to Us</button>
                    </div>
                  </form>
                  <br/>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Container>
    );
  }
}

export default FeedBack;
