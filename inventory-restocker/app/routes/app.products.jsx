import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
	const { admin } = await authenticate.admin(request);

	const response = await admin.graphql(`	#graphql
    query fetchProducts{
      products(first: 10) {
        edges{
          node{
            id
            title
            handle
            featuredImage{
              url
              altText
            }
          }
        }
      }
      
      shop {
        name
        id
        url
      }
    }
  `);

	const productsData = (await response.json()).data;
	console.log(productsData);
	return { products: productsData.products.edges, shop: productsData.shop };
}

export default function Products() {
	const { products, shop } = useLoaderData();

	const renderImage = (image) => {
		return image ? (
			<s-image
				src={image.url}
				alt={image.altText}
				aspectRatio="1/1"
				objectFit="cover"
				borderRadius="base"
				inlineSize="300"
				srcSet={`${image.url} 400w, 
          ${image.url} 800w`}
				sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
			></s-image>
		) : (
			<s-image></s-image>
		);
	};

	return (
		<s-page heading="Products">
			<s-button slot="primary-action">Primary button</s-button>
			<s-layout>
				<s-section>
					<s-card>
						<s-stack gap="base" direction="inline">
							<s-text type="strong">Products go here!!!</s-text>
							<s-text type="strong">{shop.name}</s-text>
						</s-stack>
						<s-button
							icon="edit"
							variant="primary"
							onClick={() => shopify.toast.show("hello there!")}
						>
							Sample button
						</s-button>
						<s-button commandFor="modal">Open modal</s-button>
					</s-card>
				</s-section>
				<s-section>
					<s-card>
						<s-block-stack gap="300">
							{products.length === 0 ? (
								<s-text type="strong">No products found</s-text>
							) : (
								<s-unordered-list>
									{products.map(({ node: product }) => (
										<s-list-item key={product.id}>
											<s-stack gap="300" direction="inline">
												{renderImage(product.featuredImage)}
												<s-stack>
													<s-text type="strong">{product.title}</s-text>
													<s-text>{product.handle}</s-text>
												</s-stack>
											</s-stack>
										</s-list-item>
									))}
								</s-unordered-list>
							)}
						</s-block-stack>
					</s-card>
				</s-section>
			</s-layout>

			<s-modal id="modal" heading="Sample modal title">
				<s-paragraph>Modal content</s-paragraph>

				<s-button
					slot="secondary-actions"
					commandFor="modal"
					commandAction="close"
				>
					Close modal
				</s-button>
				<s-button
					slot="primary-actions"
					commandFor="modal"
					commandAction="close"
					variant="primary"
				>
					Save
				</s-button>
			</s-modal>
		</s-page>
	);
}
