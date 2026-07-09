const styles = {
  base: 'text-gray-100 underline-offset-4 transition-colors duration-150',
  hover: 'hover:text-white hover:underline',
  pressed: 'active:text-blue-300',
  disabled:
    'aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:no-underline',
}

export const activeLinkClassName = 'text-white underline'

export const linkClassName = Object.values(styles).join(' ')
