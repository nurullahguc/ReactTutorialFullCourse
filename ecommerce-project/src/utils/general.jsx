export function printJson(data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}