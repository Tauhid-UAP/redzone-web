// if there is a token, return it
// otherwise return null
const tokenReducer = (state=null, action) => {
    switch(action.type){
        case 'NEW':
            return {
                token: action.payload
            };
        default:
            return {
                token: null
            };
    }
};

export default tokenReducer;