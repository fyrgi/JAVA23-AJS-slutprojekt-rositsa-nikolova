export function InfoMsg({msg, styleAs}){
    return(
        <div className={`communication ${styleAs}`}>
            <p>{msg}</p>
        </div>
    )
}