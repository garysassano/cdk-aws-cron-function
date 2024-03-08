import { Logger } from "@aws-lambda-powertools/logger";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
import { ScheduledHandler } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";

const logger = new Logger();

const lambdaHandler: ScheduledHandler = async () => {
  const response = {
    statusCode: 200,
    body: "Hello from Lambda!",
  };

  console.log(response);
};

export const handler = middy(lambdaHandler)
  .use(injectLambdaContext(logger, { logEvent: true }))
  .use(httpErrorHandler());
