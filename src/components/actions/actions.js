import { GitHub } from "react-feather";

function Actions() {

    return (
        <div className="flex text-black text-opacity-25 hover:text-opacity-30 justify-center">
            <GitHub className="cursor-pointer" size={38} strokeWidth={0} fill="currentColor" onClick={()=> window.open("https://github.com/hypertenso", "_blank")} />
        </div>
    );
}

export default Actions;
