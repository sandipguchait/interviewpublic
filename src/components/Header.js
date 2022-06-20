import React,{ useEffect, useContext , useState} from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser";
import { ThemeContext } from './layout';
import Search from './Search/Search';
import icon_light from '../../public/icons/logo_light.png';
import icon_dark from '../../public/icons/logo_dark.png';
import darkmode_icon from '../../public/icons/dark_mode_icon.png';
import lightmode_icon from '../../public/icons/light_mode_icon.png';

const Header = ({ location }) => {
    const { theme, toggleTheme} = useContext(ThemeContext);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])


    const {
        wp: {
          generalSettings: { title },
        },
      } = useStaticQuery(graphql`
        query LayoutQuery {
          wp {
            generalSettings {
              title
              description
            }
          }
        }
      `)
    
    const renderThemeModeIcon = () => {
        if (theme === 'light') {
            return darkmode_icon
        }
        return lightmode_icon
    }

    const renderIcon = () => {
        if (theme === 'light') {
            return icon_light
        }
        return icon_dark
    }

    const renderActiveMenuItem = () => {
        let activeObj = {
            articles: false,
            about: false,
            contact: false,
            notes: false,
        };

        const path = location?.pathname.split('/')[1];
        switch(path){
            case 'articles':
                return activeObj = {
                    ...activeObj,
                    articles: true,
                }
            case 'notes':
                return activeObj = {
                    ...activeObj,
                    notes: true,
                }
            case "about":
                return activeObj = {
                    ...activeObj,
                    about: true,
                }
            case 'contact':
                return activeObj = {
                    ...activeObj,
                    contact: true,
                }
            default:
                return activeObj
        }
    }

    const { articles, notes, about, contact} = renderActiveMenuItem();

    const handleToggleMobileMenu = () => {
        setOpenMobileMenu(!openMobileMenu);
    }

   const nav_menu = () => (
        <nav className='nav_menu'>
            <h3>
                <Link className={articles ? "nav_link_active" :""} to='/articles'>Articles</Link>
            </h3>
            <h3>
                <Link className={notes ? "nav_link_active" :""} to='/notes'>Notes</Link>
            </h3>
            <h3>
                <Link className={about ? "nav_link_active" :""} to='/about'>About</Link>
            </h3>
            <h3>
                <Link className={contact ? "nav_link_active" :""} to='/contact'>Contact</Link>
            </h3>
        </nav>
   )

    const renderMobileMenu = () => {
        if(width < 978){
            return (
            <div className='nav_mobile_wrapper'>
               {nav_menu()}
            </div>
            )
        }  
    }

    const renderNavMenuforLargeScreen = () => {
        if(width > 978){
            return (
                <React.Fragment>
                   {nav_menu()}
                    <Search className="search_ui" />
                </React.Fragment>
            )
        }
    }
    
  return (
    <>
     <header className='header_container'>
            <picture>
                <source srcSet={renderIcon()} media="(max-width: 780px)" />
                <Link to='/'>
                    <img src={renderIcon()} loading='eager' decoding='async' alt='interview public'/>
                </Link>
            </picture>
            
            {/* Rendering Nav UI for large screen */}
            {renderNavMenuforLargeScreen()}

            {/* Rendering Menu Button only for small screens */}
            <button 
                type='button' 
                aria-haspopup="true" 
                aria-expanded="false"
                className="main-nav-more-item__button display"
                onClick={handleToggleMobileMenu}
            >
                Menu    
            </button>
            
            <button className="mode_button" onClick={toggleTheme}>
                <img style={{ height:"30px"}} src={renderThemeModeIcon()} alt='dark mode icon'/>
            </button>
      </header> 
        {/* Rendering Mobile Menu */}
        {openMobileMenu && renderMobileMenu()}
        
        {/* render mobile search */}
       <div className='search_mobile'>
             <Search className="search_ui" />
       </div>
    </>
  )
}

export default Header;