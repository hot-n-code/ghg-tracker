import React from 'react';
import { Input, Container, Table, Button } from 'semantic-ui-react';

const paddingStyle = { padding: 20 };
class AdminUserList extends React.Component {
  render() {
    return (
        <div className='background-all'>
        <div style={paddingStyle}>
        <Container>
          <Input fluid icon='search' placeholder='Search...'>
          </Input>
          <br/>
          <br/>
            <Table className="ui single line table">
              <thead>
              <tr>
                <th>Name</th>
                <th>Number of Cars</th>
                <th>Registration Date</th>
                <th>E-mail address</th>
                <th>Edit</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>John Lilki</td>
                <td>1</td>
                <td>September 14, 2013</td>
                <td>jhlilk22@yahoo.com</td>
                <td>
                  <button className="ui green button">Edit</button>
                  <button className="ui red button">Remove</button>
                </td>
              </tr>
              <tr>
                <td>Jamie Harington</td>
                <td>2</td>
                <td>January 11, 2014</td>
                <td>jamieharingonton@yahoo.com</td>
                <td>
                  <button className="ui green button">Edit</button>
                  <button className="ui red button">Remove</button>
                </td>
              </tr>
              <tr>
                <td>Jill Lewis</td>
                <td>1</td>
                <td>May 11, 2014</td>
                <td>jilsewris22@yahoo.com</td>
                <td>
                  <button className="ui green button">Edit</button>
                  <button className="ui red button">Remove</button>
                </td>
              </tr>
              </tbody>
            </Table>
        </Container>
        </div>
        </div>
    );
  }
}

export default AdminUserList;
