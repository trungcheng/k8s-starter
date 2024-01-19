const OrderIndex = ({ orders }) => {
    const orderList = orders.map(({ id, creator, totalPrice }) => (
        <li key={id}>
            {creator} - {totalPrice}
        </li>
    ));

    return (
        <ul>
            <h2>My Orders</h2>
            {orderList}
        </ul>
    );
};

OrderIndex.getInitialProps = async (context, client) => {
    const { data: orders } = await client.get('/api/orders');

    return { orders };
};

export default OrderIndex;