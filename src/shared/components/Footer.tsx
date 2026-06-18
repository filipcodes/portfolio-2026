import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/components/Button'

export function Footer() {
  return (
    <footer className='flex bg-gray-200 px-4'>
      <nav>
        <ul>
          <li>
            <Link to='/writing'>Writing</Link>
          </li>

          <li>
            <a href='http://'>LinkedIn</a>
          </li>

          <li>
            <a href='http://'>GitHub</a>
          </li>
        </ul>
      </nav>
      <Button label='Contact Me' />
    </footer>
  )
}
