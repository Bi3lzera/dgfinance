import './TopBarStyle.css';
import MonthDropdown from "./MonthListBox.tsx";

const TopBar = () => {
    const YearTextBox = () => {
        return <input type='text' className='yearInput'/>;
    };

    return (
        <div className='topBar'>
            <div className='monthContainer'>
                <div className='monthTextContainer'>
                    <h1>Mês</h1>
                </div>
                <div className='monthInputContainer'>
                    <MonthDropdown />
                </div>
            </div>
            <div className='yearContainer'>
                <div className='yearTextContainer'>
                    <h1>Ano</h1>
                </div>
                <div className='yearInputContainer'>
                    <YearTextBox />
                </div>
            </div>
        </div>
    );
}

export default TopBar;