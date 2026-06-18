interface ButtonProps {
  label: string
}

export function Button({ label }: ButtonProps) {
  return <button className='rounded-md border p-2'>{label}</button>
}
