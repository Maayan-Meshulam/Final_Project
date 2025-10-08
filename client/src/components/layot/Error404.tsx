import type { FunctionComponent } from "react";

interface Error404Props {

}

const Error404: FunctionComponent<Error404Props> = () => {
    return (<>
        <h1>דף זה אינו קיים</h1>
        <h3>404</h3>
    </>);
}

export default Error404;