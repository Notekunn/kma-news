const initialState = {
    list:[],
    active:null
} 

const testReducer = (state = initialState,action)=>{
    switch(action.type){
        case "Add":{
            break;
        }
        default :{
            return state;
        }
    }
}
export default testReducer