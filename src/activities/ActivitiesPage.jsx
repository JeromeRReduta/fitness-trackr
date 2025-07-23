import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import TryAdd from "../mutations/TryAdd";
import TryDelete from "../mutations/tryDelete";

const resource = "/activities";
const tag = "ACTIVITY";
export default function ActivitiesPage() {
    const { loading, error, data } = useQuery(resource, tag);
    const { token } = useAuth();
    const isAuthorized = token != null && token != undefined;
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
            {isAuthorized && <AddActivityForm />}
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
    const { mutate, error } = useMutation("DELETE", `${resource}/${id}`, [tag]);
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

function AddActivityForm() {
    const { mutate } = useMutation("POST", `${resource}`, [tag]);
    const tryAdd = new TryAdd({ addFunc: mutate });

    const handleSubmit = async (formData) => {
        const nonJsonBody = {
            // Note: mutate() converts body to json automatically - multiple JSON.stringify() calls have really weird effects
            name: formData.get("name"),
            description: formData.get("description"),
        };
        await tryAdd.runAsync({ body: nonJsonBody });
    };

    return (
        <form className="add-activity-form" action={handleSubmit}>
            <h1>Add new activity</h1>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" />
            <button>Done</button>
        </form>
    );
}
