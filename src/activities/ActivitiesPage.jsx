import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import TryDelete from "../mutations/tryDelete";

const resource = "/activities";
const tag = "COMMON";
export default function ActivitiesPage() {
    const { loading, error, data } = useQuery(resource, tag);
    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    if (!data) {
        return <NoData />;
    }
    return (
        <>
            <ActivityList data={data} />
            <AddActivityForm />
        </>
    );
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
                        key={elem.id}
                        id={elem.id}
                        name={elem.name}
                    />
                ))}
            </ul>
        </>
    );
}

function ActivityListItem({ name, id }) {
    const { token } = useAuth();
    const isAuthorized = token;
    const { mutate, error } = useMutation("DELETE", `/${resource}/${id}`, [
        tag,
    ]);
    const tryDelete = new TryDelete({ deleteFunc: mutate });

    return (
        <>
            <p>{name}</p>
            {isAuthorized && (
                <button onClick={async () => await tryDelete.runAsync()}>
                    {error ?? "delete"}
                </button>
            )}
        </>
    );
}
