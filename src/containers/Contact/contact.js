import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Helmet from 'react-helmet';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configCustom from '../../config_custom';

import contactImg from './../../../images/contact1.jpg';

const style = require('./contact.scss');
class ContactForm extends Component {

  state = {
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    subject: '',
    subjectError: '',
    message: '',
    messageError: '',
    messageSent: false
  };

  onSubmit = eee => {
    eee.preventDefault();
    const err = this.validate();
    if (!err) {
      delete this.state.nameError;
      delete this.state.emailError;
      delete this.state.subjectError;
      delete this.state.messageError;
      delete this.state.messageSent;
      fetch('https://formspree.io/' + configCustom.app.contact.email_address, {
        method: 'post',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.setState({
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        subject: '',
        subjectError: '',
        message: '',
        messageError: '',
        messageSent: true
      });
    }
  };

  updateField(field, value) {
    this.setState({ [field]: value});
  }

  validate = () => {
    let isError = false;
    const errors = {
      nameError: '',
      emailError: '',
      subjectError: '',
      messageError: ''
    };

    if (this.state.name.length < 1) {
      isError = true;
      errors.nameError = 'Requires valid Name';
    }

    if (!/.+@.+\..+/.test(this.state.email)) {
      isError = true;
      errors.emailError = 'Requires valid email';
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  render() {
    const contactStatus = this.state.sentContact ? 'Thank you for your message.' : 'Contact';
    return (
      <div>
        <Helmet title="Contact"/>
      <div className="content-contact">
        <div className="container">
        <hr/>
        <div className={style.contactBlock1}>
          <div>
            <div className={style.contactL}>
              <img src={contactImg} alt="Contact Pic" />
            </div>
            <div className={style.contactR}>
                <div>
                  <h3 className={style.contactTitle}>{contactStatus}</h3>
                </div>
                <div className={style.contactTitle}>
                    <MuiThemeProvider>
                    <form>
                      <TextField
                        name="name"
                        floatingLabelText="Name"
                        value={this.state.name}
                        fullWidth={!false}
                        onChange= {(event) => this.updateField('name', event.target.value)}
                        errorText={this.state.nameError}
                        floatingLabelFixed
                      />
                      <br />
                      <TextField
                        name="email"
                        floatingLabelText="Email"
                        value={this.state.email}
                        fullWidth={!false}
                        onChange= {(event) => this.updateField('email', event.target.value)}
                        errorText={this.state.emailError}
                        floatingLabelFixed
                      />
                      <br />
                      <TextField
                        name="subject"
                        floatingLabelText="Subject"
                        value={this.state.subject}
                        fullWidth={!false}
                        onChange= {(event) => this.updateField('subject', event.target.value)}
                        errorText={this.state.usernameError}
                        floatingLabelFixed
                      />
                      <br />
                      <TextField
                        name="message"
                        floatingLabelText="Message"
                        value={this.state.message}
                        multiLine={!false}
                        style={{textAlign: 'left'}}
                        rows={1}
                        rowsMax={8}
                        fullWidth={!false}
                        onChange= {(event) => this.updateField('message', event.target.value)}
                        errorText={this.state.messageError}
                        floatingLabelFixed
                      />
                      <br />
                      <RaisedButton label="Submit" onClick={eee => this.onSubmit(eee)} primary />
                    </form>
                    </MuiThemeProvider>

                </div>
            </div>
            </div>
        <div className={style.contactBlock2}>
        </div>
        <hr/>
        </div>
      </div>
      </div>
      </div>
    );
  }
}


export default ContactForm;
