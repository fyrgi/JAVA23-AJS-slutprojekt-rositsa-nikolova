// The archived taasks are hidden by default since the tasks container does not contain Archived.
// If the checkbox is checked, the archived tasks will be added to the tasks container which will make their column visible.
// Otherwise it will keep all the items in the array that are not "Archived", and the column will be hidden.

export function ShowArchived({setTasksCont, tasksCont}) {
    return (
        <div className="checkbox">
            <label><input type="checkbox" onChange={(e) => { 
                e.target.checked ? setTasksCont([...tasksCont, "Archived"]) : setTasksCont(tasksCont.filter(item => item !== "Archived"));}}/>
                Show archived tasks
            </label>
        </div>
    )
}