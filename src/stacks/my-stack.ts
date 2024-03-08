import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Architecture, LoggingFormat, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Schedule, ScheduleExpression } from "aws-cdk-lib/aws-scheduler";
import { LambdaInvoke } from "aws-cdk-lib/aws-scheduler-targets";
import { Construct } from "constructs";
import { join } from "path";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // Create Lambda function
    const cronFunction = new NodejsFunction(this, `CronFunction`, {
      functionName: "cron-function",
      entry: join(__dirname, "../functions/cron", "index.ts"),
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      timeout: Duration.minutes(1),
      loggingFormat: LoggingFormat.JSON,
    });

    // Create rate-based schedule
    new Schedule(this, "RateBasedSchedule", {
      scheduleName: "rate-based-schedule",
      description: "Trigger cron function every minute",
      schedule: ScheduleExpression.rate(Duration.minutes(1)),
      target: new LambdaInvoke(cronFunction),
    });
  }
}
