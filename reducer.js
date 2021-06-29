export const initialState ={
basket:[],
user:null,
};

//Selector
export const getBasketTotal = (basket) =>
basket?.reduce((amount, item) => item.price + amount, 0);

 const reducer =(state, action) =>{
     console.log(action);

    switch(action.type){
        case "ADD_TO_BASKET":
            return{
                ...state, basket: [...state.basket, action.item],
            };

            case "REMOVE_FROM_BASKET":
                const index = state.basket.findIndex(
                    (BasketItem ) => BasketItem.ID === action.ID
                );
            let NewBasket = [...state.basket];
            if(index >=0){
                NewBasket.splice(index,1);
            }else{
                console.warn("The item you want to remove isn't in the basket.")
            }
            return {
                ...state,
                basket:NewBasket
            }
                case 'SET_USER':
                    return {
                        ...state,
                        user:action.user
                    }
                    case 'EMPTY_BASKET':
                        return{
                            ...state,
                            basket:[],
                        }
            default:
                return state;
}
};

export default reducer;