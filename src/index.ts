import {
	APIGatewayProxyEventV2,
	APIGatewayProxyResult,
	Context,
} from "aws-lambda";

import { makeRequests } from "./fetch";

export const handler = async (
	event: APIGatewayProxyEventV2,
	context: Context,
): Promise<APIGatewayProxyResult> => {
	context.callbackWaitsForEmptyEventLoop = false;
	try {
		const body = JSON.parse(<string>event.body);
		switch (event.requestContext.http.method) {
			case "POST":
				return {
					statusCode: 200,
					body: <string>JSON.stringify({
						message: await makeRequests(
							new URL(body.usersUrl),
							new URL(body.postsUrl),
						),
					}),
				};
			default:
				return {
					statusCode: 405,
					body: <string>JSON.stringify({
						message: `Method ${event.requestContext.http.method} not allowed`,
					}),
				};
		}
	} catch (err) {
		// eslint-disable-next-line
		console.log(err);
		return {
			statusCode: 500,
			body: <string>JSON.stringify({
				message: "some error happened",
			}),
		};
	}
};
