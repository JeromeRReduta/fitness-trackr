import useQuery from "../api/useQuery";

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
    const listItems = data.map((elem) => <li key={elem.name}>{elem.name}</li>);
    return (
        <>
            <h1>Activities</h1>
            <ul>{listItems}</ul>
        </>
    );
}
