const cart = (req, res) => {
    const { item } = req.body;
    const { action } = req.query;
    const addItems = (item) => {
        if (!req.session.cart) {
            req.session.cart = { itemCount: 1, items: [item] };
        } else {
            const existingItemIndex = req.session.cart.items.findIndex(e => e.id === item.id);
            if (existingItemIndex !== -1) {
                req.session.cart.items[existingItemIndex].count = (req.session.cart.items[existingItemIndex].count || 1) + 1;
            } else {
                req.session.cart.items.push(item);
            }
            req.session.cart.itemCount = req.session.cart.items.reduce((total, cartItem) => total + (cartItem.count || 1), 0);
        }
        res.send(req.session.cart);
    };
    const getCartItems = () => {
        if (!req.session.cart) {
            res.send({itemCount:0,items:[]})
        }else {
            res.send({...req.session.cart})
        }
    }
    const removeCartItem = (id) => {
        --req.session.cart.itemCount
        const item = req.session.cart.items.findIndex((e) => e.id == id)
        if(req.session.cart) {
            if (req.session.cart.items[item].count) {
                if (req.session.cart.items[item].count > 1) {
                    --req.session.cart.items[item].count
                }else if (req.session.cart.items[item].count == 1) {
                    req.session.cart.items.splice(item,1)
                }
            }else {
                req.session.cart.items = req.session.cart.items.filter((e) => e.id != id)
            }
        }
        res.send(req.session.cart)
    };
    if (action === 'add') {
        addItems(item);
    }
    else if (action === 'getcartitems') {
        getCartItems()
    }
    else if (action === 'removecartitem') {
        removeCartItem(req.query.id)
    }
};

module.exports = cart;
