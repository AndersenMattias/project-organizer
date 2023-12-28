// Function to format the date as MM/YYYY
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
