export default function ErrorMessage({error}) {
    return (
        <div style={{textAlign: 'center'}}>
         Error: {error.msg} {error.statusCode && `(status: ${error.statusCode})`}
        </div>
    )
}