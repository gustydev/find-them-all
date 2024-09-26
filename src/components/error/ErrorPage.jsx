import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error)
    return (
        <>
        <h1>An error has occured!</h1>
        <div style={{marginTop: '16px', textAlign: 'center'}}>
            <p>{error.msg || 'Internal server error'}</p>
            <p>Status {error.statusCode || '500'}</p>
        </div>
        </>
    )
}