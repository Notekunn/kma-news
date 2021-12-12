export const addNewTest = (test)=>{
    return {
        type:"ADD",
        payload:test
    }
}
export const setActiveTest = (test)=>{
    return {
        type:"SET_ACTIVE_TEST",
        payload:test
    }
}