export const formattedDateFromTimeStamp = (timestamp: string) => {
    // TODO: catch for sure or leave to TS?
    if (!timestamp) return ''

    const date: Date | 'Invalid Date' = new Date(timestamp)

    console.log('test', new Date('h'))

    // @ts-expect-error: isNaN(date) throws as typescript doesn't know to check for 'Invalid Date' situation
    if (!(date instanceof Date && !isNaN(date))) return ''

    return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}