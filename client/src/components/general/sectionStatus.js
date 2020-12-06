import checkMinMax from "../../helpers/checkMinMax";

export default function sectionStatus(column, row) {
    if (column.alarm) {
        const { id, min, max } = column
        return checkMinMax(row[id], min, max) ?? false;
    } else {
        return true;
    }
}