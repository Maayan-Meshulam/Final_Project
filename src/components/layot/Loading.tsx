import type { FunctionComponent } from "react";

interface LoadingProps {
    
}
 
const Loading: FunctionComponent<LoadingProps> = () => {
    return ( <>
        <div>
            <p>loading...</p>
        </div>
    </> );
}
 
export default Loading;