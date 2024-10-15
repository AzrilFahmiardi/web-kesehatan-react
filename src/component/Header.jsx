function Header() {
  return (
    <header>
      <nav>
        <a href="/" className="logo">
          <img src="src/assets/logo.png" alt="Logo Web" />
        </a>
        <ul className="nav-links">
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/food">FOOD</a>
          </li>
          <li>
            <a href="/workoout">WORKOUT</a>
          </li>
          <li>
            <a href="/for-you">FOR YOU</a>
          </li>
        </ul>

        <a href="/profil/:id" className="profil">
          <div className="user-info">
            <span>Azril Fahmiardi</span>
            <span>lv. 14</span>
          </div>
          <img src="src/assets/profil.jpg" alt="profil" />
        </a>
      </nav>
    </header>
  );
}

export default Header;
