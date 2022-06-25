import React, {useState, createContext} from "react"
import Header from "./Header";


export const ThemeContext = createContext(null);

const Layout = ({ children, location }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currTheme)=> currTheme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Header location={location}/>
          <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
          {` `}
          And <a href="https://wordpress.org/">WordPress</a>
        </footer>
      </div>
    </ThemeContext.Provider>
  )
}

export default Layout;
