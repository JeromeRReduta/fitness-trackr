import { useApi } from "../api/ApiContext";
import useQuery from "../api/useQuery";

const resource = "/activities";
let counter = 0;

export default function ActivitiesPage() {
    console.log(`Times run: ${++counter}: `, useQuery(resource));
    const result = useQuery(resource);
    if (result.loading) {
        return <h1>Loading, please hold...</h1>;
    }
    if (result.error) {
        console.error(result.error);
        return <h1>Uh oh; something went wrong!</h1>;
    }
    if (!result.data) {
        /* Checks if data not found yet */
        return (
            <>
                <h1>Activities</h1>
                <p>Imagine all the activities!</p>
            </>
        );
    }
    /** Success case: result NOT loading, no error, and data present */
    const listItems = result.data.map((elem) => (
        <li key={elem.name}>{elem.name}</li>
    ));
    return (
        <>
            <h1>Activities</h1>
            <ul>{listItems}</ul>
        </>
    );
}
