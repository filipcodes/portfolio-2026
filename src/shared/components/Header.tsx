import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className='p-4'>
      <nav className='flex justify-between'>
        <Link to='/'>Image Placeholder</Link>
        <ul className='flex gap-4'>
          <li>
            <Link to='/writing'>Writing</Link>
          </li>

          <li>
            <a href='http://'>GitHub</a>
          </li>

          <li>
            <a href='http://'>LinkedIn</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
