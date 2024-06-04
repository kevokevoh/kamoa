import { APIGatewayProxyEventV2, Context } from "aws-lambda";

import { handler } from "./index";
import { isMergedUser } from "./fetch";

const mockContext: Context = {
	callbackWaitsForEmptyEventLoop: false,
	functionVersion: "10",
	functionName: "XXXXXXXXXXXXXXXXXX",
	memoryLimitInMB: "64",
	logGroupName: "/aws/lambda/XXXXXXXXXXXXXXXXXXLambda",
	logStreamName: "2020/10/21/[10]e319c9569d2d47ceb3b63e422e1b7c09",
	invokedFunctionArn:
		"arn:aws:lambda:xxxxxxx:1234567890:function:XXXXXXXXXXXXX:Current",
	awsRequestId: "149d19a7-13da-4cb6-a104-30328f94ca3a",
	getRemainingTimeInMillis: () => 1,

	// eslint-disable-next-line
	done: (): void => {},
	// eslint-disable-next-line
	fail: (): void => {},
	// eslint-disable-next-line
	succeed: (): void => {},
};

const mockEvent: APIGatewayProxyEventV2 = {
	version: "2.0",
	routeKey: "POST /",
	rawPath: "/",
	rawQueryString: "",
	headers: {
		accept: "application/json, */*;q=0.5",
		"accept-encoding": "gzip, deflate",
		"content-length": "627",
		"content-type": "application/json",
		host: "test.execute-api.eu-west-2.amazonaws.com",
		"user-agent": "HTTPie/2.2.0",
		"x-amzn-trace-id": "Root=1-5f90582d-40a913185c30e1cc5b0e3934",
		"x-forwarded-for": "11.11.111.111",
		"x-forwarded-port": "443",
		"x-forwarded-proto": "https",
	},
	requestContext: {
		accountId: "1234567890",
		apiId: "test",
		domainName: "test.execute-api.eu-west-2.amazonaws.com",
		domainPrefix: "test",
		http: {
			method: "POST",
			path: "/",
			protocol: "HTTP/1.1",
			sourceIp: "86.18.106.128",
			userAgent: "HTTPie/2.2.0",
		},
		requestId: "UxK3DjsFrPEEMyQ=",
		routeKey: "POST /",
		stage: "$default",
		time: "21/Oct/2020:15:47:57 +0000",
		timeEpoch: 1603295277092,
	},
	body: '{"usersUrl":"https://jsonplaceholder.typicode.com/users/1", "postsUrl": "https://jsonplaceholder.typicode.com/posts/1"}',
	isBase64Encoded: false,
};

describe("Dummy test", () => {
	it("Testing handler", async () => {
		expect.hasAssertions();
		const response = await handler(mockEvent, mockContext);
		expect(response.statusCode).toEqual(200);
		expect(isMergedUser(JSON.parse(response.body).message)).toBe(true);
	});
});
