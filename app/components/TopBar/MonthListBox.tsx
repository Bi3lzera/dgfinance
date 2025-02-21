import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";

const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];

interface MonthDropdownProps {
    onChange: (value: string) => void;
}

const MonthDropdown: React.FC<MonthDropdownProps> = ({ onChange }) => {
    return (
        <Select.Root onValueChange={onChange}>
            <Select.Trigger className="flex items-center justify-between w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
                <Select.Value placeholder="Select a month" />
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    <Select.Viewport>
                        {months.map((month) => (
                            <Select.Item
                                key={month.value}
                                value={month.value}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                            >
                                {month.label}
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

export default MonthDropdown;
