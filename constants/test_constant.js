

const testNameID_Obj = {
    "CONSISTENCY OF CEMENT": "CE001",
    "INITIAL AND FINAL SETTING TIME OF CEMENT": "CE002",
    "DETERMINATION OF FINENESS OF CEMENT": "CE003",
    "AGGREGATE CRUSHING VALUE": "AG001",
    "AGGREGATE IMPACT VALUE": "AG002",
}


export function getTestName(testID) {
    return testNameID_Obj[testID];
}

export function getTestID(testName) {
    for (const [key, val] of Object.entries(testNameID_Obj)) {
        if (val === testName) {
            return key;
        }
    }
    return null;
}
