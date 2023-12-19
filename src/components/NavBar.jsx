import React from 'react'
import ButtonIcon from './UI/buttons/IconLinkBtn'

const NavBar = ({ links }) => {
    function toogleNavs(e) {
        const nav = e.currentTarget
        const navs = nav.parentNode.childNodes

        navs.forEach(nav => {
            nav.classList.remove('active')
        })
        nav.classList.add('active')
    }

    return (
        <nav>
            {links.map((link) =>
                <ButtonIcon
                    toogleNavs={toogleNavs}
                    props={link}
                    key={link.icon}
                />
            )}
        </nav>
    )
}

export default NavBar
