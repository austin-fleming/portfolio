// TODO: DRY-ify
type ServerResponse = {
    links: Record<string, string>,
    message: string
}

// TODO: DRY-ify
const SERVER_HOST = import.meta.env.PROD ? import.meta.env.VITE_SERVER_HOST_PRODUCTION : import.meta.env.VITE_SERVER_HOST_DEVELOPMENT

// TODO: error checking
export const fetchCaseStudies = async () => {
    try {
        const response = await fetch(`${SERVER_HOST}/case-studies/`)
        const json = await response.json()
        const caseStudies = json.data
    
        return caseStudies
    } catch (err) {
        console.error(err)

        return 'shit'
    }
}