const gradeList = [
    { label: "一年级上册", value: "1611" },
    { label: "一年级下册", value: "1612" },
    { label: "二年级上册", value: "1621" },
    { label: "二年级下册", value: "1623" },
    { label: "三年级上册", value: "1631" },
    { label: "三年级下册", value: "1632" },
    { label: "四年级上册", value: "1641" },
    { label: "四年级下册", value: "1642" },
    { label: "五年级上册", value: "1651" },
    { label: "五年级下册", value: "1652" },
    { label: "六年级上册", value: "1661" },
    { label: "六年级下册", value: "1662" },
    { label: "七年级上册", value: "2311" },
    { label: "七年级下册", value: "2312" },
    { label: "八年级上册", value: "2321" },
    { label: "八年级下册", value: "2322" },
    { label: "九年级上册", value: "2331" },
    { label: "九年级下册", value: "2332" },
    
]

// 根据班级的数字，转化为文字
function formateGrade(value) {
    const resItem = gradeList.find(item => item.value == value)
    return resItem.label
}

export { gradeList, formateGrade}