/*
The book project lets a user keep track of different books they would like to read, are currently
reading, have read or did not finish.
Copyright (C) 2020  Karan Kumar

This program is free software: you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.
If not, see <https://www.gnu.org/licenses/>.
*/

import React, { Component } from 'react'
import './Register.css'
import Button from '@material-ui/core/Button'
import Password from '../shared/form/Password'
import Username from '../shared/form/Username';
import { Link } from "react-router-dom"
import logo from '../shared/media/logo.png'

type RegisterProps = {
}

interface IState {
  username: string,
  password: string,
  passwordsMatch: boolean,
  isUsernameDirty: boolean,
  isPasswordDirty: boolean,
  areCredentialsInvalid: boolean
}

class Register extends Component<{}, IState> {
  constructor(props: RegisterProps) {
    super(props)

    this.state = {
      username: '',
      password: '',
      passwordsMatch: true,
      isUsernameDirty: false,
      isPasswordDirty: false,
      areCredentialsInvalid: false
    }

    this.handlePasswordChanged = this.handlePasswordChanged.bind(this)
    this.handleConfirmPasswordChanged = this.handleConfirmPasswordChanged.bind(this)
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onCreateAccountClicked = this.onCreateAccountClicked.bind(this)
  }

  handlePasswordChanged(password: string) {
    console.log(`register password: ${password}`)
    this.setState({
      password,
      isPasswordDirty: true
    })
  }

  handleConfirmPasswordChanged(password: string) {
    console.log(`register confirm password: ${password}`)
    const passwordsMatch = password === this.state.password
    this.setState({passwordsMatch})
  }

  onUsernameChanged(username: string) {
    this.setState({
      username,
      isUsernameDirty: true
    })
  }

  onCreateAccountClicked() {
    const isFieldEmpty = this.state.username === '' || this.state.password === ''
    this.setState({
      areCredentialsInvalid: isFieldEmpty
    })
  }

  isPasswordInvalid(): boolean {
    const isPasswordDirtyAndBlank = this.state.password === '' && this.state.isPasswordDirty
    return isPasswordDirtyAndBlank || this.state.areCredentialsInvalid
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo" id="app-logo"/>

          <br />
          <Username 
              fieldName="Username"
              class="login"
              isInvalid={this.state.areCredentialsInvalid}
              onChange={this.onUsernameChanged}
              areCredentialsInvalid={this.state.areCredentialsInvalid}
            />
         
          <br />
          <br />
          
          <Password 
            fieldName={'Password'} 
            class={'login'} 
            onPasswordChanged={this.handlePasswordChanged}
            isInvalid={this.isPasswordInvalid()}
            errorMessage={'Please enter a password'}
          />

          <br />
          <br />

          <Password 
            fieldName={'Confirm password'} 
            class={'login'} 
            onPasswordChanged={this.handleConfirmPasswordChanged}
            isInvalid={!this.state.passwordsMatch || this.state.areCredentialsInvalid}
            errorMessage={'Passwords do not match. Please try again'}
          />

          <br />
          <br />

          <Button 
            className="login" 
            variant="contained" 
            color="primary" 
            onClick={this.onCreateAccountClicked}>
              Create account
            </Button>

          <br />
          <br />

          <Button className="login" component={Link} to="/sign-in">Sign in instead</Button>

          <br />
          <br />

        </header>
      </div>
    )
  }
}

export default Register