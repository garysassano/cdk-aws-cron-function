import { awscdk, javascript } from "projen";

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.170.0",
  defaultReleaseBranch: "main",
  depsUpgradeOptions: { workflow: false },
  eslint: true,
  minNodeVersion: "22.11.0",
  name: "cdk-aws-cron-function",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "9",
  prettier: true,
  projenrcTs: true,

  deps: [
    "@aws-cdk/aws-scheduler-alpha",
    "@aws-cdk/aws-scheduler-targets-alpha",
    "@aws-lambda-powertools/logger",
    "@types/aws-lambda",
    "@middy/core",
    "@middy/http-error-handler",
  ],
});
project.synth();
