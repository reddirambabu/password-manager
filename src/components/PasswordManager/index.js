import {Component} from 'react'

import {v4 as uuidV4} from 'uuid'

import PasswordManagerItem from '../PasswordManagerItem'

import './index.css'

const initialState = {
  websiteAddress: '',
  userName: '',
  password: '',
  passwordList: [],
  showPassword: false,
}

class PasswordManager extends Component {
  state = initialState

  onChangeWebsite = event => {
    this.setState({websiteAddress: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onDeletePasswordItem = uniqueId => {
    const {passwordList} = this.state
    const filterList = passwordList.filter(
      eachItem => eachItem.uniqueId !== uniqueId,
    )

    this.setState({passwordList: filterList})
  }

  onSubmitFormData = event => {
    event.preventDefault()

    const {websiteAddress, userName, password} = this.state

    const createNewPasswordItem = {
      uniqueId: uuidV4(),
      websiteAddress,
      userName,
      password,
    }

    this.setState(previousState => ({
      passwordList: [...previousState.passwordList, createNewPasswordItem],
      websiteAddress: '',
      userName: '',
      password: '',
    }))
  }

  addNewDetailsContainer = () => {
    const {websiteAddress, userName, password} = this.state

    return (
      <div className="add-details-container">
        <h1 className="add-card-heading">Add New Password</h1>
        <form onSubmit={this.onSubmitFormData}>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="input-logo"
            />
            <input
              type="text"
              className="input"
              value={websiteAddress}
              placeholder="Enter Website"
              onChange={this.onChangeWebsite}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="input-logo"
            />
            <input
              type="text"
              className="input"
              value={userName}
              placeholder="Enter Username"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="input-logo"
            />
            <input
              type="password"
              className="input"
              value={password}
              placeholder="Enter Password"
              onChange={this.onChangePassword}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="button">
              Add
            </button>
          </div>
        </form>
      </div>
    )
  }

  onClickCheckbox = () => {
    this.setState(previousState => ({
      showPassword: !previousState.showPassword,
    }))
  }

  onChangeSearchInput = event => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(eachItem =>
      eachItem.websiteAddress
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    )
    this.setState({passwordList: filteredList})
  }

  bottomSectionContainer = () => {
    const {passwordList, showPassword} = this.state

    return (
      <div className="bottom-section-card">
        <div className="bottom-header-section">
          <div className="your-passwords-title-count-container">
            <h1 className="password-title">Your Passwords</h1>
            <p className="password-count">{passwordList.length}</p>
          </div>
          <div className="search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-logo"
            />
            <input
              type="search"
              className="search-input"
              onChange={this.onChangeSearchInput}
              placeholder="Search"
            />
          </div>
        </div>
        <hr />
        <div className="show-password-container">
          <div className="your-passwords-title-count-container">
            <input
              type="checkbox"
              id="show-passwords"
              className="checkbox"
              onClick={this.onClickCheckbox}
            />
            <label htmlFor="show-passwords" className="password-title">
              Show Passwords
            </label>
          </div>
        </div>

        {passwordList.length > 0 ? (
          <ul className="list-item-container">
            {passwordList.map(eachItem => (
              <PasswordManagerItem
                key={eachItem.uniqueId}
                itemDetails={eachItem}
                showPasswordIsActive={showPassword}
                onDeletePasswordItem={this.onDeletePasswordItem}
              />
            ))}
          </ul>
        ) : (
          <div className="no-passwords-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-password-image"
            />
            <p className="no-password-title">No Passwords</p>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="add-new-website-details-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-image"
            />
            <div className="add-new-details">
              {this.addNewDetailsContainer()}
            </div>
          </div>
          <div className="bottom-section-container">
            {this.bottomSectionContainer()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
