import { Link, useLocation } from "react-router-dom";
import clsx from 'clsx'

const NavBar = () => {
    const location = useLocation()

    return (
        <nav className="bg-gray-800 text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-bold mb-2 sm:mb-0">🎬 Movie Explorer</h1>
            <div className="flex gap-4">
                <NavLink to="/" label="Search" activePath={location.pathname} />
                <NavLink to="/favorites" label="Favorite" activePath={location.pathname} />
            </div>
        </nav>
    )
}

const NavLink = ({ to, label, activePath }: { to: string; label: string; activePath: string }) => (
    <Link
        to={to}
        className={clsx(
            'hover:underline',
            activePath === to ? 'font-bold underline' : 'text-gray-300'
        )}
    >
        {label}
    </Link>
)

export default NavBar