import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

const resource = "/activities";

export default function ActivitiesPage() {
    const result = useQuery(resource);
    if (result.loading) {
        return <Loading />;
    }
    if (result.error) {
        return <Error error={result.error} />;
    }
    if (!result.data) {
        return <NoData />;
    }
    return <ActivityList data={result.data} />;
}

function Loading() {
    return <h1>Loading, please hold...</h1>;
}

function Error({ error }) {
    console.error(error);
    return <h1>Uh oh; something went wrong!</h1>;
}

function NoData() {
    return (
        <>
            <h1>Activities</h1>
            <p>Imagine all the activities!</p>
        </>
    );
}

function ActivityList({ data }) {
    if (!data) {
        console.error("Failed sanity check - undefined data");
    }
    return (
        <>
            <h1>Activities</h1>
            <ul>
                {data.map((elem) => (
                    <ActivityListItem
                        key={elem.name}
                        name={elem.name}
                        onDelete={() => console.log("I've been deleted!")}
                    />
                ))}
            </ul>
        </>
    );
}

function ActivityListItem({ name, onDelete }) {
    const { token } = useAuth();
    const isAuthorized = token;
    return (
        <>
            <p>{name}</p>
            {isAuthorized && <button onClick={onDelete}>Delete</button>}
        </>
    );
}
