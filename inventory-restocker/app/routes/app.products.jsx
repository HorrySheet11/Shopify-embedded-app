import { authenticate } from "../shopify.server";

export async function loader({ request }) {
	const { admin } = await authenticate.admin(request);

	const response = await admin.graphql(`	#graphql
    query {
      shop {
        name
        id
      }}
  `);

	const shopData = (await response.json()).data;
	console.log(shopData);
	return null;
};

export default function Products() {
	return (
		<s-page heading="Products">
			<s-button slot="primary-action">Primary button</s-button>
			<s-layout>
				<s-section>
					<s-card>
						<s-stack gap="base" direction="inline">
							<s-text type="strong">Products go here!!!</s-text>
							<s-button
								icon="edit"
								variant="primary"
								onClick={() => shopify.toast.show("hello there!")}
							>
								Sample button
							</s-button>
							<s-button commandFor="modal">Open modal</s-button>
						</s-stack>
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
