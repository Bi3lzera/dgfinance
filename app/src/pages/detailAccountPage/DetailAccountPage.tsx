import { UserAccount } from '../accountsPage/accounts';
import TabsArea from './components/tabs/TabsArea';
import TopHeader from './components/topHeader/TopHeader';
import LeftSideBar from './components/leftSidebar/LeftSidebar';

interface DetailAccountPageProps {
    account: UserAccount;
    onBack: () => void;
}

const DetailAccountPage = ({ account, onBack }: DetailAccountPageProps) => {
    return (
        <div className="flex flex-col w-full h-full bg-gray-50/50">
            {/* Top Header */}
            <TopHeader account={account} onBack={onBack} />

            <div className="flex flex-col 2xl:flex-row flex-1 p-4 gap-4 overflow-y-auto 2xl:overflow-hidden min-h-0">
                {/* Left Sidebar - Account Summary */}
                <LeftSideBar account={account} />

                {/* Right Main Content area */}
                <TabsArea account={account} />
            </div>
        </div>
    );
};

export default DetailAccountPage;
