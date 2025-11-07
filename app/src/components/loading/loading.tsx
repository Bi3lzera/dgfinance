import '../../styles/loadingScreenStyle.css'

export default function LoadingScreen() {
    return (
        <div className="bg-opacity-50 backdrop-blur-sm fixed inset-0 z-50 flex flex-col justify-center items-center">
            <div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
        </div>
    );
}