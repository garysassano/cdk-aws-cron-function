import path from "path";
import {
  Schedule,
  ScheduleExpression,
  ScheduleTargetInput,
} from "@aws-cdk/aws-scheduler-alpha";
import { LambdaInvoke } from "@aws-cdk/aws-scheduler-targets-alpha";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Architecture, LogFormat, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // Create Lambda function
    const cronFunction = new NodejsFunction(this, `CronFunction`, {
      functionName: `cron-function`,
      entry: path.join(__dirname, "..", "functions", "cron", "index.ts"),
      runtime: Runtime.NODEJS_20_X,
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      timeout: Duration.minutes(1),
      logFormat: LogFormat.JSON,
    });

    // Create Lambda function target for EventBridge Scheduler
    const cronFunctionTarget = new LambdaInvoke(cronFunction, {
      input: ScheduleTargetInput.fromObject({
        foo: "bar",
      }),
    });

    // Create rate-based schedule
    new Schedule(this, "RateBasedSchedule", {
      scheduleName: "rate-based-schedule",
      description: "Trigger cron function every minute",
      schedule: ScheduleExpression.rate(Duration.minutes(1)),
      target: cronFunctionTarget,
    });
  }
}
