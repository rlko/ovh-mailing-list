import logo from '../logo.svg';

export default function Header() {
  return (
    <header>
      <nav className='nav'>
        <img src={logo} className='nav-logo'/>
        <ul className="nav-items">
          <li>Yes</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  )
}