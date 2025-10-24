
import { useState } from "react";
import Search from "./Search";
import Logo from "./Logo";
import NumResult from './NumResults'

function NavBar({children}) {
    const [query, setQuery] = useState("");

    return(
        <nav className="nav-bar">
          <Logo />
          {children}
      </nav>
    )
}

export default NavBar