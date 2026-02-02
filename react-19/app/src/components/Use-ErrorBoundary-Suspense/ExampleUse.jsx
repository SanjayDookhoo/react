import { Suspense } from "react"
import ErrorBoundary from "./ErrorBoundary"
import DataOriginal from "./DataOriginal"
import DataLocalCache from "./DataLocalCache"
import DataWTanStack from "./DataWTanStack"

const commentsURL = 'https://jsonplaceholder.typicode.com/comments'

const ExampleUse = () => {
    return <>
        <ErrorBoundary fallback={<div>Error</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                {/* <DataOriginal url={commentsURL}/> */}
                {/* <DataLocalCache url={commentsURL}/> */}
                <DataWTanStack url={commentsURL}/>
            </Suspense>
        </ErrorBoundary>
    </>
}

export default ExampleUse