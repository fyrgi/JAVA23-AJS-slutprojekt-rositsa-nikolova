export function ErrorMsg({msg}) {
    return ( 
        <div className="communication error-msg">
            <p>Error: {msg}</p>
        </div> 
    );
}