import { format, parseISO } from 'date-fns'

export function formatArticleDate(isoDate: string) {
  return format(parseISO(isoDate), 'MMM dd, yyyy')
}
