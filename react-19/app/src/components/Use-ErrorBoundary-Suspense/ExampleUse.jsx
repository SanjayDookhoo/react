import { Suspense } from "react"
import Data from "./Data"
import ErrorBoundary from "./ErrorBoundary"

const commentsURL = 'https://jsonplaceholder.typicode.com/comments'

const ExportUse = () => {
    return <>
        <ErrorBoundary fallback={<div>Error</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                <Data url={commentsURL}/>
            </Suspense>
        </ErrorBoundary>
    </>
}

export default ExportUse