import './index.css'

const PasswordManagerItem = props => {
  const {itemDetails, onDeletePasswordItem, showPasswordIsActive} = props
  const {uniqueId, websiteAddress, userName, password} = itemDetails
  const initialLetter =
    websiteAddress.length > 0 ? websiteAddress[0].toUpperCase() : ''
  //   const finalPassword =

  const onDelete = () => {
    onDeletePasswordItem(uniqueId)
  }

  return (
    <li className="list-item">
      <div className="list-item-details">
        <p className="initial-letter">{initialLetter}</p>
        <div className="user-details">
          <p className="webAddress">{websiteAddress}</p>
          <p className="username">{userName}</p>
          {showPasswordIsActive ? (
            <p className="username">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="password-image"
            />
          )}
        </div>
      </div>

      <button
        type="button"
        data-testid="delete"
        className="delete-button"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordManagerItem
