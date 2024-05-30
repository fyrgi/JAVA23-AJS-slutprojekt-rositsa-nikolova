export function ShowArchived({setTasksCont, tasksCont}) {
    return (
        <div>
            <label><input type="checkbox" onChange={(e) => { 
                e.target.checked ? setTasksCont([...tasksCont, "Archived"]) : setTasksCont(tasksCont.filter(item => item !== "Archived"));}}/>
                Show archived tasks
            </label>
        </div>
    )
}