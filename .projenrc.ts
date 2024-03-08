import { awscdk, javascript } from "projen";
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.155.0",
  defaultReleaseBranch: "main",
  depsUpgradeOptions: { workflow: false },
  eslint: true,
  minNodeVersion: "20.17.0",
  name: "cdk-aws-cron-function",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "9.9.0",
  prettier: true,
  projenrcTs: true,

  deps: [
    "@aws-cdk/aws-scheduler-alpha",
    "@aws-cdk/aws-scheduler-targets-alpha",
    "@middy/core",
    "@middy/http-error-handler",
    "@aws-lambda-powertools/logger",
    "@types/aws-lambda",
  ],
});
project.synth();
