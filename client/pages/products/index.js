const ProductIndex = ({ products }) => {
    const productList = products.map(({ id, name, price }) => (
        <li key={id}>
            {name} - {price}
        </li>
    ));

    return (
        <ul>
            <h2>My Products</h2>
            {productList}
        </ul>
    );
};

ProductIndex.getInitialProps = async (context, client) => {
    const { data: products } = await client.get('/api/products');

    return { products };
};

export default ProductIndex;