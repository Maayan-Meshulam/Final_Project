import type { FunctionComponent } from "react";

interface ErrorPremissionProps {

}

const ErrorPremission: FunctionComponent<ErrorPremissionProps> = () => {
    return (<>
        <h1>אין לך הרשאות לבצע פעולה זו</h1>
    </>);
}

export default ErrorPremission;