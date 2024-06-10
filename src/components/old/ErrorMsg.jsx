export function ErrorMsg({msg, properClassName}) {
    return ( 
        <div className={`communication ${properClassName}`}>
            <p>Error: {msg}</p>
        </div> 
    );
}

//`communication error-msg {properClassName}`