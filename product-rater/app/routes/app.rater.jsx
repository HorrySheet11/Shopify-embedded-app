import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { useEffect, useState } from "react";


export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`	#graphql
    query fetchProducts{
      products(first: 10) {
        edges{
          node{
            id
            title
            featuredImage{
              url
              altText
            }
          }
        }
      }

    }
  `);

  const productsData = (await response.json()).data;
  console.log(productsData);
  return { products: productsData.products.edges, shop: productsData.shop };
}


export default function RaterPage() {
  const { products } = useLoaderData();

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      // document.getElementById('rate-modal').showModal();
      console.log(selectedProduct);
    }
  }, [selectedProduct]);

  
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
    <s-page heading="Rate your Products">
      <s-modal id='rate-modal' heading="Rate this product">
        <s-modal-dialog> 
          <s-modal-section>
            <s-stack gap="large-100" direction="inline">
              {renderImage(selectedProduct.featuredImage)}
              <s-text type="strong" >{selectedProduct.title}</s-text>
            </s-stack>
          </s-modal-section>
          <s-modal-footer>
            <s-button>Rate</s-button>
          </s-modal-footer>
        </s-modal-dialog>
      </s-modal>
      <s-section heading="Give a rating for your shop's products.">
      <s-card>
						<s-stack gap="large-100">
							{products.length === 0 ? (
								<s-text type="strong">No products found</s-text>
							) : (
								<s-unordered-list>
									{products.map(({ node: product }) => (
										<>
										  <s-list-item key={product.id} gap="300">
  											<s-stack gap="large-100" direction="inline">
  												{renderImage(product.featuredImage)}
                          <s-text type="strong" >{product.title}</s-text>
  											</s-stack>
                          <s-button commandFor="rate-modal" command="open" onClick={() => setSelectedProduct(product)}>Rate</s-button>
                      </s-list-item>
                      <s-divider></s-divider>
										</>
									))}
								</s-unordered-list>
							)}
						</s-stack>
					</s-card>

      </s-section>
    </s-page> 
  );
}