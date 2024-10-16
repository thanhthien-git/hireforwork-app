import { DatePicker } from "antd";

export default function HeaderDateRange() {
    return (
        <DatePicker.RangePicker placeholder={["S", "E"]}/>
    )
}