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
			<s-thumbnail
				src={image.url}
				alt={image.altText}
				aspectRatio="1/1"
				objectFit="cover"
				borderRadius="base"
				inlineSize="300"
				srcSet={`${image.url} 400w, ${image.url} 800w`}
				sizes="small-200"
			></s-thumbnail>
		) : (
			<s-image></s-image>
		);
	};

	return (
		<s-page heading="Products">
			<s-button slot="primary-action">Primary button</s-button>
			<s-grid gap="large-100">
				<s-section padding="base" gap="large-100">
						<s-stack gap="medium-100" direction="vertical">
							<s-text type="strong">{shop.name}</s-text>
						<s-stack  gap="large-100" direction='inline'>
							<s-button
								icon="edit"
								variant="primary"
								onClick={() => shopify.toast.show("hello there!")}
								>
								Sample button
							</s-button>
							<s-button commandFor="modal">Open modal</s-button>
									</s-stack>
						</s-stack>
				</s-section>
				<s-section>
					<s-card>
						<s-stack gap="large-100">
							{products.length === 0 ? (
								<s-text type="strong">No products found</s-text>
							) : (
								<s-unordered-list>
									{products.map(({ node: product }) => (
										<s-list-item key={product.id} gap="300">
											<s-stack gap="large-100" direction="inline">
												{renderImage(product.featuredImage)}
												<s-text type="strong" >{product.title}</s-text>
											</s-stack>
										</s-list-item>
									))}
								</s-unordered-list>
							)}
						</s-stack>
					</s-card>
				</s-section>
			</s-grid>

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