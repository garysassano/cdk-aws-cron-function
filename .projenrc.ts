import { awscdk, javascript } from "projen";
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.138.0",
  defaultReleaseBranch: "main",
  depsUpgradeOptions: { workflow: false },
  eslint: true,
  minNodeVersion: "20.11.1",
  name: "cdk-aws-cron-function",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "9.0.5",
  prettier: true,
  projenrcTs: true,

  deps: [
    "@aws-cdk/aws-scheduler-alpha",
    "@aws-cdk/aws-scheduler-targets-alpha",
    "@middy/core@5.2.3",
    "@middy/http-error-handler",
    "@aws-lambda-powertools/logger",
  ],
});
project.synth();
